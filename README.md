# Extra Life Combo Tracker
This is an extremely simple NodeJS application that will poll DonorDrive and/or Tiltify for your total amount raised on each platform. The code will then combine the values and output it in a progress bar on an HTML page which can be used on your stream overlay.

The progress bar comes from the LoadingBar.JS library. There are loads of customizations possible, including progress bars with custom images. Find full documentation here: https://loading.io/progress/

## Requirements
NodeJS - https://nodejs.org/en/

Once node JS is installed, you will need to enter the following in your command line to get needed additional packages:

`npm i express
npm i extra-life-api
npm i --save tiltify-api-client`

Extra Life API documentation: https://github.com/mririgoyen/extra-life
Tiltify API documentation: https://github.com/daniellockard/tiltify-api-client

## Entering Your Information
You will need to change information in the following files:
*index.js
*public/index.html
*public/loading-bar.css

On index.js, you will put in your DonorDrive (Extra Life page) participant ID. For Tiltify, you will need to get an API token and your camapign number (instructions for where this information is can be found in code comments).

On both index.html and loading-bar.css you simply need to add in your fundraising goal.

## Running the Program
On your command line, go to the directory where you downloaded index.js (e.g. cd c:\"Extra Life") and run the following command:

`node index.js`

The code will run on it's own. Basic console information will output to show the program is running. You can access the web page by visiting 127.0.0.1:3000 in your browser.

## Feedback
You can ping me @ndtex on the Extra Life Discord in the #tiltify-support channel. Enjoy the application? Consider a donation to my Extra Life campaign: https://gamin4aven.com
