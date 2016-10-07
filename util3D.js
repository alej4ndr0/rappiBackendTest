var fs = require("fs");
var util = require("util");

exports.forEach =  function(obj, callback) {
	for (var i in obj) {
		callback(obj[i], i);
	}
};
exports.readFile = function(pathFile, callback) {
	var contentFile = "";
	fs.readFile(pathFile, "utf8", (err, data) => { 
		if (err) throw err;
		contentFile += data || "";
		callback && callback(contentFile);
	});
	
};
exports.each = function(end, callback, index) {
	index = index || 0;
	if (end == index) return;
	callback(index);
	return exports.each(end, callback, index + 1);
};
