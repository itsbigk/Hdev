module.exports = function(grunt) {

  // configuring tasks with plugins
  grunt.initConfig({
    nodemon : {
      dev : {
        script : 'server.js'
      }
    },

    uglify : {
      build : {
        files : {
          //' the minification destination' : 'source files'
          // 'dist/app.min.js' : ['/public/js/app.js']
        }
      }
    },

    // helping with minification for angular files
    ngAnnotate : {
      options : {
        // turning all double quotes into single quotes
        singleQuotes : true
      },
      ngapp : {
        files : {
          // the directory where you want to save the annotated file will more than likely be the same place as the original
          // 'directory you want to save the annotated file' : ['source of the angular file you want to annotate']
        }
      }
    }

  });

  // loading tasks
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngAnnotate');

  // setting default to load the server with nodemon
  // everything needs to be before nodemon if it is a dev task
  // ngAnnotate needs to be before uglify or else the files will not be minified correctly
  grunt.registerTask('default', ['uglify', 'nodemon']);
}
