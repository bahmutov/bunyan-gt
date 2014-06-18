# bunyan-gt

> End to end unit testing using structured logging

[![NPM][bunyan-gt-icon] ][bunyan-gt-url]

[![Build status][bunyan-gt-ci-image] ][bunyan-gt-ci-url]
[![Coverage Status][bunyan-gt-coverage-image]][bunyan-gt-coverage-url]
[![dependencies][bunyan-gt-dependencies-image] ][bunyan-gt-dependencies-url]
[![devdependencies][bunyan-gt-devdependencies-image] ][bunyan-gt-devdependencies-url]

This module connects TDD tool QUnit-like runner [gt](https://github.com/bahmutov/gt)
and structured JSON logger [bunyan](https://github.com/trentm/node-bunyan).

### example

```js
// index.js
// output structured JSON logging using bunyan
log.debug('message', { foo: 'foo' });
...

// test.js
var bgt = require('bunyan-gt');
gt.async('testing index.js', 2, function () {
  // execute index.js inside a unit test and capture bunyan output
  gt.exec('node', ['./index.js', '--debug'], 0,
    function inspectOutput(stdout, stderr) {
      // bunyan output helper
      var messages = bgt(stdout, 'message');
      gt.equal(messages[0].foo, 'foo');
    });
});
```

Other logging frameworks or console messages are ignored.

## Why?

It is simple to unit test a small piece of code. It is much harder
to confirm that a complicated end to end test confirms the expected behavior.
A human programmer would confirm that given inputs the program writes
the expected log messages. *bunyan* logging module outputs log messages that
are simple to parse. Thus it is simple to use them inside the unit tests.

## Bunyan example

Here is a simple program with both console and bunyan logging

```js
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'myapp' });
log.level(process.argv.some(function (str) {
  return str === '--debug';
}) ? 'debug' : 'info');

console.log('hi from console');

log.debug('message', {
  foo: 'foo',
  bar: 'bar'
});

log.debug('message 2', {
  foo: 'foo',
  bar: 'bar'
});
```

It only outputs *bunyan* messages if the user ran the program with `--debug` command line option.

A good way to run the program and see human-formatted output is to install *bunyan* globally
`npm install -g bunyan` and pipe the program's output

    $ node index.js | bunyan -o short
    hi from console
    03:12:41.848Z  INFO myapp: message { foo: 'foo', bar: 'bar' }
    03:12:41.849Z  INFO myapp: message { foo: 'foo', bar: 'bar' }

You can also suppress non-bunyan logging using `--strict` option

    $ node index.js | bunyan --strict -o short
    // "hi from console" is hidden

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/bunyan-gt/issues) on Github

## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[bunyan-gt-icon]: https://nodei.co/npm/bunyan-gt.png?downloads=true
[bunyan-gt-url]: https://npmjs.org/package/bunyan-gt
[bunyan-gt-ci-image]: https://travis-ci.org/bahmutov/bunyan-gt.png?branch=master
[bunyan-gt-ci-url]: https://travis-ci.org/bahmutov/bunyan-gt
[bunyan-gt-coverage-image]: https://coveralls.io/repos/bahmutov/bunyan-gt/badge.png
[bunyan-gt-coverage-url]: https://coveralls.io/r/bahmutov/bunyan-gt
[bunyan-gt-dependencies-image]: https://david-dm.org/bahmutov/bunyan-gt.png
[bunyan-gt-dependencies-url]: https://david-dm.org/bahmutov/bunyan-gt
[bunyan-gt-devdependencies-image]: https://david-dm.org/bahmutov/bunyan-gt/dev-status.png
[bunyan-gt-devdependencies-url]: https://david-dm.org/bahmutov/bunyan-gt#info=devDependencies

