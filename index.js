/** Node Module Requirements **/
const express = require('express')
const fs = require('fs')
const donorDrive = require('extra-life-api')
const TiltifyClient = require("tiltify-api-client")

let currentTotal = 0
let tiltifyRaised = 0
let ddRaised = 0

let hasTiltify = false
let hasDD = false

/*** INPUT YOUR INFORMATION BELOW ***/

let participantID = 0 //Found in DonorDrive/Extra Life Page URL: https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=[Your ID]

let tiltifyToken = '' // Insert your access token from https://dashboard.tiltify.com/[your Tilitfy User Name]/my-account/connected-accounts/applications
let tilitifyCampaign = '' // Insert your campaign ID, found at https://dashboard.tiltify.com/[your Tilitfy User Name]/[your camapign name]/detail

/*** Create & Initialize Tilitfy and DonorDrive information ***/

if (tiltifyToken != '' && tilitifyCampaign != ''){
	client = new TiltifyClient(tiltifyToken)
	client.Campaigns.get(tilitifyCampaign, function (data) { 
				tiltifyRaised = data.amountRaised 
				console.log("Tiltify Initialized: $" + tiltifyRaised + " raised.")
			})
	hasTiltify = true
}

if (participantID != 0){
	const basicInfo = 'https://www.extra-life.org/api/participants/' + participantID
	hasDD = true
}

/** DonorDrive Total Request. Need to await as the API returns a promise. **/
async function ddTotal(){
	
	try {
		isInitialized()
	}catch (error) {
		console.log(error)
	}
	
	var updateFile = false
	
	console.log(`Current total is: ${currentTotal}`)
	
	if (hasTiltify){
		client.Campaigns.get(tilitifyCampaign, function (data) { 
				tiltifyRaised = data.amountRaised 
			})
		}
	
	if (hasDD){
		var result = await donorDrive.getUserInfo(participantID);
	}
	
	if (currentTotal != result.sumDonations + tiltifyRaised){
		
		currentTotal = result.sumDonations + tiltifyRaised
				
		updateFile = true
	}		
	
	if (updateFile){
		
		var jsonString = '{"currentTotal":' + currentTotal + '}'
		
		fs.writeFile('public/data.json', jsonString , (err) => {
			if (err) {
				console.log(`Error when saving donor-drive.js: ${err}`)
				return
			}

			console.log('data.json Updated')
		})
	}
	
}

function isInitialized(){

	if (!(hasDD && hasTiltify)) {
		
		throw "Camapign information not initialized. Please check index.js for proper setup.\nPress CTRL+C to halt execution.\n"
	
	}
	
}

ddTotal()
setInterval(ddTotal,15000, currentTotal)

/** Web Server **/
var app = express()
app.use(express.static('public'))

var server = app.listen(3000)