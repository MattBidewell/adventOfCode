# Dijkstra

```
 1 function Dijkstra(Graph, source):
 2
 3      for each vertex v in Graph.Vertices:
 4          dist[v] ← INFINITY
 5          prev[v] ← UNDEFINED
 6          add v to Q
 7      dist[source] ← 0
 8
 9      while Q is not empty:
10          u ← vertex in Q with min dist[u]
11          remove u from Q
12
13          for each neighbor v of u still in Q:
14              alt ← dist[u] + Graph.Edges(u, v)
15              if alt < dist[v]:
16                  dist[v] ← alt
17                  prev[v] ← u
18
19      return dist[], prev[]
```

```
1  S ← empty sequence
2  u ← target
   // Do something only if the vertex is reachable
3  if prev[u] is defined or u = source:
   // Construct the shortest path with a stack S
4      while u is defined:
   // Push the vertex onto the stack
5          insert u at the beginning of S
   // Traverse from target to source
6          u ← prev[u]
```