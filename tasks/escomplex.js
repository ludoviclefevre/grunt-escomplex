/*
 * grunt-escomplex
 *
 *
 * Copyright (c) 2015 Ludovic LEFEVRE
 * Licensed under the MIT license.
 */

'use strict';

var complexity = require('escomplex-js'),
    async = require('async'),
    escomplex = function (grunt) {
        // Please see the Grunt documentation for more information regarding task
        // creation: http://gruntjs.com/creating-tasks

        var task = function () {

            var done = this.async(),

                complexityOptions = {
                    newmi: true
                },

                analyseFile = function (filepath, callback) {
                    var result = complexity.analyse(filepath, complexityOptions);
                    console.log(filepath + ': ' + result.maintainability);
                    //console.log(result);
                    callback();
                },

                getFilteredFiles = function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                },

                filter = function (file, callback) {
                    var sources = file.src.filter(getFilteredFiles);
                    async.each(sources, analyseFile, callback);
                };

            async.each(this.files, filter, done);

            /*
             // Merge task-specific and/or target-specific options with these defaults.
             var options = this.options({
             punctuation: '.',
             separator: ', '
             });

             // Iterate over all specified file groups.
             this.files.forEach(function (file) {
             // Concat specified files.
             var src = file.src.filter(function (filepath) {
             // Warn on and remove invalid source files (if nonull was set).
             if (!grunt.file.exists(filepath)) {
             grunt.log.warn('Source file "' + filepath + '" not found.');
             return false;
             } else {
             return true;
             }
             }).map(function (filepath) {
             // Read file source.
             return grunt.file.read(filepath);
             }).join(grunt.util.normalizelf(options.separator));

             // Handle options.
             src += options.punctuation;

             // Write the destination file.
             grunt.file.write(file.dest, src);

             // Print a success message.
             grunt.log.writeln('File "' + file.dest + '" created.');
             });
             */
        };

        grunt.registerMultiTask('escomplex', 'Code complexity module Grunt using escomplex.', task);

    };

module.exports = escomplex
