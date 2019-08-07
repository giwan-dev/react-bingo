import * as React from 'react';
import { chunk as _chunk, range as _range, map as _map } from 'lodash';
import styled from 'styled-components';

interface IBoardProps {
}

const Table = styled.table`
  border-collapse: collapse;
`;

const Td = styled.td`
  border: solid 1px #eeeeee;
  padding: 12px;
  text-align: center;
`;

export default class Board extends React.Component<IBoardProps> {
  /**
   * 보드판 행, 열을 렌더링합니다.
   */
  private renderTableRows() {
    // TODO: 각 부분 컴포넌트로 분리하기
    return _map(
      _chunk(_range(25), 5),
      (row) => {
        const entityList = _map(row, num => (
          <Td key={num}>
            {num + 1}
          </Td>
        ));

        return (
          <tr key={row.join('-')}>
            {entityList}
          </tr>
        );
      },
    );
  }

  public render() {
    return (
      <Table>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </Table>
    );
  }
}
