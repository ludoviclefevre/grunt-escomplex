'use strict';

function formatModule() {
    return '';
}

function formatProject() {
    return '';
}

function format(result, options) {
    return result.reports.reduce(function (formatted, report) {
        return formatted + formatModule(report, options) + '\n\n';
    }, formatProject(result));
}

module.exports.format = format;

