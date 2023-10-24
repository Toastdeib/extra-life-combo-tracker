# Extra Life Combo Tracker
This is an extremely simple Node.js application that will poll DonorDrive and/or Tiltify for your total amount raised on each platform. The code will then combine the values and output it in a progress bar on an HTML page which can be used on your stream overlay.

The progress bar comes from the LoadingBar.JS library. There are loads of customizations possible, including progress bars with custom images. You can find the full documentation [here](https://loading.io/progress/).

## Requirements
Node.js - https://nodejs.org/en/

Once Node.js is installed, you will need to enter the following in your command line to get needed additional packages: `npm install`

Extra Life API documentation can be found [here](https://github.com/ammuench/extra-life-api) and Tiltify API documentation can be found [here](https://github.com/daniellockard/tiltify-api-client).

## Entering Your Information
To configure the application, you'll need to create a copy of [config.js.example](config.js.example), rename it to `config.js`, and update the fields within with actual values:

* `port` - the port that the app is served up on (default: 3000)
* `certPath` - a path containing the `privkey.pem`, `cert.pem`, and `chain.pem` files for an SSL certificate; this field is **optional** in case you'd like to run the application from an actual webserver over HTTPS, if you're running it locally you can omit the field and it will serve up over HTTP instead
* `apiRefreshInterval` - the interval at which the app polls the APIs and updates the progress bar in milliseconds (default: 15000)
* `ddParticipantId` - your DonorDrive participant ID, if you have one; this can be found in your DonorDrive/Extra Life page URL (`https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=[Your ID]`)
* `tiltifyToken` - your Tiltify access token, if you have one; this can be found in your Tiltify dashboard (`https://dashboard.tiltify.com/[your Tilitfy User Name]/my-account/connected-accounts/applications`)
* `tiltifyCampaign` - your Tiltify campaign ID, if you have one; this can be found in your Tiltify campaign dashboard (`https://dashboard.tiltify.com/[your Tilitfy User Name]/[your camapign name]/detail`)
* `donationTarget` - your donation target in dollars
* `barRefreshInterval` - the interval at which the bar refreshes itself in milliseconds; the value in the example file is 1000 for historical reasons, but in practice can be as high as the `apiRefreshInterval` field

Note: If using `index.js`, you **must** configure the fields for at least one of the two sources (DonorDrive and Tiltify) for the application to function. If all three fields are populated, it aggregates the values across both.

## Running the Application
On your command line, go to the directory where you downloaded index.js (e.g. cd c:\"Extra Life") and run the following command:

`node index.js`

The code will run on its own. Basic console information will output to show the application is running. You can access the web page by visiting http://localhost:3000 (or whatever your configured port is) in your browser.

For additional customization, the page supports the query string parameters `primaryColor` and `secondaryColor`. If using them, **both** parameters are required and must be formatted as 3- or 6-character hex color codes without the # (e.g. `primaryColor=ffffff&secondaryColor=999999`). The tracker bar will use the colors specified by the parameters and default to the standard blue stripes if the parameters are omitted.

## Feedback
You can ping me @ndtex on the Extra Life Discord in the #tiltify-support channel. Enjoy the application? Consider a donation to my [Extra Life campaign](https://gamin4aven.com) or to Toastdeib, who helped me a ton with code refactoring and cleanup, [at his Extra Life campign](https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=514246).
