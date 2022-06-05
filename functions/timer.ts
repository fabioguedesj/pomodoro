import { Dispatch, SetStateAction } from 'react';

export const startAndSaveTimer = (
  setTimerFunction: Dispatch<SetStateAction<number>>,
  setTimerIdFunction: Dispatch<SetStateAction<NodeJS.Timer | undefined>>
) => {
  const newTimerId = setInterval(() => {
    setTimerFunction((prevState) => prevState - 1);
  }, 1000);
  setTimerIdFunction(newTimerId);
};

export const clearTimer = (
  timerId: NodeJS.Timer | undefined,
  setTimerIdFunction: Dispatch<SetStateAction<NodeJS.Timer | undefined>>
) => {
  timerId && clearInterval(timerId);
  setTimerIdFunction(undefined);
};

export const sendNotification = (title: string, body: string) => {
  const notification = new Notification(title, { body });
};

export const createTimer = (timer: number) => {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;

  return `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;
};
