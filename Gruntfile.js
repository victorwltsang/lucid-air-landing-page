'use strict';
const grunt = require('grunt');

grunt.initConfig({
	//put somthing here

	pkg: grunt.file.readJSON('package.json'),
	clean: {
		// output: ['ToBeCleaned/*']
		options: {},
		files: ['./js_hint_reports/*.*'],
		folders: ['./js_hint_reports'] // by deleting the forward slash, this tells the clean plugin- this is a folder, delete it
	},

	uglify: {
		development: {
			files: [
				{
					expand: true,
					cwd: './src/js/', // cwd: current working directory
					src: '**/*.js', // src: what to scan
					dest: './dest/js/min.js' // dest: destination folder
				}
			]
		},
		options: {
			mangle: false, // original variable and method names will be renamed to short non-human-readable format
			compress: {
				drop_console: false // will drop console commands from output
			},
			beautify: false // mainly for debugging, the files will compress but will do it in a non-ugly way
		}
	},

	htmlmin: {
		dev: {
			options: {
				removeEmptyAttributes: true,
				removeEmptyElements: false,
				removeRedundantAttributes: true,
				removeComments: true,
				removeOptionalTags: false,
				collapseWhitespace: true
			},
			//files: {'./src/index.min.html': ['./src/*.html']}
			files: [
				{
					expand: true,
					cwd: './src/',
					dest: './dest/',
					src: ['./*.html'], // providing a pattern, indicating the files we care about
					ext: '.html', // providing an output extension for our newly created files
					extDot: 'last' // used to indicate where the period indicating the extension is located (first or last)
				}
			]
		}
	},
	sass: {
		// Task
		dist: {
			// Target
			options: {
				// Target options
				style: 'compressed', // Output style. Can be nested, compact, compressed, expanded.
				trace: true //
			},
			files: {
				// Dictionary ozzf files
				'src/css/main.css': 'src/scss/style.scss' // 'destination': 'source'
			}
		}
	},

	cssmin: {
		min: {
			// configuration for a single file
			options: {
				report: 'min'
			},
			files: {
				'dest/css/min/main.min.css': ['src/css/main.css']
			}
		}
	},
	watch: {
		scripts: {
			files: ['src/js/*.js', 'src/*.html', 'src/scss/**/*.scss'],
			tasks: ['clean', 'uglify', 'htmlmin', 'sass', 'cssmin'],
			options: {
				spawn: false
				// livereload: 1337,
			}
		}
	}
});

// load packages
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');

// register tasks
grunt.registerTask('default', ['clean', 'uglify', 'htmlmin', 'sass', 'cssmin', 'watch']);

// extand
