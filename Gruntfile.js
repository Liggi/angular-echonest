module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['src/app.js', 'src/**/*.js', 'src/javascripts/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      sass: {
        files: ['src/stylesheets/application.sass', 'src/stylesheets/**/*.sass'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/stylesheets/application.css': 'src/stylesheets/application.sass'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'src/javascripts/vendor/jquery.js',
          'src/javascripts/vendor/angular.js',
          'src/javascripts/vendor/angular-route.js',
          'src/javascripts/vendor/stupidtable.js',
          'src/app.js',
          'src/controllers/*.js',
          'src/directives/*.js'
          ],
        dest: 'public/app.js',
      },
    },
    uglify: {
      target: {
        files: {
          'public/app.min.js': [
            'src/javascripts/vendor/jquery.js',
            'src/javascripts/vendor/angular.js',
            'src/javascripts/vendor/angular-route.js',
            'src/javascripts/vendor/stupidtable.js',
            'src/app.js',
            'src/controllers/*.js',
            'src/directives/*.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);

};