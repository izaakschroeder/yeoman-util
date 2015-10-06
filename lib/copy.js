
var template = require('lodash/string/template');
var isFunction = require('lodash/lang/isFunction');
var isString = require('lodash/lang/isString');
var assign = require('lodash/object/assign');
var path = require('./path');

function copy(dst, src, options) {
	var params;

	if (isFunction(dst)) {
		params = dst;
	} else {
		if (!isString(src)) {
			options = src;
			src = dst;
		}
		params = function() {
			return assign({
				source: src,
				destination: dst
			}, options);
		}
	}

	return function() {
		var vals = assign({
			overwrite: true
		}, params.call(this));

		var d = path.call(this, vals.destination);
		var s = path.call(this, vals.source);
		var e = this.fs.exists(d);

		if ((!vals.overwrite && e) || !this.fs.exists(s)) {
			return;
		}

		var tpl = template(this.fs.read(s));
		this.fs.write(d, tpl(assign({}, this.options, this.data)));
	}
}

module.exports = copy;
