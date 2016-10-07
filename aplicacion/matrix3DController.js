var setTestCase = require("./setTestCase.js").setTestCase;
var outputFormat = require("./../vista/outputFormat.js").outputFormat;

exports.matrix3DController = function() { // class matrix3DController
	this.getSetTestCase = function(input) {
		return new setTestCase(input);
	};
	this.getOutputFormat = function(setTest) {
		var output = new outputFormat(setTest);
		output.getResultUpdates(function(result) { console.log(result); });
		return output;
	};
}