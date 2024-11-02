import { ID, TColumn } from "../../types/types";
import { RxCross2 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TProps {
  deleteColumn: (id: ID) => void;
  className?: string;
}

function ColumnContainer({
  title,
  id,
  deleteColumn,
  className,
}: TColumn & TProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, data: { type: "Column", column: { id, title } } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // component to show if the items is being dragged.
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="border flex-shrink-0 mb-5 card w-72 h-96 bg-primary opacity-40 border-primary"
      ></div>
    );
  }

  return (
    <div
      className={`border flex-shrink-0 mb-5 card w-72 h-96 bg-secondary border-primary ${className}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>ID: {id} </p>
        <div className="card-actions justify-end">
          <button
            className="btn bg-red-400 text-black hover:bg-red-500"
            onClick={() => deleteColumn(id)}
          >
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColumnContainer;
