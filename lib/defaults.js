
var defaults = require('lodash/object/defaults');
var has = require('lodash/object/has');
var returns = require('./returns');

function get(val) {
	val = returns(val);
	return function() {
		if (!has(this, 'data')) {
			this.data = { };
		}
		defaults(this.data, val.call(this));
	}
}

module.exports = get;
