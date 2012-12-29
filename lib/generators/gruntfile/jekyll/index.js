
var fs      = require('fs');
var util    = require('util');
var path    = require('path');
var dirname = path.dirname;
var _       = require('underscore');

var JekyllBase  = require('../../jekyll-base');

module.exports = Generator;

function Generator() {
  JekyllBase.apply(this, arguments);

  this.dirs = fs.readdirSync(path.join(__dirname, 'dirs'));
}

util.inherits(Generator, JekyllBase);

// Asks the user for different key directory value. This inclue stuff like SASS
// or CSS directory, JS directory, etc.
Generator.prototype.ask = function() {
  this.log.writeln()
    .writeln('Asking for directory structure...')
    .writeln('Directories: ' + this.dirs.join(' '));

  var prompts = this.dirs.map(function(dir) {
    var usage = path.join(__dirname, 'dirs', dir);

    var msg = this.exists(usage) ? this.read(usage) : '';
    var defaults = (msg.match(/Defaults to `([^`]+)`/) || [])[1];

    return {
      name: dir,
      message: 'Directory - ' + dir + '',
      default: defaults || this.path(dir),
      warning: msg
    };
  }, this);

  var cb = this.async();
  var self = this;
  this.prompt(prompts, function(err, results) {
    if(err) return cb(err);
    self.dirs = results;
    cb();
  });
};

Generator.prototype.generateGruntfile = function generateGruntfile() {
  this.template('Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype.tasks = function tasks() {
  this.directory('tasks', '_tasks');
};
