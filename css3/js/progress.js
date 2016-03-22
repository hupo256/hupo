var progressBar = document.getElementById('p'), 
client = new XMLHttpRequest();
client.open('GET', 'image/files.dat');
client.onprogress = function (event) {
	if (event.lengthComputable) {
		var max = progressBar.max = event.total,
			value = progressBar.value = event.loaded;
		
		var num = Math.ceil((value/max)*100);
		document.getElementById('tex').innerHTML = num + '%';
	}
};
client.onloadend = function (event) {
	// console.log(22);
	// progressBar.value = event.loaded;
};
client.send();