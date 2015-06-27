
var launch = require('open');
var path = require('./path');

function open(file) {
	return function() {
		launch(path.call(this, file));
	}
}

module.exports = open;
