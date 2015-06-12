
var merge = require('package-merge');
var template = require('lodash/string/template');
var map = require('lodash/collection/map');
var find = require('lodash/collection/find');

function path(v) {
	return this.templatePath(v);
}

function exists(v) {
	return this.fs.exists(v);
}

function manifest() {
	return function() {
		var choices = [ 'package.json', 'package.json5' ];
		var src = find(map(choices, path, this), exists, this);
		var dst = this.destinationPath('package.json');
		var input = template(this.fs.read(src))(this);
		this.fs.write(dst, merge(this.fs.read(dst), input));
		this.npmInstall();
	}
}

module.exports = manifest;
