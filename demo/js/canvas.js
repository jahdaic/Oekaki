import * as Helper from './helper.js';
import Controls from './controls.js';

export class Canvas {
	constructor(element, options) {
		this.id = Helper.generateID();
		this.root = element;
		this.options = {...this.options, ...options};

		this.createCanvas();
	}

	id = null;
	root = null;
	options = { height: 300, width: 500 };
	controls = {};
	canvas = null;
	context = null;
	panel = null;
	toolbar = null;

	createCanvas = () => {
		this.canvas = Helper.elt('canvas', {
			class: 'oekaki-canvas',
			width: this.options.width,
			height: this.options.height
		});
		this.context = this.canvas.getContext('2d');
		this.toolbar = Helper.elt('div', {class: 'oekaki-toolbar'});

		this.controls = new Controls(this.context);
		for (var name in this.controls) {
			this.toolbar.appendChild(this.controls[name]);
		}

		this.panel = Helper.elt('div', {class: 'oekaki-picture-panel'}, this.canvas);

		this.root.appendChild(Helper.elt('div', null, this.panel, this.toolbar));
	};
}

export default Canvas;