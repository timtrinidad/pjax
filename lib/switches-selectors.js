var forEachEls = require("./foreach-els")

var defaultSwitches = require("./switches")

module.exports = function(switches, switchesOptions, selectors, response, toEl, options) {
  var switchesQueue = [];

  selectors.forEach(function(selector) {
    var oldEl = toEl.querySelector(selector)

    var callback = switches[selector].bind(this, oldEl, response, options, switchesOptions[selector]);
    switchesQueue.push(callback);

  }, this)

  this.state.numPendingSwitches = switchesQueue.length

  switchesQueue.forEach(function(queuedSwitch) {
    queuedSwitch()
  })
}
