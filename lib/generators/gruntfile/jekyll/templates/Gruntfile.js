module.exports = function( grunt ) {

  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // this is the paths directories asked during first init
    paths: {<% Object.keys(dirs).forEach(function(dir, i, arr) { %>
      '<%= dir %>': '<%= dirs[dir] %>'<%= (i + 1 === arr.length ? '' : ',')%><% }); %>
    },

    // Add here the Grunt config for each of the tasks you wish to use.

    jekyll: {
      command: 'bundle exec jekyll'
    },

    // todo: implement livereload here
    //
    // watch: {
    //   jekyll: {
    //     files: ['<%= path(dirs.dist, "**") %>'],
    //     task: 'jekyll-help'
    //   }
    // }
  });

  // load the Jekyll specifics tasks
  grunt.loadTasks('./_tasks');

};
