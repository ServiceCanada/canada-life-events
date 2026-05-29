module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),

		clean: {
			dist: [ "dist" ]
		},

		uglify: {
			options: {
				banner: "/*!\n * Canada.ca life events / Événements de la vie pour Canada.ca\n" +
				" * @license https://github.com/ServiceCanada/canada-life-events?tab=License-1-ov-file\n" +
				" * v<%= pkg.version %> - " + "<%= grunt.template.today('yyyy-mm-dd') %>\n*/"
			},

			dist: {
				files: {
					"dist/life-events.min.js": [ "src/life-events.js" ]
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					"dist/life-events.min.css": [ "src/life-events.css" ]
				}
			}
		},

		usebanner: {
			taskName: {
				options: {
					position: "top",
					banner: "/*!\n * Canada.ca life events / Événements de la vie pour Canada.ca\n" +
					" * @license https://github.com/ServiceCanada/canada-life-events?tab=License-1-ov-file\n" +
					" * v<%= pkg.version %> - " + "<%= grunt.template.today('yyyy-mm-dd') %>\n*/",
					linebreak: true
				},
				files: {
					src: [ "dist/life-events.min.css" ]
				}
			}
		},

		htmllint: {
			all: {
				options: {
					ignore: [

						// Errors
						"Non-space characters found without seeing a doctype first. Expected “<!DOCTYPE html>”.",
						"Element “head” is missing a required instance of child element “title”.",

						// Errors caused by Jekyll/Liquid logic
						"Stray end tag “h1”.",
						"Text not allowed in element “ul” in this context.",
						"Bad value “{{ example.path }}” for attribute “href” on element “a”: Illegal character in path segment: “{” is not allowed.",
						"Bad value “{{ example.language }}” for attribute “lang” on element “a”: Subtags must not exceed 8 characters in length.",

						// Info messages
						"Consider adding a “lang” attribute to the “html” start tag to declare the language of this document.",
						"This document appears to be written in English. Consider adding “lang=\"en\"” (or variant) to the “html” start tag.",
						"This document appears to be written in French. Consider adding “lang=\"fr\"” (or variant) to the “html” start tag.",
						"Trailing slash on void elements has no effect and interacts badly with unquoted attribute values."
					]
				},
				src: [
					"*.html",
					"{_layouts,pages}/**/*.html"
				]
			}
		},

		eslint: {
			options: {
				overrideConfigFile: "eslint.config.mjs"
			},
			target: [ "Gruntfile.js", "src/life-events.js", "eslint.config.mjs", "stylelint.config.mjs" ]
		},

		stylelint: {
			options: {
				overrideConfigFile: "stylelint.config.js"
			},
			target: [ "src/life-events.css" ]
		},

		lintspaces: {
			all: {
				src: [
					"*",
					"{_layouts,assets,pages,src}/**/*",
					"!**/*.png"

					// TODO: Exclude JS files once ESLint's settings fully match lintspaces (i.e. enforcing trailing spaces and final newline)
				],
				options: {
					editorconfig: ".editorconfig",
					indentationGuess: true
				}
			}
		}
	} );

	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-banner" );
	grunt.loadNpmTasks( "grunt-html" );
	grunt.loadNpmTasks( "grunt-eslint" );
	grunt.loadNpmTasks( "grunt-stylelint" );
	grunt.loadNpmTasks( "grunt-lintspaces" );

	// Task to fix line endings after minification
	grunt.registerTask( "fixLineEndings", function( ) {
		let content = grunt.file.read( "dist/life-events.min.css" );
		content = content.replace( /\r\n?/g, "\n" );
		grunt.file.write( "dist/life-events.min.css", content );
	} );

	grunt.registerTask( "default", [ "clean", "htmllint", "eslint", "stylelint", "lintspaces", "uglify", "cssmin", "usebanner", "fixLineEndings" ] );
};
