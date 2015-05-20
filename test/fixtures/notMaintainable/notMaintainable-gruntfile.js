module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        escomplex: {
            options: {
                complexity: {
                    logicalor: true,
                    switchcase: true,
                    forin: false,
                    trycatch: false,
                    newmi: true
                },
                format: {
                    showFunctionDetails: false
                }
            },
            src: [
                __dirname + '/notMaintainable.js'
            ]
        }
    });

    grunt.loadTasks(__dirname + '/../../../tasks');

    grunt.registerTask('default', 'escomplex');
};
