import { MatchedCombinationState } from '../../matchedCombination/reducer';
import { RootState } from '../../reducer';
import { selectPlayersState, selectByIds, selectAllIds, selectWinners, makeSelectPlayer, makeSelectPlayerTable, makeSelectEveryPlayerData, makeSelectWinnerExist, makeSelectWinnerName } from '../selectors';
import { PlayersState, PlayerStateValue } from '../reducer';

describe('Players selectors', () => {
  it('should select playersState', () => {
    const rootState: RootState = {
      gameStatus: {
        currentPlayerId: null,
        selectedNumbers: [],
      },
      matchedCombination: {
        byIds: {},
        allIds: [],
      },
      players: {
        byIds: {
          // tslint:disable-next-line: object-literal-key-quotes
          '1': {
            id: '1',
            name: 'Player 1',
            table: [1, 2, 4],
          },
        },
        allIds: ['1'],
      },
    };

    expect(selectPlayersState(rootState)).toEqual({
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          name: 'Player 1',
          table: [1, 2, 4],
        },
      },
      allIds: ['1'],
    });

    rootState.players = undefined as any; // FIXME

    expect(selectPlayersState(rootState)).toEqual({
      byIds: {},
      allIds: [],
    });
  });

  it('should select byIds object.', () => {
    const state = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          name: 'Player 1',
          table: [1, 2, 4],
        },
      },
      allIds: ['1'],
    };

    expect(selectByIds.resultFunc(state)).toEqual({
      // tslint:disable-next-line: object-literal-key-quotes
      '1': {
        id: '1',
        name: 'Player 1',
        table: [1, 2, 4],
      },
    });
  });

  it('should select allIds array.', () => {
    const state = {
      byIds: {
        // tslint:disable-next-line: object-literal-key-quotes
        '1': {
          id: '1',
          name: 'Player 1',
          table: [1, 2, 4],
        },
      },
      allIds: ['1'],
    };

    expect(selectAllIds.resultFunc(state)).toEqual(['1']);
  });

  it('should select winners', () => {
    const playerByIds: PlayersState['byIds'] = {
      // tslint:disable-next-line: object-literal-key-quotes
      '1': {
        id: '1',
        name: 'Player 1',
        table: [1, 2, 4],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '2': {
        id: '2',
        name: 'Player 2',
        table: [1, 2, 4],
      },
    };
    const combinationByIds: MatchedCombinationState['byIds'] = {
      // tslint:disable-next-line: object-literal-key-quotes
      '1': {
        id: '1',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '2': {
        id: '2',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '3': {
        id: '3',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '4': {
        id: '4',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
    };
    expect(selectWinners.resultFunc(playerByIds, combinationByIds)).toEqual([]);

    combinationByIds['5'] = {
      id: '5',
      playerId: '1',
      combination: [1, 2, 3, 4, 5],
    };

    expect(selectWinners.resultFunc(playerByIds, combinationByIds)).toEqual([
      {
        id: '1',
        name: 'Player 1',
        table: [1, 2, 4],
      },
    ]);
  });

  it('should select player selector', () => {
    const id = '1';
    const playerByIds: PlayersState['byIds'] = {
      // tslint:disable-next-line: object-literal-key-quotes
      '1': {
        id: '1',
        name: 'Player 1',
        table: [1, 2, 4],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '2': {
        id: '2',
        name: 'Player 2',
        table: [1, 2, 4],
      },
    };

    expect(makeSelectPlayer(id).resultFunc).toBeTruthy();
    expect(makeSelectPlayer(id).resultFunc(playerByIds)).toEqual({
      id: '1',
      name: 'Player 1',
      table: [1, 2, 4],
    });
    expect(makeSelectPlayer(id).resultFunc({})).toEqual(undefined);
  });

  it('should select player table', () => {
    const id = '1';
    const table = [1, 2, 4];
    const player: PlayerStateValue = {
      table,
      id: '1',
      name: 'Player 1',
    };

    expect(makeSelectPlayerTable(id).resultFunc(player)).toEqual(table);
  });

  it('should select every player data', () => {
    const playerByIds: PlayersState['byIds'] = {
      // tslint:disable-next-line: object-literal-key-quotes
      '1': {
        id: '1',
        name: 'Player 1',
        table: [1, 2, 4],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '2': {
        id: '2',
        name: 'Player 2',
        table: [12, 13, 14],
      },
    };
    const selectedNumbers = [1, 2, 3];
    const combinationByIds: MatchedCombinationState['byIds'] = {
      // tslint:disable-next-line: object-literal-key-quotes
      '1': {
        id: '1',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '2': {
        id: '2',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '3': {
        id: '3',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
      // tslint:disable-next-line: object-literal-key-quotes
      '4': {
        id: '4',
        playerId: '1',
        combination: [1, 2, 3, 4, 5],
      },
    };
    const expectedResult = [
      {
        id: '1',
        name: 'Player 1',
        table: [
          { key: 1, isSelected: true },
          { key: 2, isSelected: true },
          { key: 4, isSelected: false },
        ],
        matchedIndexList: [
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
        ],
      },
      {
        id: '2',
        name: 'Player 2',
        table: [
          { key: 12, isSelected: false },
          { key: 13, isSelected: false },
          { key: 14, isSelected: false },
        ],
        matchedIndexList: [],
      },
    ];

    expect(makeSelectEveryPlayerData().resultFunc(playerByIds, selectedNumbers, combinationByIds)).toEqual(expectedResult);
  });

  it('should select whether winner exists', () => {
    const winners = [
      {
        id: '1',
        name: 'Player 1',
        table: [1, 2, 4],
      },
      {
        id: '2',
        name: 'Player 2',
        table: [1, 2, 13],
      },
    ];

    expect(makeSelectWinnerExist().resultFunc(winners)).toEqual(true);
    winners.pop();
    expect(makeSelectWinnerExist().resultFunc(winners)).toEqual(true);
    winners.pop();
    expect(makeSelectWinnerExist().resultFunc(winners)).toEqual(false);
  });

  it('should select winner name', () => {
    const winners = [
      {
        id: '1',
        name: 'Player 1',
        table: [1, 2, 4],
      },
      {
        id: '2',
        name: 'Player 2',
        table: [1, 2, 13],
      },
    ];

    expect(makeSelectWinnerName().resultFunc(winners)).toEqual(null);
    winners.pop();
    expect(makeSelectWinnerName().resultFunc(winners)).toEqual('Player 1');
    winners.pop();
    expect(makeSelectWinnerName().resultFunc(winners)).toEqual(null);
  });
});
