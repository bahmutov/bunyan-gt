var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'example' });
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
