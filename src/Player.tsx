import * as React from 'react';
import { chunk as _chunk, range as _range, map as _map } from 'lodash';

interface IPlayerProps {
  name: string;
}

export default class Player extends React.Component<IPlayerProps> {
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

  /**
   * 빙고 맞춘 조합 목록을 렌더링합니다.
   */
  private renderCompleteCollectionList() {
    return _map(
      [
        // FIXME: 더미 데이터 수정
        [1, 2, 3, 4, 5],
        [3, 19, 14, 6, 12],
      ],
      collection => (
        <div key={collection.join('-')}>
          {collection.join(', ')}
        </div>
      ),
    );
  }

  public render() {
    const { name } = this.props;
    return (
      <div>
        <div>{name}</div>
        <table>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
        <div>
          <div>빙고 조합</div>
          <div>
            {this.renderCompleteCollectionList()}
          </div>
        </div>
      </div>
    );
  }
}
