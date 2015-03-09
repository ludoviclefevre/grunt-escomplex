# grunt-escomplex

> Code complexity module Grunt using escomplex. Very early/rough stage, changing often.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-escomplex --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-escomplex');
```

## The "escomplex" task

### Overview
In your project's Gruntfile, add a section named `escomplex` to the data object passed into `grunt.initConfig()`.

```js
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
      'specificFile.js',
      'src/**/*.js'
    ]
  },
})
```

### options.complexity

`options.complexity` is an optional object containing properties that modify some of the complexity calculations:

#### `options.complexity.logicalor`:
  Boolean indicating whether operator `||`
  should be considered a source of cyclomatic complexity,
  defaults to `true`.
#### `options.complexity.switchcase`:
  Boolean indicating whether `switch` statements
  should be considered a source of cyclomatic complexity,
  defaults to `true`.
#### `options.complexity.forin`:
  Boolean indicating whether `for`...`in` loops
  should be considered a source of cyclomatic complexity,
  defaults to `false`.
#### `options.complexity.trycatch`:
  Boolean indicating whether `catch` clauses
  should be considered a source of cyclomatic complexity,
  defaults to `false`.
#### `options.complexity.newmi`:
  Boolean indicating whether the maintainability
  index should be rebased on a scale from 0 to 100,
  defaults to `false`.

### options.format

`options.format` is an optional object containing properties that modify some of the output format:

#### `options.format.showFunctionDetails`:
  Boolean indicating whether complexity details should be displayed in output result

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
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
      'specificFile.js',
      'src/**/*.js'
    ]
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Ludovic LEFEVRE. Licensed under the MIT license.
