
var defaults = require('lodash/object/defaults');
var isFunction = require('lodash/lang/isFunction');
var has = require('lodash/object/has');

function get(val) {

	var call;
	if (!isFunction(val)) {
		call = function() { return val; }
	} else {
		call = val;
	}

	return function() {
		if (!has(this, 'data')) {
			this.data = { };
		}
		// Just defaults… if an error occurs then who cares? The user just does
		// not get their default value.
		try {
			defaults(this.data, call.call(this));
		} catch (e) {
			// TODO: Warn
		}
	}
}

module.exports = get;
