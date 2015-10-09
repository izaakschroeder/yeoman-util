
var copy = require('./copy');

module.exports = function write(dst, data, options) {
	return copy(dst, new Buffer(data), options);
}
