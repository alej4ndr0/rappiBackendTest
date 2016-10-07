var util3D = require("./../util3D.js");
var queryOperation = require("./../aplicacion/operation.js").queryOperation;

exports.outputFormat = function (setTest) { // class outputFormat
	this.getResultUpdates = function(callback) {
		util3D.forEach(setTest.testCases, function(test) {
			util3D.forEach(test.operations, function(op) {
				if (op instanceof queryOperation) {
					callback && callback(op.result);
				}
			});
		});
	};
}