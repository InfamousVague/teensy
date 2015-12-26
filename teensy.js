'use strict';
const fs = require('fs');

module.exports = class Teensy {

  constructor(dbName, update) {
    this.db_name = dbName;
    this.db = (() => {
      if( fs.existsSync(dbName) )
        return JSON.parse(fs.readFileSync(dbName, 'utf8'));
      return [];
    })();
    this.update = update;
    this.listeners = [];
  }

  store(last) {
    fs.writeFile(`./${this.db_name}`, JSON.stringify(this.db), (err) => {
      if (last) process.exit();
      setTimeout(() => {
        this.store(false);
      }, this.update);
    });
    return this;
  }

  subscribe(listener, id) {
    this.listeners.push({
      listener,
      id: (id) ? id : 'default'
    });
    return this;
  }

  unsubscribe(id) {
    this.listeners = this.listeners.filter((obj, i) => {
        if(obj.id != id) return true;
    });
    return this;
  }

  broadcast(data){
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i].listener(data);
    }
    return this;
  }

  seek(query){
    let results = [];
    for (let i = 0; i < this.db.length; i++) {
      let matches = 0;
      for (let key in query){
        if (this.db[i][key] && this.db[i][key] === query[key]) matches++;
        if (matches === Object.keys(query).length) results.push(this.db[i]);
      }
    }
    return results;
  }

  put(data){
    if (data._rev && data._id) {
      let found = false;
      for (let i = 0; i < this.db.length; i++) {
        if (this.db[i]._id === data._id && this.db[i]._rev && this.db[i]._rev === data._rev) {
          found = true;
          this.db[i] = Object.assign({}, this.db[i], data);
        }
        if ( i === this.db.length - 1 && !found ) this.db.push(data);
      }
      if(!this.db.length) this.db.push(data);
      this.broadcast({
        data,
        db: this.db
      });
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
    return this;
  }

}
