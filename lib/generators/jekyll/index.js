
var util       = require('util');
var Gruntfile  = require('./gruntfile');

module.exports = Generator;

// Yeoman generator for @necolas' Jekyll Boilerplate.

//
// This generator simply fetch the latest state of jekyll-boilerplate's master
// (unless the content is already cached by yeoman at
// `~/.yeoman/cache/necolas/jekyll-boilerplate)`
//

function Generator(args, options, config) {
  Gruntfile.apply(this, arguments);

  this.argument('location', {
    defaults: '.'
  });
}

util.inherits(Generator, Gruntfile);

Generator.prototype.fetchBoilerplate = function() {
  var cb = this.async();
  var out = this.location;

  this.remote('necolas', 'jekyll-boilerplate', function(err, remote) {
    if(err) return cb(err);
    remote.directory('.', out);
    cb();
  });
};

Generator.prototype.copyTasks = function() {
  this.directory('tasks', 'tasks');
};

Generator.prototype.generateGruntfile = function() {
  this.gruntfile({
    server: {
      port: 4000
    }
  });
};

