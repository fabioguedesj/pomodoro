import Card from 'components/card/Card';
import TextInput from 'components/UI/TextInput';
import ITask from 'models/task';
import { useEffect, useState } from 'react';
import Tasks from './Tasks';

const DUMMY = [{ id: '1', task: 'This is your first task' }];

const Todo = () => {
  const [tasks, setTasks] = useState<ITask[]>(DUMMY);

  useEffect(() => {
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      const todos = JSON.parse(todosString);
      setTasks(todos);
    }
  }, []);

  const createTask = (task: ITask) => {
    setTasks((prevState) => [task, ...prevState]);
    localStorage.setItem('todos', JSON.stringify([task, ...tasks]));
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTimeout(() => {
      setTasks(newTasks);
      localStorage.setItem('todos', JSON.stringify(newTasks));
    }, 500);
  };

  return (
    <Card title='To-do List' classes={{ height: '60rem' }}>
      <>
        <TextInput createTask={createTask} />
        <Tasks data={tasks} deleteTask={deleteTask} />
      </>
    </Card>
  );
};

export default Todo;
