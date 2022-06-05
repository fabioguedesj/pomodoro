import Add from 'components/svg/Add';
import styled from 'styled-components';
import Button from './Button';

const StyledForm = styled.form`
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

const TextInput = () => {
  return (
    <StyledForm autoComplete='off'>
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
