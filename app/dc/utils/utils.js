goog.provide('dc.utils');


/**
 * @param {number} num
 * @return {string}
 */
dc.utils.strPad = function(num) {
	return (num < 10 ? '0' : '') + num;
};
