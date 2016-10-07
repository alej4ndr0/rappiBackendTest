var matrix3DController = require("./aplicacion/matrix3DController.js").matrix3DController;
var inputFile = require("./persistencia/inputFormat.js").inputFile;

var filesTest =  { 
	test1 : "./test/test1.txt",
};
var controller3D = new matrix3DController();
var setTest1 = controller3D.getSetTestCase(new inputFile(filesTest.test1));
setTest1.process(function () {
	controller3D.getOutputFormat(setTest1);
});
