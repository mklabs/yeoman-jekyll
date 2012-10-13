module.exports = function(grunt) {
  grunt.initConfig(<%= JSON.stringify(config, null, 2) %>);

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('yeoman-jekyll');
};
