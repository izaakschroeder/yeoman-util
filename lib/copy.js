
var assign = require('lodash/object/assign');
var identity = require('lodash/utility/identity');
var template = require('lodash/string/template');

var resolve = require('./resolve');
var returns = require('./returns');

function templ(contents, existing, data) {
	return template(contents)(data);
}

function sub(base, item) {
	return item.substr(0, base.length) === base;
}

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

			// For items in the template directory use the template transform.
			if (sub(this.templatePath(), source)) {
				const previous = options.transform;
				options.transform = (a, b, c) => previous(templ(a,b,c), b, c);
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
