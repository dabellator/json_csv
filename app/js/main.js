var fs = require('fs');
var path = require('path');
var gui = require('nw.gui');
var converter = require('json-2-csv');
var $jsonFolder = $("#jsonFolder");
var $csvFolder = $("#csvFolder");
var $beginConversionButton = $("#beginConversionButton");
var jsonFiles;
var jsonData = [];
var resultNumber = 10;
var readPath;
var writePath;


gui.Window.get().on('close', function() {
  this.close(true);
});

function isJson(file) {
  return path.extname(file) == '.json';
};

$beginConversionButton.click(function(event) {
  event.preventDefault();
  readPath = $jsonFolder.val() + '/';
  writePath = $csvFolder.val() + '/';
  if($jsonFolder.val() == "" || $csvFolder.val() == "") {
    alert('Please ensure proper selection of both "read" AND "write" directories');
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
    $beginConversionButton.text('Processed ' + (index+1) + ' out of ' + array.length + ' files');
    $beginConversionButton.css({
      'background-color': '#003f88',
      color: 'white'
    });
  });
};

function startConversion() {
  fs.readdir(readPath, readDirCallback);
};


