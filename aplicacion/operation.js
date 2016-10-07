var util3D = require("./../util3D.js");
var util = require("util");

function operation(test) {
	this.test = test;
	this.coords = new Array();
	var context = this;
	this.validCoors = function (coors) {
		var valid = true
		util3D.forEach(coors, function(v, k) { valid = valid && v <= context.test.dimension && v >= 1; });
		return valid;
	}
	this.process = function() {
		this.validCoors(this.coords) && this._process();
	}
}

exports.updateOperation = function (test, x, y, z, value) {
	operation.call(this, test);
	this.coords = [x, y, z];
	this._process = function() {
		this.test.matrix[x - 1][y - 1][z - 1] = value;
	}
}

exports.queryOperation = function (test, x1, y1, z1, x2, y2, z2) {
	operation.call(this, test);
	this.result = 0;
	this.coords = [x1, y1, z1, x2, y2, z2];
	var context = this;
	this._process = function() {
		util3D.each(x2 - x1 + 1, function(x) {
			x = x + x1;
			util3D.each(y2 - y1 + 1, function(y) {
				y = y + y1;
				util3D.each(z2 - z1 + 1, function(z) {
					z = z + z1;
					context.result += context.test.matrix[x - 1][y - 1][z - 1];
				})
			})
		})
	} 
}

util.inherits(exports.updateOperation, operation);
util.inherits(exports.queryOperation, operation);