
var util       = require('util');
var generators = require('yeoman-generators');

module.exports = Generator;

function Generator(args, options, config) {
  generators.Base.apply(this, arguments);

  this.argument('location', {
    defaults: '.'
  });
}

util.inherits(Generator, generators.NamedBase);

// XXX invoke as hook. move as `jekyll:gruntfile`
Generator.prototype.gruntfile = function(config) {
  console.log('generate gruntfile...', config);
  var grunt = this.findup('.', 'Gruntfile.js');

  if(grunt) {
    // deal with existing
    return console.log('deal existing');
  }

  var body = this.template('gruntfile.js', 'Gruntfile.js', {
    config: config
  });

  console.log(body);
};
