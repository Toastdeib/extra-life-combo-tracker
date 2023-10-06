export function updateBar(bar){
	
	$.getJSON('data.json', function (data){
		var items = []
		$.each( data, function( key, val ) {
			items.push( val );
		})
		console.log(items)
		console.log('Current total pulled is: ' + items[0])
		
		bar.set(data.currentTotal)
			
	})
	
}