
var path       = require('path');
var util       = require('util');
var JekyllBase = require('../../jekyll-base');

module.exports = Generator;

function Generator() {
  JekyllBase.apply(this, arguments);

  this.argument('title', {
    type: Array,
    desc: 'List of category name to build the prefix above the _post directory'
  });

  this.option('prefix', {
    defaults: '',
    desc: 'Specifiy a set of categories above the _posts directory.'
  });

  this.option('categories', {
    defaults: '',
    desc: 'Same as prefix.'
  });

  this.option('category', {
    defaults: '',
    desc: 'Same as categories.'
  });
}

util.inherits(Generator, JekyllBase);

Generator.prototype.createSomething = function() {
  var filename = this.title.join('-').toLowerCase();
  var d = new Date();
  filename = [d.getFullYear(), d.getMonth() + 1, d.getDate(), filename + '.md'].join('-');

  p = this.options.prefix || this.options.categories || this.options.category;
  p = path.basename(p) === '_posts' ? path.dirname(p) : p;
  this.title = this.title.join(' ');
  this.template('post.md', path.join(p, '_posts', filename));
};
