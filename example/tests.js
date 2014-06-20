var path = require('path');
var bgt = require('..');

gt.async('grabbing message by logger name', function () {
  var filename = path.join(__dirname, 'example.js');
  gt.exec('node', [filename, '--debug'], 0, function inspectOutput(stdout, stderr) {
    gt.equal(stderr, '', 'no stderr');
    var messages = bgt(stdout, 'example');
    // [ { foo: 'foo', bar: 'bar' },
    //   { foo: 'foo', bar: 'bar' } ]

    // check a specific message
    gt.equiv(messages[0], {
      foo: 'foo',
      bar: 'bar'
    }, 'checked first message');
  });
}, 10000);

gt.async('grabbing message by label', function () {
  var filename = path.join(__dirname, 'example.js');
  gt.exec('node', [filename, '--debug'], 0, function inspectOutput(stdout, stderr) {
    gt.equal(stderr, '', 'no stderr');
    var messages = bgt(bgt(stdout, 'example'), 'message 2');
    gt.equal(messages.length, 1, 'single message 2');
    gt.equiv(messages[0], {
      foo: 'foo',
      bar: 'bar'
    }, 'checked message contents');
  });
}, 10000);

gt.test('invalid inputs', function () {
  gt.raises(function () {
    bgt([]);
  }, Error, 'invalid inputs to function');
});

gt.async('grab shortcut', function () {
  var filename = path.join(__dirname, 'example.js');
  gt.exec('node', [filename, '--debug'], 0, function inspectOutput(stdout, stderr) {
    gt.equal(stderr, '', 'no stderr');
    var messages = bgt(stdout, 'example', 'message 2');
    gt.equal(messages.length, 1, 'single message 2');
    gt.equiv(messages[0], {
      foo: 'foo',
      bar: 'bar'
    }, 'checked message contents');
  });
}, 10000);
