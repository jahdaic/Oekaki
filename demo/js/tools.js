import * as Helper from './helper.js';

class Tool {
	constructor() {}

	context = null;
	lastPosition = null;

	trackDrag = () => {
		var end = (ev) => {
			removeEventListener('mousemove', this.drag);
			removeEventListener('mouseup', end);

			if( this.stopDraw ) this.stopDraw(ev);
		};

		addEventListener('mousemove', this.drag);
		addEventListener('mouseup', end);
	};

	startDraw = (ev, context) => {};
	drag = () => {};
	stopDraw = () => {};
}

export class Pencil extends Tool {
	startDraw = (ev, context) => {
		this.context = context;
		this.lastPosition = Helper.relativePosition(ev, this.context.canvas);

		context.lineCap = 'round';

		this.trackDrag();
	};

	drag = (ev) => {
		this.context.beginPath();
		this.context.moveTo(this.lastPosition.x, this.lastPosition.y);

		this.lastPosition = Helper.relativePosition(ev, this.context.canvas);

		this.context.lineTo(this.lastPosition.x, this.lastPosition.y);
		this.context.stroke();
	};
}

export class Eraser extends Tool {
	startDraw = (ev, context) => {
		this.context = context;
		this.lastPosition = Helper.relativePosition(ev, this.context.canvas);

		context.globalCompositeOperation = 'destination-out';

		this.trackDrag();
	};

	drag = (ev) => {
		this.context.beginPath();
		this.context.moveTo(this.lastPosition.x, this.lastPosition.y);

		this.lastPosition = Helper.relativePosition(ev, this.context.canvas);

		this.context.lineTo(this.lastPosition.x, this.lastPosition.y);
		this.context.stroke();
	};

	stopDraw = (ev) => {
		this.context.globalCompositeOperation = 'source-over';
	};
}

export class Line extends Tool {
	startDraw = (ev, context) => {
		this.context = context;
		this.lastPosition = Helper.relativePosition(ev, this.context.canvas);

		context.lineCap = 'round';

		this.trackDrag();
	};

	stopDraw = (ev) => {
		var endPosition = Helper.relativePosition(ev, this.context.canvas);

		if(this.lastPosition.x === endPosition.x && this.lastPosition.y === endPosition.y) {
			return;
		}

		this.context.beginPath();
		this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
		this.context.lineTo(endPosition.x, endPosition.y);
		this.context.stroke();
	};
}

export class Circle extends Tool {
	startDraw = (ev, context) => {
		this.context = context;
		this.lastPosition = Helper.relativePosition(ev, this.context.canvas);

		context.lineCap = 'round';

		this.trackDrag();
	};

	stopDraw = (ev) => {
		var endPosition = Helper.relativePosition(ev, this.context.canvas);
		var height = Math.abs(this.lastPosition.y - endPosition.y);
		var width = Math.abs(this.lastPosition.x - endPosition.x);
		var x = Math.max(this.lastPosition.x, endPosition.x) - (width / 2);
		var y = Math.max(this.lastPosition.y, endPosition.y) - (height / 2);
		var r = Math.max(height, width) / 2;

		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2 * Math.PI);
		this.context.stroke();
	};
}

export class Rectangle extends Tool {
	startDraw = (ev, context) => {
		this.context = context;
		this.lastPosition = Helper.relativePosition(ev, this.context.canvas);

		context.lineCap = 'round';

		this.trackDrag();
	};

	stopDraw = (ev) => {
		var endPosition = Helper.relativePosition(ev, this.context.canvas);
		var x = Math.min(this.lastPosition.x, endPosition.x);
		var y = Math.min(this.lastPosition.y, endPosition.y);
		var height = Math.abs(this.lastPosition.y - endPosition.y);
		var width = Math.abs(this.lastPosition.x - endPosition.x);

		this.context.strokeRect(x, y, width, height);
	};
}