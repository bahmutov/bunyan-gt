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

gt.async('testing index.js', 2, function () {
  gt.exec('node', ['./index.js'], 0, function inspectOutput(stdout, stderr) {
    var jsonMessages = grabJsonMessages(stdout).filter(fromMyApp);
    gt.equal(jsonMessages.length, 2, 'number of messages');

    var messages = jsonMessages.map(bunyanToMessage);
    console.log(messages);
    // find specific messages

  });
}, 10000);
