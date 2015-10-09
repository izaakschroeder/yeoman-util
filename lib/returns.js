
var isFunction = require('lodash/lang/isFunction');

module.exports = function(entry) {
	if (!isFunction(entry)) {
		return function() {
			return entry;
		};
	}
	return entry;
};
