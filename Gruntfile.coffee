module.exports = (grunt) ->

  files = ['passcode.coffee']

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    watch:

      coffee:
        files: files
        tasks: ['default']

    coffee:
      build:
        options:
          join: true
        files:
          'build/passcode.js': files

    uglify:
      production:
        files: 'build/passcode.min.js': ['build/passcode.js']

    clean:
      js: ['build/passcode.js', 'build/passcode.min.js']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'build:development', ['coffee:build']
  grunt.registerTask 'build:production', ['coffee:build', 'uglify:production']
  grunt.registerTask 'default', ['build:production']
