
var path    = require('path');
var spawn   = require('child_process').spawn;
var http    = require('http');
var parse   = require('url').parse;
var request = require('request');

var livereload = 'https://raw.github.com/livereload/livereload-js/master/dist/livereload.js';

module.exports = function(grunt) {

  // Override yeoman's server task to run `jekyll` instead.
  //
  // With default config in `_config.yml`, both server & auto should be turned
  // on. Jekyll will generate the website & spawn a local server on port 4000.
  // `auto` is here to watch for changes and regenerate if necessary.
  grunt.registerTask('server', 'jekyll:config jekyll:server watch:jekyll');

  // actual server task
  grunt.registerTask('jekyll:server', 'Jekyll server task', function() {
    var jekyll = grunt.util.spawn({
      cmd: 'jekyll'
    }, function(err, out, code) {
      if(err && code !== 0) {
        console.error(out.stdout);
        process.exit(0);
      }

      cb(err);
    });

    jekyll.stdout.pipe(process.stdout);
    jekyll.stderr.pipe(process.stderr);
  });

  // ensure proper config in Gruntfile. Case there are no config for jekyll, setup defaults
  grunt.registerTask('jekyll:config', function() {
    var watch = grunt.config('watch.jekyll');
    // already configured, noop.
    if(watch) return;

    grunt.config('watch.jekyll', {
      files: ['_site/**/*'],
      tasks: 'reload'
    });

    var server = http.createServer(function(req, res) {
      var url = parse(req.url);
      if(url.pathname === '/livereload.js') {
        return request(livereload).pipe(res);
      }

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end();
    });

    var port = grunt.config('server.port') || 35729;

    // ensure proper instantiation of the reactor object
    var reactor = grunt.helper('reload:reactor', {
      server: server,
      apiVersion: '1.7',
      host: grunt.config('server.hostname') || grunt.config('server.host') || 'localhost',
      port: grunt.config('server.port') || 35729
    });

    server.listen(port, function() {
      grunt.log.ok('LiveReload server listening on ' + port);
    });
  });

  // Build stuff (todo move in build.js)
  grunt.renameTask('build', 'ybuild');

  var base;
  grunt.registerTask('build', 'jekyll aware build command', function() {
    // copy -> noop, done by jekyll compile
    base = process.cwd();
    grunt.registerTask('mkdirs', 'jekyll:build');
    grunt.task.run('ybuild');
  });

  grunt.registerTask('jekyll:build', 'Runs a jekyll compile step', function() {
    var yeoman = grunt.config('yeoman');

    grunt.config('base', process.cwd());

    var cb = this.async();
    var jekyll = grunt.util.spawn({
      cmd: 'jekyll',
      args: [yeoman.app, yeoman.temp, '--no-server', '--no-auto']
    }, function(err, out, code) {
      if(err && code !== 0) {
        console.error(out.stdout);
        process.exit(0);
      }

      process.chdir(path.resolve(yeoman.temp));
      cb(err);
    });

    jekyll.stdout.pipe(process.stdout);
    jekyll.stderr.pipe(process.stderr);
  });

};
