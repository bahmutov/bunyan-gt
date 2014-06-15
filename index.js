var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});
console.log('hi from console');

log.info('message', {
  foo: 'foo',
  bar: 'bar'
});

log.info('message', {
  foo: 'foo',
  bar: 'bar'
});
