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

type BoardProps = BoardPropsFromState & BoardPropsFromDispatch;

interface BoardState {
  bingoTable: number[];
}

const Table = styled.table`
  border-collapse: collapse;
`;

const Td = styled.td<{active: boolean}>`
  border: solid 1px #eeeeee;
  padding: 12px;
  text-align: center;
  cursor: pointer;

  ${({ active }) => active && 'color: #fd0d5c' }
`;

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      bingoTable: _map(_shuffle(_range(25)), num => num + 1),
    };
  }

  private makeTdClickHandler(num: number) {
    return () => {
      this.props.addNumber(num);
    };
  }

  /**
   * 보드판 행, 열을 렌더링합니다.
   */
  private renderTableRows() {
    const { selectedNumberList } = this.props;
    return _map(
      _chunk(this.state.bingoTable, 5),
      (row) => {
        const entityList = _map(row, num => (
          <Td
            key={num}
            active={selectedNumberList.includes(num)}
            onClick={this.makeTdClickHandler(num)}
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
