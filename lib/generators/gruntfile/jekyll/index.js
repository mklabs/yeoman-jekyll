
var util        = require('util');
var path        = require('path');
var dirname     = path.dirname;
var JekyllBase  = require('../../jekyll-base');
var _           = require('underscore');

module.exports = Generator;

function Generator() {
  JekyllBase.apply(this, arguments);
}

util.inherits(Generator, JekyllBase);

Generator.prototype.scan = function() {

  this.log.writeln().write('Scanning the directory structure...');

  // Figure out each one of this directories
  //
  // First, try to locate JavaScript files (or .coffee)
  //
  // Then, do the same for styles files, looking up .css, .scss, .sass files
  // (add .stylus, .less?)
  //
  // Compute each dirname, if only one, then assume this is the right place.
  // Otherwise, ask.
  var dirs = ['app', 'temp', 'dist', 'scripts:**/*.{js,coffee}', 'styles:**/*.{css,scss,sass}', 'vendor', 'images:**/*.{png,jpg,jpeg,gif}'].map(function(name) {
    var parts = name.split(':');
    var pattern = parts[1];
    var files = !pattern ? [] : this.expandFiles(pattern)
      .filter(ignores('node_modules'))
      .filter(ignores('_site'))
      .filter(ignores('Gruntfile.js'))
      .filter(ignores('grunt.js'));

    var dirs = _.chain(files).map(dirname).uniq().value();

    return {
      name: parts[0],
      files: files,
      dirs: dirs,
      detected: dirs.length === 1 ? dirs[0] : false
    };
  }, this);

  this.log.ok().writeln();

  var prompts = dirs.map(function(dir) {
    var usage = path.join(__dirname, 'dirs', dir.name);

    var msg = this.exists(usage) ? this.read(usage) : '';
    if(dir.detected) {
      msg += '\nWe have detected the following directory as a good candidate: ';
      msg += dir.detected;
      msg += '\nFiles:\n - ' + this.log.wordlist(dir.files, {
        separator: '\n - '
      });
    }

    return {
      name: dir.name,
      message: 'Directory - ' + dir.name + '',
      default: dir.detected || this.path(dir.name),
      warning: msg
    };
  }, this);

  var cb = this.async();
  var self = this;
  this.prompt(prompts, function(err, results) {
    if(err) return cb(err);
    self.log.writeln().write('Writing local .yeomanrc file with following values: ');
    var str = JSON.stringify(results, null, 2);
    console.log(str);
    console.log();
    self.write('.yeomanrc', str + '\n');
    cb();
  });
};

Generator.prototype.generateJekyllBase = function() {
  this.template('Gruntfile.js', 'Gruntfile.js', {
    test_framework: ''
  });
};

function ignores(dir) { return function(f) {
  return !f.match(dir);
}}
