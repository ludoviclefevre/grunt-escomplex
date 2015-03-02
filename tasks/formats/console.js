'use strict';

module.exports.format = format;

function format(report) {
    return 'Maintainability index: ' + report.maintainability;
}
