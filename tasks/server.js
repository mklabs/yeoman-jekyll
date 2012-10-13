
var spawn = require('child_process').spawn;

module.exports = function(grunt) {

  // Override yeoman's server task to run `jekyll` instead.
  //
  // With default config in `_config.yml`, both server & auto should be turned
  // on. Jekyll will generate the website & spawn a local server on port 4000.
  // `auto` is here to watch for changes and regenerate if necessary.
  grunt.registerTask('server', 'Jekyll server task', function() {
    console.log('server-->', this, arguments);

    var cb = this.async();
    var jekyll = grunt.util.spawn({
      cmd: 'jekyll'
    }, function() {
      console.log('done?', arguments);
      cb();
    });

    jekyll.stdout.pipe(process.stdout);
    jekyll.stderr.pipe(process.stderr);
  });
};
