/*** Node Requirements ***/
const request = require('request')
const fs = require('fs')
const TiltifyClient = require("tiltify-api-client")

/*** Variable Initialization ***/
let outputString = ''
let tiltifyRaised = 0
let totalRaised = 0

/*** INPUT YOUR INFORMATION BELOW ***/
let tiltifyToken = '' // Insert your access token from https://dashboard.tiltify.com/[your Tilitfy User Name]/my-account/connected-accounts/applications
let tilitifyCampaign = '' // Insert your campaign ID, found at https://dashboard.tiltify.com/ndtex/[your Tilitfy User Name]/[your camapign name]/detail
let participantID = '' //Found on your DonorDrive Extra Life URL: https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=[PARTICIPANT_ID]
let goalAmount = 0  //Insert your fundraising goal

/*** Create & Initialize Tilitfy and DonorDrive information ***/
client = new TiltifyClient(tiltifyToken)
const basicInfo = 'https://www.extra-life.org/api/participants/' + participantID

/*** Function to calculate total amounts raised from Tilitfy and DonorDrive ***/
function updateGoal(){
	request({
		url: basicInfo,
		json: true
	}, (error, response, body) => {
		if (error || response.statusCode !== 200) {
			console.log(`Error in updateGoal(): ${error} (status code ${response.statusCode})`)
			return
		}
		
		client.Campaigns.get(tilitifyCampaign, function (data) { 
			tiltifyRaised = data.amountRaised 
		})
		
		if ( (body.sumDonations + tiltifyRaised) > totalRaised){
			totalRaised = body.sumDonations + tiltifyRaised
			console.log("New donation(s) found! Total Raised: $" + totalRaised.toFixed(2))
			
			goalText = 'Goal: $' + totalRaised.toFixed(2) + ' / $' + goalAmount
			
			updateFiles(goalText)
		}
		else {
			console.log("No new donations received.")
		}
		
	})
}

/*** Function Update Text Files ***/
function updateFiles(updateStr){
	fs.writeFile('output.txt', updateStr, (err) => {
		if (err) {
			console.log(`Error when saving Goal.txt: ${err}`)
			return
		}

		console.log('Output Text File Updated')
						
	})
}

/*** Run update function, polling every 60 seconds ***/
updateGoal()
setInterval(updateGoal, 60000)