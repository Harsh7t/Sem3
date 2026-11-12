// All subject content lives here. Checklist = syllabus topics, grouped by unit.
// PYQ solutions: push entries into a subject's `pyq` array later, e.g.
//   { exam: 'mid' | 'end', year: 2024, title: 'Q1 – Merge sort recurrence', html: '<p>…solution…</p>' }
const SUBJECTS = [
  {
    id: 'oop', code: 'OOP', name: 'Object Oriented Programming', meta: 'C++ · Java',
    units: [
      { title: 'Unit 1 · C++ basics', tag: 'C++', topics: [
        'Evolution of programming paradigms', 'Structured programming vs object-oriented programming',
        'Principles of object-oriented programming', 'Applications and benefits of OOP', 'C++ at a glance',
        'Classes and objects', 'Member functions', 'Constructors and destructors',
        'Constant objects and constant member functions', 'Static data members and static member functions',
        'Friend functions and friend classes', 'Objects as function arguments', 'Returning objects from functions', 'Nested classes'] },
      { title: 'Unit 2 · C++ advanced', tag: 'C++', topics: [
        'Dynamic memory allocation and dynamic objects', 'Arrays of objects', 'Pointers to members',
        'Operator overloading: unary and binary operators', 'Operator overloading with friend functions',
        'Type conversion: objects ↔ basic types', 'Type conversion: objects of different classes',
        'Inheritance and types of inheritance', 'Virtual base classes', 'Abstract classes', 'Virtual functions',
        'Pure virtual functions', 'Runtime polymorphism', 'Virtual destructors',
        'Function templates', 'Function templates with multiple parameters', 'Function overloading with templates',
        'Class templates', 'Class templates with multiple parameters', 'Inheritance of class templates'] },
      { title: 'Unit 3 · Java', tag: 'Java', topics: [
        'Introduction to Java', 'Features of Java', 'Java Virtual Machine (JVM)', 'JDK and JRE', 'Bytecode',
        'Structure of a Java program', 'Access specifiers', 'Inheritance: extends keyword',
        'Interface: implements keyword', 'Polymorphism: super keyword', 'final keyword'] },
      { title: 'Unit 4 · Exceptions & threads', tag: 'C++ / Java', topics: [
        'Introduction to exception handling', 'Exception handling mechanism', 'Multiple catch statements',
        'Catch-all exception handler', 'Rethrowing an exception', 'Standard exceptions [C++]',
        'throw, throws & finally [Java]', 'Thread life cycle', 'Creating threads', 'Thread priorities',
        'Thread synchronization', 'Inter-thread communication'] },
      { title: 'Unit 5 · File handling', tag: 'C++', topics: [
        'File streams', 'Opening and closing files', 'File open modes', 'End-of-file detection',
        'File pointers and random access', 'Reading and writing objects', 'Error handling during file operations'] },
      { title: 'Unit 6 · Applets & Swing', tag: 'Java', topics: ['Introduction to applets', 'Swing'] },
    ],
    pyq: [],
  },
  {
    id: 'dld', code: 'DLD', name: 'Digital Logic Design', meta: 'Combinational · Sequential',
    units: [
      { title: 'Part 1 · Logic basics to counters', topics: [
        'Number systems & codes, N’s and (N−1)’s complement', 'Boolean algebra',
        'K-map minimisation in SOP & POS, with and without don’t-care terms',
        'Tabulation method (SOP & POS), with and without don’t-care terms',
        'Encoder, decoder, mux, demux and their applications',
        'Code converters (BCD to Ex-3, 4-bit binary to BCD, etc.)', 'Magnitude comparator', 'Priority encoder',
        'Binary adder & subtractor', 'BCD adder & subtractor', 'Flip-flops', 'Registers',
        'Synchronous & asynchronous counter design', 'Ring counter & twisted ring counter', 'Conversion of flip-flops'] },
      { title: 'Part 2 · Families, memory, converters, sequential design', topics: [
        'Logic families: parameters', 'TTL (totem pole, open collector)', 'I²L', 'ECL',
        'MOS: NMOS, PMOS, CMOS (NOT, NAND, NOR implementation)',
        'Memories: ROM, PROM and circuit implementation using them',
        'DAC: binary weighted', 'DAC: R-2R ladder', 'DAC: numericals',
        'ADC: successive approximation', 'ADC: dual slope', 'ADC: staircase ramp', 'ADC: numericals',
        'Monostable, bistable, astable multivibrators using BJT',
        'Design of synchronous & asynchronous sequential circuits', 'Minimisation of flow table', 'Mealy & Moore machines'] },
    ],
    pyq: [],
  },
  {
    id: 'os', code: 'OS', name: 'Operating Systems Design', meta: 'CS207',
    units: [
      { title: 'Unit 1 · Introduction & structure', hours: 6, topics: [
        'Operating system and its functions', 'Evolution of operating systems',
        'Batch, interactive, time-sharing and real-time systems', 'System protection',
        'System components', 'System structure', 'Operating system services'] },
      { title: 'Unit 2 · Concurrent processes & CPU scheduling', hours: 8, topics: [
        'Process concept', 'Principle of concurrency', 'Producer–consumer problem', 'Critical section problem',
        'Semaphores', 'Classical problems in concurrency', 'Inter-process communication', 'Process generation',
        'Process scheduling', 'CPU scheduling concept', 'Performance criteria of scheduling algorithms',
        'Evaluation of scheduling algorithms', 'Multiprocessor scheduling'] },
      { title: 'Unit 3 · Deadlock', hours: 8, topics: [
        'System model', 'Deadlock characterization', 'Prevention', 'Avoidance', 'Detection',
        'Recovery from deadlock', 'Combined approach'] },
      { title: 'Unit 4 · Memory management', hours: 8, topics: [
        'Base machine', 'Resident monitor', 'Multiprogramming with fixed partition',
        'Multiprogramming with variable partition', 'Multiple base register', 'Paging', 'Segmentation',
        'Virtual memory concept', 'Demand paging', 'Performance', 'Page replacement algorithms',
        'Allocation of frames', 'Thrashing', 'Cache memory organization', 'Impact on performance'] },
      { title: 'Unit 5 · I/O, disk scheduling & file system', hours: 8, topics: [
        'I/O devices and organization of I/O function', 'I/O buffering', 'Disk I/O', 'Disk scheduling',
        'Operating system design issues', 'File concept', 'File organization and access mechanism',
        'File directories', 'File sharing', 'Implementation issues'] },
      { title: 'Unit 6 · Case studies', hours: 4, topics: ['Windows', 'Linux', 'Unix'] },
    ],
    pyq: [],
  },
  {
    id: 'daa', code: 'DAA', name: 'Design and Analysis of Algorithms', meta: 'CS205',
    units: [
      { title: 'Unit 1 · Introduction', hours: 6, topics: [
        'Concept of algorithmic efficiency', 'Run time analysis of algorithms', 'Asymptotic notations',
        'Growth of functions', 'Master’s theorem'] },
      { title: 'Unit 2 · Searching & sorting', hours: 6, topics: [
        'Structure of divide-and-conquer algorithms', 'Binary search', 'Quick sort', 'Strassen matrix multiplication',
        'Merge sort', 'Heap sort', 'Analysis of divide-and-conquer recurrence relations',
        'Graph concepts: connected components', 'Cut vertex', 'Bridge'] },
      { title: 'Unit 3 · Greedy method', hours: 12, topics: [
        'Overview of the greedy paradigm', 'Minimum cost spanning tree (exact optimization)',
        'Knapsack problem (approximate solution)', 'Kruskal’s algorithm', 'Prim’s algorithm',
        'Dijkstra’s algorithm', 'Bellman–Ford algorithm', 'Huffman coding', 'Activity selection problem'] },
      { title: 'Unit 4 · Dynamic programming & backtracking', hours: 12, topics: [
        'Principles of dynamic programming', 'Rod cutting problem', 'Floyd–Warshall algorithm', 'Matrix multiplication',
        'Travelling salesman problem', 'Longest common subsequence', 'Backtracking overview', '8-queen problem',
        'Knapsack problem', 'Edit distance problem'] },
      { title: 'Unit 5 · Branch and bound', hours: 6, topics: [
        'LC searching', 'Bounding', 'FIFO branch and bound', 'LC branch and bound', '0/1 knapsack using branch and bound'] },
      { title: 'Unit 6 · Computational complexity', hours: 6, topics: [
        'Complexity measures', 'Polynomial vs non-polynomial time complexity', 'NP-hard and NP-complete classes',
        'Circuit satisfiability', 'Vertex cover', 'Subset sum problem'] },
    ],
    pyq: [],
  },
  {
    id: 'se', code: 'SE', name: 'Software Engineering', meta: 'CS209',
    units: [
      { title: 'Unit 1 · Introduction', hours: 8, topics: [
        'Introduction to software engineering', 'Software characteristics', 'Software components',
        'Software applications', 'Software engineering principles', 'Software metrics and measurement',
        'Monitoring and control', 'Software development life cycle', 'Waterfall model', 'Prototyping model',
        'Incremental model', 'Iterative enhancement model', 'Spiral model', 'Agile model'] },
      { title: 'Unit 2 · Software requirement specification', hours: 8, topics: [
        'Requirements elicitation techniques', 'Requirements analysis', 'Models for requirements analysis',
        'Requirements specification', 'Requirements validation'] },
      { title: 'Unit 3 · System design', hours: 8, topics: [
        'Design principles: problem partitioning, abstraction', 'Top-down and bottom-up design', 'Structured approach',
        'Functional vs object-oriented approach of design', 'Design specification', 'Cohesiveness and coupling',
        'Overview of SA/SD methodology', 'Structured analysis', 'Data flow diagrams', 'Extending DFD to structure chart',
        'Entity-relationship diagram', 'Use case diagrams'] },
      { title: 'Unit 4 · Project management, reliability & quality', hours: 10, topics: [
        'Project planning', 'Project scheduling and resource management', 'Gantt charts', 'Critical path method (CPM)',
        'Size metrics: LOC, token count, function count', 'Cost estimation: COCOMO', 'Risk management activities',
        'Reliability issues', 'Reliability metrics', 'Reliability models', 'Software quality',
        'ISO 9000 certification for software industry', 'SEI capability maturity model', 'Agile project management'] },
      { title: 'Unit 5 · Testing', hours: 8, topics: [
        'Verification and validation', 'Code inspection', 'Test plan', 'Test case specification', 'Unit testing',
        'Integration testing', 'Top-down and bottom-up integration testing', 'Alpha and beta testing',
        'System testing and debugging', 'Functional testing', 'Structural testing', 'Software testing strategies'] },
      { title: 'Unit 6 · Software maintenance', hours: 6, topics: [
        'Structured vs unstructured maintenance', 'Maintenance models', 'Configuration management',
        'Reverse engineering', 'Software re-engineering'] },
    ],
    pyq: [],
  },
];
