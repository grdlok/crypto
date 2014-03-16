$( document ).ready(function() {
	var fileButton = $('#files');
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		fileButton[0].addEventListener('change', handleFileSelect, false);
		
		$("#selectFiles").click(function() {
			fileButton.click();
		});
	} else {
		fileButton.remove();
		alert('The File APIs are not fully supported in this browser.');
	}
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
	var len = files.length;
	
	if (len > 0) {
		var readCount;
		var reader = new FileReader();
	
		reader.onload = (function(e) {
			var f = files[readCount-1];
			var filename = escape(f.name);
			
			if (filename.toLowerCase().endsWith(".csv")) {
				filename = filename.substring(0,filename.length-4);
			
				var text = reader.result;
				var arrays = $.csv.toArrays(text);
				
				var frequencies = getFrequencies();
				frequencies[filename] = arrays;
			}
			
			if (readCount < len) {
				readCount += 1;
				reader.readAsText(files[readCount-1]);
			} else {
				generateMenuFromData();
			}
		});
	
		readCount = 1;
		reader.readAsText(files[readCount-1]);
	}
}

function generateMenuFromData() {
	// create container for csv files
	var prop = []; 
	
	// get all the filenames
	var frequencies = getFrequencies();
	for (var property in frequencies) {
		if (frequencies.hasOwnProperty(property)) {
			prop.push(property);
		}
	}
	
	// remove duplicates
	var uniqueNames = [];
	$.each(prop, function(i, el){
		if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	
	// sort them
	uniqueNames.sort();
	
	// clear the menu
	var lst = $('#list');
	lst.empty();
	
	// add them to the menu
	for (var i=0; i<uniqueNames.length; i+=1) {
		lst.append('<div class="language" key="' + uniqueNames[i] + '">' + uniqueNames[i] + '</div>');
	}
	
	// define their click events
	$(".language").click(function() {
	var key = $(this).attr("key");
	
		// get the language
		var lang = frequencies[key];
		
		// create a ceasar object with rotation 3 and that language
		var c = createCaesar(lang, 3);
		
		// alert the encryption for 'hello'
		alert((c["convert"])("hello"));
	});
}