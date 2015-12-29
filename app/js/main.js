var fs = require('fs');
var path = require('path');
//var gui = require('nw.gui');
var converter = require('json-2-csv');
var $jsonFolder = $("#jsonFolder");
var $csvFolder = $("#csvFolder");
var $startConversionButton = $("#startConversionButton");
var jsonFiles;
var currentJSON;
var jsonData = [];
var resultNumber = 10;
var readPath;
var writePath;

function isJson(file) {
  return path.extname(file) == '.json';
};

$startConversionButton.click(function(event) {
  event.preventDefault();
  readPath = $jsonFolder.val() + '/';
  writePath = $csvFolder.val() + '/';
  if($jsonFolder.val() == "" || $csvFolder.val() == "") {
    alert('Please ensure proper selection of both read AND write directories');
    return;
  };
  startConversion();
});

var readDirCallback = function (err, files) {
  if (err) throw err;
  jsonFiles = files.filter(isJson);
  jsonFiles.forEach(readConvertWrite);
};

function readConvertWrite(element, index, array) {
  jsonData = JSON.parse(fs.readFileSync(readPath + element, 'utf8')).Response.Result;
  jsonData.length = resultNumber;
  element = element.slice(0,-5);
  converter.json2csv(jsonData, function(err, csv) {
    if (err) throw err;
    fs.writeFileSync(writePath + element + '.csv', csv);
  });
};

function startConversion() {
  fs.readdir(readPath, readDirCallback);
};


