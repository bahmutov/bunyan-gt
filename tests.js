function isJsonLine(line) {
  return /\{*\}/.test(line);
}

function grabJsonMessages(stdout) {
  var lines = stdout.split('\n').filter(isJsonLine);
  return lines.map(JSON.parse);
}

function toMessage(msg) {
  var k = msg.indexOf('{');
  var label = msg.substr(0, k - 1);
  var str = msg.substr(k);
  /* jshint -W061 */
  var obj = eval('(' + str + ')');
  var result = {};
  result[label] = obj;
  return result;
}

function bunyanToMessage(info) {
  return toMessage(info.msg);
}

function fromApp(name, info) {
  return info.name === name;
}

var fromMyApp = fromApp.bind(null, 'myapp');

gt.async('testing index.js', 3, function () {
  gt.exec('node', ['./index.js', '--debug'], 0, function inspectOutput(stdout, stderr) {
    gt.equal(stderr, '', 'no stderr');
    var jsonMessages = grabJsonMessages(stdout).filter(fromMyApp);
    gt.equal(jsonMessages.length, 2, 'number of messages');

    var messages = jsonMessages.map(bunyanToMessage);
    // [ { message: { foo: 'foo', bar: 'bar' } },
    //   { 'message 2': { foo: 'foo', bar: 'bar' } } ]

    // check a specific message
    gt.equiv(messages[0].message, {
      foo: 'foo',
      bar: 'bar'
    }, 'checked first message');
  });
}, 10000);
