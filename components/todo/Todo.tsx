import Card from 'components/card/Card';
import TextInput from 'components/UI/TextInput';
import styled from 'styled-components';
import Task from './Task';

const TodoWrapper = styled.div`
    margin-top: 1rem;
`

const Todo = () => {
  return (
    <Card title='To-do List' classes={{ height: '60rem' }}>
      <TodoWrapper>
        <TextInput />
        <Task />
      </TodoWrapper>
    </Card>
  );
};

export default Todo;
