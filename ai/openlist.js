/*
 *  OpenList Class implements a Binary Heap
 */

class OpenList {

	Object[] content = {};
	Object scoreFunction;

	OpenList(Object scoreFunction) {
		this.scoreFunction = scoreFunction;
	}

    void push(Object element) {
	// Add the new element to the end of the array.
	this.content.push(element);
	// Allow it to bubble up.
	this.bubbleUp(this.content.length - 1);
}

Object pop() {
	// Store the first element so we can return it later.
	Object result = this.content[0];
	// Get the element at the end of the array.
	Object end = this.content.pop();
	// If there are any elements left, put the end element at the
	// start, and let it sink down.
	if (this.content.length > 0) {
		this.content[0] = end;
		this.sinkDown(0);
	}
	return result;
}

void remove(Object node) {
	int len = this.content.length;
	// To remove a value, we must search through 
	// the array to find it.
	for (int i = 0; i < len; i++) {
		if (this.content[i] == node) {
			// When it is found, the process seen in 'pop' is repeated
			// to fill up the hole.
			Object end = this.content.pop();
			if (i != len - 1) {
				this.content[i] = end;
				if (this.scoreFunction.score(end) < this.scoreFunction.score(node))
					this.bubbleUp(i);
				else
					this.sinkDown(i);
			}
			return;
		}
	}
	throw new Error("Node not found.");
}

int size() {
	return this.content.length;
}

void bubbleUp(int n) {
	// Fetch the element that has to be moved.
	Object element = this.content[n];
	// When at 0, an element can not go up any further.
	while (n > 0) {
		// Compute the parent element's index, and fetch it.
		int parentN = Math.floor((n + 1) / 2) - 1;
		Object parent = this.content[parentN];
		// Swap the elements if the parent is greater.
		if (this.scoreFunction.score(element) < this.scoreFunction.score(parent)) {
			this.content[parentN] = element;
			this.content[n] = parent;
			// Update 'n' to continue at the new position.
			n = parentN;
		}
		// Found a parent that is less, no need to move it further.
		else {
			break;
		}
	}
}

void sinkDown(int n) {
	// Look up the target element and its score.
	int length = this.content.length;
	Object element = this.content[n];
	int elemScore = this.scoreFunction.score(element);

	while (true) {
		// Compute the indices of the child elements.
		int child2N = (n + 1) * 2, child1N = child2N - 1;
		// This is used to store the new position of the element,
		// if any.
		int swap = null;
		// If the first child exists (is inside the array)...
		if (child1N < length) {
			// Look it up and compute its score.
			Object child1 = this.content[child1N];
			int child1Score = this.scoreFunction.score(child1);
			// If the score is less than our element's, we need to swap.
			if (child1Score < elemScore)
				swap = child1N;
		}
		// Do the same checks for the other child.
		if (child2N < length) {
			Object child2 = this.content[child2N];
			int child2Score = this.scoreFunction.score(child2);
			if (child2Score < (swap == null ? elemScore : child1Score))
				swap = child2N;
		}

		// If the element needs to be moved, swap it, and continue.
		if (swap != null) {
			this.content[n] = this.content[swap];
			this.content[swap] = element;
			n = swap;
		}
		// Otherwise, we are done.
		else {
			break;
		}
	}
}
}