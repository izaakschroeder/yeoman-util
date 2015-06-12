
var template = require('lodash/string/template');
var isFunction = require('lodash/lang/isFunction');
var isString = require('lodash/lang/isString');
var assign = require('lodash/object/assign');

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

		var d = this.destinationPath(vals.destination);
		var s = this.templatePath(vals.source);
		var e = this.fs.exists(d);

		if (!vals.overwrite && e) {
			return;
		}

		var tpl = template(this.fs.read(s));
		this.fs.write(d, tpl(this.data));
	}
}

module.exports = copy;
