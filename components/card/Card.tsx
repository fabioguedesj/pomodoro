import Close from 'components/svg/Close';
import Settings from 'components/svg/Settings';
import Button from 'components/UI/Button';
import { FC, useState } from 'react';
import styled from 'styled-components';

const CardWrapper = styled.section<{
  showConfig: boolean;
  classes: { height: string };
}>`
  position: relative;
  width: 100%;
  max-width: 45rem;
  height: ${(props) => props.classes.height};

  div.card-front,
  div.card-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.gray};
    box-shadow: ${({theme}) => theme.boxShadow};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 2rem;
    padding-top: 1rem;
    backface-visibility: hidden;
    transition: transform 1s ease-out;

    .header {
      padding-bottom: 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray + '4D'};
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1,
      h2 {
        color: ${({ theme }) => theme.colors.lightWhite};
        font-size: 2.1rem;
        font-weight: 400;
      }
    }
  }

  div.card-front {
    transform: ${(props) =>
      props.showConfig ? 'rotateY(180deg)' : 'rotateY(0)'};
  }

  div.card-back {
    transform: rotateY(-180deg);
    transform: ${(props) =>
      props.showConfig ? 'rotateY(0)' : 'rotateY(-180deg)'};
  }
`;

type Props = {
  title: string;
  children: JSX.Element;
  settings?: boolean;
  settingsContent?: JSX.Element;
  classes: { height: string };
};

const Card: FC<Props> = ({
  children,
  title,
  settings = false,
  settingsContent,
  classes,
}) => {
  const [showConfig, setShowConfig] = useState(false);

  const onSettingsClick = () => setShowConfig(true);
  const onCloseClick = () => setShowConfig(false);

  return (
    <CardWrapper showConfig={showConfig} classes={classes}>
      <div className='card-front'>
        <div className='header'>
          <h1>{title}</h1>
          {settings && (
            <Button model='icon' onClick={onSettingsClick}>
              <span>
                <Settings />
              </span>
            </Button>
          )}
        </div>
        {children}
      </div>
      {settings && (
        <div className='card-back'>
          <div className='header'>
            <h2>Settings</h2>
            {settings && (
              <Button model='icon' onClick={onCloseClick}>
                <span>
                  <Close />
                </span>
              </Button>
            )}
          </div>
          {settingsContent}
        </div>
      )}
    </CardWrapper>
  );
};

export default Card;
