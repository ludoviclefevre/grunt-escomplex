'use strict';

var complexity = require('escomplex-js'),
    async = require('async'),
    fs = require('fs'),

    getAnalyseSources = function (path, callback) {
        fs.readFile(path, function (err, data) {
            if (err) {
                return callback(err);
            }
            var item = {
                path: path,
                code: data
            };
            return callback(null, item);
        });
    },

    escomplex = function (grunt) {
        var output = require('./formats/console')(grunt),
            task = function () {
                var done = this.async(),
                    options = this.options(),
                    complexityOptions = options.complexity,
                    formatOptions = options.format,
                    breakOnErrors = options.breakOnErrors === true;

                async.map(this.filesSrc, getAnalyseSources, function (err, files) {
                    if (err) {
                        return done(err);
                    }
                    var result = complexity.analyse(files, complexityOptions);

                    output.render(result, formatOptions);

                    return done();
                });
            };

        grunt.registerMultiTask('escomplex', 'Code complexity module for Grunt using escomplex.', task);
    };

module.exports = escomplex;
