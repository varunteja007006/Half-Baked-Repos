import React, { useMemo } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import SmoothConnector from "reactflow";
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";
import Avatar from "react-avatar";

export const CustomNode = ({ data }) => {
  return (
    <>
      <div style={{ width: "fit-content" }}>
        <Avatar name="Center" round={true} size="45" />
      </div>

      <Handle
        position={Position.Top}
        style={{ opacity: 0 }}
        type="source"
        id="d"
      />
      <Handle
        position={Position.Left}
        style={{ opacity: 0 }}
        type="source"
        id="c"
      />
      <Handle
        style={{ opacity: 0 }}
        type="source"
        id="a"
        position={Position.Right}
      />
      <Handle
        style={{ opacity: 0 }}
        type="source"
        id="b"
        position={Position.Bottom}
      />
    </>
  );
};

export const CustomNodeTwo = ({ data }) => {
  return (
    <>
      <div style={{ width: "fit-content" }}>
        <Avatar name="Right" round={true} size="45" />
      </div>

      <Handle style={{ opacity: 0 }} type="target" position={Position.Left} />
      {/* <Handle style={{ opacity: 1 }} type="source" position={Position.Right} /> */}
    </>
  );
};

export const CustomNodeThree = ({ data }) => {
  return (
    <>
      <div style={{ width: "fit-content" }}>
        <Avatar name="Bottom" round={true} size="45" />
      </div>

      <Handle style={{ opacity: 0 }} type="target" position={Position.Top} />
      {/* <Handle style={{ opacity: 1 }} type="source" position={Position.Right} /> */}
    </>
  );
};
export const CustomNodeFour = ({ data }) => {
  return (
    <>
      <div style={{ width: "fit-content" }}>
        <Avatar name="Left" round={true} size="45" />
      </div>

      <Handle style={{ opacity: 0 }} type="target" position={Position.Right} />
      {/* <Handle style={{ opacity: 1 }} type="source" position={Position.Right} /> */}
    </>
  );
};

export const CustomNodeFive = ({ data }) => {
  return (
    <>
      <div style={{ width: "fit-content" }}>
        <Avatar name="Top" round={true} size="45" />
      </div>

      <Handle style={{ opacity: 0 }} type="target" position={Position.Bottom} />
      {/* <Handle style={{ opacity: 1 }} type="source" position={Position.Right} /> */}
    </>
  );
};

const nodes = [
  {
    id: "1",
    type: "customnode",
    position: { x: 80, y: 80 },
  },
  {
    id: "2",
    type: "customnodetwo",
    position: { x: 240, y: 80 },
  },
  {
    id: "3",
    type: "customnodethree",
    position: { x: 80, y: 240 },
  },
  {
    id: "4",
    data: { label: "World" },
    type: "customnodefour",
    position: { x: -80, y: 80 },
  },
  {
    id: "5",
    type: "customnodefive",
    position: { x: 80, y: -80 },
  },
];

const edges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    label: "Center - Right",
    type: "straight",
    sourceHandle: "a",
  },
  {
    id: "1-3",
    source: "1",
    target: "3",
    label: "Center - Bottom",
    type: "straight",
    sourceHandle: "b",
  },
  {
    id: "1-4",
    source: "1",
    target: "4",
    label: "Center - Left",
    type: "straight",
    sourceHandle: "c",
  },
  {
    id: "1-5",
    source: "1",
    target: "5",
    label: "Center - Top",
    type: "straight",
    sourceHandle: "d",
  },
];

function MyApp() {
  const nodeTypes = useMemo(
    () => ({
      customnode: CustomNode,
      customnodetwo: CustomNodeTwo,
      customnodethree: CustomNodeThree,
      customnodefour: CustomNodeFour,
      customnodefive: CustomNodeFive,
    }),
    []
  );
  return (
    <div>
      <div style={{ width: "100vw", height: "100vh", background: "#B8CEFF" }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
      </div>
    </div>
  );
}

export default MyApp;
