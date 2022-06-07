import Checked from 'components/svg/Checked';
import Unchecked from 'components/svg/Unchecked';
import Button from 'components/UI/Button';
import ITask from 'models/task';
import { FC, useState } from 'react';
import styled from 'styled-components';

const TaskWrapper = styled.div<{ isDeleting: boolean }>`
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.lightGray + '4D'};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  opacity: ${(props) => (props.isDeleting ? '0' : '1')};
  transition: opacity 0.5s ease-out;

  h3 {
    font-size: 1.66rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.lightWhite};
  }
`;

type Props = {
  task: ITask;
  deleteTask: (id: string) => void;
};

const Task: FC<Props> = ({ task, deleteTask }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTaskHanler = () => {
    setIsDeleting(true);
    deleteTask(task.id);
  };

  return (
    <TaskWrapper isDeleting={isDeleting}>
      <Button model='icon' onClick={deleteTaskHanler}>
        <span>
          {!isDeleting && <Unchecked />}
          {isDeleting && <Checked />}
        </span>
      </Button>
      <h3>{task.task}</h3>
    </TaskWrapper>
  );
};

export default Task;
