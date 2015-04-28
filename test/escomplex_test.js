'use strict';

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var grunt = require('grunt'),
    path = require('path');

exports.escomplex = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    maintainableCode: function (test) {
        test.expect(3);
        grunt.util.spawn({
            cmd: 'grunt',
            args: ['--gruntfile', path.join(__dirname, '/fixtures/maintainable-gruntfile.js')]
        }, function (error, output, code) {
            test.ifError(error);
            test.equal(code, 0);

            test.ok(output.stdout.indexOf('Maintainability index: 100'));

            test.done();
        });
    }
};
