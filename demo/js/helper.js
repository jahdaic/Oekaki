export const elt = (name, attributes, ...args) => {
	var node = document.createElement(name);

	if (attributes) {
		for (var attr in attributes)
			if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}

	for (var i = 0; i < args.length; i++) {
		var child = args[i];
		if (typeof child == "string") child = document.createTextNode(child);
		node.appendChild(child);
	}

	return node;
};

export const generateID = () => {
	return "10000000-1000-4000-8000-100000000000"
		.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

};

export const relativePosition = (ev, element) => {
	var rect = element.getBoundingClientRect();

	return {
		x: Math.floor(ev.clientX - rect.left),
		y: Math.floor(ev.clientY - rect.top)
	}
}