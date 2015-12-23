'use strict';

const Teensy = require('./teensy.js');

let DB = new Teensy('teensy.db', 1000);
console.time('Time to put');

DB.put({_id: 'animal', _rev: 2,name: 'bolo', fangs: true});
DB.put({_id: 'animal', _rev: 3,name: 'bolo', fangs: true});


console.timeEnd('Time to put');

console.time('Time to seek');
let seekData = DB.seek({_id: 'animal', fangs: true});
console.timeEnd('Time to seek');

console.time('Time to poof');
DB.poof({name: 'bolo'});
console.timeEnd('Time to poof');

console.log('Seek Data', seekData);

DB.coldStorage();
