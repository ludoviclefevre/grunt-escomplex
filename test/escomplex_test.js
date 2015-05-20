'use strict';

var grunt = require('grunt'),
    path = require('path'),
    assert = require('chai').assert,
    escomplex = require('../tasks/escomplex')(grunt);

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
});
