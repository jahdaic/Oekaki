import * as Helper from './helper.js';
import { Pencil, Eraser, Line, Circle, Rectangle } from './tools.js';

class Control {
	constructor(context) {
		this.context = context;
	}
}

export class Tools extends Control {
	constructor(context) {
		super(context);

		this.setupUI();
	}

	element = null;
	tools = {
		pencil: new Pencil(),
		eraser: new Eraser(),
		line: new Line(),
		circle: new Circle(),
		rectangle: new Rectangle()
	};

	setupUI = () => {
		this.element = Helper.elt('select');

		for (var name in this.tools) {
			this.element.appendChild(Helper.elt('option', null, name));
		}

		this.context.canvas.addEventListener('mousedown', (ev) => {
			if( ev.which === 1) {
				this.tools[this.element.value].startDraw(ev, this.context);
				ev.preventDefault();
			}
		});

		return Helper.elt('span', null, 'Tool: ', this.element);
	};
}

export class Controls {
	constructor(context) {
		this.tools = new Tools(context).element;
	}

	tools = null;
}

export default Controls;