
var fs          = require('fs');
var path        = require('path');
var util        = require('util');
var JekyllBase  = require('../jekyll-base');

module.exports = Generator;

// Yeoman generator for @necolas' Jekyll Boilerplate.

//
// This generator simply fetch the latest state of jekyll-boilerplate's master
// (unless the content is already cached by yeoman at
// `~/.yeoman/cache/necolas/jekyll-boilerplate)`
//

function Generator(args, options, config) {
  JekyllBase.apply(this, arguments);

  // setup our own options defaults
  this.options.themes = this.options.themes || [
    "orderedlist/modernist",
    "orderedlist/minimal",
    "mattgraham/Midnight",
    "jsncostello/slate",
    "mattgraham/Leap-Day",
    "jonrohan/time-machine-theme",
    "cameronmcefee/merlot",
    "broccolini/dinky",
    "tactile"
  ];

  this.argument('location', {
    defaults: '.'
  });

  var themes = this.options.themes;

  this.option('theme', {
    defaults: this.options.theme || 'tactile',
    desc: 'Choose a theme from the following GitHub page templates:\n  - ' + themes.join('\n  - ')
  });

  this.destinationRoot(this.location);

  this.hookFor('gruntfile');
}

util.inherits(Generator, JekyllBase);

Generator.prototype.ask = function configyml() {
  var done = this.async();

  var prompts = [{
    name: 'baseurl',
    default: '/',
    warning: 'This is the baseurl value used with _config.yml and within templates to prefix assets path'
  }];

  var self = this;
  this.prompt(prompts, function(err, res) {
    if(err) return done(err);
    self.baseurl = res.baseurl;
    done();
  });
};

Generator.prototype.fetchBoilerplate = function() {
  var cb = this.async();

  this.remote('necolas', 'jekyll-boilerplate', function(err, remote) {
    if(err) return cb(err);
    remote.directory('.', '.');
    cb();
  });
};

// Config files creation
Generator.prototype.configfiles = function configfiles() {
  this.template('_config.yml');
  this.template('Gemfile');
};


// in this step, we remove the default `_layouts/default.html` file from the
// file system to avoid collision, but keep the content as a base layout.
//
// We had few underscore template marker to be able to generate dynamic
// stylesheets / javascripts from different themes.
Generator.prototype.updateLayout = function() {
  var layout = path.resolve('_layouts/default.html');
  var body = this.read(layout);

  // update the content
  // this.cheerio(str).$ -> reference to cheerio obj

  var html = this.cheerio(body)
    // append for each snippet on styles config
    .append('head', this.read('styles.snippet.html'))
    .append('body', this.read('scripts.snippet.html'))
    .html();

  // using standard fs to avoid collision
  fs.writeFileSync(layout, html);
};

Generator.prototype.theme = function() {
  if(!~this.options.themes.indexOf(this.options.theme)) {
    this.emit('error', new Error('Invalid template theme: ' + this.options.theme));
  }

  var layout = '_layouts/default.html';

  // tactile theme is built-in (repo on github?)
  if(this.options.theme === 'tactile') {
    return this.handleTheme(path.join(this.sourceRoot(), 'tactile'), layout);
  }

  var parts = this.options.theme.split('/');
  var cb = this.async();
  var self = this;
  this.remote(parts[0], parts[1], function(err, remote) {
    if(err) return cb(err);
    self.handleTheme(remote.cachePath, layout);
    cb();
  });
};
