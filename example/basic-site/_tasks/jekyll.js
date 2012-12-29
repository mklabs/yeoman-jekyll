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
      grunt.log.writeln('...' + this.name + '...');

      options = _.defaults(grunt.config(this.name) || {}, options, {
        command: 'bundle exec jekyll'
      });

      var args = Array.isArray(options.command) ? options.command : options.command.split(' ');
      var cmd = args.shift();

      grunt.log.writeln('... Executing ' + cmd + ' ' + args.join(' ') + '...');
      var done = this.async();
      spawn(cmd, args, options).on('exit', function(code) {
        if(code) {
          grunt.log.error('Error executing ' + cmd + ' (code: ' + code + ')');
          return done(false);
        }

        return done();
      });
    };
  }

  function spawn(cmd, args, options) {
    var proc = child.spawn(cmd, args, options);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    return proc;
  }

};
