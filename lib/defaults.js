
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
		defaults(this.data, call.call(this));
	}
}

module.exports = get;
