
var path       = require('path');
var util       = require('util');
var cheerio    = require('cheerio');
var generators = require('yeoman-generators');

module.exports = JekyllBase;

function JekyllBase(args, options, config) {
  generators.Base.apply(this, arguments);
}

util.inherits(JekyllBase, generators.NamedBase);

// XXX invoke as hook. move as `jekyll:gruntfile`
JekyllBase.prototype.gruntfile = function(config) {
  var grunt = this.findup('.', 'JekyllBase.js');

  if(grunt) {
    // deal with existing
    return console.log('deal existing');
  }

  this.template('gruntfile.js', 'gruntfile.js', {
    config: config
  });
};

// theme handler, lookup for styles, javascripts *.md and *.html. index.html is
// renamed to <theme-name>.html (to keep original index.html around). Then
// process `template` argument provided with `{ scripts: [], styles: [] }`.
JekyllBase.prototype.handleTheme = function(basedir, template) {
  var self = this;
  // figure out the styles
  var styles = self.expandFiles(path.join(basedir, '**/*.{css,scss,sass,less,stylus}')).map(function(f) {
    return path.relative(basedir, f);
  });

  // and scripts
  var scripts = self.expandFiles(path.join(basedir, '**/*.{js,coffee}')).map(function(f) {
    return path.relative(basedir, f);
  });

  // now process layout template prepared before
  self.template(template, template, {
    scripts: scripts,
    styles: styles
  });

  // finally copy assets from themes, and the basic html as <name>.html (to
  // keep index.html around)
  styles.forEach(function(s) {
    self.copy(path.join(basedir, s), s);
  });

  scripts.forEach(function(s) {
    self.copy(path.join(basedir, s), s);
  });

  var readmes = self.expandFiles(path.join(basedir, '{README,readme}.{md,markdown,mkd}')).map(function(f) {
    return path.relative(basedir, f);
  });

  var htmls = self.expandFiles(path.join(basedir, '*.html')).map(function(f) {
    return path.relative(basedir, f);
  });

  readmes.concat(htmls).forEach(function(f) {
    var basename = path.basename(f);

    var out = basename === 'index.html' ?
      path.join(path.dirname(f), path.basename(basedir) + '.html') :
      f;

    self.copy(path.join(basedir, f), out);
  });
};


// Cheerio API helper

var Cheerio = {};
Cheerio.html = function(body) {
  if(!body && this.body) {
    return this.body;
  }

  this.body = body;
  this.$ = cheerio.load(this.body);
  return this;
};

Cheerio.append = function(selector) {
  var contents = Array.prototype.slice.call(arguments, 1);
  return this.replace(selector, contents, 'append');
};

Cheerio.prepend = function(selector) {
  var contents = Array.prototype.slice.call(arguments, 1);
  return this.replace(selector, contents, 'prepend');
};

Cheerio.replace = function(selector, contents, mode) {
  var html = this.html();
  var append = mode === 'append';
  var prepend = mode === 'prepend';

  var tag = '<' + (append ? '/' : '') + selector +'>';
  var r = new RegExp('(\\s*)' + tag, 'g');

  html = html.replace(r, function(m, padding) {
    padding = padding.replace(/\n/g, '');
    var res = contents.map(function(content) {
      content = content.replace(/\n$/, '');
      return '\n' + content.split('\n').map(function(l) {
        return padding + '    ' + l.replace(/\s*$/g, '');
      }).join('\n');
    }).join('\n');

    if(append) {
      res = res + '\n' + padding + tag;
    }

    if(prepend) {
      res = '\n' + padding + tag + res;
    }

    return res;
  });

  this.html(html);
  return this;
};

// On gruntfile prototype, to avoid running when generator is invoked
JekyllBase.prototype.cheerio = function(html) {
  var ch = Object.create(Cheerio);
  return ch.html(html);
};


