'use strict';

const Teensy = require('../teensy.js');
let DB = new Teensy('teensy.db', 1000);

describe("Put data into the DB", function() {
  it("Does not crash", function() {
    DB.put({_id: 'Ringo', _rev: 1,color: 'Orange', fangs: true});
    expect(true).toBe(true);
  });
});

describe("Seek data from the DB", function() {
  it("Returns an object", function() {
    let seekData = DB.seek({_id: 'Ringo', fangs: true});
    expect(seekData).toEqual([
      {_id: 'Ringo', _rev: 1,color: 'Orange', fangs: true}
    ]);
  });
});

describe("Poof data from the DB", function() {
  it("Returns an empty DB", function() {
    let data = DB.poof({_id: 'Ringo'}).seek({_id: 'Ringo'});
    expect(data).toEqual([]);
  });
});
