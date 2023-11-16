import { useMemo, useState } from 'react';

import Plus from '../../assets/icons/plus.svg';
import Trash from '../../assets/icons/trash.svg';

import { Column, Id, Task } from '../types';
import TaskCard from './TaskCard';

import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  const containerClasses = `column-container ${
    isDragging ? 'is-dragging' : ''
  }`;

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className={containerClasses}></div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className={containerClasses}>
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
      >
        <div>
          <div className="grap-card"></div>
          <span className="title-column">{!editMode && column.title}</span>
          {editMode && (
            <input
              className="edit-input"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          className="deletar-card"
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <img src={Trash} alt="Icond deletar" />
        </button>
      </div>

      {/* Column task container */}
      <div className="sortableContext">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="addTask"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <img src={Plus} alt="" />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
