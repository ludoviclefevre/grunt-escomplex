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

    /*
    it('should return a maintainability index of 100 for a maintainable script, in lib mode.', function (done) {
        var options = {
            testStart: {},
            testEnd: {},
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
                    __dirname + 'fixtures/maintainable.js'
                ]
            }
        };
        grunt.initConfig(options);

        grunt.registerTask('testStart', 'A test task', function () {
            grunt.log.writeln('testStart');
            return true;
        });

        grunt.registerTask('testEnd', 'A test task', function () {
            grunt.log.writeln('coucou');
            done();
        });
        //grunt.registerTask('toto', ['testEnd']);
        grunt.log.writeln('tata');

        grunt.task.run('testStart', 'testEnd');
    });
*/
});
