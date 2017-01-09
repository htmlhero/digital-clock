goog.provide('dc.scenes.Home');
goog.require('dc.scenes.HomeOsd');
goog.require('dc.scenes.templates.home.home');
goog.require('dc.utils.limit');
goog.require('dc.widgets.helpBarItemFactory');
goog.require('zb.Timeout');
goog.require('zb.device.input.Keys');
goog.require('zb.layers.CuteScene');



/**
 * @extends {zb.layers.CuteScene}
 * @constructor
 */
dc.scenes.Home = function() {
	goog.base(this);
	this._addContainerClass('s-home');

	this._initHelpBar();
	this._initOsd();

	this._onMoveOrClick = this._onMoveOrClick.bind(this);
	this._onMoveOrClickTrottled = dc.utils.limit.throttle(this._onMoveOrClick, this.MOVE_OR_CLICK_DELAY);
};
goog.inherits(dc.scenes.Home, zb.layers.CuteScene);


/**
 * @override
 */
dc.scenes.Home.prototype.beforeDOMShow = function(state, data) {
	goog.base(this, 'beforeDOMShow', state, data);

	this._osd.beforeDOMShow();
};


/**
 * @override
 */
dc.scenes.Home.prototype.afterDOMShow = function(state, data) {
	goog.base(this, 'afterDOMShow', state, data);

	document.addEventListener('click', this._onMoveOrClick, false);
	document.addEventListener('mousemove', this._onMoveOrClickTrottled, false);

	this._exported.clock.start();
};


/**
 * @override
 */
dc.scenes.Home.prototype.beforeDOMHide = function() {
	this._exported.clock.stop();

	document.removeEventListener('click', this._onMoveOrClick, false);
	document.removeEventListener('mousemove', this._onMoveOrClickTrottled, false);

	goog.base(this, 'beforeDOMHide');
};


/**
 * @override
 */
dc.scenes.Home.prototype.afterDOMHide = function() {
	goog.base(this, 'afterDOMHide');

	this._osd.afterDOMHide();
};


/**
 * @override
 */
dc.scenes.Home.prototype.processKey = function(zbKey, e) {
	var isHelpBarKey = this._exported.helpBar.getKeys().indexOf(zbKey) !== -1;

	if (!isHelpBarKey && this._osd.processKey(zbKey, e)) {
		return true;
	}

	if (this._exported.helpBar.processHelpBarKey(zbKey, e)) {
		return true;
	}

	return goog.base(this, 'processKey', zbKey, e);
};


/**
 * @override
 */
dc.scenes.Home.prototype._renderTemplate = function() {
	return dc.scenes.templates.home.home(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @private
 */
dc.scenes.Home.prototype._initHelpBar = function() {
	this._exported.helpBar.setOrder([
		zb.device.input.Keys.RED,
		zb.device.input.Keys.GREEN,
		zb.device.input.Keys.YELLOW,
		zb.device.input.Keys.BLUE,
		zb.device.input.Keys.BACK
	]);

	this._exported.helpBar.setItems([
		dc.widgets.helpBarItemFactory.red('Toggle colons', function() {
			app.services.settings.toggleDotsBlinking();
		}),
		dc.widgets.helpBarItemFactory.green('Toggle seconds', function() {
			app.services.settings.toggleSecondsVisible();
		}),
		dc.widgets.helpBarItemFactory.back('Exit')
	]);
};


/**
 * @private
 */
dc.scenes.Home.prototype._initOsd = function() {
	this._osd = new dc.scenes.HomeOsd({
		helpBar: this._exported.helpBar.getContainer()
	});
};


/**
 * @param {Event} event
 * @private
 */
dc.scenes.Home.prototype._onMoveOrClick = function(event) {
	if (this._container.contains(/** @type {Node} */(event.target))) {
		this._osd.showHelpBar();
	}
};


/**
 * @type {dc.scenes.templates.home.HomeOut}
 * @private
 */
dc.scenes.Home.prototype._exported;


/**
 * @type {dc.scenes.HomeOsd}
 * @private
 */
dc.scenes.Home.prototype._osd;


/**
 * @const {number}
 */
dc.scenes.Home.prototype.MOVE_OR_CLICK_DELAY = 1 * 1000;
