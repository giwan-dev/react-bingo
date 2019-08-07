import * as React from 'react';
import { map as _map } from 'lodash';
import Board from './Board';

interface IPlayerProps {
  name: string;
}

export default class Player extends React.Component<IPlayerProps> {
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
        <Board />
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
