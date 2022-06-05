import Button from 'components/UI/Button';
import { createTimer } from 'functions/timer';
import { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import StyledTag from 'styles/Tag.styled';

const Modal = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .field {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    .field-heading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1rem;

      h3 {
        color: ${({ theme }) => theme.colors.lightWhite};
        font-size: 1.6rem;
        font-weight: 400;
      }
    }

    input[type='range'] {
      width: 100%;
    }
  }
`;

type Props = {
  setTimerValue: (time: number, breakTime: number) => void;
};

const ConfigTimer: FC<Props> = ({ setTimerValue }) => {
  const [userTimer, setUserTimer] = useState(5400);
  const [userBreakTime, setUserBreakTimer] = useState(600);

  const focusTimer = createTimer(userTimer);
  const breakTimer = createTimer(userBreakTime);

  const timerChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setUserTimer(+e.target.value);

  const breaktimeChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setUserBreakTimer(+e.target.value);

  const applyTimerChanges = () => setTimerValue(userTimer, userBreakTime);

  return (
    <Modal>
      <div className='field'>
        <div className='field-heading'>
          <h3>Focus</h3>
          <StyledTag>{focusTimer}</StyledTag>
        </div>
        <input
          type='range'
          min={1500}
          max={7200}
          step={300}
          value={userTimer}
          onChange={timerChangeHandler}
        />
      </div>
      <div className='field'>
        <div className='field-heading'>
          <h3>Break Time</h3>
          <StyledTag>{breakTimer}</StyledTag>
        </div>
        <input
          type='range'
          min={300}
          max={1200}
          step={60}
          value={userBreakTime}
          onChange={breaktimeChangeHandler}
        />
      </div>
      <Button onClick={applyTimerChanges}>Apply</Button>
    </Modal>
  );
};

export default ConfigTimer;
