
var template = require('lodash/string/template');

function copy(dst, src) {
	if (!src) {
		src = dst;
	}

	return function() {
		var tpl = template(this.fs.read(this.templatePath(src)));
		this.fs.write(this.destinationPath(dst), tpl(this));
	}
}

module.exports = copy;
