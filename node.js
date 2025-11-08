//graph contains a set of node objects
//nodes are classes
//what information do nodes need to have?
//what information do classes need to have?
//if every node conntains the edges to all of its adjacent nodes
//then we end up with duplicate vavlues being stored whereas
//if we use an adjacency matrix we only need one source of truth

//example change
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

	getNeighborNodes(node, ) {

	}
}

class node {
	constructor(xCoord, yCoord, nodeName) {
		this.xCoord = xCoord;
		this.yCoord = yCoord;
		this.name = nodeName;
		this.edges = [];
	}

	addEdge(edge) {
		this.edges.push(edge);
	}
	getName() {
		return this.name;
	}
	getDistanceTo(node) {
		//should this function assume that all nodes being requested
		//to are properly connected?
		for (edge of this.edges) {
			if (
				edge.getNodes().includes(this.name) &&
				edge.getNodes().includes(node.getName())
			) {
				return edge.weight;
			} else {
				continue;
			}
		}
		return -1;
	}
}

class edge {
	constructor(weight, node1, node2) {
		this.weight = weight;
		this.node1 = node1;
		this.node2 = node2;
	}

	getNodes() {
		//returns the names of the nodes the edge attaches
		return [this.leftNode.getName(), this.rightNode.getName()];
	}
	getOppositeNode(node) {

		if (node.getName() != this.node1.getName() && node.getName() != this.node2.getName()) {
			throw new Error("Invalid node");
		}
		return node.getName() === this.node1.getName() ? this.node2 : this.node1;
	}
}

let nas = new node(5, 5, "Natural Science Buildling");
console.log(nas.getName());

let library = new node(10, 10, "library");
let testEdge =  new edge(15, nas, library);
let nDas = new node (12, 12, "fdsfs");

console.log(testEdge.getOppositeNode(nDas).getName());
