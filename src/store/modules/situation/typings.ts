export interface Coord {
  x: number;
  y: number;
}

export interface Piece {
  types: 'car' | 'horse' | 'elephant' | 'general' | 'guard' | 'cannon' | 'soldier' | 'null';
  group: 'RED' | 'BLACK' | 'null';
  isDead: boolean;
}

export interface State {
  pieceInMap: Piece[][];
}

export const MAX_WIDTH = 9;
export const MAX_HEIGHT = 10;
