function isJsonLine(line) {
  console.log('line:', line)
  return /\{*\}/.test(line);
}

function grabJsonMessages(stdout) {
  var lines = stdout.split('\n').filter(isJsonLine);
  return lines.map(JSON.parse);
}

gt.async('testing index.js', 1, function () {
  gt.exec('node', ['./index.js'], 0, function inspectOutput(stdout, stderr) {
    console.log(stdout);
    var jsonMessages = grabJsonMessages(stdout);
    console.log('json messages\n');
    console.log(jsonMessages);
  });
}, 10000);
