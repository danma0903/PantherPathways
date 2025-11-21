//graph contains a set of node objects
//nodes are classes
//what information do nodes need to have?
//what information do classes need to have?
//if every node conntains the edges to all of its adjacent nodes
//then we end up with duplicate vavlues being stored whereas
//if we use an adjacency matrix we only need one source of truth

//example change

//rename node to graphNode and change line 37 to reference graphNode instead of node
class graph {
	constructor() {
		this.nodes = [];
		this.numNodes = 0;
		this.edges = [];
	}

	getNodes() {
		return this.nodes;
	}

	getNode(nodeName) {
		for (const curr_node of this.nodes) {
			if (curr_node.getName() === nodeName) {
				return curr_node;
			}
		}
		throw new Error("Node not found!");
	}

	getDistanceBetween(node1Name, node2Name) {
		const node1 = this.getNode(node1Name);
		const node2 = this.getNode(node2Name);
		return node1.getDistanceTo(node2);
	}

	createNode(xCoord, yCoord, nodeName) {
		const newNode = new graphNode(xCoord, yCoord, nodeName);
		this.nodes.push(newNode);
		this.numNodes += 1;
		//console.log(this.nodes);
		// Later implement test for duplicates
	}

	deleteNode(nodeName) {
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].getName() === nodeName) {
				if (i === this.nodes.length - 1) {
					this.nodes.pop();
					this.numNodes -= 1;
				} else {
					console.log(this.nodes.length);
					this.nodes[i] = this.nodes[this.nodes.length - 1];
					this.nodes.pop();
					this.numNodes -= 1;
				}
			}
		}
	}

	getNeighborNodes(node) {
		let neighborNodes = [];
		for (let i = 0; i < node.edges.length; i++) {
			if (
				node.edges[i].node1.getName() === node.getName() ||
				node.edges[i].node2.getName() === node.getName()
			) {
				neighborNodes.push(node.edges[i].getOppositeNode(node));
			} else {
				console.log("no");
			}
		}
		return neighborNodes;

		// for all edges of node
		// if either node1 or node2 = this.node
		// return getOppositeNode(this.node)

		//}
	}

	addEdge(weight, node1Name, node2Name) {
		const node1 = this.getNode(node1Name);
		const node2 = this.getNode(node2Name);
		const newEdge = new graphEdge(weight, node1, node2);
		node1.addEdge(newEdge);
		node2.addEdge(newEdge);
		this.edges.push(newEdge);
	}
	getEdges() {
		return this.edges;
	}
}

class graphNode {
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
		for (const edge of this.edges) {
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

class graphEdge {
	constructor(weight, node1, node2) {
		this.weight = weight;
		this.node1 = node1;
		this.node2 = node2;
	}

	getNodes() {
		//returns the names of the nodes the edge attaches
		return [this.node1.getName(), this.node2.getName()];
	}
	getOppositeNode(node) {
		if (
			node.getName() != this.node1.getName() &&
			node.getName() != this.node2.getName()
		) {
			throw new Error("Invalid node");
		}
		return node.getName() === this.node1.getName() ? this.node2 : this.node1;
	}
}

function Dijkstras(graph, sourceNodeName) {
	let queue = [];
	let prev = {};
	let dists = {};

	for (const node of graph.getNodes()) {
		dists[node.getName()] = Infinity;
		prev[node.getName()] = null;
	}

	dists[sourceNodeName] = 0;
	queue.push([0, graph.getNode(sourceNodeName)]);

	//  queue.push([1, "abc"]);
	// queue.push([5, "blabhba"]);
	// queue.push([3, "testing333"]);
	// queue.push([8, "fdsfsdfdd"]);
	// queue.sort((b, a) => a[0] - b[0]);
	// queue.pop()
	// console.log("Sorted queue: ", queue);

	while (queue.length > 0) {
		queue.sort((a, b) => {
			a[0] - b[0];
		});
		const [currentDist, currentNode] = queue.pop();
		if (currentDist > dists[currentNode.getName()]) {
			continue;
		}
		const currentNodeNeighbors = graph.getNeighborNodes(currentNode);
		for (neighbor of currentNodeNeighbors) {
			const weight = graph.getDistanceBetween(
				currentNode.getName(),
				neighbor.getName()
			);
			const newDist = dists[currentNode.getName()] + weight;
			if (newDist < dists[neighbor.getName()]) {
				dists[neighbor.getName()] = newDist;
				prev[neighbor.getName()] = currentNode.getName();
				queue.push([newDist, neighbor]);
			}
		}
	}

	return [dists, prev];
}

let graph1 = new graph();
async function loadNodes(graph) {
	const nodes = await fetch("/front-end/data.json").then((response) =>
		response.json()
	);
	for (curr_node of nodes.nodes) {
		graph.createNode(
			curr_node.coordinates.x,
			curr_node.coordinates.y,
			curr_node.name
		);
	}
}

async function loadEdges(graph) {
	const edges = await fetch("/front-end/data.json").then((response) =>
		response.json()
	);

	for (curr_edge of edges.edges) {
		graph.addEdge(curr_edge.weight, curr_edge.from, curr_edge.to);
	}
}

async function loadGraph(graph) {
	await loadNodes(graph);
	await loadEdges(graph);

	console.log(Dijkstras(graph1, "0"));
}

console.log(graph1.getNodes());
console.log(graph1.getEdges());
loadGraph(graph1);

//

//

//

//

//

//

//

//

// console.log(Dijkstras(graph1, "0"));

//console.log(graph1.nodes[2].getName());

// let nas = new node(5, 5,  "Natural Science Building");
// let RHN = new node(10, 10, "Rodda Hall North");
// let RHS = new node(15, 15, "Rodda Hall South");
// let library = new node(20, 20, "Library");

// let edge1 = new edge(15, nas, RHN);
// let edge2 = new edge(20, nas, RHS);
// let edge3 = new edge(25, library, nas);

// nas.addEdge(edge1);
// nas.addEdge(edge2);
// nas.addEdge(edge3);

// let graph1 = new graph();
// graph1.addNode(nas);
// graph1.addNode(RHN);
// graph1.addNode(RHS);
// graph1.addNode(library);

// const neighbors = graph1.getNeighborNodes(nas);
// for (neighbor of neighbors) {
// 	console.log(neighbor.getName());
// }
