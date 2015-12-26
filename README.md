# Teensy ![Travis](https://travis-ci.org/wski/teensy.svg)

At just 1.5k and less than 100 lines of JS, Teensy is a very small flat file database.

## Performance Metrics

100 Item:

- Seek 1 results: *47μs (0.047ms)*
- Put one item: *150μs (0.150ms)*

5,000 Item:

- Seek 5,000 results: *4.250ms*
- Put one item: *0.525ms*

50,000 Item:

- Seek 50,000 results: *21.713ms*
- Put one item: *2ms*

100,000 Item:

- Seek 50,000 results: *47.450ms*
- Put one item: *3ms*

*Metrics gathered on 2015 MacBook 12" running Node v5.3.0. Requests made every 50ms.*

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

You can subscribe to changes in the DB.
```javascript
DB.subscribe((data) => {
  // do stuff
}, 'subscription_id');
```

You can also unsubscribe.
```javascript
DB.unsubscribe('subscription_id');
```

If you want data gone, simply use .poof() while passing a query.
```javascript
DB.poof({color: 'Orange'});
```
