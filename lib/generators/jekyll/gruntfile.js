
var util       = require('util');
var generators = require('yeoman-generators');

module.exports = Gruntfile;

function Gruntfile(args, options, config) {
  generators.Base.apply(this, arguments);
}

util.inherits(Gruntfile, generators.NamedBase);

// XXX invoke as hook. move as `jekyll:gruntfile`
Gruntfile.prototype.gruntfile = function(config) {
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
