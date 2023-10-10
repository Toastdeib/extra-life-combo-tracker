function updateBar() {
    $.getJSON('data.json', (data) => {
        console.log(`Updating current total to ${data.currentTotal}`)
        bar.set(data.currentTotal)
    })
}

const bar = new ldBar('.ldBar', { max: window.donationTarget })
updateBar()
setInterval(updateBar, window.updateInterval)

document.styleSheets[0].addRule('.ldBar .ldBar-label:after', `content: " / $${window.donationTarget}"`)
