function createCaesar(language, rotation) {
	return {
		"getInd" : function(chr) {
			for(var i=0; i<language.length; i+=1) {
				if (chr==language[i][0]) {
					return i;
				}
			}
			throw new CharException("Character " + chr + " not in language.");
		},
	
		"convert" : function(string) {
			if (language.length==0) {
				throw new EmptyException("Empty language.");
			}
		
			var strlen = string.length;
			var chr, langind, convertedind;
			var result = "";
			for(var i=0; i<strlen; i+=1) {
				chr = string[i];
				langind = (this["getInd"])(chr);
				convertedind = (langind + rotation) % language.length;
				result += language[convertedind][0];
			}
			return result;
		}
	};
}