'use strict';

var complexity = require('escomplex-js'),
    async = require('async'),
    output = require('./formats/console'),
    escomplex = function (grunt) {

        var task = function () {

            var done = this.async(),
                complexityOptions = this.options(),

                analyseFile = function (filepath, callback) {
                    var result = complexity.analyse(filepath, complexityOptions),
                        outputMessage = [
                            "\r\n",
                            filepath,
                            ": ",
                            "\r\n",
                            output.format(result),
                            "\r\n"
                        ];

                    grunt.log.writeln(outputMessage.join(''));
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
        };

        grunt.registerMultiTask('escomplex', 'Code complexity module Grunt using escomplex.', task);

    };

module.exports = escomplex;
