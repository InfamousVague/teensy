# Teensy ![Travis](https://travis-ci.org/wski/teensy.svg)

At just 1.5k and ~60 lines of JS, Teensy is a very small flat file database.

## How Teensy Works

Teensy stores data in memory and writes it to a file periodically (defined when
 you create a new Teensy DB). Teensy will then look for that file and load it
into memory next time it's initialized.

## Usage

Install using npm. Teensy requires ES6 features to be enabled, Use of node
5.3.0+ is recommended.
```
npm install --save teensy
```

First, require teensy.
```javascript
const Teensy = require('teensy');
```

Create your database, specifying your db filename, and storage interval.
Be sure to include the store() call, this is how Teensy stores stuff!

```javascript
let DB = new Teensy('teensy.db', 1000).store();
```

Easily put data into Teensy. id and rev required.
```javascript
DB.put({_id: 'Ringo', _rev: 2, color: 'Orange', fangs: true});
```

You can find data just as easily. Simply provide query params to .seek().
```javascript
let seekData = DB.seek({_id: 'Ringo', fangs: true});
```

If you want data gone, simply use .poof() while passing a query.
```javascript
DB.poof({color: 'Orange'});
```
