# Teensy

At just 1.5k and 62 lines of JS, Teensy is a very small flat file database.

***

## Installation

```
npm install --save teensy
```

***

## Usage

Teensy requires ES6 features to be enabled, Use of node 5.3.0+ is recommended.

```javascript
// Require Teensy.
const Teensy = require('teensy');

// Create your database, specifying your db filename, and storage interval.
let DB = new Teensy('teensy.db', 1000);

// Easily put data into Teensy. _id and _rev are required!
// You can use _rev to save multiple versions of an _id.
DB.put({_id: 'Ringo', _rev: 2, color: 'Orange', fangs: true});

// You can find data just as easily. Simply provide query params to .seek().
let seekData = DB.seek({_id: 'Ringo', fangs: true});

// If you want data gone, simply use .poof() while passing a query.
DB.poof({color: 'Orange'});

// Be sure to include the coldStorage() call, this is how Teensy stores stuff!
DB.coldStorage();
```

## How Teensy Works

Teensy stores data in memory and writes it to a file periodically (defined when
 you create a new Teensy DB). Teensy will then look for that file and load it
into memory next time it's initialized.
