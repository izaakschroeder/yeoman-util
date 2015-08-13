
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
		var input = template(this.fs.read(src))(this.data);
		if (this.fs.exists(dst)) {
			var newpkg = merge(this.fs.read(dst), input);
			this.fs.write(dst, newpkg);
		} else {
			this.fs.write(dst, merge(JSON.stringify({
				version: '0.1.0'
			}, null, '  '), input));
		}
		this.npmInstall();
	}
}

module.exports = manifest;
