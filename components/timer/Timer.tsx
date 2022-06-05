import { useEffect, useState } from 'react';
import Button from 'components/UI/Button';
import styled from 'styled-components';
import Card from 'components/card/Card';
import ConfigTimer from './ConfigTimer';
import {
  startAndSaveTimer,
  clearTimer,
  sendNotification,
  createTimer,
} from 'functions/timer';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 1rem;
  position: relative;

  h3 {
    color: ${({ theme }) => theme.colors.lightWhite};
    font-weight: 400;
    font-size: 1.5rem;
  }
`;

const RenderTimer = styled.h2<{ isPaused: boolean; isChange: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: 6.8rem;
  font-weight: 700;
  animation: ${(props) =>
    props.isPaused || props.isChange
      ? 'colorAnimation 1.5s ease-out infinite alternate'
      : 'none'};

  @keyframes colorAnimation {
    0% {
      color: ${({ theme }) => theme.colors.lightWhite};
    }
    100% {
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledProgressBar = styled.div<{ delayTime: number; isActive: boolean }>`
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  width: 100%;
  height: 0.3rem;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.darkGreen},
    ${({ theme }) => theme.colors.lightGreen}
  );
  position: absolute;
  top: 0;
  left: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  animation: ${(props) => (props.isActive ? `progress 11s linear` : 'none')};

  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

const Timer = () => {
  const [timer, setTimer] = useState(5400);
  const [changeTime, setChangeTime] = useState(10);

  const [defaultTimer, setDefaultTimer] = useState(5400);
  const [defaultBreakTime, setDefaultBreakTime] = useState(600);
  const [defaultChangeTime, setDefaultChangeTime] = useState(10);

  const [timerId, setTimerId] = useState<NodeJS.Timer>();
  const [changeTimeId, setChangeTimeId] = useState<NodeJS.Timer>();

  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    const getUserPermission = async () => {
      const userPermission = await Notification.requestPermission();
    };
    getUserPermission();
  }, []);

  const setTimerValue = (timer: number, breakTime: number) => {
    clearTimer(timerId, setTimerId);
    clearTimer(changeTimeId, setChangeTimeId);
    setIsPaused(true);
    setIsBreak(false);
    setTimer(timer);
    setDefaultTimer(timer);
    setDefaultBreakTime(breakTime);
    setChangeTime(10);
  };

  const startTimer = () => {
    if (!isPaused) return;
    setIsPaused(false);
    setTimer((prevState) => prevState - 1);
    startAndSaveTimer(setTimer, setTimerId);
  };

  const pauseTimer = () => {
    if (isPaused) return;
    setIsPaused(true);
    clearTimer(timerId, setTimerId);
  };

  useEffect(() => {
    if (timer === -1 && !isBreak) {
      setIsBreak(true);
      setTimer(defaultBreakTime);
      clearTimer(timerId, setTimerId);

      sendNotification('Break Time', 'Go do some exercises');

      startAndSaveTimer(setChangeTime, setChangeTimeId);

      setTimeout(() => {
        startAndSaveTimer(setTimer, setTimerId);
      }, 10000);
    }

    if (timer === -1 && isBreak) {
      setIsBreak(false);
      setTimer(defaultTimer);
      clearTimer(timerId, setTimerId);

      sendNotification('Focus Time', 'Come back to work!');

      startAndSaveTimer(setChangeTime, setChangeTimeId);

      setTimeout(() => {
        startAndSaveTimer(setTimer, setTimerId);
      }, 10000);
    }

    if (changeTime === -1) {
      clearTimer(changeTimeId, setChangeTimeId);
      setChangeTime(10);
    }

    if (timer === 300 && !isBreak) {
      sendNotification('Slow down', `Just 5 minutes to break time`);
    }

    if (timer === 60 && !isBreak) {
      sendNotification('Almost there', `Break time starts in 1 minute`);
    }

    if (timer === 60 && isBreak) {
      sendNotification('Are you there?', `Break time ends in 1 minute`);
    }
  }, [
    timer,
    isBreak,
    defaultBreakTime,
    defaultTimer,
    timerId,
    changeTime,
    changeTimeId,
  ]);

  const renderTimer = createTimer(timer);

  let cardTitle = 'Pomodoro';
  if (!isBreak) cardTitle = 'Focus';
  if (isBreak) cardTitle = 'Break Time';
  if (!isBreak && changeTimeId !== undefined) cardTitle = `Starting Focus...`;
  if (isBreak && changeTimeId !== undefined)
    cardTitle = `Starting Break Time...`;

  return (
    <>
      <Card
        title='Pomodoro'
        classes={{height: '30rem'}}
        settings={true}
        settingsContent={<ConfigTimer setTimerValue={setTimerValue} />}>
        <TimerContainer>
          <StyledProgressBar
            delayTime={defaultChangeTime}
            isActive={changeTimeId !== undefined}
          />
          <RenderTimer
            isPaused={isPaused}
            isChange={changeTimeId !== undefined}>
            {renderTimer}
          </RenderTimer>
          <h3>{cardTitle}</h3>
          <ButtonsContainer>
            <Button onClick={startTimer} disabled={!isPaused}>
              Start
            </Button>
            <Button
              onClick={pauseTimer}
              disabled={isPaused || changeTimeId !== undefined}>
              Pause
            </Button>
          </ButtonsContainer>
        </TimerContainer>
      </Card>
    </>
  );
};

export default Timer;
