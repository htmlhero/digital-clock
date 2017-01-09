goog.provide('dc.widgets.HelpBar');
goog.require('zb.Timeout');
goog.require('zb.ui.HelpBar');



/**
 * @extends {zb.ui.HelpBar}
 * @constructor
 */
dc.widgets.HelpBar = function() {
	goog.base(this);
};
goog.inherits(dc.widgets.HelpBar, zb.ui.HelpBar);


/**
 * @return {Array.<zb.device.input.Keys>}
 */
dc.widgets.HelpBar.prototype.getKeys = function() {
	var keys = [];

	this._items.forEach(function(item) {
		keys.concat(item.getKeys());
	});

	return keys;
};
