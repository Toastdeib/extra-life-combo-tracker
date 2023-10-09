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
* `refreshInterval` - the interval at which the app polls the API and updates the progress bar in milliseconds (default: 15000)
* `ddParticipantId` - your DonorDrive participant ID, if you have one; this can be found in your DonorDrive/Extra Life page URL (https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=[Your ID])
* `tiltifyToken` - your Tiltify access token, if you have one; this can be found in your Tiltify dashboard (https://dashboard.tiltify.com/[your Tilitfy User Name]/my-account/connected-accounts/applications)
* `tiltifyCampaign` - your Tiltify campaign ID, if you have one; this can be found in your Tiltify campaign dashboard (https://dashboard.tiltify.com/[your Tilitfy User Name]/[your camapign name]/detail)

Note: You **must** configure the fields for at least one of the two sources (DonorDrive and Tiltify) for the application to function. If both are populated, it aggregates the values across both.

In addition to setting the configs, you'll need to update both index.html and loading-bar.css to add in your fundraising goal in the place of `$UNINITIALIZED`. This will be moved to the config file as well in a future push.

## Running the Program
On your command line, go to the directory where you downloaded index.js (e.g. cd c:\"Extra Life") and run the following command:

`node index.js`

The code will run on its own. Basic console information will output to show the program is running. You can access the web page by visiting http://localhost:3000 (or whatever your configured port is) in your browser.

## Feedback
You can ping me @ndtex on the Extra Life Discord in the #tiltify-support channel. Enjoy the application? Consider a donation to my [Extra Life campaign](https://gamin4aven.com)!
