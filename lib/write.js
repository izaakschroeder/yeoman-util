
var path = require('./path');
var template = require('lodash/string/template');
var assign = require('lodash/object/assign');

function write(dst, data, options) {

	return function() {
		var d = path.call(this, dst);
		var tpl = template(data);
		this.fs.write(d, tpl(assign({ }, this.data, options)));
	}
}

module.exports = write;
