import COLOR from 'colors';
import styled from 'styled-components';

const Button = styled.button`
  margin: 0;
  height: 35px;
  border: 0;
  border-radius: 5px;
  padding: 8px 16px;
  color: white;
  background-color: ${COLOR.primary};
  cursor: pointer;
  transition: opacity ease-out 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export default Button;
