/** Node Module Requirements **/
import config from './config.js';
import express from 'express';
import fs from 'fs';
import { getUserInfo } from 'extra-life-api';
import https from 'https';
import TiltifyClient from 'tiltify-api-client';

const DEFAULT_PORT = 3000;
const DEFAULT_REFRESH = 15000;

let currentTotal = 0;
let tiltifyRaised = 0;
let ddRaised = 0;

let client;
let hasTiltify = false;
let hasDd = false;

// Check for config information and initialize the Tilitfy client if info is present
if (config.tiltifyToken && config.tiltifyCampaign) {
    client = new TiltifyClient(config.tiltifyToken);
    client.Campaigns.get(config.tiltifyCampaign, (data) => {
        tiltifyRaised = data.amountRaised;
        console.log('Tiltify Initialized: $' + tiltifyRaised + ' raised.');
    });
    hasTiltify = true;
}

if (config.ddParticipantId) {
    hasDd = true;
}

/**
 * Fetches the latest donation totals from each configured platform, aggregates the value, and stores it
 * in the data file if it's changed since the previous check.
 */
async function updateTotal() {
    if (!isInitialized()) {
        console.log('At least one donation source needs to be initialized');
        process.exit(0);
        return;
    }

    if (hasTiltify) {
        // TODO - This isn't synchronous, so it'll probably be on a 1-cycle update delay from the EL data
        client.Campaigns.get(config.tiltifyCampaign, (data) => {
            tiltifyRaised = data.amountRaised;
        });
    }

    if (hasDd) {
        const result = await getUserInfo(config.ddParticipantId);
        ddRaised = result.sumDonations;
    }

    if (currentTotal !== ddRaised + tiltifyRaised) {
        currentTotal = ddRaised + tiltifyRaised;
        fs.writeFile('public/data.json', JSON.stringify({ currentTotal: currentTotal }), (err) => {
            if (err) {
                console.log(`Error when saving donor-drive.js: ${err}`);
                return;
            }

            console.log('data.json updated');
        });
    }

    console.log(`Current total is: ${currentTotal}`);
}

function isInitialized() {
    return hasTiltify || hasDd;
}

updateTotal();
setInterval(updateTotal, config.refreshInterval ?? DEFAULT_REFRESH);

/** Web Server **/
const port = config.port ?? DEFAULT_PORT;
const app = express();
app.use(express.static('public'));

if (config.certPath) {
    // If there's a configured cert path, try to use https
    const privateKey = fs.readFileSync(config.certPath + 'privkey.pem', 'utf8');
    const certificate = fs.readFileSync(config.certPath + 'cert.pem', 'utf8');
    const ca = fs.readFileSync(config.certPath + 'chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, () => {
        console.log(`Running over https on port ${port}`);
    });
} else {
    // Otherwise, just serve over http
    app.listen(port, () => {
        console.log(`Running over http on port ${port}`);
    });
}
