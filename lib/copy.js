
var assign = require('lodash/object/assign');
var identity = require('lodash/utility/identity');

var resolve = require('./resolve');
var returns = require('./returns');


function copy(dst, src, options) {
	options = assign({
		overwrite: true,
		transform: identity
	}, options);

	dst = returns(dst);
	src = returns(src);

	return function() {
		var fs = this.fs;
		var data = this.templateContext();

		var destination = this.destinationPath(dst.call(this, data));
		var source = src.call(this, data);

		if (!Buffer.isBuffer(source)) {
			const exists = fs.exists(destination);

			if (!options.overwrite && exists) {
				return;
			}

			source = resolve(fs, source, [
				this.filePath(),
				this.templatePath()
			]);

			if (!source) {
				return;
			}

			source = fs.read(source);
		}

		fs.write(destination, options.transform.call(
			this,
			source,
			exists ? fs.read(destination) : null,
			data
		));
	}
}

module.exports = copy;
