goog.provide('dc.widgets.helpBarItemFactory');
goog.require('zb.device.input.Keys');
goog.require('zb.ui.HelpBarItem');


/**
 * @param {zb.ui.HelpBarItem.Options} options
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
dc.widgets.helpBarItemFactory.item = function(options, opt_callback) {
	var item = new zb.ui.HelpBarItem(options);

	var callback = typeof opt_callback === 'function' ? opt_callback : function() {};
	item.on(item.EVENT_CLICK, callback);

	return item;
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
dc.widgets.helpBarItemFactory.red = function(label, opt_callback) {
	var options = {
		cssClass: '_red',
		label: label,
		keys: [zb.device.input.Keys.RED]
	};

	return dc.widgets.helpBarItemFactory.item(options, opt_callback);
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
dc.widgets.helpBarItemFactory.green = function(label, opt_callback) {
	var options = {
		cssClass: '_green',
		label: label,
		keys: [zb.device.input.Keys.GREEN]
	};

	return dc.widgets.helpBarItemFactory.item(options, opt_callback);
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
dc.widgets.helpBarItemFactory.yellow = function(label, opt_callback) {
	var options = {
		cssClass: '_yellow',
		label: label,
		keys: [zb.device.input.Keys.YELLOW]
	};

	return dc.widgets.helpBarItemFactory.item(options, opt_callback);
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
dc.widgets.helpBarItemFactory.blue = function(label, opt_callback) {
	var options = {
		cssClass: '_blue',
		label: label,
		keys: [zb.device.input.Keys.BLUE]
	};

	return dc.widgets.helpBarItemFactory.item(options, opt_callback);
};


/**
 * @param {string} label
 * @param {function()=} opt_callback
 * @return {zb.ui.HelpBarItem}
 */
dc.widgets.helpBarItemFactory.back = function(label, opt_callback) {
	var options = {
		cssClass: '_back',
		label: label,
		keys: [zb.device.input.Keys.BACK, zb.device.input.Keys.EXIT]
	};

	return dc.widgets.helpBarItemFactory.item(options, opt_callback || app.back.bind(app));
};
