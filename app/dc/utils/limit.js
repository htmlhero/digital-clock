goog.provide('dc.utils.limit');


/**
 * @param {function(...):RESULT} targetFunction
 * @param {number} waitTime
 * @return {function(...):RESULT}
 * @template RESULT
 */
dc.utils.limit.debounce = function(targetFunction, waitTime) {
	var timer = null;

	return function() {
		var args = arguments;

		function complete() {
			timer = null;
			return targetFunction.apply(null, args);
		}

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(complete, waitTime);
	};
};


/**
 * @param {function(...):RESULT} targetFunction
 * @param {number} waitTime
 * @return {function(...):RESULT}
 * @template RESULT
 */
dc.utils.limit.throttle = function(targetFunction, waitTime) {
	var lastEventTimestamp = null;

	return function() {
		var now = Date.now();

		if (!lastEventTimestamp || now - lastEventTimestamp >= waitTime) {
			lastEventTimestamp = now;
			return targetFunction.apply(null, arguments);
		}
	};
};
