import ITask from 'models/task';
import { FC } from 'react';
import styled from 'styled-components';
import Task from './Task';

const TasksWrapper = styled.ul`
  overflow-y: scroll;
  margin-top: 2rem;
  flex-grow: 1;
  list-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  li:not(:first-child) {
    margin-top: 1.5rem;
  }
`;

type Props = {
  data: ITask[];
  deleteTask: (id: string) => void;
};

const Tasks: FC<Props> = ({ data, deleteTask }) => {
  const renderTasks = data.map((task) => (
    <li key={task.id}>
      <Task task={task} deleteTask={deleteTask}/>
    </li>
  ));

  return <TasksWrapper>{renderTasks}</TasksWrapper>;
};

export default Tasks;
