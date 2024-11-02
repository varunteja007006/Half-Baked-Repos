import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ID, TColumn } from "../../types/types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function Main() {
  // Basic Setup
  const [columns, setColumns] = useState<TColumn[]>([]); // to store the added cards
  // adding cards
  const addColumn = () => {
    const columnToAdd: TColumn = {
      id: columns.length + 1,
      title: `Card ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };
  // deleting cards
  const deleteColumn = (id: ID) => {
    const filteredColumns = columns.filter((item) => item.id !== id);
    setColumns(filteredColumns);
  };

  // Drag & Drop Setup
  /*
    --> columnID <---
    Create an array of IDs of cards to be used for sortAbleContext which keeps track of the dragged 
    items by their ID.
  */
  const columnID = useMemo(() => columns.map((item) => item.id), [columns]);

  /* 
    --> activeColumn <---
    Stores the data of the active element/card that is being dragged; data to be used for overlay.
    */
  const [activeColumn, setActiveColumn] = useState<TColumn | null>(null);

  /* 
    --> onDragStart <---
    what to do once the element is being dragged? In this case we get and store the active element 
    data this will help us render it on the tip of the mouse pointer (i.e an overlay) while being 
    dragged. 
  */
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  /*
    --> onDragEnd <---
    What to do when the element dragging ended? In this case we swap the elements position in the 
    array.
  */
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnID = active.id;
    const overColumnID = over.id;

    if (activeColumnID === overColumnID) return;

    const activeColumnIndex = columns.findIndex(
      (item) => item.id === activeColumnID
    );
    const overColumnIndex = columns.findIndex(
      (item) => item.id === overColumnID
    );

    setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
  };

  // this function renders the card that is being dragged to show it as overlay
  const getActiveElement = () => {
    if (activeColumn) {
      return <ColumnContainer {...activeColumn} deleteColumn={deleteColumn} />;
    }
  };

  /* 
    Why sensors, What sensors? 
    So when the DndContext is wrapped around the whole card, all the onClick events trigger 
    drag & drop. Therefore any buttons in the card are not usable.
    
    How do we overcome this? We use sensors. Here we use few constraints that lets the DndContext
    know when to trigger the drag & drop functionality.
  */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  return (
    <div className="flex flex-col gap-3 items-center p-5 rounded-lg border border-primary">
      {/* add task button */}
      <div className="w-full flex justify-end">
        <button className="btn btn-primary" onClick={addColumn}>
          <FaPlus /> Add Column
        </button>
      </div>

      {/* cards container - cards created in a row*/}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="items-center w-full p-2 m-auto p-auto">
          <div className="flex flex-row gap-5 items-center overflow-x-auto overflow-y-hidden">
            <SortableContext items={columnID}>
              {columns.map((item) => {
                return (
                  <ColumnContainer
                    key={item.id}
                    {...item}
                    deleteColumn={deleteColumn}
                  />
                );
              })}
            </SortableContext>
          </div>
        </div>
        {/* Display a overlay (i.e the card being dragged is shown at the tip of the mouse pointer) */}
        {createPortal(
          <DragOverlay>{getActiveElement()}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default Main;
