'use strict';

module.exports.format = format;

function format(result, options) {
    return result.reports.reduce(function (formatted, report) {
        return formatted + formatModule(report, options) + '\n\n';
    }, formatProject(result));
}
