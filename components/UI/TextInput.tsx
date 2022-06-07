import Add from 'components/svg/Add';
import ITask from 'models/task';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { v4 as generateId } from 'uuid';

const StyledForm = styled.form`
  margin-top: 1rem;

  .field {
    display: flex;
    padding-left: 0.8rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

    .field__input {
      width: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.lightWhite};
    }
  }
`;

type Props = {
  createTask: (taskObj: ITask) => void;
};

const TextInput: FC<Props> = ({ createTask }) => {
  const [userTask, setUserTask] = useState('');

  const getUserTaskHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setUserTask(e.target.value);

  const createTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userTask) return;
    const id = generateId();
    const taskObj = {
      id,
      task: userTask,
    };
    createTask(taskObj);
    setUserTask('');
  };

  return (
    <StyledForm autoComplete='off' onSubmit={createTaskHandler}>
      <input type='hidden' autoComplete='false' />
      <div className='field'>
        <label htmlFor='task' className='field__label visually-hidden'>
          Add task
        </label>
        <input
          type='text'
          className='field__input'
          id='task'
          placeholder='Write your task here...'
          onChange={getUserTaskHandler}
          value={userTask}
        />
        <Button model='icon'>
          <span>
            <Add />
          </span>
        </Button>
      </div>
    </StyledForm>
  );
};

export default TextInput;
