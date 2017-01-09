goog.provide('dc.Application');
goog.require('dc.BaseApplication');
goog.require('dc.services.Settings');
goog.require('zb.console');



/**
 * @extends {dc.BaseApplication}
 * @constructor
 */
dc.Application = function() {
	zb.console.setLevel(zb.console.Level.LOG);
	goog.base(this);

	this.services = {
		settings: new dc.services.Settings
	};
};
goog.inherits(dc.Application, dc.BaseApplication);


/**
 * @override
 */
dc.Application.prototype.onReady = function() {
	this.services.settings.setStorage(this.device.storage);
	this.setHomeScene('home');
};


/**
 * @override
 */
dc.Application.prototype.onStart = function() {
	if (this.isDeviceSamsung()) {
		this.device.screenSaverOff();
	}

	this.home();
};


/**
 * @type {{
 *     settings: dc.services.Settings
 * }}
 */
dc.Application.prototype.services;
