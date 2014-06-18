require('lazy-ass');
var check = require('check-types');

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

function textToMessages(input, name) {
  var fromMyApp = fromApp.bind(null, name);
  var jsonMessages = grabJsonMessages(input).filter(fromMyApp);
  var messages = jsonMessages.map(bunyanToMessage);
  return messages;
}

function labeledMessages(input, label) {
  return input.filter(function (msg) {
    return msg[label];
  });
}

module.exports = function (input, nameOrLabel, label) {
  if (check.unemptyString(input) &&
    check.unemptyString(nameOrLabel) &&
    check.unemptyString(label)) {
    return labeledMessages(textToMessages(input, nameOrLabel), label);
  }

  if (typeof input === 'string') {
    lazyAss(check.unemptyString(nameOrLabel), 'missing application name');
    return textToMessages(input, nameOrLabel);
  } else if (Array.isArray(input)) {
    lazyAss(check.unemptyString(nameOrLabel), 'missing label');
    return labeledMessages(input, nameOrLabel);
  } else {
    throw new Error('Invalid inputs ' + input + ', ' + nameOrLabel);
  }
};
