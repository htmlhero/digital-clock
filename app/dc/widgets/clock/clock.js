goog.provide('dc.widgets.Clock');
goog.require('dc.services.Settings');
goog.require('dc.utils');
goog.require('dc.widgets.templates.clock.clock');
goog.require('zb.Timeout');
goog.require('zb.html');
goog.require('zb.widgets.CuteWidget');



/**
 * @extends {zb.widgets.CuteWidget}
 * @constructor
 */
dc.widgets.Clock = function() {
	goog.base(this);

	this._updateViewInterval = null;
	this._colonsBlinkingTimeout = new zb.Timeout(this._setColonsVisible.bind(this, false), this.COLONS_SHOW_TIME);

	this._isColonsBlinking = false;

	if (app.services.settings.hasStorage()) {
		this._onSettingsInited();
	} else {
		app.services.settings.on(app.services.settings.EVENT_STORAGE_SETTED, this._onSettingsInited.bind(this));
	}

	app.services.settings.on(app.services.settings.EVENT_ITEM_CHANGED, this._onSettingsChanged.bind(this));
};
goog.inherits(dc.widgets.Clock, zb.widgets.CuteWidget);


/**
 * @override
 */
dc.widgets.Clock.prototype.isFocusable = function() {
	return false;
};


/**
 */
dc.widgets.Clock.prototype.start = function() {
	this._updateView();
	this._updateViewInterval = setInterval(this._updateView.bind(this), this.UPDATE_VIEW_INTERVAL);
};


/**
 */
dc.widgets.Clock.prototype.stop = function() {
	clearInterval(this._updateViewInterval);
	this._updateViewInterval = null;

	this._stopColonsBlinking();
};


/**
 * @override
 */
dc.widgets.Clock.prototype._renderTemplate = function() {
	return dc.widgets.templates.clock.clock(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @private
 */
dc.widgets.Clock.prototype._onSettingsInited = function() {
	this._setColonsBlinking(app.services.settings.isColonsBlinking());
	this._setSecondsVisible(app.services.settings.isSecondsVisible());
};


/**
 * @param {string} eventName
 * @param {dc.services.Settings.Key} key
 * @param {*} value
 * @private
 */
dc.widgets.Clock.prototype._onSettingsChanged = function(eventName, key, value) {
	switch (key) {
		case dc.services.Settings.Key.COLONS_BLINKING:
			this._setColonsBlinking(/** @type {boolean} */(value));
			break;
		case dc.services.Settings.Key.SECONDS_VISIBLE:
			this._setSecondsVisible(/** @type {boolean} */(value));
			break;
	}
};


/**
 * @param {boolean} isColonsBlinking
 * @private
 */
dc.widgets.Clock.prototype._setColonsBlinking = function(isColonsBlinking) {
	this._isColonsBlinking = isColonsBlinking;

	if (!isColonsBlinking) {
		this._stopColonsBlinking();
	}
};


/**
 * @param {boolean} isSecondsVisible
 * @private
 */
dc.widgets.Clock.prototype._setSecondsVisible = function(isSecondsVisible) {
	zb.html.updateClassName(this._container, '_seconds-visible', isSecondsVisible);
};


/**
 * @private
 */
dc.widgets.Clock.prototype._updateView = function() {
	this._renderDate(new Date);

	if (this._isColonsBlinking) {
		this._startColonsBlinking();
	}
};


/**
 * @param {Date} date
 * @private
 */
dc.widgets.Clock.prototype._renderDate = function(date) {
	var hours = dc.utils.strPad(date.getHours());
	var minutes = dc.utils.strPad(date.getMinutes());
	var seconds = dc.utils.strPad(date.getSeconds());
	var time = (hours + minutes + seconds).split('');

	time.forEach(function(item, index) {
		this._renderDigit(this._exported.digits[index], item);
	}, this);
};


/**
 * @param {HTMLElement} digit
 * @param {string} newValue
 * @private
 */
dc.widgets.Clock.prototype._renderDigit = function(digit, newValue) {
	var classList = digit.classList;

	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function(oldValue) {
		classList.remove('_' + oldValue);
	});

	classList.add('_' + newValue);
};


/**
 * @private
 */
dc.widgets.Clock.prototype._startColonsBlinking = function() {
	this._setColonsVisible(true);
	this._colonsBlinkingTimeout.restart();
};


/**
 * @private
 */
dc.widgets.Clock.prototype._stopColonsBlinking = function() {
	this._colonsBlinkingTimeout.stop();
	this._setColonsVisible(true);
};


/**
 * @param {boolean} isColonsVisible
 * @private
 */
dc.widgets.Clock.prototype._setColonsVisible = function(isColonsVisible) {
	zb.html.updateClassName(this._container, '_colons-visible', isColonsVisible);
};


/**
 * @type {dc.widgets.templates.clock.ClockOut}
 * @private
 */
dc.widgets.Clock.prototype._exported;


/**
 * @type {?number}
 * @private
 */
dc.widgets.Clock.prototype._updateViewInterval;


/**
 * @type {zb.Timeout}
 * @private
 */
dc.widgets.Clock.prototype._colonsBlinkingTimeout;


/**
 * @type {boolean}
 * @private
 */
dc.widgets.Clock.prototype._isColonsBlinking;


/**
 * @const {number}
 */
dc.widgets.Clock.prototype.COLONS_SHOW_TIME = 500;


/**
 * @const {number}
 */
dc.widgets.Clock.prototype.UPDATE_VIEW_INTERVAL = 1 * 1000;
