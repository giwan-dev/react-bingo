import * as React from 'react';
import { chunk as _chunk, map as _map } from 'lodash';
import styled from 'styled-components';
import { PlayerData, BingoEntityData } from './typing';
import { State } from './reducers';
import { Dispatch } from 'redux';
import { addNumber } from './actions';
import { connect } from 'react-redux';

interface PlayerPropsFromState {
}

interface PlayerPropsFromDispatch {
  onSelectNumber: (num: number) => any;
}

interface PlayerProps extends PlayerPropsFromState, PlayerPropsFromDispatch {
  isActive: boolean;
  player: PlayerData;
}

const Container = styled.div<{disabled: boolean}>`
  ${({ disabled }) => disabled && `
    * {
      opacity: 0.7;
    }

    td {
      cursor: not-allowed;
    }
  `}
`;

const PlayerName = styled.h2`
  margin-bottom: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const Td = styled.td<{selected: boolean, disabled: boolean}>`
  width: 50px;
  height: 50px;
  border: solid 1px #eeeeee;
  padding: 12px;
  text-align: center;

  ${({ selected }) => selected && 'color: #fd0d5c' }
  ${({ disabled }) => disabled ? 'cursor: not-allowed;' : 'cursor: pointer;'}
`;

const CompleteCollectionContainer = styled.div`
  margin-top: 30px;
`;

class Player extends React.Component<PlayerProps> {
  /**
   * 번호를 눌렀을 때 처리 함수를 만드는 함수
   * @param num
   */
  private makeTdClickHandler(num: number) {
    return () => {
      this.props.onSelectNumber(num);
    };
  }

  /**
   * 보드판 행, 열을 렌더링합니다.
   */
  private renderTableRows() {
    const { isActive, player } = this.props;

    return _map(
      _chunk(player.table, 5),
      (row, index) => {
        // TODO: 코드 정리
        const entityList = _map(row, (entity, index) => {
          const selectable = entity !== null && isActive && !entity.isSelected;
          const onClickHandler = selectable
            // HACK: selectable에 null 아닌거 들어가므로 보장됨
            ? this.makeTdClickHandler((entity as BingoEntityData).key)
            : undefined;

          return (
            <Td
              key={entity === null ? index : entity.key}
              disabled={!selectable}
              selected={entity !== null && entity.isSelected}
              onClick={onClickHandler}
            >
              {entity !== null ? entity.key : ''}
            </Td>
          );
        });

        return (
          <tr key={row.join('-') + index}>
            {entityList}
          </tr>
        );
      },
    );
  }

  /**
   * 빙고 맞춘 조합 목록을 렌더링합니다.
   */
  private renderMatchedCombinationList() {
    const { table, matchedIndexList } = this.props.player;

    return _map(
      _map(
        matchedIndexList,
        combination => _map(combination, (index) => {
          const entity = table[index];
          return entity !== null ? entity.key : null;
        }),
      ),
      (combination, index) => (
        <div key={combination.join('-') + index}>
          {combination.join(', ')}
        </div>
      ),
    );
  }

  public render() {
    const { player, isActive } = this.props;

    return (
      <Container disabled={!isActive}>
        <PlayerName>
          {player.name}
        </PlayerName>

        <Table>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </Table>

        <CompleteCollectionContainer>
          <div>빙고 조합</div>
          <div>
            {this.renderMatchedCombinationList()}
          </div>
        </CompleteCollectionContainer>
      </Container>
    );
  }
}

function mapStateToProps(state: State): PlayerPropsFromState {
  return {

  };
}

function mapDispatchToProps(dispatch: Dispatch): PlayerPropsFromDispatch {
  return {
    onSelectNumber: num => dispatch(addNumber(num)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Player);
