import { ComplexityEntry } from '../types';

export const COMPLEXITY_DATA: ComplexityEntry[] = [
  {
    structure: 'Array',
    category: 'Linear Contiguous',
    access: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    search: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    insert: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    delete: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    space: 'O(N)',
    notes: 'Contiguous RAM block. Direct index math O(1). Insert/Delete requires shifting.'
  },
  {
    structure: 'Stack (Array / Linked)',
    category: 'Linear LIFO',
    access: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    search: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    insert: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    delete: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    space: 'O(N)',
    notes: 'Push and Pop strictly at TOP in O(1). Access to middle is restricted.'
  },
  {
    structure: 'Queue (Circular Buffer)',
    category: 'Linear FIFO',
    access: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    search: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    insert: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    delete: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    space: 'O(N)',
    notes: 'Enqueue at REAR, Dequeue at FRONT in O(1). Circular modulo avoids false overflow.'
  },
  {
    structure: 'Singly Linked List',
    category: 'Linear Dynamic Heap',
    access: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    search: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    insert: { best: 'O(1)', avg: 'O(1)', worst: 'O(N)' },
    delete: { best: 'O(1)', avg: 'O(1)', worst: 'O(N)' },
    space: 'O(N)',
    notes: 'O(1) prepend/append with tail pointer. O(N) traversal lookup without pointer arithmetic.'
  },
  {
    structure: 'Doubly Linked List',
    category: 'Linear Dynamic Heap',
    access: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    search: { best: 'O(1)', avg: 'O(N)', worst: 'O(N)' },
    insert: { best: 'O(1)', avg: 'O(1)', worst: 'O(N)' },
    delete: { best: 'O(1)', avg: 'O(1)', worst: 'O(N)' },
    space: 'O(N)',
    notes: 'Bidirectional prev & next pointers. Instant O(1) node deletion given a direct pointer.'
  },
  {
    structure: 'Binary Search Tree (BST)',
    category: 'Hierarchical',
    access: { best: 'O(1)', avg: 'O(log N)', worst: 'O(N)' },
    search: { best: 'O(1)', avg: 'O(log N)', worst: 'O(N)' },
    insert: { best: 'O(1)', avg: 'O(log N)', worst: 'O(N)' },
    delete: { best: 'O(1)', avg: 'O(log N)', worst: 'O(N)' },
    space: 'O(N)',
    notes: 'O(log N) average when balanced. Degenerates to O(N) linked list on sorted input.'
  },
  {
    structure: 'Balanced AVL / Red-Black Tree',
    category: 'Hierarchical Self-Balancing',
    access: { best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)' },
    search: { best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)' },
    insert: { best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)' },
    delete: { best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)' },
    space: 'O(N)',
    notes: 'Rotations maintain height balance. Strict logarithmic guarantee across all operations.'
  },
  {
    structure: 'Graph (Adjacency Matrix)',
    category: 'Network Matrix',
    access: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    search: { best: 'O(V)', avg: 'O(V)', worst: 'O(V)' },
    insert: { best: 'O(1)', avg: 'O(1)', worst: 'O(V^2)' },
    delete: { best: 'O(1)', avg: 'O(1)', worst: 'O(V^2)' },
    space: 'O(V^2)',
    notes: 'Instant O(1) edge lookup edgeExists(u, v). Quadratic O(V^2) memory footprint.'
  },
  {
    structure: 'Graph (Adjacency List)',
    category: 'Network Pointer Chain',
    access: { best: 'O(1)', avg: 'O(deg(V))', worst: 'O(V)' },
    search: { best: 'O(1)', avg: 'O(V + E)', worst: 'O(V + E)' },
    insert: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    delete: { best: 'O(1)', avg: 'O(deg(V))', worst: 'O(E)' },
    space: 'O(V + E)',
    notes: 'Optimal memory for sparse graphs O(V + E). Traversal via BFS/DFS in O(V + E).'
  }
];
