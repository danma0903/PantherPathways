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
		this.nodes = [];
	}

	addNode(node) {
		this.nodes[node.name] = node;
	}

	deleteNode(nodeName) {
		delete nodes.nodename;
	}

	getNeighborNodes(node) {
		let neighborNodes = [];
		for (let i = 0; i < node.edges.length; i++) {
			if (node.edges[i].node1.getName() === node.getName() || node.edges[i].node2.getName() === node.getName()) {
				neighborNodes.push(node.edges[i].getOppositeNode(node));
				
			}
			else {
				console.log("no");
			}


		}
		return neighborNodes;




		// for all edges of node
		// if either node1 or node2 = this.node
		// return getOppositeNode(this.node)

		//}

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

let nas = new node(5, 5,  "Natural Science Building");
let RHN = new node(10, 10, "Rodda Hall North");
let RHS = new node(15, 15, "Rodda Hall South");
let library = new node(20, 20, "Library");

let edge1 = new edge(15, nas, RHN);
let edge2 = new edge(20, nas, RHS);
let edge3 = new edge(25, library, nas);

nas.addEdge(edge1);
nas.addEdge(edge2);
nas.addEdge(edge3);

let graph1 = new graph();
graph1.addNode(nas);
graph1.addNode(RHN);
graph1.addNode(RHS);
graph1.addNode(library);

const neighbors = graph1.getNeighborNodes(nas);
for (neighbor of neighbors) {
	console.log(neighbor.getName());
}

