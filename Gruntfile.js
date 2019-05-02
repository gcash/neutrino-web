module.exports = function(grunt) {

  // Setup some constants
  var IS_PRODUCTION;

  // Decide if this is the dev or live server
  if ((grunt.cli.tasks.indexOf("live") > -1) ||
      (grunt.option('env') === 'production')) {
    IS_PRODUCTION = true;
  }

  // Read basic info from json files
  var includes = grunt.file.readJSON("includes.json");

  // Initialize the list of CSS files to include
  var cssFiles = [];
  for (var i = 0; i < includes.css.length; i++) {
    cssFiles.push("src/assets/css/" + includes.css[i]);
  }

  // Initialize the list of JS files to include
  var jsFiles = [];
  for (var j = 0; j < includes.js.length; j++) {
    jsFiles.push("src/assets/js/" + includes.js[j]);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Start with a fresh build folder
    clean: ['.build'],

    // Concatonate CSS files
    concat: {
      css: {
        src: cssFiles,
        dest: '.build/_assets/css/styles.css'
      }
    },

    // Minify concatonated CSS file
    cssmin: {
      combine: {
        files: [{
          expand: true,
          src: ['.build/_assets/css/styles.css'],
          ext: '.min.css'
        }]
      }
    },

    // Minify concatonated JS file
    uglify: {
      options: {
        compress: {
          unused: true,
          drop_debugger: true,
          drop_console: true,
          dead_code: true
        },
        mangle: true,
        beautify: false
      },
      build: {
        files: {
          '.build/_assets/js/scripts.min.js': jsFiles
        }
      }
    },

    // Copy the required files to the build directory
    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets',
        src: '**/**',
        dest: '.build/_assets'
      }
    },

    // Build the HTML files from our templates
    assemble: {
      options:{
        layoutdir: 'src/layouts',
        flatten: true,
        layout: 'default.hbs',
        partials: 'src/partials/*.hbs',
        data: 'src/data.yml',
        production: IS_PRODUCTION
      },
      page: {
        files: {
          '.build/index.html':                            ['src/content/home.hbs']
        }
      }
    },

    // Watch for changes
    watch: {
      options: {
        spawn: false
      },
      css: {
        files: ['src/assets/css/**'],
        tasks: ['concat', 'cssmin', 'copy']
      },
      js: {
        files: ['src/assets/js/**'],
        tasks: ['uglify', 'copy']
      },
      images: {
        files: ['src/assets/img/**',
                'src/assets/svg/**'],
        tasks: ['copy']
      },
      content: {
        files: ['src/data.yml',
                'src/content/**',
                'src/layouts/**',
                'src/partials/**'],
        tasks: ['assemble']
      }
    }

  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('live', ['clean', 'concat', 'cssmin', 'uglify', 'assemble', 'copy']);
  return grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'assemble', 'copy', 'watch']);
};