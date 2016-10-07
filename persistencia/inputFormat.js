var util3D = require("./../util3D.js");
var util = require("util");
var linesInput = require("./linesInput.js").linesInput;

var inputFormat = function () { // class inputFormat
	this.instructions = {};
	this._getNumberTestCase = function() { return this.instructions.set; };
	this._getNumberDimension = function(index) { return this.instructions.test[index].dim; };
	this._getNumberOperations = function(index) { return this.instructions.test[index].op; };
	this._getNameOperation = function(indexTest, indexOp) { return this.instructions.test[indexTest].operations[indexOp].name; };
	this._getParamsOperation = function(indexTest, indexOp) { return this.instructions.test[indexTest].operations[indexOp].params; };
	this._process = function (input) {
		var li = new linesInput(input.split("\n"));
		this.instructions = li.getInstructions();
	};
}

exports.inputFile = function (file) {
	inputFormat.call(this);
	this.file = file;
	var context = this;
	this.process = function(callback) {
		util3D.readFile(this.file, function(content) { context._process(content); callback(); });
	};
};

exports.inputString = function(input) {
	inputFormat.call(this);
	this.process = function(callback) {
		this._process(input);
		callback();
	}
};

util.inherits(exports.inputFile, inputFormat);
util.inherits(exports.inputString, inputFormat);

