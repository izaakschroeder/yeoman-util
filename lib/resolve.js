
var path = require('path');
var find = require('lodash/collection/find');
var map = require('lodash/collection/map');
var multiplex = require('option-multiplexer');

module.exports = function(fs, source, search) {
	var sources = map(multiplex({
		search: search || '.',
		source: source
	}), function(entry) {
		return path.join(entry.search, entry.source)
	});

	return find(sources, function(source) {
		return fs.exists(source);
	});
}
