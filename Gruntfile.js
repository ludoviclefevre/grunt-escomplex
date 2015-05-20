/*
 * grunt-escomplex
 *
 *
 * Copyright (c) 2015 Ludovic LEFEVRE
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    // Show elapsed time at the end
    require('time-grunt')(grunt);
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'test/*_test.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        jscs: {
            src: [
                '<%= jshint.all %>'
            ]
        },

        // Configuration to be run (and then tested).
        escomplex: {
            default: {
                options: {
                    complexity: {
                        newmi: true
                    },
                    format: {
                        showFunctionDetails: false
                    }
                },
                src: [
                    'tasks/**/*.js'
                ]
            },
            maintainable: {
                options: {
                    complexity: {
                        newmi: true
                    },
                    format: {
                        showFunctionDetails: false
                    }
                },
                src: [
                    'test/fixtures/maintainable.js'
                ]
            }
        },

        mocha_istanbul: {
            coverage: {
                src: 'test'
            },
            coveralls: {
                src: ['test'],
                options: {
                    coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
                    check: {
                        lines: 75,
                        statements: 75
                    },
                    root: '.', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['cobertura', 'lcovonly']
                }
            }
        }

    });

    grunt.event.on('coverage', function (lcov, done) {
        require('coveralls').handleInput(lcov, function (err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['jshint', 'jscs', 'clean', 'mocha_istanbul:coverage', 'escomplex']);

    grunt.registerTask('travis', ['jshint', 'jscs', 'mocha_istanbul:coveralls']);

    // By default, lint and run all tests.
    grunt.registerTask('default', 'test');

};
