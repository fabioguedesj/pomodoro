import styled from 'styled-components';

const StyledTag = styled.span`
  color: ${({ theme }) => theme.colors.lightWhite};
  background-color: ${({ theme }) => theme.colors.lightBlack};
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1.5rem;
  font-weight: 400;
`;

export default StyledTag;
