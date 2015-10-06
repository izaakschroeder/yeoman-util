
var map = require('lodash/collection/map');
var template = require('lodash/string/template');
var assign = require('lodash/object/assign');

function path(str) {
	var data = assign({}, this.options, this.data);
	var res = map(str.split('/'), function(part) {
		return template(part)(data);
	}).join('/');
	if (res.charAt(0) === '~') {
		return this.destinationPath(res.substr(res.charAt(1) === '/' ? 2 : 1));
	} else {
		return this.templatePath(res);
	}
}

module.exports = path;
