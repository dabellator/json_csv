var fs = require('fs');
  //var gui = require('nw.gui');
  var json2csv = require('json2csv');
  var converter = require('json-2-csv');

  //var $jsonFolder = $("#jsonFolder");
  //console.log($jsonFolder);

  var jsonFiles;
  var jsonArray = [];
  var resultNumber = 10;
  var readPath = '/Projects/json_csv/example_json/';
  var currentJSON;
  var writePath = '/Projects/json_csv/example_csv/';
  var writeCount = 0;

  fs.realpath('./app', function(err, resolvedPath) {
    if (err) throw err;
    console.log(resolvedPath); //returns full file path
  });

  var json2csvCallback = function (err, csv) {
    if (err) throw err;
    console.log(csv);
    fs.writeFileSync(process.env.HOME + writePath + 'test' + writeCount + '.csv', csv);
  };

  var readDirCallback = function (err, files) {
    if (err) throw err;
    jsonFiles = files;
    debugger;
    for(i = 0; i < jsonFiles.length; i++) {
      currentJSON = JSON.parse(fs.readFile(process.env.HOME + readPath + jsonFiles[i], 'utf8')), function(err, data) {
      jsonArray = currentJSON.Response.Result;
      writeCount++;
      console.log(writeCount);
      converter.json2csv(jsonArray, json2csvCallback);
      };
    };
  };
