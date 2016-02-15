(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MeteorFlux = Package['meteorflux:namespace'].MeteorFlux;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ReactiveState;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/meteorflux_reactive-state/lib/reactive-state.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// Retrieve all the property names of an object. Mising in Meteor's underscore.                                       //
_.allKeys = function (obj) {                                                                                          // 2
  if (!_.isObject(obj)) return [];                                                                                    // 3
  var keys = [];                                                                                                      // 4
  for (var key in babelHelpers.sanitizeForInObject(obj)) keys.push(key);                                              // 5
  // Ahem, IE < 9.                                                                                                    //
  if (hasEnumBug) collectNonEnumProps(obj, keys);                                                                     // 7
  return keys;                                                                                                        // 8
};                                                                                                                    //
// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.                                         //
var hasEnumBug = !({ toString: null }).propertyIsEnumerable('toString');                                              // 11
                                                                                                                      //
// Match helper to know if a javascript object was created from a class (or                                           //
// prototype) with a syntax like 'var instance = new SomeClass();'. It returns                                        //
// false if the object is a plain javascript object.                                                                  //
var Class = Match.Where(function (ob) {                                                                               // 16
  return !Match.test(ob, Object) && !Match.test(ob, Array) && _.isObject(ob);                                         // 17
});                                                                                                                   //
                                                                                                                      //
// Match helper to check if something is an object but not an array. Any type                                         //
// of object, not just plain objects, so classes included.                                                            //
var AnyObject = Match.Where(function (ob) {                                                                           // 22
  return _.isObject(ob) && !Match.test(ob, Array);                                                                    // 23
});                                                                                                                   //
                                                                                                                      //
MeteorFlux.ReactiveState = (function () {                                                                             // 26
  function ReactiveState() {                                                                                          // 27
    babelHelpers.classCallCheck(this, ReactiveState);                                                                 //
                                                                                                                      //
    var self = this;                                                                                                  // 28
                                                                                                                      //
    // Value to retrieve if a key is not set yet.                                                                     //
    self._NOTSET = undefined;                                                                                         // 31
                                                                                                                      //
    // Object to store all the values.                                                                                //
    self._obj = {};                                                                                                   // 34
                                                                                                                      //
    // Object to store all the dependencies.                                                                          //
    self._deps = { children: {}, dep: new Tracker.Dependency() };                                                     // 37
                                                                                                                      //
    // Array to store the beforeChange callbacks.                                                                     //
    self._beforeChangeCallbacks = [];                                                                                 // 40
                                                                                                                      //
    // Array to store the afterChange callbacks.                                                                      //
    self._afterChangeCallbacks = [];                                                                                  // 43
  }                                                                                                                   //
                                                                                                                      //
  // This function gets a keypath and checks if its a string like "author.name"                                       //
  // or if it is an array. In any case, it will return the corresponding array                                        //
  // value. For example: 'a.b' returns ['a', 'b'].                                                                    //
                                                                                                                      //
  ReactiveState.prototype._checkKeyPath = (function () {                                                              // 26
    function _checkKeyPath(keyPath) {                                                                                 // 49
      if (Match.test(keyPath, String)) {                                                                              // 50
        keyPath = keyPath.split('.');                                                                                 // 51
      } else if (!Match.test(keyPath, Array)) {                                                                       //
        throw new Error('Invalid keypath');                                                                           // 53
      }                                                                                                               //
      return keyPath;                                                                                                 // 55
    }                                                                                                                 //
                                                                                                                      //
    return _checkKeyPath;                                                                                             //
  })();                                                                                                               //
                                                                                                                      //
  // This function gets a keyPath (array) and generates a new keyPath in                                              //
  // string format. For example: ['a', 'b'] returns 'a.b'.                                                            //
                                                                                                                      //
  ReactiveState.prototype._keyPathToString = (function () {                                                           // 26
    function _keyPathToString(keyPath) {                                                                              // 60
      if (Match.test(keyPath, Array)) {                                                                               // 61
        return _.reduce(keyPath, function (memo, string) {                                                            // 62
          if (memo === '') return string;else return memo + '.' + string;                                             // 63
        }, '');                                                                                                       //
      } else if (Match.test(keyPath, String)) {                                                                       //
        return keyPath;                                                                                               // 69
      } else {                                                                                                        //
        throw new Error('keyPath must be an Array or a String.');                                                     // 71
      }                                                                                                               //
    }                                                                                                                 //
                                                                                                                      //
    return _keyPathToString;                                                                                          //
  })();                                                                                                               //
                                                                                                                      //
  // This function gets a keyPath (array) and returns the value stored in                                             //
  // ReactiveState for it. If is not set yet, it will return the _NOTSET value.                                       //
                                                                                                                      //
  ReactiveState.prototype._getValueInPath = (function () {                                                            // 26
    function _getValueInPath(keyPath) {                                                                               // 78
      var self = this;                                                                                                // 79
      var parent = null;                                                                                              // 80
      var value = self._obj;                                                                                          // 81
                                                                                                                      //
      // Check to see if there is a value in self._obj but maintain the parent                                        //
      // in case we have to bind because it is a function.                                                            //
      for (var i = 0; i < keyPath.length; i++) {                                                                      // 85
        if (Match.test(value, AnyObject) && _.indexOf(_.allKeys(value), keyPath[i]) !== -1) {                         // 86
          parent = value;                                                                                             // 88
          value = value[keyPath[i]];                                                                                  // 89
        } else {                                                                                                      //
          // If nothing is found, we return the value of _NOTSET.                                                     //
          return self._NOTSET;                                                                                        // 92
        }                                                                                                             //
      }                                                                                                               //
                                                                                                                      //
      // Now, check if it is a class and has a get value. If it does, then it's                                       //
      // probably some kind of Reactive source. Let's return the result of its                                        //
      // get function.                                                                                                //
      if (Match.test(value, Class) && Match.test(value.get, Function)) {                                              // 99
        return value.get();                                                                                           // 100
        // Next thing we check if the value itself is a function. If it is, then                                      //
        // we bind it to its parent to it has access to the correct object.                                           //
      } else if (Match.test(value, Function))                                                                         //
          // We check if we are on Blaze or not as well. If we are not, we execute                                    //
          // the function, but if we are, we leave Blaze do so.                                                       //
          if (typeof Blaze !== 'undefined' && !!Blaze.currentView) return value.bind(parent);else return value.bind(parent)();else
          // If none of the special cases above is true, just return the value.                                       //
          return value;                                                                                               // 112
    }                                                                                                                 //
                                                                                                                      //
    return _getValueInPath;                                                                                           //
  })();                                                                                                               //
                                                                                                                      //
  // This function gets a keyPath (array) and a value and creates a new object                                        //
  // with the proper structure from the keyPath and the value stored in its                                           //
  // correct place. For example:                                                                                      //
  // ['a', 'b'] and 'data' returns { a: { b: 'data' } }                                                               //
                                                                                                                      //
  ReactiveState.prototype._createObjFromValue = (function () {                                                        // 26
    function _createObjFromValue(keyPath, value) {                                                                    // 119
      var self = this;                                                                                                // 120
      var obj = {};                                                                                                   // 121
      var currentNode = obj;                                                                                          // 122
      var nextNode = null;                                                                                            // 123
      for (var i = 0; i < keyPath.length; i++) {                                                                      // 124
        nextNode = currentNode[keyPath[i]] = currentNode[keyPath[i]] || {};                                           // 125
        if (i === keyPath.length - 1) {                                                                               // 126
          currentNode[keyPath[i]] = value;                                                                            // 127
        } else {                                                                                                      //
          currentNode = nextNode;                                                                                     // 129
        }                                                                                                             //
      }                                                                                                               //
      return obj;                                                                                                     // 132
    }                                                                                                                 //
                                                                                                                      //
    return _createObjFromValue;                                                                                       //
  })();                                                                                                               //
                                                                                                                      //
  // This function takes keyPath (array) and returns the same node in the                                             //
  // dependency object. If it doesn't exist, it will create it.                                                       //
                                                                                                                      //
  ReactiveState.prototype._getDepNode = (function () {                                                                // 26
    function _getDepNode(keyPath) {                                                                                   // 137
      var self = this;                                                                                                // 138
      var currentNode = self._deps;                                                                                   // 139
      var nextNode = null;                                                                                            // 140
      for (var i = 0; i < keyPath.length; i++) {                                                                      // 141
        nextNode = currentNode.children[keyPath[i]] = currentNode.children[keyPath[i]] || { children: {}, dep: new Tracker.Dependency() };
        currentNode = nextNode;                                                                                       // 145
      }                                                                                                               //
      return currentNode.dep;                                                                                         // 147
    }                                                                                                                 //
                                                                                                                      //
    return _getDepNode;                                                                                               //
  })();                                                                                                               //
                                                                                                                      //
  // This function takes keyPath (array) and stores the value passed without                                          //
  // modifying it.                                                                                                    //
                                                                                                                      //
  ReactiveState.prototype._setValue = (function () {                                                                  // 26
    function _setValue(keyPath, value) {                                                                              // 152
      var self = this;                                                                                                // 153
      var node = self._obj;                                                                                           // 154
      for (var i = 0; i < keyPath.length; i++) {                                                                      // 155
        if (i !== keyPath.length - 1) node = node[keyPath[i]] = node[keyPath[i]] || {};else node[keyPath[i]] = value;
      }                                                                                                               //
      self._changeDep(keyPath);                                                                                       // 161
    }                                                                                                                 //
                                                                                                                      //
    return _setValue;                                                                                                 //
  })();                                                                                                               //
                                                                                                                      //
  // This function adds a dependency for the keyPath (array). This means that                                         //
  // if a Tracker computation is running, it will create the reactive                                                 //
  // dependency.                                                                                                      //
                                                                                                                      //
  ReactiveState.prototype._addDep = (function () {                                                                    // 26
    function _addDep(keyPath) {                                                                                       // 167
      var self = this;                                                                                                // 168
      var dep = self._getDepNode(keyPath);                                                                            // 169
      dep.depend();                                                                                                   // 170
    }                                                                                                                 //
                                                                                                                      //
    return _addDep;                                                                                                   //
  })();                                                                                                               //
                                                                                                                      //
  // This function triggers a dependency for a value which has changed. The                                           //
  // Tracker computations dependent will be invalidated.                                                              //
                                                                                                                      //
  ReactiveState.prototype._changeDep = (function () {                                                                 // 26
    function _changeDep(keyPath) {                                                                                    // 175
      var self = this;                                                                                                // 176
      var dep = self._getDepNode(keyPath);                                                                            // 177
      dep.changed();                                                                                                  // 178
    }                                                                                                                 //
                                                                                                                      //
    return _changeDep;                                                                                                //
  })();                                                                                                               //
                                                                                                                      //
  // This function gets the old object tree, a new one (created with                                                  //
  // _createObjFromValue) and a keyPath (array) and merges both together.                                             //
  // The result is the new state.                                                                                     //
                                                                                                                      //
  ReactiveState.prototype._changeObj = (function () {                                                                 // 26
    function _changeObj(oldObj, newObj) {                                                                             // 184
      var rootKeyPath = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];                      //
                                                                                                                      //
      var self = this;                                                                                                // 185
                                                                                                                      //
      if (Match.test) for (var key in babelHelpers.sanitizeForInObject(newObj)) {                                     // 187
        if (newObj.hasOwnProperty(key)) {                                                                             // 190
                                                                                                                      //
          // We need to clone the array so we don't modify the rootKeyPath and                                        //
          // it is still valid in the next for iteration.                                                             //
          var keyPath = [].concat(rootKeyPath);                                                                       // 194
          keyPath.push(key);                                                                                          // 195
                                                                                                                      //
          // In the case that there is a previous object and the new value is                                         //
          // undefined instead of an object, do nothing.                                                              //
          if (newObj === undefined && Match.test(oldObj, AnyObject)) {                                                // 199
            return;                                                                                                   // 200
          } else if (!_.isEqual(oldObj[key], newObj[key])) {                                                          //
                                                                                                                      //
            // If they are not equal, the first thing to do it to mark this                                           //
            // keyPath as changed to trigger all the Tracker.autoruns.                                                //
            self._changeDep(keyPath);                                                                                 // 205
                                                                                                                      //
            // Check if it is an object                                                                               //
            if (Match.test(newObj[key], Object)) {                                                                    // 208
                                                                                                                      //
              // Both are objects, use _changeObj again.                                                              //
              if (!Match.test(oldObj[key], Object)) {                                                                 // 211
                oldObj[key] = {};                                                                                     // 212
              }                                                                                                       //
              self._changeObj(oldObj[key], newObj[key], keyPath);                                                     // 214
            } else if (newObj[key] === undefined && Match.test(oldObj[key], AnyObject)) {                             //
              // If it's undefined and the old value is a an object, do nothing                                       //
              // because maybe it's a function not returning.                                                         //
              return;                                                                                                 // 220
            } else {                                                                                                  //
              // If it's not that case, we just overwrite the value.                                                  //
              oldObj[key] = newObj[key];                                                                              // 223
            }                                                                                                         //
          }                                                                                                           //
        }                                                                                                             //
      }                                                                                                               //
    }                                                                                                                 //
                                                                                                                      //
    return _changeObj;                                                                                                //
  })();                                                                                                               //
                                                                                                                      //
  // This function gets a keyPath (array) and a function and puts it in a                                             //
  // Tracker computation. The function will be executed and the result will be                                        //
  // stored in ReactiveState. This means we don't store function, we store the                                        //
  // resulting objects. If the function is reactive and something inside it                                           //
  // changes, this Tracker computation will be run again and ReactiveState will                                       //
  // be updated with the correct values.                                                                              //
                                                                                                                      //
  ReactiveState.prototype._setFunction = (function () {                                                               // 26
    function _setFunction(keyPath, func) {                                                                            // 236
      var self = this;                                                                                                // 237
      Tracker.autorun(function () {                                                                                   // 238
        var oldValue = self._getValueInPath(keyPath);                                                                 // 239
        var result = func(oldValue);                                                                                  // 240
        // check if it's a Mongo Cursor and run fetch.                                                                //
        if (result && typeof result === 'object' && result.fetch !== undefined) {                                     // 242
          self._setObject(keyPath, result.fetch());                                                                   // 244
        } else if (Match.test(result, Class)) {                                                                       //
          self._setClass(keyPath, result);                                                                            // 246
        } else {                                                                                                      //
          self._setObject(keyPath, result);                                                                           // 248
        }                                                                                                             //
      });                                                                                                             //
    }                                                                                                                 //
                                                                                                                      //
    return _setFunction;                                                                                              //
  })();                                                                                                               //
                                                                                                                      //
  // This function gets a keyPath (array) and an instance of some class and                                           //
  // stores its value in ReactiveState.                                                                               //
                                                                                                                      //
  ReactiveState.prototype._setClass = (function () {                                                                  // 26
    function _setClass(keyPath, instance) {                                                                           // 255
      var self = this;                                                                                                // 256
      self._setValue(keyPath, instance);                                                                              // 257
    }                                                                                                                 //
                                                                                                                      //
    return _setClass;                                                                                                 //
  })();                                                                                                               //
                                                                                                                      //
  // This function gets a keyPath (array) and a new value and it creates a new                                        //
  // object with the value and merges it with the old object tree. Then it                                            //
  // registers the Blaze helper.                                                                                      //
                                                                                                                      //
  ReactiveState.prototype._setObject = (function () {                                                                 // 26
    function _setObject(keyPath, newValue) {                                                                          // 263
      var self = this;                                                                                                // 264
      var newObjFromValue = self._createObjFromValue(keyPath, newValue);                                              // 265
      self._changeObj(self._obj, newObjFromValue);                                                                    // 266
    }                                                                                                                 //
                                                                                                                      //
    return _setObject;                                                                                                //
  })();                                                                                                               //
                                                                                                                      //
  // This public method gets a keyPath (string or array) and a new value and                                          //
  // stores it in the ReactiveState object tree.                                                                      //
                                                                                                                      //
  ReactiveState.prototype.set = (function () {                                                                        // 26
    function set(keyPath, newValue) {                                                                                 // 271
      var self = this;                                                                                                // 272
      keyPath = self._checkKeyPath(keyPath);                                                                          // 273
                                                                                                                      //
      _.each(self._beforeChangeCallbacks, function (func) {                                                           // 275
        var value = func(keyPath, newValue);                                                                          // 276
        if (value !== undefined) newValue = value;                                                                    // 277
      });                                                                                                             //
                                                                                                                      //
      if (Match.test(newValue, Function)) self._setFunction(keyPath, newValue);else if (Match.test(newValue, Class)) self._setClass(keyPath, newValue);else self._setObject(keyPath, newValue);
                                                                                                                      //
      _.each(self._afterChangeCallbacks, function (func) {                                                            // 288
        func(keyPath, newValue);                                                                                      // 289
      });                                                                                                             //
    }                                                                                                                 //
                                                                                                                      //
    return set;                                                                                                       //
  })();                                                                                                               //
                                                                                                                      //
  // This public method gets a keyPath (string or array) and a new value and                                          //
  // stores it in the ReactiveState object tree.                                                                      //
                                                                                                                      //
  ReactiveState.prototype.modify = (function () {                                                                     // 26
    function modify(keyPath, modifier) {                                                                              // 295
      var self = this;                                                                                                // 296
                                                                                                                      //
      if (Match.test(modifier, Function)) {                                                                           // 298
        self.set(keyPath, modifier);                                                                                  // 299
      } else {                                                                                                        //
        throw new Error('Invalid modifier function');                                                                 // 301
      }                                                                                                               //
    }                                                                                                                 //
                                                                                                                      //
    return modify;                                                                                                    //
  })();                                                                                                               //
                                                                                                                      //
  // This is a public hook to add a callback which will be called before any                                          //
  // change is triggered. The callback will receive the keyPath (in array                                             //
  // format) and the new value. If it returns something different than undefined                                      //
  // the new value will be overwriten.                                                                                //
                                                                                                                      //
  ReactiveState.prototype.beforeChange = (function () {                                                               // 26
    function beforeChange(cb) {                                                                                       // 309
      var self = this;                                                                                                // 310
      self._beforeChangeCallbacks.push(cb);                                                                           // 311
    }                                                                                                                 //
                                                                                                                      //
    return beforeChange;                                                                                              //
  })();                                                                                                               //
                                                                                                                      //
  // This is a public hook to add a callback which will be called after any                                           //
  // change is triggered. The callback will receive the keyPath (in array                                             //
  // format) and the new value.                                                                                       //
                                                                                                                      //
  ReactiveState.prototype.afterChange = (function () {                                                                // 26
    function afterChange(cb) {                                                                                        // 317
      var self = this;                                                                                                // 318
      self._afterChangeCallbacks.push(cb);                                                                            // 319
    }                                                                                                                 //
                                                                                                                      //
    return afterChange;                                                                                               //
  })();                                                                                                               //
                                                                                                                      //
  // This public method gets a keyPath (string or array) and returns the                                              //
  // correct value of the object tree. If a Tracker computation is currently                                          //
  // active it will add a dependency.                                                                                 //
                                                                                                                      //
  ReactiveState.prototype.get = (function () {                                                                        // 26
    function get(keyPath) {                                                                                           // 325
      var self = this;                                                                                                // 326
      keyPath = self._checkKeyPath(keyPath);                                                                          // 327
                                                                                                                      //
      var value = self._getValueInPath(keyPath);                                                                      // 329
                                                                                                                      //
      if (Tracker.active) {                                                                                           // 331
        self._addDep(keyPath, value);                                                                                 // 332
      }                                                                                                               //
                                                                                                                      //
      return value;                                                                                                   // 335
    }                                                                                                                 //
                                                                                                                      //
    return get;                                                                                                       //
  })();                                                                                                               //
                                                                                                                      //
  return ReactiveState;                                                                                               //
})();                                                                                                                 //
                                                                                                                      //
// Creates a global to be exported.                                                                                   //
ReactiveState = MeteorFlux.ReactiveState;                                                                             // 340
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorflux:reactive-state'] = {
  ReactiveState: ReactiveState
};

})();

//# sourceMappingURL=meteorflux_reactive-state.js.map
