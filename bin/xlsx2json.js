#!/usr/bin/env node


var program = require('commander');

program
  .version('0.0.1')
  .usage('<file ...>')
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('You need to specify a filename.');
  process.exit(1);
}

var filename = program.args[0];
console.log(program.args);
