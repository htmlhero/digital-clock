goog.provide('dc.services.Settings');
goog.require('zb.events.EventPublisher');



/**
 * @extends {zb.events.EventPublisher}
 * @constructor
 */
dc.services.Settings = function() {
	goog.base(this);

	this._settingsList = [
		dc.services.Settings.Key.COLONS_BLINKING,
		dc.services.Settings.Key.SECONDS_VISIBLE
	];

	this._settingsDefault = {};
	this._settingsDefault[dc.services.Settings.Key.COLONS_BLINKING] = false;
	this._settingsDefault[dc.services.Settings.Key.SECONDS_VISIBLE] = true;

	this._storage = null;
};
goog.inherits(dc.services.Settings, zb.events.EventPublisher);


/**
 * @return {boolean}
 */
dc.services.Settings.prototype.hasStorage = function() {
	return !!this._storage;
};


/**
 * @param {zb.device.IStorage} storage
 */
dc.services.Settings.prototype.setStorage = function(storage) {
	this._storage = storage;
	this._fireEvent(this.EVENT_STORAGE_SETTED);
};


/**
 * @param {dc.services.Settings.Key} key
 * @param {*} value
 */
dc.services.Settings.prototype.setItem = function(key, value) {
	var settings = {};
	this._settingsList.forEach(function(item) {
		settings[item] = (item === key) ? value : this.getItem(item);
	}, this);

	this._storage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
	this._fireEvent(this.EVENT_ITEM_CHANGED, key, value);
};


/**
 * @param {dc.services.Settings.Key} key
 * @return {*}
 */
dc.services.Settings.prototype.getItem = function(key) {
	var settings = this._storage.getItem(this.STORAGE_KEY);
	return settings ? JSON.parse(settings)[key] : this._settingsDefault[key];
};


/**
 * @return {boolean}
 */
dc.services.Settings.prototype.isColonsBlinking = function() {
	return /** @type {boolean} */(this.getItem(dc.services.Settings.Key.COLONS_BLINKING));
};


/**
 */
dc.services.Settings.prototype.toggleDotsBlinking = function() {
	this.setItem(dc.services.Settings.Key.COLONS_BLINKING, !this.isColonsBlinking());
};


/**
 * @return {boolean}
 */
dc.services.Settings.prototype.isSecondsVisible = function() {
	return /** @type {boolean} */(this.getItem(dc.services.Settings.Key.SECONDS_VISIBLE));
};


/**
 */
dc.services.Settings.prototype.toggleSecondsVisible = function() {
	this.setItem(dc.services.Settings.Key.SECONDS_VISIBLE, !this.isSecondsVisible());
};


/**
 * @type {Array.<dc.services.Settings.Key>}
 * @private
 */
dc.services.Settings.prototype._settingsList;


/**
 * @type {Object.<dc.services.Settings.Key,*>}
 * @private
 */
dc.services.Settings.prototype._settingsDefault;


/**
 * @type {?zb.device.IStorage}
 * @private
 */
dc.services.Settings.prototype._storage;


/**
 * @const {string}
 */
dc.services.Settings.prototype.STORAGE_KEY = 'Settings';


/**
 * @const {string}
 */
dc.services.Settings.prototype.EVENT_STORAGE_SETTED = 'storage-setted';


/**
 * Fired with: {dc.services.Settings.Key} key, {*} value
 * @const {string}
 */
dc.services.Settings.prototype.EVENT_ITEM_CHANGED = 'item-changed';


/**
 * @enum {string}
 */
dc.services.Settings.Key = {
	COLONS_BLINKING: 'colons-blinking',
	SECONDS_VISIBLE: 'seconds-visible'
};
