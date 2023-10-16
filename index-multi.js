/** Node Module Requirements **/
import config from './config.js';
import express from 'express';
import fs from 'fs';
import { getUserInfo } from 'extra-life-api';
import https from 'https';

const DEFAULT_PORT = 3000;
const DEFAULT_REFRESH = 15000;

const currentTotals = {};
let hasDd = false;

if (config.ddParticipantIdList.length > 0) {
    console.log('DonorDrive initialized');
    for (const id of config.ddParticipantIdList) {
        currentTotals[id] = 0;
    }

    hasDd = true;
}

/**
 * Fetches the latest donation totals from each configured platform, aggregates the value, and stores it
 * in the data file if it's changed since the previous check.
 */
async function updateTotals() {
    if (!hasDd) {
        console.log('At least one donation ID needs to be initialized');
        process.exit(0);
        return;
    }

    let totalChanged = false;
    for (const id of Object.keys(currentTotals)) {
        const result = await getUserInfo(id);
        if (currentTotals[id] !== result.sumDonations) {
            currentTotals[id] = result.sumDonations;
            totalChanged = true;
        }
    }

    if (totalChanged) {
        fs.writeFile('public/data-multi.json', JSON.stringify(currentTotals), (err) => {
            if (err) {
                console.log(`Error when saving data-multi.json: ${err}`);
                return;
            }

            console.log('data-multi.json updated');
        });
    }

    console.log('Totals fetched');
}

updateTotals();
setInterval(updateTotals, config.refreshInterval ?? DEFAULT_REFRESH);
fs.writeFile('public/config.js', `window.donationTarget = ${config.donationTarget}; window.barRefreshInterval = ${config.barRefreshInterval};`, (err) => {
    if (err) {
        console.log(`Error when creating public/config.js: ${err}`);
        return;
    }

    console.log('public/config.js written');
});

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
