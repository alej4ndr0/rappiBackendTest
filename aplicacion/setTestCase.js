var util3D = require("./../util3D.js");
var testCase = require("./testCase.js").testCase;

exports.setTestCase = function(input) {
	this.testCases = [];
	this.numberTest = 0;
	this.input = input;
	var context = this;
	this.getTestCase = function(index) { 
		return new testCase(this, index, this.input._getNumberDimension(index), this.input._getNumberOperations(index));
	};
	this.process = function(callback) {
		this.input.process(function() {
			context.numberTest = context.input._getNumberTestCase();
			util3D.each(context.numberTest, function(k) { 
				context.testCases[k] = context.getTestCase(k); 
				context.testCases[k].process();
			});
			callback();
		});
	}
}