import ReactFlow, { Controls, Background } from "reactflow";
import SmoothConnector from "reactflow";
import "reactflow/dist/style.css";
import { Handle, Position } from 'reactflow';
import { useCallback, useState, useMemo } from 'react'; 
import Avatar from 'react-avatar';

export const CustomNode = ({ data }) => {
  return (
    <>
      <div style={{ width:"fit-content" }}>
        <Avatar name="Dummy" round={true} size="45" />
      </div>
 
      {/*<Handle type="target" position={Position.Left} />*/}
      <Handle style={{opacity:0}} type="source" position={Position.Right}/>
      <Handle style={{opacity:0}} type="source" position={Position.Bottom}/>
    </>
  );
};

export const CustomNodeTwo = ({ data }) => {
  return (
    <>
      <div style={{ width:"fit-content" }}>
        <Avatar name="Dummy" round={true} size="45" />
      </div>
 
      <Handle style={{opacity:0}} type="target" position={Position.Left} />
      <Handle style={{opacity:0}} type="source" position={Position.Right} />
    </>
  );
};

export const CustomNodeThree = ({ data }) => {
  return (
    <>
      <div style={{ width:"fit-content" }}>
        <Avatar name="Dummy" round={true} size="45" />
      </div>
 
      <Handle style={{opacity:0}} type="target" position={Position.Left} />
      {/*<Handle type="source" position={Position.Right} />*/}
    </>
  );
};

export const CustomNodeData = ({data}) => {
  return (
      <>
      <div>
      <p style={{fontSize:"10px", fontWeight:600}}>2024</p>
      <p style={{fontSize:"10px", fontWeight:600}}>Age: 0</p>
      </div>  
      <Handle style={{opacity:0}} type="target" position={Position.Top} />
      </>
    )
}

const nodes = [
  {
    id: "1",
    data: { label: "Hello" },
    type:'customnode',
    position: { x: 80, y: 80 },
  },
  {
    id: "2",
    data: { label: "World" },
    type:'customnodetwo',
    position: { x: 260, y: 80 },
  },
    {
    id: "3",
    data: { label: "Test" },
    type:'customnodethree',
    position: { x: 460, y: 80 },
  },{
    id: "4",
    data: { label: "Test" },
    type:'customnodedata',
    position: { x: 80, y: 160 },
  },
];


const edges = [
  // { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
  { id: "edge1", source: "1", target: "2",  label: "next step 1", sourceHandle: 'a' },
  { id: "edge2", source: "2", target: "3",  label: "next step 2" },
  { id: "edge3", source: "1", target: "4",  label: "", sourceHandle: 'b' },
];

// main component
function App() {
  const nodeTypes = useMemo(() => ({ customnode: CustomNode, customnodetwo: CustomNodeTwo, customnodethree: CustomNodeThree, customnodedata: CustomNodeData}), []);

  return (
    <>
      <div style={{ height: "100%  ", widthL: "100%", padding: "2rem 4rem" }}>
        Hello

        <div
          style={{
            height: "25%  ",
            widthL: "100%",
            border: "2px solid #000",
            padding: "2rem",
          }}
        >
        
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            // panOnScroll={true}
            // panningEnabled={false}
            zoomingEnabled={false}
            zoomOnPinch={false}
            panOnScrollMode={'horizontal'}
            // preventScrolling={false}
          >
            <Controls />
          </ReactFlow>
        
        </div>
      </div>
    </>
  );
}

export default App;
