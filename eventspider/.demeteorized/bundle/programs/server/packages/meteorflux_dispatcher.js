(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MeteorFlux = Package['meteorflux:namespace'].MeteorFlux;

/* Package-scope variables */
var Dispatcher;

(function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/meteorflux_dispatcher/lib/dispatcher.js                             //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
                                                                                // 1
var _lastID = 1;                                                                // 2
var _prefix = 'ID_';                                                            // 3
                                                                                // 4
var invariant = function(condition, errorMessage, format, a, b, c, d, e, f) {   // 5
  if (!condition) {                                                             // 6
    var error;                                                                  // 7
    if ((format === undefined)||(errorMessage === undefined)) {                 // 8
      error = new Meteor.Error(                                                 // 9
        'minified-exception',                                                   // 10
        'Minified exception occurred; use the non-minified dev environment ' +  // 11
        'for the full error message and additional helpful warnings.'           // 12
      );                                                                        // 13
    } else {                                                                    // 14
      var args = [a, b, c, d, e, f];                                            // 15
      var argIndex = 0;                                                         // 16
      error = new Meteor.Error(                                                 // 17
        errorMessage,                                                           // 18
        'Invariant Violation: ' +                                               // 19
        format.replace(/%s/g, function() { return args[argIndex++]; })          // 20
      );                                                                        // 21
    }                                                                           // 22
    error.framesToPop = 1; // we don't care about invariant's own frame         // 23
    throw error;                                                                // 24
  }                                                                             // 25
};                                                                              // 26
                                                                                // 27
/**                                                                             // 28
* MeteorFlux.Dispatcher is used to broadcast payloads to registered callbacks.  // 29
*/                                                                              // 30
                                                                                // 31
MeteorFlux.Dispatcher = function(){                                             // 32
  this._callbacks = {};                                                         // 33
  this._isPending = {};                                                         // 34
  this._isHandled = {};                                                         // 35
  this._isDispatching = false;                                                  // 36
  this._dispatchFilters = [];                                                   // 37
  this._registerFilters = [];                                                   // 38
  this._pendingPayload = null;                                                  // 39
};                                                                              // 40
                                                                                // 41
                                                                                // 42
/**                                                                             // 43
* Registers a callback to be invoked with every dispatched payload. Returns     // 44
* a token that can be used with `waitFor()`.                                    // 45
*                                                                               // 46
* @param {function} callback                                                    // 47
* @return {string}                                                              // 48
*/                                                                              // 49
MeteorFlux.Dispatcher.prototype.register = function(/* arguments */) {          // 50
  var callback = arguments;                                                     // 51
  for (var i = 0; i < this._registerFilters.length; i++) {                      // 52
    callback = this._registerFilters[i].apply(this, callback);                  // 53
  }                                                                             // 54
  var id = _prefix + _lastID++;                                                 // 55
  this._callbacks[id] = callback[0];                                            // 56
  return id;                                                                    // 57
};                                                                              // 58
                                                                                // 59
/**                                                                             // 60
* Removes a callback based on its token.                                        // 61
*                                                                               // 62
* @param {string} id                                                            // 63
*/                                                                              // 64
MeteorFlux.Dispatcher.prototype.unregister = function(id) {                     // 65
  invariant(                                                                    // 66
    this._callbacks[id],                                                        // 67
    'dispatcher-unregister-not-map',                                            // 68
    'Dispatcher.unregister(...): `%s` does not map to a registered callback.',  // 69
    id                                                                          // 70
  );                                                                            // 71
  delete this._callbacks[id];                                                   // 72
};                                                                              // 73
                                                                                // 74
/**                                                                             // 75
* Waits for the callbacks specified to be invoked before continuing execution   // 76
* of the current callback. This method should only be used by a callback in     // 77
* response to a dispatched payload.                                             // 78
*                                                                               // 79
* @param {array<string>} ids                                                    // 80
*/                                                                              // 81
MeteorFlux.Dispatcher.prototype.waitFor = function(ids) {                       // 82
  invariant(                                                                    // 83
    this._isDispatching,                                                        // 84
    'dispatcher-waitfor-invoked-outside-dispatch',                              // 85
    'Dispatcher.waitFor(...): Must be invoked while dispatching.'               // 86
  );                                                                            // 87
  for (var ii = 0; ii < ids.length; ii++) {                                     // 88
    var id = ids[ii];                                                           // 89
    if (this._isPending[id]) {                                                  // 90
      invariant(                                                                // 91
        this._isHandled[id],                                                    // 92
        'dispatcher-waitfor-circular-dependency',                               // 93
        'Dispatcher.waitFor(...): Circular dependency detected while ' +        // 94
        'waiting for `%s`.',                                                    // 95
        id                                                                      // 96
      );                                                                        // 97
      continue;                                                                 // 98
    }                                                                           // 99
    invariant(                                                                  // 100
      this._callbacks[id],                                                      // 101
      'dispatcher-waitfor-invalid-token',                                       // 102
      'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',   // 103
      id                                                                        // 104
    );                                                                          // 105
    this._invokeCallback(id);                                                   // 106
  }                                                                             // 107
};                                                                              // 108
                                                                                // 109
/**                                                                             // 110
* Dispatches a payload to all registered callbacks.                             // 111
*                                                                               // 112
* @param {object} payload                                                       // 113
*/                                                                              // 114
MeteorFlux.Dispatcher.prototype.dispatch = function(/* arguments */) {          // 115
  invariant(                                                                    // 116
    !this._isDispatching,                                                       // 117
    'dispatcher-cant-dispatch-while-dispatching',                               // 118
    'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'      // 119
  );                                                                            // 120
  var payload = arguments;                                                      // 121
  for (var i = 0; i < this._dispatchFilters.length; i++) {                      // 122
    payload = this._dispatchFilters[i].apply(this, payload);                    // 123
    if (payload === false) return;                                              // 124
  }                                                                             // 125
                                                                                // 126
  this._startDispatching.apply(this, payload);                                  // 127
  try {                                                                         // 128
    for (var id in this._callbacks) {                                           // 129
      if (this._isPending[id]) {                                                // 130
        continue;                                                               // 131
      }                                                                         // 132
      this._invokeCallback(id);                                                 // 133
    }                                                                           // 134
  } finally {                                                                   // 135
    this._stopDispatching();                                                    // 136
  }                                                                             // 137
};                                                                              // 138
                                                                                // 139
/**                                                                             // 140
* Registers a filter to be invoked before the dispatch begins. It can alter     // 141
* the payload.                                                                  // 142
*                                                                               // 143
* @param {function} callback                                                    // 144
*/                                                                              // 145
MeteorFlux.Dispatcher.prototype.addDispatchFilter = function(filter) {          // 146
  this._dispatchFilters.push(filter);                                           // 147
};                                                                              // 148
                                                                                // 149
/**                                                                             // 150
* Registers a filter to be invoked when the register is called. It can alter    // 151
* the callback.                                                                 // 152
*                                                                               // 153
* @param {function} callback                                                    // 154
*/                                                                              // 155
MeteorFlux.Dispatcher.prototype.addRegisterFilter = function(filter) {          // 156
  this._registerFilters.push(filter);                                           // 157
};                                                                              // 158
                                                                                // 159
/**                                                                             // 160
* Is this MeteorFlux.Dispatcher currently dispatching.                          // 161
*                                                                               // 162
* @return {boolean}                                                             // 163
*/                                                                              // 164
MeteorFlux.Dispatcher.prototype.isDispatching = function() {                    // 165
  return this._isDispatching;                                                   // 166
};                                                                              // 167
                                                                                // 168
/**                                                                             // 169
* Call the callback stored with the given id. Also do some internal             // 170
* bookkeeping.                                                                  // 171
*                                                                               // 172
* @param {string} id                                                            // 173
* @internal                                                                     // 174
*/                                                                              // 175
MeteorFlux.Dispatcher.prototype._invokeCallback = function(id) {                // 176
  this._isPending[id] = true;                                                   // 177
  this._callbacks[id].apply(this, this._pendingPayload);                        // 178
  this._isHandled[id] = true;                                                   // 179
};                                                                              // 180
                                                                                // 181
/**                                                                             // 182
* Set up bookkeeping needed when dispatching.                                   // 183
*                                                                               // 184
* @param {object} payload                                                       // 185
* @internal                                                                     // 186
*/                                                                              // 187
MeteorFlux.Dispatcher.prototype._startDispatching = function(/* arguments */) {
                                                                                // 189
  for (var id in this._callbacks) {                                             // 190
    this._isPending[id] = false;                                                // 191
    this._isHandled[id] = false;                                                // 192
  }                                                                             // 193
  this._pendingPayload = arguments;                                             // 194
  this._isDispatching = true;                                                   // 195
};                                                                              // 196
                                                                                // 197
/**                                                                             // 198
* Clear bookkeeping used for dispatching.                                       // 199
*                                                                               // 200
* @internal                                                                     // 201
*/                                                                              // 202
MeteorFlux.Dispatcher.prototype._stopDispatching = function() {                 // 203
  this._pendingPayload = null;                                                  // 204
  this._isDispatching = false;                                                  // 205
};                                                                              // 206
                                                                                // 207
/**                                                                             // 208
* Curate the payload. If the user uses the first argument as string, use it     // 209
* as action type and include it in the payload.                                 // 210
*                                                                               // 211
* @internal                                                                     // 212
*/                                                                              // 213
MeteorFlux.Dispatcher.prototype._curatePayload = function(/* arguments */) {    // 214
  if (typeof arguments[0] === 'string') {                                       // 215
    var action = arguments[1] || {};                                            // 216
    action.type = arguments[0];                                                 // 217
    return [action];                                                            // 218
  } else {                                                                      // 219
    return arguments;                                                           // 220
  }                                                                             // 221
};                                                                              // 222
                                                                                // 223
/**                                                                             // 224
* Curate the payload. If the user uses the first argument as string, use it     // 225
* as action type and include it in the payload.                                 // 226
*                                                                               // 227
* @internal                                                                     // 228
*/                                                                              // 229
MeteorFlux.Dispatcher.prototype._curateCallback = function(/* arguments */) {   // 230
  if (typeof arguments[0] === 'string') {                                       // 231
    var type = arguments[0];                                                    // 232
    var func = arguments[1];                                                    // 233
    return [function(action) {                                                  // 234
      if (action.type === type)                                                 // 235
        func(action);                                                           // 236
    }];                                                                         // 237
  } else {                                                                      // 238
    return arguments;                                                           // 239
  }                                                                             // 240
};                                                                              // 241
                                                                                // 242
/**                                                                             // 243
* Reset everything. Created for testing purposes                                // 244
*                                                                               // 245
*/                                                                              // 246
MeteorFlux.Dispatcher.prototype.reset = function() {                            // 247
  this._callbacks = {};                                                         // 248
  this._isPending = {};                                                         // 249
  this._isHandled = {};                                                         // 250
  this._registerFilters = [];                                                   // 251
  this._dispatchFilters = [];                                                   // 252
  this._isDispatching = false;                                                  // 253
  this._pendingPayload = null;                                                  // 254
};                                                                              // 255
                                                                                // 256
/**                                                                             // 257
* The main Dispatcher instance that clients will deal with                      // 258
*                                                                               // 259
* @exports Dispatcher                                                           // 260
*/                                                                              // 261
                                                                                // 262
Dispatcher = new MeteorFlux.Dispatcher();                                       // 263
Dispatcher.addDispatchFilter(Dispatcher._curatePayload);                        // 264
Dispatcher.addRegisterFilter(Dispatcher._curateCallback);                       // 265
                                                                                // 266
//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorflux:dispatcher'] = {
  Dispatcher: Dispatcher
};

})();

//# sourceMappingURL=meteorflux_dispatcher.js.map
