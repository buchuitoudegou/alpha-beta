export interface Coord {
  x: number;
  y: number;
}

export interface Piece {
  types: 'car' | 'horse' | 'elephant' | 'general' | 'guard' | 'cannon';
  group: 'MAX' | 'MIN';
  isDead: boolean;
}

export interface State {
  pieceInMap: Map<Coord, Piece>;
}

export const MAX_WIDTH = 9;
export const MAX_HEIGHT = 10;
