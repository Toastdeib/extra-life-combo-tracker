# Extra Life Tiltify+DonorDrive
This is an extremely simple NodeJS application that will poll both DonorDrive and Tiltify for your total amount raised on each platform. The code will then combine the values and output into a text file that you can use for stream overlays. The code will poll both sites every 60 seconds.

Additional features will come later and this will require direct editing of index.js to work. Additional features and ease of use will come in future releases.

## Requirements
NodeJS - https://nodejs.org/en/

Once node JS is installed, you will need to enter the following in your command line to get needed additional packages:

`npm i request
npm i --save tiltify-api-client`

## Entering Your Information
Once you've downloaded the index.js file, edit lines 12-15 with your Tiltify and DonorDrive information and save the file. 

As an example here's what the code looks like with my information:

```javascript
/*** INPUT YOUR INFORMATION BELOW ***/
let tiltifyToken = 'bunchOfLettersAndNumbers' // Insert your access token from https://dashboard.tiltify.com/[your Tilitfy User Name]/my-account/connected-accounts/applications
let tilitifyCampaign = '130204' // Insert your campaign ID, found at https://dashboard.tiltify.com/ndtex/[your Tilitfy User Name]/[your camapign name]/detail
let participantID = '448733' //Found on your DonorDrive Extra Life URL: https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=[PARTICIPANT_ID]
let goalAmount = 15000  //Insert your fundraising goal
```

## Running the Program
On your command line, go to the directory where you downloaded index.js (e.g. cd c:\"Extra Life") and run the following command:

`node index.js`

The code will run on it's own. Basic console information will output to show the program is running. You can now use your favorite streaming software and use "output.txt" in your overlay.

## Feedback
You can ping me @ndtex on the Extra Life Discord in the #tiltify-support channel. Enjoy the application? Consider a donation to my Extra Life campaign: https://gamin4aven.com
