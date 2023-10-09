export function updateBar(bar) {
    $.getJSON('data.json', (data) => {
        const items = []
        $.each(data, (key, val) => {
            items.push(val)
        })
        console.log(items)
        console.log(`Current total pulled is: ${items[0]}`)

        bar.set(data.currentTotal)
    })
}
