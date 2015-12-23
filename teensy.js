'use strict';
const fs = require('fs');

module.exports = class Teensy {

  constructor(dbName, update) {
    this.db_name = dbName;
    this.db = JSON.parse(fs.readFileSync(dbName, 'utf8'));
    this.update = update;
  }

  coldStorage(last) {
    fs.writeFile(`./${this.db_name}`, JSON.stringify(this.db), (err) => {
      if (last) process.exit();
      setTimeout(() => {
        this.coldStorage(false);
      }, this.update);
    });
  }

  seek(query){
    let results = [];
    this.db.map((obj) => {
      let matches = 0;
      for (let key in query){
        if (obj[key] && obj[key] === query[key]) matches++;
        if (matches === Object.keys(query).length) results.push(obj);
      }
    });
    return results;
  }

  put(data){
    if (data._rev && data._id) {
      let found = false;
      this.db.map((obj, i) => {
        if (obj._id === data._id && obj._rev && obj._rev === data._rev) {
          found = true; this.db[i] = Object.assign({}, obj, data);
        }
        if ( i === this.db.length - 1 && !found ) this.db.push(data);
      });
      if(!this.db.length) this.db.push(data);
    }
    return this;
  }

  poof(query){
    this.db = this.db.filter((obj, i) => {
      let matches = 0;
      for (let key in query){
        if (obj[key] && obj[key] === query[key]) matches++;
        if (matches === Object.keys(query).length) return false;
        return true;
      }
    });
  }

}
