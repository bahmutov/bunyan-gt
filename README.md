Running with bunyan short output

    $ node index.js | bunyan -o short
    hi from console
    03:12:41.848Z  INFO myapp: message { foo: 'foo', bar: 'bar' }
    03:12:41.849Z  INFO myapp: message { foo: 'foo', bar: 'bar' }

Running with bunyan JSON output

    $ node index.js | bunyan -o json
    hi from console
    {
      "name": "myapp",
      "hostname": "Glebs-MacBook-Pro.local",
      "pid": 92404,
      "level": 30,
      "msg": "message { foo: 'foo', bar: 'bar' }",
      "time": "2014-06-15T03:13:10.665Z",
      "v": 0
    }
    {
      "name": "myapp",
      "hostname": "Glebs-MacBook-Pro.local",
      "pid": 92404,
      "level": 30,
      "msg": "message { foo: 'foo', bar: 'bar' }",
      "time": "2014-06-15T03:13:10.666Z",
      "v": 0
    }

Running with bunyan and filtering non-json console output

    $ node index.js | bunyan --strict -o json




