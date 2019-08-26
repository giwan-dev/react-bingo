import styled from 'styled-components';

const AlertWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: auto;
  width: 500px;
  height: 80px;
  border-radius: 5px;
  padding: 20px;
  background-color: white;
  transform: translate(-50%, -50%);
`;

export default AlertWrapper;
