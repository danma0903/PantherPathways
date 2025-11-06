//graph contains a set of node objects
//nodes are classes
//what information do nodes need to have?
//what information do classes need to have?
//if every node conntains the edges to all of its adjacent nodes
//then we end up with duplicate vavlues being stored whereas
//if we use an adjacency matrix we only need one source of truth

class graph {
	constructor() {
		this.nodes = {};
	}

	addNode(node) {
		this.nodes[node.name] = node;
	}

	deleteNode(nodeName) {
		delete nodes.nodename;
	}
}

class node {
	constructor(xCoord, yCoord, nodeName, edges) {
		this.xCoord;
		this.yCoord;
		this.name;
		this.edges = edges;
	}

	getName() {
		return this.name;
	}
	getDistanceTo(nodeName) {
		for (edge of edges) {
			if (edge.contains(nodeName) && edge.contains(this.name)) {
				return edge.weight;
			} else {
				continue;
			}
		}
	}
}

class edge {
	constructor(weight, node1, node2) {
		this.weight = weight;
		this.leftNode = node1;
		this.rightNode = node2;
	}
}
