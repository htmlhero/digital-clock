goog.provide('dc.scenes.HomeOsd');
goog.require('zb.Timeout');
goog.require('zb.events.EventPublisher');
goog.require('zb.html');



/**
 * @param {dc.scenes.HomeOsd.Input} input
 * @extends {zb.events.EventPublisher}
 * @constructor
 */
dc.scenes.HomeOsd = function(input) {
	goog.base(this);

	this._helpBar = input.helpBar;
	this._isHelpBarVisible = false;

	this._helpBarTimer = new zb.Timeout(this.hideHelpBar.bind(this), this.HELP_BAR_SHOW_TIME);
};
goog.inherits(dc.scenes.HomeOsd, zb.events.EventPublisher);


/**
 */
dc.scenes.HomeOsd.prototype.beforeDOMShow = function() {
	this.showHelpBar();
};


/**
 */
dc.scenes.HomeOsd.prototype.afterDOMHide = function() {
	this.hideHelpBar();
};


/**
 */
dc.scenes.HomeOsd.prototype.showHelpBar = function() {
	this._helpBarTimer.restart();
	this._setHelpBarVisible(true);
};


/**
 */
dc.scenes.HomeOsd.prototype.hideHelpBar = function() {
	this._helpBarTimer.stop();
	this._setHelpBarVisible(false);
};


/**
 * @param {zb.device.input.Keys} zbKey
 * @param {KeyboardEvent|WheelEvent=} opt_e
 * @return {boolean} True if Key handled, false if not
 */
dc.scenes.HomeOsd.prototype.processKey = function(zbKey, opt_e) {
	var keys = zb.device.input.Keys;
	var isHandled = false;

	if (!this._isHelpBarVisible) {
		var isEnter = zbKey === keys.ENTER;
		var isNavigation = zbKey === keys.UP || zbKey === keys.RIGHT || zbKey === keys.DOWN || zbKey === keys.LEFT;
		isHandled = isEnter || isNavigation;
	}

	this.showHelpBar();

	return isHandled;
};


/**
 * @param {boolean} isHelpBarVisible
 * @private
 */
dc.scenes.HomeOsd.prototype._setHelpBarVisible = function(isHelpBarVisible) {
	zb.html.showHide(this._helpBar, isHelpBarVisible);
	this._isHelpBarVisible = isHelpBarVisible;
};


/**
 * @type {HTMLElement}
 * @private
 */
dc.scenes.HomeOsd.prototype._helpBar;


/**
 * @type {zb.Timeout}
 * @private
 */
dc.scenes.HomeOsd.prototype._helpBarTimer;


/**
 * @type {boolean}
 * @private
 */
dc.scenes.HomeOsd.prototype._isHelpBarVisible;


/**
 * @const {number}
 */
dc.scenes.HomeOsd.prototype.HELP_BAR_SHOW_TIME = 5 * 1000;


/**
 * @typedef {{
 *     helpBar: HTMLElement
 * }}
 */
dc.scenes.HomeOsd.Input;
