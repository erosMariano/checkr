import { useState } from 'react';

import './styles.css';
import Plus from '../../assets/icons/plus.svg';
import Trash from '../../assets/icons/trash.svg';

import Header from '../../components/Header';

interface Task {
  id: number;
  text: string;
  status: string;
}

interface Column {
  id: string;
  title: string;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Get groceries', status: 'todo' },
    { id: 2, text: 'Feed the dogs', status: 'todo' },
    { id: 3, text: 'Mow the lawn', status: 'todo' },
    { id: 4, text: 'Binge 80 hours of Game of Thrones', status: 'doing' },
    {
      id: 5,
      text: 'Watch video of a man raising a grocery store lobster as a pet',
      status: 'done'
    }
  ]);
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'TODO' },
    { id: 'doing', title: 'Doing' },
    { id: 'done', title: 'Done' }
  ]);

  console.log(tasks);

  const [editableTask, setEditableTask] = useState<Task | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLParagraphElement>,
    id: number
  ) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: string
  ) => {
    const id = e.dataTransfer.getData('text/plain');
    const updatedTasks = tasks.map((task) =>
      task.id.toString() === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteColumn = (columnId: string) => {
    const updatedColumns = columns.filter((column) => column.id !== columnId);
    setColumns(updatedColumns);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task: Task) => {
    setEditableTask(task);
  };

  const handleSaveEdit = (taskId: number, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setEditableTask(null);
  };
  const handleEditColumnTitle = (columnId: string, newTitle: string) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId ? { ...column, title: newTitle } : column
    );
    setColumns(updatedColumns);
  };

  const handleAddTask = (columnId: string) => {
    const newTaskId = tasks.length + 1; // Gera um novo ID para a nova task
    const newTask: Task = {
      id: newTaskId,
      text: 'Nova Tarefa',
      status: columnId
    };
    const updatedTasks = [...tasks, newTask]; // Adiciona a nova task à lista de tasks
    setTasks(updatedTasks);
  };

  const renderTasks = (status: string) =>
    tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div key={task.id} className="task-container">
          {editableTask && editableTask.id === task.id ? (
            <div>
              <input
                type="text"
                value={editableTask.text}
                onChange={(e) =>
                  setEditableTask({ ...editableTask, text: e.target.value })
                }
              />
              <button
                onClick={() =>
                  handleSaveEdit(editableTask.id, editableTask.text)
                }
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <div
                className="task"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                <p>{task.text}</p>
                <div className="buttons_task">
                  <button
                    className="deletar"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button className="edit" onClick={() => handleEditTask(task)}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ));

  return (
    <>
      <Header />
      <div className="container-task ">
        <div className="lanes">
          {columns.map((column) => (
            <div
              style={{ position: 'relative' }}
              key={column.id}
              className="swim-lane"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="heading">
                <input
                  type="text"
                  value={column.title}
                  onChange={(e) =>
                    handleEditColumnTitle(column.id, e.target.value)
                  }
                />
                <button
                  className="deletar-card"
                  onClick={() => handleDeleteColumn(column.id)}
                >
                  <img src={Trash} alt="Icond deletar" />
                </button>
              </div>
              {renderTasks(column.id)}
              <button
                className="addTask"
                onClick={() => handleAddTask(column.id)}
              >
                <img src={Plus} alt="" />
                Add task
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
