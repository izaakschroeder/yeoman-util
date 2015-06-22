
var map = require('lodash/collection/map');
var template = require('lodash/string/template');

function path(str) {
	var data = this.data;
	var res = map(str.split('/'), function(part) {
		return template(part)(data);
	}).join('/');
	if (res.charAt(0) === '~') {
		return this.destinationPath(res.substr(1));
	} else {
		return this.templatePath(res);
	}
}

module.exports = path;
