'use strict';

var complexity = require('escomplex-js'),
    async = require('async'),
    fs = require('fs'),
    output = require('./formats/console'),
    getAnalyseSources = function (path, callback) {
        fs.readFile(path, function(err, data) {
            var item = {
                path: path,
                code: data
            };
            callback(null, item);
        });
    },
    escomplex = function (grunt) {
        var task = function () {
            var done = this.async(),
                options = this.options(),
                complexityOptions = options.complexity,
                formatOptions = options.format;

            async.map(this.filesSrc, getAnalyseSources, function(err, files) {
                var result = complexity.analyse(files, complexityOptions),
                    outputMessage = output.format(result, formatOptions);
                grunt.log.writeln(outputMessage);
                done();
            });
        };

        grunt.registerMultiTask('escomplex', 'Code complexity module for Grunt using escomplex.', task);

    };

module.exports = escomplex;
