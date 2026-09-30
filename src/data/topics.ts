import { TopicData } from '../types';

export const TOPICS: Record<string, TopicData> = {
  stack: {
    id: 'stack',
    name: 'Stack',
    tagline: 'Last-In, First-Out (LIFO) Linear Sequential Memory Buffer',
    category: 'Linear',
    readTime: '6 min read',
    level: 'Beginner',
    memoryModel: 'Contiguous RAM',
    summary: 'A Stack is a restricted linear data structure where element insertion and removal occur strictly at one designated endpoint known as the TOP. It governs function call stacks, recursive backtracking, syntax parsing, and undo histories.',
    analogy: {
      title: 'The Spring-Loaded Cafeteria Tray Dispenser',
      description: 'Imagine clean trays pushed down into a spring-loaded cylinder in a dining hall. You can only inspect or grab the tray currently sitting at the absolute top (PEEK/POP). The first tray loaded at the very bottom cannot be extracted until every subsequent tray placed on top of it has been removed.'
    },
    characteristics: [
      {
        title: 'LIFO Protocol',
        badge: 'LIFO ORDER',
        description: 'Last-In, First-Out: the most recently pushed element is guaranteed to be the first element retrieved.'
      },
      {
        title: 'Strict O(1) Push and Pop',
        badge: 'CONSTANT TIME',
        description: 'Because elements are never inserted or removed from the middle, all core operations execute in instant O(1) time without element shifting.'
      },
      {
        title: 'Dual Memory Implementations',
        badge: 'ARRAY VS LINKED',
        description: 'Can be backed by a fixed contiguous array with a integer top index, or dynamic heap-allocated linked nodes with zero capacity ceiling.'
      }
    ],
    cStruct: `// Fixed-Capacity Stack in C99
#define STACK_CAPACITY 100

typedef struct {
    int data[STACK_CAPACITY];  /* Contiguous storage buffer */
    int top;                   /* Index of the topmost element (-1 if empty) */
} Stack;

/* Linked Node Stack Implementation */
struct StackNode {
    int val;
    struct StackNode* next;    /* Points downward to the preceding node */
};`,
    operations: [
      {
        name: '1. Push (Insert at Top)',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Increments the top index and places the new element into the top slot after verifying the stack has not overflowed.',
        steps: [
          'Verify that top < CAPACITY - 1 (avoid buffer overflow).',
          'Increment top index: top = top + 1.',
          'Assign value to data array: data[top] = value.'
        ],
        pointerFlow: [
          'Step 1: Check (s->top >= CAPACITY - 1) ? return STACK_OVERFLOW',
          'Step 2: s->top++;',
          'Step 3: s->data[s->top] = val;'
        ],
        cCode: `bool push(Stack* s, int val) {
    if (s->top >= STACK_CAPACITY - 1) {
        printf("Error: Stack Overflow! Cannot push %d\\n", val);
        return false;
    }
    s->top++;
    s->data[s->top] = val;
    return true;
}`
      },
      {
        name: '2. Pop (Remove from Top)',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Retrieves the current top item, decrements the top index, and safely reports underflow if the stack was already empty.',
        steps: [
          'Verify that top >= 0 (avoid underflow).',
          'Read the value stored at data[top].',
          'Decrement top index: top = top - 1 and return value.'
        ],
        pointerFlow: [
          'Step 1: Check (s->top == -1) ? return STACK_UNDERFLOW',
          'Step 2: int popped = s->data[s->top];',
          'Step 3: s->top--; return popped;'
        ],
        cCode: `int pop(Stack* s, bool* success) {
    if (s->top < 0) {
        printf("Error: Stack Underflow! Stack is empty\\n");
        if (success) *success = false;
        return -1;
    }
    if (success) *success = true;
    int val = s->data[s->top];
    s->top--;
    return val;
}`
      },
      {
        name: '3. Peek / Top (Inspect Endpoint)',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Reads the topmost element without removing it or altering the stack state.',
        steps: [
          'Ensure top is valid (>= 0).',
          'Return data[top] directly.'
        ],
        pointerFlow: [
          'Step 1: return (s->top >= 0) ? s->data[s->top] : -1;'
        ],
        cCode: `int peek(const Stack* s) {
    if (s->top < 0) {
        printf("Notice: Stack is currently empty\\n");
        return -1;
    }
    return s->data[s->top];
}`
      }
    ],
    pitfalls: [
      {
        id: 'pitfall-stack-01',
        title: 'Stack Overflow on Unbounded Input',
        description: 'Writing beyond the allocated array capacity causes undefined memory corruption or program termination.',
        badCode: `// Missing bound check!
void pushUnsafe(Stack* s, int x) {
    s->data[++s->top] = x; /* Corrupts adjacent stack memory if full */
}`,
        goodCode: `// Safe with boundary assertion
bool pushSafe(Stack* s, int x) {
    if (s->top >= STACK_CAPACITY - 1) return false;
    s->data[++s->top] = x;
    return true;
}`
      },
      {
        id: 'pitfall-stack-02',
        title: 'Memory Leak in Linked Node Stacks',
        description: 'Popping a node without calling free() leaves detached heap allocations in RAM indefinitely.',
        badCode: `void popNodeLeak(struct StackNode** head) {
    *head = (*head)->next; /* Lost reference to previous top node! */
}`,
        goodCode: `int popNodeSafe(struct StackNode** head) {
    if (!head || !*head) return -1;
    struct StackNode* temp = *head;
    int val = temp->val;
    *head = temp->next;
    free(temp); /* Correctly reclaimed memory */
    return val;
}`
      }
    ],
    quiz: [
      {
        id: 'q-stack-1',
        question: 'Which operation on a standard LIFO stack has a time complexity greater than O(1)?',
        options: [
          'Pushing an element to the top',
          'Popping an element from the top',
          'Searching for an arbitrary element deep inside the stack',
          'Peeking at the top element'
        ],
        correctAnswer: 2,
        explanation: 'Because stacks do not allow random access, finding an arbitrary item requires popping/traversing up to N elements, taking O(N) linear time.'
      },
      {
        id: 'q-stack-2',
        question: 'If you push the integers 10, 20, 30, and 40 onto an initially empty stack, and then execute two pop operations, what is the next peek value?',
        options: ['10', '20', '30', '40'],
        correctAnswer: 1,
        explanation: 'Stack state: [10, 20, 30, 40]. Pop 1 removes 40. Pop 2 removes 30. Top is now 20.'
      },
      {
        id: 'q-stack-3',
        question: 'What happens when a pop() operation is executed on a stack where top == -1?',
        options: [
          'Stack Overflow error',
          'Stack Underflow error',
          'The stack wraps around to top = CAPACITY',
          'The value 0 is returned automatically'
        ],
        correctAnswer: 1,
        explanation: 'Attempting to extract an element from an empty container triggers a Stack Underflow error.'
      },
      {
        id: 'q-stack-4',
        question: 'In C, what is the memory footprint of a dynamic Linked-Node Stack node storing a 4-byte integer on a 64-bit architecture?',
        options: [
          '4 bytes total',
          '8 bytes total',
          '16 bytes total (4-byte int + 4-byte padding + 8-byte pointer)',
          '32 bytes total'
        ],
        correctAnswer: 2,
        explanation: 'On 64-bit systems, a pointer is 8 bytes. With 4-byte integer alignment padding, sizeof(struct StackNode) evaluates to 16 bytes.'
      }
    ]
  },

  queue: {
    id: 'queue',
    name: 'Queue',
    tagline: 'First-In, First-Out (FIFO) Sequential Pipeline Buffer',
    category: 'Linear',
    readTime: '7 min read',
    level: 'Beginner',
    memoryModel: 'Contiguous RAM',
    summary: 'A Queue enforces the First-In, First-Out (FIFO) access discipline where additions happen strictly at the REAR and extractions occur strictly at the FRONT. It underpins operating system thread schedulers, network packet buffers, print spools, and Breadth-First Search (BFS).',
    analogy: {
      title: 'The Cinema Box Office Ticket Queue',
      description: 'Patrons line up one after another. The first person to step up to the window is the first person served and departs (FRONT). New moviegoers join at the very back of the line (REAR). Cutting into the middle or leaving out of turn is prohibited.'
    },
    characteristics: [
      {
        title: 'FIFO Guarantee',
        badge: 'FIFO DISCIPLINE',
        description: 'First-In, First-Out ensures absolute temporal fairness: the oldest pending transaction is always serviced first.'
      },
      {
        title: 'Two Separate Pointers',
        badge: 'DUAL CURSORS',
        description: 'Unlike a stack with a single TOP pointer, a queue maintains independent FRONT and REAR positions to achieve O(1) operations.'
      },
      {
        title: 'Circular Modulo Wrap-Around',
        badge: 'MODULO ARITHMETIC',
        description: 'Circular queues solve "false overflow" by wrapping the rear cursor back to index 0 using (rear + 1) % CAPACITY.'
      }
    ],
    cStruct: `// Circular Queue Implementation in C99
#define QUEUE_CAPACITY 64

typedef struct {
    int data[QUEUE_CAPACITY];
    int front;                 /* Index of the item to be dequeued next */
    int rear;                  /* Index where the most recent item was enqueued */
    int count;                 /* Active number of items currently buffered */
} CircularQueue;

/* Initializer */
void initQueue(CircularQueue* q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}`,
    operations: [
      {
        name: '1. Enqueue (Append to Rear)',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Advances the circular rear index using modulo arithmetic and places the new entry into the queue.',
        steps: [
          'Verify queue count < CAPACITY (prevent buffer overflow).',
          'Advance rear index: rear = (rear + 1) % CAPACITY.',
          'Store value at data[rear] and increment count.'
        ],
        pointerFlow: [
          'Step 1: if (q->count == CAPACITY) return OVERFLOW;',
          'Step 2: q->rear = (q->rear + 1) % QUEUE_CAPACITY;',
          'Step 3: q->data[q->rear] = val; q->count++;'
        ],
        cCode: `bool enqueue(CircularQueue* q, int val) {
    if (q->count == QUEUE_CAPACITY) {
        printf("Error: Queue is full (Overflow)\\n");
        return false;
    }
    q->rear = (q->rear + 1) % QUEUE_CAPACITY;
    q->data[q->rear] = val;
    q->count++;
    return true;
}`
      },
      {
        name: '2. Dequeue (Extract from Front)',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Reads the element at the current front index, advances front circularly, and decrements the active count.',
        steps: [
          'Verify queue count > 0 (prevent underflow).',
          'Extract value at data[front].',
          'Advance front index: front = (front + 1) % CAPACITY and decrement count.'
        ],
        pointerFlow: [
          'Step 1: if (q->count == 0) return UNDERFLOW;',
          'Step 2: int val = q->data[q->front];',
          'Step 3: q->front = (q->front + 1) % QUEUE_CAPACITY; q->count--; return val;'
        ],
        cCode: `int dequeue(CircularQueue* q, bool* ok) {
    if (q->count == 0) {
        printf("Error: Queue is empty (Underflow)\\n");
        if (ok) *ok = false;
        return -1;
    }
    if (ok) *ok = true;
    int val = q->data[q->front];
    q->front = (q->front + 1) % QUEUE_CAPACITY;
    q->count--;
    return val;
}`
      }
    ],
    pitfalls: [
      {
        id: 'pitfall-queue-01',
        title: 'Linear Queue False Overflow',
        description: 'In a naive non-circular array queue, front and rear march toward the end of the array, exhausting space even when slots at the beginning are empty.',
        badCode: `// Naive linear queue causes memory drift
void enqueueLinear(int val) {
    rear++;
    data[rear] = val; /* Eventually rear == CAPACITY even if front == 50! */
}`,
        goodCode: `// Use circular modulo indexing
void enqueueCircular(CircularQueue* q, int val) {
    q->rear = (q->rear + 1) % QUEUE_CAPACITY;
    q->data[q->rear] = val;
}`
      }
    ],
    quiz: [
      {
        id: 'q-queue-1',
        question: 'Why is a Circular Queue preferred over a standard linear array queue in systems programming?',
        options: [
          'It eliminates False Overflow by reusing freed slots at the front',
          'It reduces Enqueue time complexity from O(N) to O(1)',
          'It doubles the maximum memory available in the RAM',
          'It sorts elements automatically as they arrive'
        ],
        correctAnswer: 0,
        explanation: 'In a standard linear queue, dequeuing leaves unused dead space at the front of the array. Circular queues recycle those slots seamlessly via modulo indexing.'
      },
      {
        id: 'q-queue-2',
        question: 'Which fundamental graph traversal algorithm relies strictly on a FIFO Queue?',
        options: [
          'Depth-First Search (DFS)',
          'Breadth-First Search (BFS)',
          'Dijkstra with negative edge weights',
          'Binary Search'
        ],
        correctAnswer: 1,
        explanation: 'Breadth-First Search (BFS) inspects all neighbors at level K before progressing to level K+1, which requires a FIFO Queue.'
      }
    ]
  },

  'linked-list': {
    id: 'linked-list',
    name: 'Linked List',
    tagline: 'Dynamic Heap-Allocated Pointer Chains (Singly & Doubly)',
    category: 'Linear',
    readTime: '8 min read',
    level: 'Beginner',
    memoryModel: 'Scattered Dynamic Heap',
    summary: 'A Linked List is a linear collection of nodes where each node contains data and an explicit pointer address linking to the subsequent node in dynamic heap memory. Unlike arrays, nodes are not contiguous in RAM, allowing constant-time O(1) insertions without memory reallocation.',
    analogy: {
      title: 'Coupled Train Cars & The Treasure Hunt Clue Chain',
      description: 'Imagine a scavenger hunt where each clue box contains a gold coin and a written GPS coordinate pointing to the location of the next clue box hidden elsewhere in the forest. You cannot teleport straight to clue #5 without physically following the trail of addresses from the starting clue #1.'
    },
    characteristics: [
      {
        title: 'Non-Contiguous Allocation',
        badge: 'SCATTERED HEAP',
        description: 'Each node is allocated independently on the heap via malloc(), existing at arbitrary 64-bit addresses (e.g. 0x1040, 0x10A0).'
      },
      {
        title: 'Instant Head Insertion O(1)',
        badge: 'ZERO SHIFTING',
        description: 'Inserting a node at the head takes O(1) pointer updates. No trailing elements need to be shifted in memory like in an array.'
      },
      {
        title: 'Linear Sequential Access O(N)',
        badge: 'NO RANDOM ACCESS',
        description: 'Reaching index k requires traversing k pointer hops starting from HEAD. Pointer arithmetic arr[k] is impossible.'
      }
    ],
    cStruct: `// Singly Linked List Node (Standard C99)
struct Node {
    int data;               /* 4 bytes */
    struct Node* next;      /* 8 bytes pointer on 64-bit arch */
};

// Doubly Linked List Node (Bidirectional)
struct DNode {
    int data;
    struct DNode* prev;     /* Backward link */
    struct DNode* next;     /* Forward link */
};`,
    operations: [
      {
        name: '1. Insert at Beginning (Prepend)',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Allocates a new node on the heap, hooks its next pointer to the current HEAD, and promotes it to become the new HEAD.',
        steps: [
          'Allocate dynamic node: struct Node* newNode = malloc(sizeof(struct Node)).',
          'Assign data and set newNode->next = head.',
          'Reassign head pointer: head = newNode.'
        ],
        pointerFlow: [
          'Step 1: newNode->next = head; /* Attach old list */',
          'Step 2: head = newNode;       /* Shift head reference */'
        ],
        cCode: `struct Node* insertAtBeginning(struct Node* head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        perror("Dynamic allocation failed");
        return head;
    }
    newNode->data = val;
    newNode->next = head;  /* Step 1: Hook to current head */
    head = newNode;        /* Step 2: Head now points to new node */
    return head;
}`
      },
      {
        name: '2. Insert at End (Append)',
        complexity: 'O(N) Time (or O(1) with Tail Pointer)',
        description: 'Traverses to the terminal node whose next is NULL, then links its next pointer to the freshly allocated node.',
        steps: [
          'Allocate newNode and set newNode->next = NULL.',
          'If head is NULL, return newNode as the new head.',
          'Traverse with a temp pointer until temp->next == NULL.',
          'Set temp->next = newNode.'
        ],
        pointerFlow: [
          'Step 1: while (temp->next != NULL) temp = temp->next;',
          'Step 2: temp->next = newNode;'
        ],
        cCode: `struct Node* insertAtEnd(struct Node* head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    
    if (head == NULL) return newNode;
    
    struct Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
    return head;
}`
      },
      {
        name: '3. Delete from Beginning',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Saves current head, advances head pointer to head->next, and calls free() on the old head to reclaim heap memory.',
        steps: [
          'Check if head is NULL (empty list).',
          'Store temporary reference: temp = head.',
          'Advance head: head = head->next.',
          'Call free(temp) to avoid memory leak.'
        ],
        pointerFlow: [
          'Step 1: struct Node* temp = head;',
          'Step 2: head = head->next;',
          'Step 3: free(temp);'
        ],
        cCode: `struct Node* deleteBeginning(struct Node* head) {
    if (head == NULL) return NULL;
    struct Node* temp = head;
    head = head->next;
    free(temp); /* Mandatory in C: reclaim allocated memory */
    return head;
}`
      }
    ],
    pitfalls: [
      {
        id: 'pitfall-ll-01',
        title: 'Dangling Pointers & Premature Free',
        description: 'Advancing a pointer after calling free() on that node causes undefined memory reads or segmentation faults.',
        badCode: `// Dangerous: using pointer after free
void traverseAndFreeBad(struct Node* head) {
    while (head != NULL) {
        free(head);
        head = head->next; /* Crash! Reading freed memory! */
    }
}`,
        goodCode: `// Safe: cache next pointer before freeing
void traverseAndFreeSafe(struct Node* head) {
    struct Node* curr = head;
    while (curr != NULL) {
        struct Node* nextNode = curr->next;
        free(curr);
        curr = nextNode;
    }
}`
      },
      {
        id: 'pitfall-ll-02',
        title: 'Losing the Head Reference',
        description: 'Modifying the primary head pointer directly during a scan loses the starting point of the list forever.',
        badCode: `// Destroys the list head!
void printListDestructive(struct Node* head) {
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->next; /* List is now permanently lost! */
    }
}`,
        goodCode: `// Non-destructive using temporary cursor
void printListSafe(const struct Node* head) {
    const struct Node* temp = head;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
}`
      }
    ],
    quiz: [
      {
        id: 'q-ll-1',
        question: 'Why does an array allow O(1) random lookup by index, while a singly linked list requires O(N) lookup?',
        options: [
          'Arrays use 64-bit pointers while linked lists use 32-bit pointers',
          'Array items occupy contiguous memory offsets calculable via Base + (index * size)',
          'Linked lists store elements in alphabetical order',
          'Linked list nodes are stored on the hard drive'
        ],
        correctAnswer: 1,
        explanation: 'Because array elements sit shoulder-to-shoulder in contiguous RAM, the CPU computes memory addresses in 1 arithmetic cycle. Linked list nodes reside in random heap addresses, requiring pointer hops.'
      },
      {
        id: 'q-ll-2',
        question: 'What is the time complexity to insert a node at the head of a Singly Linked List of size N?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'Inserting at the beginning takes exactly 2 pointer assignments (newNode->next = head; head = newNode), which executes in strict O(1) constant time.'
      }
    ]
  },

  tree: {
    id: 'tree',
    name: 'Tree (BST & Binary)',
    tagline: 'Hierarchical Non-Linear Node Graph with Left/Right Subtrees',
    category: 'Hierarchical',
    readTime: '9 min read',
    level: 'Intermediate',
    memoryModel: 'Scattered Dynamic Heap',
    summary: 'A Tree is an acyclic hierarchical data structure consisting of a root node and subtrees of connected children. In a Binary Search Tree (BST), the left child holds values strictly less than the parent, and the right child holds values strictly greater, enabling logarithmic O(log N) search and insertion.',
    analogy: {
      title: 'Corporate Hierarchy & The High-Low Guessing Game',
      description: 'Think of a corporate organization chart starting at the Chief Executive (ROOT). Underneath are regional vice presidents (INTERNAL NODES) branching down to individual team members (LEAF NODES). When searching for number 42, you start at root 50: since 42 < 50, you instantly discard the entire right half of the corporation!'
    },
    characteristics: [
      {
        title: 'Binary Branching Rule',
        badge: 'MAX 2 CHILDREN',
        description: 'Every node has at most two outgoing pointer edges: left and right.'
      },
      {
        title: 'BST Ordering Invariant',
        badge: 'BST PROPERTY',
        description: 'LeftSubtree.val < Node.val < RightSubtree.val for every node in the tree.'
      },
      {
        title: 'Logarithmic Scalability O(log N)',
        badge: 'HALVES SEARCH SPACE',
        description: 'Balanced trees reduce search space by half at each level, finding 1 in a million items in only ~20 comparisons.'
      }
    ],
    cStruct: `// Binary Search Tree Node in C99
struct TreeNode {
    int val;
    struct TreeNode* left;   /* Left subtree (< val) */
    struct TreeNode* right;  /* Right subtree (> val) */
};

/* Constructor helper */
struct TreeNode* createTreeNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}`,
    operations: [
      {
        name: '1. BST Key Insertion',
        complexity: 'O(log N) Average · O(N) Worst Case',
        description: 'Recursively navigates down the tree comparing values until reaching a NULL pointer, where the new node is anchored.',
        steps: [
          'If root is NULL, allocate and return new node.',
          'If val < root->val, recurse on root->left.',
          'Else if val > root->val, recurse on root->right.',
          'Return unchanged root pointer.'
        ],
        pointerFlow: [
          'Step 1: if (val < root->val) root->left = insert(root->left, val);',
          'Step 2: else if (val > root->val) root->right = insert(root->right, val);'
        ],
        cCode: `struct TreeNode* insertBST(struct TreeNode* root, int val) {
    if (root == NULL) {
        return createTreeNode(val);
    }
    if (val < root->val) {
        root->left = insertBST(root->left, val);
    } else if (val > root->val) {
        root->right = insertBST(root->right, val);
    }
    return root; /* Duplicate values are ignored */
}`
      },
      {
        name: '2. In-Order Traversal (Sorted Output)',
        complexity: 'O(N) Time · O(H) Call Stack Space',
        description: 'Visits nodes in order: Left Subtree → Root Node → Right Subtree. In a BST, this produces elements in strictly ascending numerical order.',
        steps: [
          'Recursively traverse left subtree.',
          'Process (print/record) the current root value.',
          'Recursively traverse right subtree.'
        ],
        pointerFlow: [
          'inOrder(root->left);',
          'printf("%d ", root->val);',
          'inOrder(root->right);'
        ],
        cCode: `void inOrder(struct TreeNode* root) {
    if (root == NULL) return;
    inOrder(root->left);        /* 1. Recurse left */
    printf("%d ", root->val);   /* 2. Visit node */
    inOrder(root->right);       /* 3. Recurse right */
}`
      }
    ],
    pitfalls: [
      {
        id: 'pitfall-tree-01',
        title: 'Tree Degeneracy into a Linear Linked List',
        description: 'Inserting strictly sorted data (1, 2, 3, 4, 5) without self-balancing (AVL / Red-Black) turns the tree into a single line with O(N) worst-case search.',
        badCode: `// Unbalanced BST degenerates on sorted input
// Inserting 10, 20, 30, 40 creates a right-skewed stick:
// 10 -> 20 -> 30 -> 40 (O(N) search time instead of O(log N)!)`,
        goodCode: `// Use self-balancing rotations (AVL / Red-Black)
// Height remains bounded to <= 1.44 * log2(N)`
      }
    ],
    quiz: [
      {
        id: 'q-tree-1',
        question: 'Which tree traversal order is guaranteed to output keys of a valid Binary Search Tree in strictly sorted ascending order?',
        options: ['Pre-Order (Root, Left, Right)', 'In-Order (Left, Root, Right)', 'Post-Order (Left, Right, Root)', 'Level-Order (BFS)'],
        correctAnswer: 1,
        explanation: 'Because In-Order processes everything smaller (Left) before the node itself, followed by everything greater (Right), it outputs values in strictly sorted order.'
      },
      {
        id: 'q-tree-2',
        question: 'A complete binary tree has 7 nodes. What is its exact height in edges (with root at height 0)?',
        options: ['1', '2', '3', '7'],
        correctAnswer: 1,
        explanation: 'Level 0 has 1 node, Level 1 has 2 nodes, Level 2 has 4 nodes (1 + 2 + 4 = 7). The height is 2 edges.'
      }
    ]
  },

  graph: {
    id: 'graph',
    name: 'Graph',
    tagline: 'Non-Linear Network of Vertices Connected by Edges',
    category: 'Non-Linear Network',
    readTime: '10 min read',
    level: 'Advanced',
    memoryModel: 'Pointer Graphs',
    summary: 'A Graph is a general non-linear mathematical structure consisting of a set of vertices (V) and connecting edges (E). Edges may be directed or undirected, weighted or unweighted. Graphs model social connections, internet routing, road maps, and dependency resolution.',
    analogy: {
      title: 'Global Airline Flight Network & Roadways',
      description: 'Airports represent vertices (nodes), and direct flight routes between them represent edges. Some routes are one-way (directed) while others fly round-trip (undirected). The flight mileage or ticket price represents the edge weight. Finding the fastest path between cities is the classic Shortest Path problem.'
    },
    characteristics: [
      {
        title: 'Non-Hierarchical Networks',
        badge: 'GENERAL NETWORKS',
        description: 'Unlike trees, graphs may contain cycles, multiple disjoint components, and bidirectional cross-connections.'
      },
      {
        title: 'Adjacency List vs Matrix',
        badge: 'STORAGE TRADEOFF',
        description: 'Adjacency Matrix uses O(V^2) space for O(1) edge lookups. Adjacency List uses O(V + E) space, optimal for sparse networks.'
      },
      {
        title: 'Fundamental Traversals (BFS & DFS)',
        badge: 'BFS & DFS',
        description: 'BFS utilizes a Queue to discover nearest layers first. DFS utilizes a Stack/Recursion to explore paths to maximum depth.'
      }
    ],
    cStruct: `// Adjacency List Graph Representation in C99
#define MAX_VERTICES 20

struct AdjListNode {
    int dest;
    int weight;
    struct AdjListNode* next;
};

typedef struct {
    int numVertices;
    struct AdjListNode* adjLists[MAX_VERTICES];
} Graph;

/* Adjacency Matrix alternative */
typedef struct {
    int V;
    int matrix[MAX_VERTICES][MAX_VERTICES];
} GraphMatrix;`,
    operations: [
      {
        name: '1. Breadth-First Search (BFS)',
        complexity: 'O(V + E) Time · O(V) Space',
        description: 'Explores vertices outward in concentric rings from a starting source node using a FIFO Queue and a boolean visited array.',
        steps: [
          'Create visited[V] array initialized to false.',
          'Enqueue start vertex into a FIFO Queue and mark visited[start] = true.',
          'While queue is not empty: dequeue u, process u, and enqueue all unvisited neighbors of u.'
        ],
        pointerFlow: [
          'Step 1: enqueue(q, start); visited[start] = true;',
          'Step 2: while(!isEmpty(q)) { int u = dequeue(q); for each v in adj[u]: if(!visited[v]) enqueue(q, v); }'
        ],
        cCode: `void BFS(Graph* g, int startVertex) {
    bool visited[MAX_VERTICES] = {false};
    int queue[MAX_VERTICES];
    int front = 0, rear = 0;
    
    visited[startVertex] = true;
    queue[rear++] = startVertex;
    
    printf("BFS Order: ");
    while (front < rear) {
        int curr = queue[front++];
        printf("%d ", curr);
        
        struct AdjListNode* temp = g->adjLists[curr];
        while (temp) {
            int neighbor = temp->dest;
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue[rear++] = neighbor;
            }
            temp = temp->next;
        }
    }
    printf("\\n");
}`
      },
      {
        name: '2. Depth-First Search (DFS)',
        complexity: 'O(V + E) Time · O(V) Space',
        description: 'Dives deep along each graph branch before backtracking, utilizing the system call stack or an explicit LIFO Stack.',
        steps: [
          'Mark current vertex as visited.',
          'For each adjacent neighbor, if unvisited, invoke DFS recursively.',
          'Backtrack when all neighbors of current vertex have been explored.'
        ],
        pointerFlow: [
          'DFS(u): visited[u] = true; for each v in adj[u]: if(!visited[v]) DFS(v);'
        ],
        cCode: `void DFSUtil(Graph* g, int vertex, bool visited[]) {
    visited[vertex] = true;
    printf("%d ", vertex);
    
    struct AdjListNode* temp = g->adjLists[vertex];
    while (temp != NULL) {
        int connectedVertex = temp->dest;
        if (!visited[connectedVertex]) {
            DFSUtil(g, connectedVertex, visited);
        }
        temp = temp->next;
    }
}`
      }
    ],
    pitfalls: [
      {
        id: 'pitfall-graph-01',
        title: 'Infinite Loops Without Visited Array',
        description: 'Because graphs can contain cycles (A -> B -> C -> A), traversing without recording visited nodes causes infinite recursion or loop crashes.',
        badCode: `// Crash: infinite recursion on cycles!
void dfsBroken(Graph* g, int u) {
    printf("%d ", u);
    for (struct AdjListNode* cur = g->adjLists[u]; cur; cur = cur->next) {
        dfsBroken(g, cur->dest); /* Runs forever on cyclic edges! */
    }
}`,
        goodCode: `// Safe: tracks visited nodes in a boolean set
void dfsSafe(Graph* g, int u, bool visited[]) {
    visited[u] = true;
    printf("%d ", u);
    for (struct AdjListNode* cur = g->adjLists[u]; cur; cur = cur->next) {
        if (!visited[cur->dest]) dfsSafe(g, cur->dest, visited);
    }
}`
      }
    ],
    quiz: [
      {
        id: 'q-graph-1',
        question: 'Which graph representation is more memory efficient for a sparse graph with 10,000 vertices and only 25,000 edges?',
        options: [
          'Adjacency Matrix (requires 10,000 × 10,000 cells = 100M entries)',
          'Adjacency List (requires V + E slots = ~35,000 entries)',
          'Both require the exact same memory in bytes',
          'Neither, an array of strings is required'
        ],
        correctAnswer: 1,
        explanation: 'An Adjacency Matrix requires V^2 space regardless of edge count (100,000,000 cells!). An Adjacency List scales strictly with O(V + E), consuming a tiny fraction of RAM.'
      },
      {
        id: 'q-graph-2',
        question: 'What data structure is used internally by Breadth-First Search (BFS) to visit vertices level by level?',
        options: ['LIFO Stack', 'FIFO Queue', 'Binary Search Tree', 'Hash Map'],
        correctAnswer: 1,
        explanation: 'BFS uses a FIFO Queue to ensure vertices discovered earliest are expanded first, producing shortest unweighted path traversal.'
      }
    ]
  },

  array: {
    id: 'array',
    name: 'Array',
    tagline: 'Fixed-Size Contiguous RAM Memory Blocks with Index Math',
    category: 'Linear',
    readTime: '5 min read',
    level: 'Beginner',
    memoryModel: 'Contiguous RAM',
    summary: 'An Array is a fundamental linear data structure storing elements of identical data types in consecutive, contiguous memory bytes. Because elements sit back-to-back in RAM, the hardware accesses any element in instant O(1) time using simple memory address arithmetic.',
    analogy: {
      title: 'Numbered Locker Hallway',
      description: 'Picture a straight high school hallway with 100 identical steel lockers numbered 0 to 99. If you know locker #0 starts at 100 paces from the entrance and each locker is exactly 2 paces wide, you can walk directly to locker #42 by multiplying 100 + (42 × 2) in one single step without opening lockers 0 through 41!'
    },
    characteristics: [
      {
        title: '0-Indexed Base Offset',
        badge: '0-INDEXED',
        description: 'Counting begins at index 0 because index 0 requires zero offset from the base memory address: Base + (0 * sizeof(T)).'
      },
      {
        title: 'Unbroken Contiguous RAM',
        badge: 'CACHE FRIENDLY',
        description: 'Elements are stored in consecutive bytes, maximizing CPU L1/L2 cache line hits and prefetching performance.'
      },
      {
        title: 'O(N) Insertion Overhead',
        badge: 'ELEMENT SHIFTING',
        description: 'Inserting into slot 0 requires shifting all existing N elements one position to the right to make room.'
      }
    ],
    cStruct: `// Contiguous Static Array in C99
int scores[5] = {92, 85, 78, 96, 88};

/* Memory Address Calculation Formula:
 * Address(arr[i]) = BaseAddress + (i * sizeof(DataType))
 * If Base is 0x1000 and sizeof(int) is 4:
 * arr[0] = 0x1000
 * arr[1] = 0x1004
 * arr[2] = 0x1008
 * arr[3] = 0x100C
 * arr[4] = 0x1010
 */`,
    operations: [
      {
        name: '1. Direct Index Access',
        complexity: 'O(1) Time · O(1) Space',
        description: 'Retrieves or writes to an element in a single CPU instruction by computing the physical memory address directly.',
        steps: [
          'Verify that 0 <= index < size.',
          'CPU computes Base + (index * 4).',
          'Read or write value at calculated memory address.'
        ],
        pointerFlow: [
          'int value = *(arr + index); /* Equivalent to arr[index] */'
        ],
        cCode: `int getElement(const int arr[], int size, int index) {
    if (index < 0 || index >= size) {
        printf("Error: Index %d out of bounds!\\n", index);
        return -1;
    }
    return arr[index]; /* Instant O(1) access */
}`
      }
    ],
    pitfalls: [
      {
        id: 'pitfall-arr-01',
        title: 'Buffer Overrun & Off-by-One',
        description: 'In C, accessing arr[5] on an array declared as int arr[5] reads unallocated stack memory, causing data corruption or security bugs.',
        badCode: `int arr[5];
for (int i = 0; i <= 5; i++) { /* Bug: runs 6 times! */
    arr[i] = i * 10;          /* arr[5] overruns the buffer */
}`,
        goodCode: `int arr[5];
for (int i = 0; i < 5; i++) {  /* Correct: 0, 1, 2, 3, 4 */
    arr[i] = i * 10;
}`
      }
    ],
    quiz: [
      {
        id: 'q-arr-1',
        question: 'Why does an array in C allow instant O(1) access to any index?',
        options: [
          'The CPU executes a binary search through the array',
          'All elements sit contiguously in RAM, allowing Base + (i * sizeof) address calculation',
          'The compiler copies the array into registers',
          'Each element stores a pointer to the next element'
        ],
        correctAnswer: 1,
        explanation: 'Because array elements sit consecutively in memory, computing the exact RAM byte address takes a single multiplication and addition: Address = Base + (i * sizeof(Type)).'
      }
    ]
  }
};
