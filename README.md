# Extra Life Combo Tracker
This is an extremely simple Node.js application that will poll DonorDrive and/or Tiltify for your total amount raised on each platform. The code will then combine the values and output it in a progress bar on an HTML page which can be used on your stream overlay.

The progress bar comes from the LoadingBar.JS library. There are loads of customizations possible, including progress bars with custom images. You can find the full documentation [here](https://loading.io/progress/).

## Requirements
Node.js - https://nodejs.org/en/

Once Node.js is installed, you will need to enter the following in your command line to get needed additional packages: `npm install`

Extra Life API documentation can be found [here](https://github.com/mririgoyen/extra-life) and Tiltify API documentation can be found [here](https://github.com/daniellockard/tiltify-api-client).

## Entering Your Information
To configure the application, you'll need to create a copy of [config.js.example](config.js.example), rename it to `config.js`, and update the fields within with actual values:

* `port` - the port that the app is served up on (default: 3000)
* `certPath` - a path containing the `privkey.pem`, `cert.pem`, and `chain.pem` files for an SSL certificate; this field is **optional** in case you'd like to run the application from an actual webserver over HTTPS, if you're running it locally you can omit the field and it will serve up over HTTP instead
* `apiRefreshInterval` - the interval at which the app polls the APIs and updates the progress bar in milliseconds (default: 15000)
* `ddParticipantId` - your DonorDrive participant ID, if you have one; this can be found in your DonorDrive/Extra Life page URL (`https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=[Your ID]`)
* `ddParticipantIdList` - a list of DonorDrive participant IDs, to be used with the [index-multi.js](index-multi.js) version of the application (see below)
* `tiltifyToken` - your Tiltify access token, if you have one; this can be found in your Tiltify dashboard (`https://dashboard.tiltify.com/[your Tilitfy User Name]/my-account/connected-accounts/applications`)
* `tiltifyCampaign` - your Tiltify campaign ID, if you have one; this can be found in your Tiltify campaign dashboard (`https://dashboard.tiltify.com/[your Tilitfy User Name]/[your camapign name]/detail`)
* `donationTarget` - your donation target in dollars
* `barRefreshInterval` - the interval at which the bar refreshes itself in milliseconds; the value in the example file is 1000 for historical reasons, but in practice can be as high as the `apiRefreshInterval` field

Note: If using `index.js`, you **must** configure the fields for at least one of the two sources (DonorDrive and Tiltify) for the application to function. If all three fields are populated, it aggregates the values across both. If using `index-multi.js`, you only need to populate the `ddParticipantIdList` field, as the others are ignored.

## Running the Application
On your command line, go to the directory where you downloaded index.js (e.g. cd c:\"Extra Life") and run the following command:

`node index.js`

The code will run on its own. Basic console information will output to show the application is running. You can access the web page by visiting http://localhost:3000 (or whatever your configured port is) in your browser.

If you'd like to run this application to support multiple DonorDrive IDs, you'll instead want ro run:

`node index-multi.js`

This version of the application is intended to be hosted on a proper webserver. It should be viewed via the /index-multi.html page on whatever domain and port you choose, and expects an `id` to be passed in the query string which **must** be one of the IDs in the ID list in the configs. It also supports a `target` query parameter, which sets the donation target for displaying the progress bar.

## Feedback
You can ping me @ndtex on the Extra Life Discord in the #tiltify-support channel. Enjoy the application? Consider a donation to my [Extra Life campaign](https://gamin4aven.com)!
