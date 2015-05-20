'use strict';

function formatProject(result) {
    return [
        'Project summary: \n',
        'Mean per-function logical LOC: ', result.loc, '\n',
        'Mean per-function parameter count: ', result.params, '\n',
        'Mean per-function cyclomatic complexity: ', result.cyclomatic, '\n',
        'Mean per-function Halstead effort: ', result.effort, '\n',
        'Mean per-module maintainability index: ', result.maintainability, '\n',
        'First-order density: ', result.firstOrderDensity, '%\n',
        'Change cost: ', result.changeCost, '%\n',
        'Core size: ', result.coreSize, '%\n\n'
    ].join('');
}

function formatFunction(report) {
    return [
        '  Function: ', report.name, '\n',
        '    Line No.: ', report.line, '\n',
        '    Physical LOC: ', report.sloc.physical, '\n',
        '    Logical LOC: ', report.sloc.logical, '\n',
        '    Parameter count: ', report.params, '\n',
        '    Cyclomatic complexity: ', report.cyclomatic, '\n',
        '    Cyclomatic complexity density: ', report.cyclomaticDensity, '%\n',
        '    Halstead difficulty: ', report.halstead.difficulty, '\n',
        '    Halstead volume: ', report.halstead.volume, '\n',
        '    Halstead effort: ', report.halstead.effort
    ].join('');
}

function formatFunctions(report) {
    return report.reduce(function (formatted, r) {
        return formatted + '\n\n' + formatFunction(r);
    }, '');
}

function formatModule(report, options) {
    var message = [
        'File summary: \n',
        report.path, '\n\n',
        '  Physical LOC: ', report.aggregate.sloc.physical, '\n',
        '  Logical LOC: ', report.aggregate.sloc.logical, '\n',
        '  Mean parameter count: ', report.params, '\n',
        '  Cyclomatic complexity: ', report.aggregate.cyclomatic, '\n',
        '  Cyclomatic complexity density: ', report.aggregate.cyclomaticDensity, '%\n',
        '  Maintainability index: ', report.maintainability, '\n',
        '  Dependency count: ', report.dependencies.length
    ];

    if (options && options.showFunctionDetails) {
        message.push(formatFunctions(report.functions));
    }

    return message.join('');
}

function format(result, options) {
    return result.reports.reduce(function (formatted, report) {
        return formatted + formatModule(report, options) + '\n\n';
    }, formatProject(result));
}

module.exports.format = format;
