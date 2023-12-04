// helper classes for when we reach graph level challenges..

export class Node<T> {

  adjacent: { weight?: number, node: Node<T> }[];
  data: T;

  constructor(data: T) {
    this.adjacent = [];
    this.data = data;
  }

  addAdjacent(node: Node<T>, weight: number = Infinity): void {
    this.adjacent.push({ node, weight});
  }
}

export class Graph<T> {
  nodes: Map<T, Node<T>> = new Map();

  constructor() { }

  addNode(data: T): Node<T> {
    let node = this.nodes.get(data);
    if (node) return node;

    node = new Node(data);
    this.nodes.set(data, node);
    return node;
  }

  addEdge(source: T, destination: T, weight?: number): void {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addAdjacent(destinationNode);
  }
}

// function DijkstraAlgo(graph: Graph<T>, start: Node<T>, destination: Node<T>) {
//
// }

function test() {
  const graph: Graph<string> = new Graph()
  graph.addNode('a');
  graph.addNode('b');
  graph.addEdge('a', 'b', 10);
  graph.addNode('c');
  graph.addEdge('a', 'c', 5);
  graph.addEdge('b', 'c', 7);
  graph.addNode('d');
  graph.addEdge('a', 'd', 1);
  graph.addEdge('c', 'd', 4);
  graph.addNode('e');
  graph.addEdge('b', 'e', 10);
  graph.addEdge('d', 'e', 3);
}
