var util3D = require("./../util3D.js");
var operation = require("./operation.js");
var updateOperation = operation.updateOperation;
var queryOperation = operation.queryOperation;

exports.testCase = function(setTest, index, dimension, numberOperations) {
	this.operations = [];
	this.dimension = dimension;
	this.numberOperations = numberOperations;
	this.index = index;
	this.setTest = setTest;
	this.matrix = [];
	this.getOperation = function(index) {
		var params = this.setTest.input._getParamsOperation(this.index, index);
		switch (this.setTest.input._getNameOperation(this.index, index)) {
			case "UPDATE":
			return new updateOperation(this, params[0], params[1], params[2], params[3]);
			case "QUERY":
			return new queryOperation(this, params[0], params[1], params[2], params[3], params[4], params[5]);
		}
	};
	var context = this;
	util3D.each(this.dimension, function(i) {
		context.matrix[i] = [];
		util3D.each(context.dimension, function(j) {
			context.matrix[i][j] = []
			util3D.each(context.dimension, function(k) {
				context.matrix[i][j][k] = 0;
			});
		});
	});
	this.process = function() {
		util3D.each(this.numberOperations, function(k) { 
			context.operations[k] = context.getOperation(k);
			context.operations[k].process();
		});
	}
}