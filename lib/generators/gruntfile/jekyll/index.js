
var util        = require('util');
var JekyllBase  = require('../../jekyll-base');

module.exports = Generator;

function Generator() {
  JekyllBase.apply(this, arguments);
}

util.inherits(Generator, JekyllBase);

Generator.prototype.generateJekyllBase = function() {
  this.gruntfile({
    server: {
      port: 4000
    }
  });
};
