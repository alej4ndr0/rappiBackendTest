var util = require("util");
var util3D = require("./../util3D.js");

exports.linesInput = function(lines) {
	this.lines = lines;
	var numbers = function(array) {
		var result = [];
		util3D.forEach(array, function(v) { result.push(new Number(v)) })
		return result;
	}
	this.getInstructions = function(index, instructions, indexOperation, indexTest, acumOp, contOp) {
		index = index || 0;
		indexOperation = indexOperation || 0;
		indexTest = indexTest || 0;
		acumOp = acumOp || 0;
		contOp = contOp || 0;
		if (index == this.lines.length) {
			return instructions;
		}
		var line = line || this.lines[index].split(" ");
		// lee cantidad de test
		if (!instructions) { 
			return this.getInstructions(index + 1, { set: !isNaN(line[0]) && new Number(line[0]) });
		}
		instructions.test = instructions.test || { };
		// lee dimensión y numero de operaciones del test
		if (!indexTest || contOp >= acumOp) {
			indexOperation = 0;
			contOp = 0;
			instructions.test[indexTest] = { 
				dim: !isNaN(line[0]) && new Number(line[0]),
				op: !isNaN(line[1]) && new Number(line[1])
			};
			acumOp = instructions.test[indexTest].op;
			indexTest = indexTest + 1;
			return this.getInstructions(index + 1, instructions, indexOperation, indexTest, acumOp, contOp);
		}
		contOp = contOp + 1;
		instructions.test[indexTest - 1].operations = instructions.test[indexTest - 1].operations || {};			
		// lee las operaciones del test
		instructions.test[indexTest - 1].operations[indexOperation] = {
			name: line[0],
			params: numbers(line.slice(1, line.length)),
		};
		indexOperation = indexOperation + 1;
		return this.getInstructions(index + 1, instructions, indexOperation, indexTest, acumOp, contOp);
	};
}