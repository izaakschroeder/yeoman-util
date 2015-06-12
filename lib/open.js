
var launch = require('open');

function open(file) {
	return function() {
		launch(this.destinationPath(file));
	}
}

module.exports = open;
