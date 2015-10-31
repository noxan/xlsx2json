#!/usr/bin/env node


var program = require('commander');
var xlsx = require('xlsx');
var fs = require('fs');


program
  .version('0.0.1')
  .usage('<file ...>')
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('You need to specify a filename.');
  process.exit(1);
}

var filename = program.args[0];

console.log('Loading file', filename + '...');

var workbook = xlsx.readFile(filename);

var sheetnames = workbook.SheetNames;

console.log('Parsed the following sheets:', sheetnames.join(', '));

sheetnames.forEach(function (sheetname) {
  var worksheet = workbook.Sheets[sheetname];
  var result = xlsx.utils.sheet_to_json(worksheet);

  var targetfile = filename.replace('.xlsx', '').toLowerCase() + '-' + sheetname.toLowerCase() + '.json';

  fs.writeFile(targetfile, result, function (err) {
    if(err) {
      console.error(err);
    } else {
      console.log('Converted file and saved as', targetfile);
    }
  });
});
