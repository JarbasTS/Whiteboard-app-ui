import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Node,
  useEdgesState,
  useNodesState
} from 'reactflow';
import * as Toolbar from '@radix-ui/react-toolbar';
import { violet } from 'tailwindcss/colors';
import 'reactflow/dist/style.css';
import { Square } from './components/nodes/Square';
import { useCallback } from 'react';
import DefaultEdge from './components/edges/DefaultEdge';

const NODE_TYPES = {
  square: Square
};

const EDGE_TYPES = {
  default: DefaultEdge
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 400,
      y: 400
    },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 800,
      y: 400
    },
    data: {}
  }
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, []);

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 750,
          y: 350
        },
        data: {}
      }
    ]);
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Controls />
        <Background gap={12} size={2} color={violet[500]} />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button
          onClick={addSquareNode}
          className="w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-3"
        />
      </Toolbar.Root>
    </div>
  );
}

export default App;
