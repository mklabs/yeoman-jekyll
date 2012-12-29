var child = require('child_process');
module.exports = function(grunt) {

  var util = grunt.util || grunt.utils;
  var _ = util._;

  grunt.registerTask('jekyll', 'Compile jekyll with default config (in _config.yml)', task({
    command: 'bundle exec jekyll'
  }));

  grunt.registerTask('jekyll-compile', 'Runs jekyll in no-server mode, compiling to _site', task({
    command: 'bundle exec jekyll --no-server --no-auto'
  }));
  grunt.registerTask('jekyll-help', 'Outputs Jekyll help output', task({
    command: 'bundle exec jekyll --help'
  }));

  function task(options) {
    options = options || {};
    return function() {

    };
  }

  function spawn(cmd, args, options) {
    var proc = child.spawn(cmd, args, options);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    return proc;
  }

};
