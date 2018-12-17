import { Module } from 'vuex';
import { Coord, Piece, State, MAX_WIDTH, MAX_HEIGHT } from './typings';

export const MOVE = 'MOVE';
export const ADD = 'ADD';
export const MAP = 'MAP';

export default {
  namespaced: true,
  state: () => ({
    pieceInMap: new Map<Coord, Piece>(),
  }),
  mutations: {
    [MOVE](state: State, { from, to }: { from: Coord, to: Coord }) {
      const curPiece = state.pieceInMap.get(from);
      if (to.x < 0 || to.x >= MAX_WIDTH || to.y < 0 || to.y >= MAX_HEIGHT) {
        return;
      }
      if (curPiece && curPiece.types === 'car') {
        if (!state.pieceInMap.get(to)) {
          state.pieceInMap.set(to, curPiece);
        } else {
          const piece = state.pieceInMap.get(to);
          if (piece && piece.group === curPiece.group) {
            return;
          } else if (piece) {
            state.pieceInMap.set(to, curPiece);
          }
        }
      }
    },
    [ADD](state: State, { pos, piece }: { pos: Coord, piece: Piece }) {
      state.pieceInMap.set(pos, piece);
    },
  },
  getters: {
    [MAP](state): Map<Coord, Piece> {
      return state.pieceInMap;
    },
  },
} as Module<State, any>;
