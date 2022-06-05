import { FC } from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button<{ model: string }>`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background-color: transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.lightWhite};
  padding: 0.8rem 2rem;

  &:hover {
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.lightWhite};
    color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    cursor: default;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.lightGray};
  }

  ${(props) => {
    if (props.model === 'icon') {
      return css`
        border: none;
        padding: 0.5rem 0.8rem;

        &:hover,
        &:disabled {
          border: none;
        }

        &:hover {
          svg {
            fill: ${({ theme }) => theme.colors.lightWhite};
          }
        }
      `;
    }
  }}
`;

type Props = {
  children: JSX.Element | string;
  onClick?: () => void;
  disabled?: boolean;
  model?: string;
};

const Button: FC<Props> = ({
  children,
  onClick,
  disabled,
  model = 'primary',
}) => {
  return (
    <StyledButton model={model} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
