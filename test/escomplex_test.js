'use strict';

var grunt = require('grunt'),
    path = require('path'),
    assert = require('chai').assert;

describe('grunt-escomplex', function () {
    it('should return a maintainability index of 100 for a maintainable script, in console mode.', function (done) {
        grunt.util.spawn({
            cmd: 'grunt',
            args: ['--gruntfile', path.join(__dirname, '/fixtures/maintainable-gruntfile.js')]
        }, function (error, output, code) {
            assert.isNull(error);
            assert.equal(code, 0);
            assert.include(output.stdout, 'Maintainability index: 100');
            done();
        });
    });

    it('should return a maintainability index of 100 for a maintainable script, in lib mode.', function (done) {
        var options = {
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
                    __dirname + '/maintainable.js'
                ]
            }
        };

        grunt.registerTask('testEnd', 'A test task', function () {

            done();
        });
        grunt.registerTask('default', ['escomplex', 'testEnd']);

        grunt.initConfig(options);
        grunt.task.run('default');
    });

    it('should return a maintainability index of 100 for a maintainable script, in console mode.', function (done) {
        grunt.util.spawn({
            cmd: 'grunt',
            args: ['--gruntfile', path.join(__dirname, '/fixtures/maintainable-gruntfile.js')]
        }, function (error, output, code) {
            assert.isNull(error);
            assert.equal(code, 0);
            assert.include(output.stdout, 'Maintainability index: 100');
            done();
        });
    });

    it('should return a maintainability index of  for a not maintainable script, in console mode.', function (done) {
        grunt.util.spawn({
            cmd: 'grunt',
            args: ['--gruntfile', path.join(__dirname, '/fixtures/notMaintainable/notMaintainable-gruntfile.js')]
        }, function (error, output, code) {
            assert.isNull(error);
            assert.equal(code, 0);
            assert.include(output.stdout, 'Maintainability index: 100');
            done();
        });
    });
});
