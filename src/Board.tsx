import * as React from 'react';
import { chunk as _chunk, range as _range, map as _map, shuffle as _shuffle } from 'lodash';
import styled from 'styled-components';
import { State } from './reducers';
import { Dispatch } from 'redux';
import { addNumber } from './actions';
import { connect } from 'react-redux';

interface BoardPropsFromState {
  selectedNumberList: number[];
}

interface BoardPropsFromDispatch {
  addNumber: (num: number) => any;
}

interface BoardProps extends BoardPropsFromState, BoardPropsFromDispatch {
  selectable: boolean;
}

interface BoardState {
  bingoTable: number[];
}

const Table = styled.table`
  border-collapse: collapse;
`;

const Td = styled.td<{selected: boolean, disabled: boolean}>`
  border: solid 1px #eeeeee;
  padding: 12px;
  text-align: center;

  ${({ selected }) => selected && 'color: #fd0d5c' }
  ${({ disabled }) => disabled ? 'cursor: not-allowed;' : 'cursor: pointer;'}
`;

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      bingoTable: _map(_shuffle(_range(25)), num => num + 1),
    };
  }

  /**
   * 번호를 눌렀을 때 처리 함수를 만드는 함수
   * @param num
   */
  private makeTdClickHandler(num: number) {
    return () => {
      this.props.addNumber(num);
    };
  }

  /**
   * 보드판 행, 열을 렌더링합니다.
   */
  private renderTableRows() {
    const { selectedNumberList, selectable } = this.props;

    return _map(
      _chunk(this.state.bingoTable, 5),
      (row) => {
        const entityList = _map(row, num => (
          <Td
            key={num}
            disabled={!selectable}
            selected={selectedNumberList.includes(num)}
            onClick={selectable ? this.makeTdClickHandler(num) : undefined}
          >
            {num}
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

function mapStateToProps(state: State): BoardPropsFromState {
  return {
    selectedNumberList: state.selectedNumberList,
  };
}

function mapDispatchToProps(dispatch: Dispatch): BoardPropsFromDispatch {
  return {
    addNumber: num => dispatch(addNumber(num)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Board);
