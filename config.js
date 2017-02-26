/**
 * @return {Object}
 */
module.exports = function() {
	return {
		appNamespace: 'dc',
		samsung: {
			widgetConfig: {
				widget: {
					ThumbIcon: 'custom-platforms/samsung/icons/106x86.png',
					BigThumbIcon: 'custom-platforms/samsung/icons/115x95.png',
					ListIcon: 'custom-platforms/samsung/icons/85x70.png',
					BigListIcon: 'custom-platforms/samsung/icons/95x78.png',
					mouse: 'y',
					widgetname: 'Digital Clock'
				}
			}
		},
		compilation: {
//			level: 'WHITESPACE_ONLY'
		}
	};
};
