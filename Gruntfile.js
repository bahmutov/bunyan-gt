/* global module */
module.exports = function (grunt) {
  module.require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'nice-package': {
      all: {
        options: {
          blankLine: true
        }
      }
    },

    jshint: {
      'options': {
        jshintrc: '.jshintrc',
        reporter: require('jshint-summary')
      },
      default: {
        'src': [ '*.js', 'example/*.js' ]
      }
    },

    watch: {
      options: {
        atBegin: true
      },
      all: {
        files: ['*.js', 'example/*.js'],
        tasks: ['jshint', 'test']
      }
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['deps-ok', 'nice-package', 'jshint']);
};
