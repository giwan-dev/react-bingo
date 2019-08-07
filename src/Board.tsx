import * as React from 'react';
import { chunk as _chunk, range as _range, map as _map } from 'lodash';

interface IBoardProps {
}

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
          <td key={num}>
            {num + 1}
          </td>
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
      <table>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    );
  }
}
