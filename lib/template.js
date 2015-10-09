
var template = require('lodash/string/template');
var assign = require('lodash/object/assign');
var copy = require('./copy');

module.exports = function(dst, src, options) {
	return copy(dst, src, assign({
		transform: function(contents, existing, data) {
			return template(contents)(data);
		}
	}, options));
}
