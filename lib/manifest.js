
var merge = require('package-merge');
var copy = require('./copy');
var path = require('path');

var defaults = {
	name: path.basename(process.cwd()),
	version: '0.1.0'
};

module.exports = function manifest() {
	return copy('package.json', [ 'package.json5', 'package.json' ], {
		transform: function(input, existing) {
			return merge(existing || JSON.stringify(defaults, null, '  '), input);
		}
	});
};
