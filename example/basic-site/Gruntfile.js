module.exports = function( grunt ) {

  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // this is the paths directories asked during first init
    paths: {
      'app': './',
      'dist': '_site/',
      'scripts': 'scripts/',
      'styles': 'stylesheets/',
      'temp': 'temp/',
      'vendor': './vendor'
    },

    // Add here the Grunt config for each of the tasks you wish to use.

    jekyll: {
      command: 'bundle exec jekyll'
    },

    // todo: implement livereload here
    //
    // watch: {
    //   jekyll: {
    //     files: ['_site/**'],
    //     task: 'jekyll-help'
    //   }
    // }
  });

  // load the Jekyll specifics tasks
  grunt.loadTasks('./_tasks');

};
