import { Module } from 'vuex';
import { Coord, Piece, State, MAX_WIDTH, MAX_HEIGHT } from './typings';

export const MOVE = 'MOVE';
export const ADD = 'ADD';
export const MAP = 'MAP';
export const INITIAL = 'INITIAL';
export const CLEAR = 'CLEAR';
export const NULL_PIECE: Piece = {
  types: 'null',
  group: 'null',
  isDead: true,
};

export default {
  namespaced: true,
  state: () => ({
    pieceInMap: [[]],
  }),
  mutations: {
    [INITIAL](state: State) {
      state.pieceInMap = [];
      for (let i = 0; i < MAX_WIDTH; ++i) {
        const temp: Piece[] = [];
        for (let j = 0; j < MAX_HEIGHT; ++j) {
          temp.push(NULL_PIECE);
        }
        state.pieceInMap.push(temp);
      }
    },
    [MOVE](state: State, { from, to }: { from: Coord, to: Coord }) {
      const curPiece = state.pieceInMap[from.x][from.y];
      const toPiece = state.pieceInMap[to.x][to.y];
      if (toPiece.types !== 'null') {
        state.pieceInMap[to.x][to.y].isDead = true;
      }
      if (curPiece.types !== 'null') {
        state.pieceInMap[to.x][to.y] = curPiece;
        state.pieceInMap[from.x][from.y] = NULL_PIECE;
      }
    },
    [CLEAR](state: State) {
      state.pieceInMap = [];
      for (let i = 0; i < MAX_WIDTH; ++i) {
        const temp: Piece[] = [];
        for (let j = 0; j < MAX_HEIGHT; ++j) {
          temp.push(NULL_PIECE);
        }
        state.pieceInMap.push(temp);
      }
    },
    [ADD](state: State, { pos, piece }: { pos: Coord, piece: Piece }) {
      state.pieceInMap[pos.x][pos.y] = piece;
    },
  },
  getters: {
    [MAP](state): Piece[][] {
      return state.pieceInMap;
    },
  },
} as Module<State, any>;
