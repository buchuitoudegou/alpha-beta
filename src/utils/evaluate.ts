import { Piece, MAX_HEIGHT, MAX_WIDTH, Coord } from '@/store/modules/situation/typings';
import { isValidMove } from './move';
import { NULL_PIECE } from '@/store/modules/situation';

const MAX_DEPTH = 4;

function arrDeepCopy(src: number[][]) {
  const newArr: number[][] = [];
  src.forEach((arr: number[]) => {
    const temp: number[] = [];
    arr.forEach((ele: number) => {
      temp.push(ele);
    });
    newArr.push(temp);
  });
  return newArr;
}

function pieceEqual(p1: Piece, p2: Piece) {
  return (p1.types === p2.types && p1.group === p2.group);
}

function pieceMapCopy(src: Piece[][]): Piece[][] {
  const target: Piece[][] = [];
  src.forEach((arr: Piece[]) => {
    const temp: Piece[] = [];
    arr.forEach((ele: Piece) => {
      const tmp: Piece = {
        types: ele.types,
        group: ele.group,
        isDead: ele.isDead
      };
      temp.push(tmp);
    });
    target.push(temp);
  });
  return target;
}

export const valueOfBLACKCar = [
  [206, 208, 207, 213, 214, 213, 207, 208, 206],
  [206, 212, 209, 216, 233, 216, 209, 212, 206],
  [206, 208, 207, 214, 216, 214, 207, 208, 206],
  [206, 213, 213, 216, 216, 216, 213, 213, 206],
  [208, 211, 211, 214, 215, 214, 211, 211, 208],
  [208, 212, 212, 214, 215, 214, 212, 212, 208],
  [204, 209, 204, 212, 214, 212, 204, 209, 204],
  [198, 208, 204, 212, 212, 212, 204, 208, 198],
  [200, 208, 206, 212, 200, 212, 206, 208, 200],
  [194, 206, 204, 212, 200, 212, 204, 206, 194]
];

export const valueOfBLACKHorse = [
  [90, 90, 90, 96, 90, 96, 90, 90, 90],
  [90, 96, 103, 97, 94, 97, 103, 96, 90],
  [92, 98, 99, 103, 99, 103, 99, 98, 92],
  [93, 108, 100, 107, 100, 107, 100, 108, 93],
  [90, 100, 99, 103, 104, 103, 99, 100, 90],
  [90, 98, 101, 102, 103, 102, 101, 98, 90],
  [92, 94, 98, 95, 98, 95, 98, 94, 92],
  [93, 92, 94, 95, 92, 95, 94, 92, 93],
  [85, 90, 92, 93, 78, 93, 92, 90, 85],
  [88, 85, 90, 88, 90, 88, 90, 85, 88]
];

export const valueOfElephant = [
  [0, 0, 20, 0, 0, 0, 20, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 23, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 20, 0, 0, 0, 20, 0, 0],
  [0, 0, 20, 0, 0, 0, 20, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [18, 0, 0, 0, 23, 0, 0, 0, 18],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 20, 0, 0, 0, 20, 0, 0]
];

export const valueOfGuard = [
  [0, 0, 0, 20, 0, 20, 0, 0, 0],
  [0, 0, 0, 0, 23, 0, 0, 0, 0],
  [0, 0, 0, 20, 0, 20, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 20, 0, 20, 0, 0, 0],
  [0, 0, 0, 0, 23, 0, 0, 0, 0],
  [0, 0, 0, 20, 0, 20, 0, 0, 0]
];

export const valueOfGeneral = [
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
];

export const valueOfBLACKCannon = [
  [100, 100,  96, 91,  90, 91,  96, 100, 100],
  [ 98,  98,  96, 92,  89, 92,  96,  98,  98],
  [ 97,  97,  96, 91,  92, 91,  96,  97,  97],
  [ 96,  99,  99, 98, 100, 98,  99,  99,  96],
  [ 96,  96,  96, 96, 100, 96,  96,  96,  96],
  [ 95,  96,  99, 96, 100, 96,  99,  96,  95],
  [ 96,  96,  96, 96,  96, 96,  96,  96,  96],
  [ 97,  96, 100, 99, 101, 99, 100,  96,  97],
  [ 96,  97,  98, 98,  98, 98,  98,  97,  96],
  [ 96,  96,  97, 99,  99, 99,  97,  96,  96]
];

export const valueOfBLACKSodier = [
  [ 9,  9,  9, 11, 13, 11,  9,  9,  9],
  [19, 24, 34, 42, 44, 42, 34, 24, 19],
  [19, 24, 32, 37, 37, 37, 32, 24, 19],
  [19, 23, 27, 29, 30, 29, 27, 23, 19],
  [14, 18, 20, 27, 29, 27, 20, 18, 14],
  [ 7,  0, 13,  0, 16,  0, 13,  0,  7],
  [ 7,  0,  7,  0, 15,  0,  7,  0,  7],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0]
];

export const valueOfREDCar = arrDeepCopy(valueOfBLACKCar).reverse();
export const valueOfREDCannon = arrDeepCopy(valueOfBLACKCannon).reverse();
export const valueOfREDHorse = arrDeepCopy(valueOfBLACKHorse).reverse();
export const valueOfREDSoldier = arrDeepCopy(valueOfBLACKSodier).reverse();

export function evaluate(map: Piece[][]): number {
  let valueOfBLACK: number = 0.0;
  for (let i = 0; i < MAX_WIDTH; ++i) {
    for (let j = 0; j < MAX_HEIGHT; ++j) {
      const curPiece: Piece = map[i][j];
      if (curPiece.types === 'null') {
        continue;
      }
      switch (curPiece.types) {
        case 'general':
          valueOfBLACK += (curPiece.group === 'BLACK') ? valueOfGeneral[j][i] : -valueOfGeneral[j][i]; break;
        case 'guard':
          valueOfBLACK += (curPiece.group === 'BLACK') ? valueOfGuard[j][i] : -valueOfGuard[j][i]; break;
        case 'elephant':
          valueOfBLACK += (curPiece.group === 'BLACK') ? valueOfElephant[j][i] : -valueOfElephant[j][i]; break;
        case 'soldier':
          valueOfBLACK += (curPiece.group === 'BLACK') ? valueOfBLACKSodier[j][i] : -valueOfREDSoldier[j][i]; break;
        case 'car':
          valueOfBLACK += (curPiece.group === 'BLACK') ? valueOfBLACKCar[j][i] : -valueOfREDCar[j][i]; break;
        case 'cannon':
          valueOfBLACK += (curPiece.group === 'BLACK') ? valueOfBLACKCannon[j][i] : -valueOfREDCannon[j][i]; break;
        case 'horse':
          valueOfBLACK += (curPiece.group === 'BLACK') ? valueOfBLACKHorse[j][i] : -valueOfREDHorse[j][i]; break;
      }
    }
  }
  return valueOfBLACK;
}

/**
 * description: stucture of node. 'BLACK' represents the  player while 'RED' represents the bot
 * @param {Piece[][]} data status of current node
 * @param {'BLACK' | 'RED'} type type of the node
 * @param {number} depth depth of the node
 * @param {Node[]} children children of the node
 * @param {number} alpha lower bound of the value
 * @param {number} beta upper bound of the value
 */
export class Node {
  data: Piece[][];
  group: 'RED' | 'BLACK';
  depth: number;
  children: Node[];
  value: number;
  alpha: number;
  beta: number;
  constructor(data: Piece[][], group: 'RED' | 'BLACK',
              depth: number, children: Node[], alpha: number, beta: number) {
    this.data = pieceMapCopy(data);
    this.group = group;
    this.depth = depth;
    this.children = children;
    this.value = -99999;
    this.alpha = alpha;
    this.beta = beta;
  }

  findChildren() {
    if (this.depth >= MAX_DEPTH) {
      this.value = evaluate(this.data);
      return;
    }
    if (this.group === 'RED') {
      // bot node
      // find out the least value of its children
      let minValue = 9999999;
      for (let i = 0; i < MAX_WIDTH; ++i) {
        for (let j = 0; j < MAX_HEIGHT; ++j) {
          if (this.data[i][j].types === 'null' || this.data[i][j].group !== 'RED') {
            continue;
          }
          for (let k = 0; k < MAX_WIDTH; ++k) {
            for (let p = 0; p < MAX_HEIGHT; ++p) {
              const temp: Piece[][] = pieceMapCopy(this.data);
              if (isValidMove(this.data, this.data[i][j], { x: i, y: j }, { x: k, y: p }, 'RED')) {
                const curPiece = temp[i][j];
                const toPiece = temp[k][p];
                if (toPiece.types !== 'null') {
                  temp[k][p].isDead = true;
                }
                if (curPiece.types !== 'null') {
                  temp[k][p] = curPiece;
                  temp[i][j] = NULL_PIECE;
                }
                const newNode = new Node(temp, 'BLACK', this.depth + 1, [], this.alpha, this.beta);
                newNode.findChildren();
                // console.log(newNode.value);
                this.children.push(newNode);
                if (minValue > newNode.value) {
                  minValue = newNode.value;
                  this.beta = minValue;
                }
              }
              if (this.alpha >= this.beta) {
                break;
              }
            }
            if (this.alpha >= this.beta) {
              break;
            }
          }
          if (this.alpha >= this.beta) {
            break;
          }
        }
        if (this.alpha >= this.beta) {
          break;
        }
      }
      this.value = minValue;
    } else if (this.group === 'BLACK') {
      // player node
      // find out the max node of its children
      let maxValue = -99999;
      for (let i = 0; i < MAX_WIDTH; ++i) {
        for (let j = 0; j < MAX_HEIGHT; ++j) {
          if (this.data[i][j].types === 'null' || this.data[i][j].group !== 'BLACK') {
            continue;
          }
          for (let k = 0; k < MAX_WIDTH; ++k) {
            for (let p = 0; p < MAX_HEIGHT; ++p) {
              const temp: Piece[][] = pieceMapCopy(this.data);
              if (isValidMove(temp, temp[i][j], { x: i, y: j }, { x: k, y: p }, 'BLACK')) {
                const curPiece = temp[i][j];
                const toPiece = temp[k][p];
                // if (i === k && j === p) {
                //   console.log(';aaa');
                // }
                if (toPiece.types !== 'null') {
                  temp[k][p].isDead = true;
                }
                if (curPiece.types !== 'null') {
                  temp[k][p] = curPiece;
                  temp[i][j] = NULL_PIECE;
                }
                const newNode = new Node(temp, 'RED', this.depth + 1, [], this.alpha, this.beta);
                newNode.findChildren();
                this.children.push(newNode);
                if (maxValue < newNode.value) {
                  maxValue = newNode.value;
                  this.alpha = maxValue;
                }
              }
              if (this.alpha >= this.beta) {
                break;
              }
            }
            if (this.alpha >= this.beta) {
              break;
            }
          }
          if (this.alpha >= this.beta) {
            break;
          }
        }
        if (this.alpha >= this.beta) {
          break;
        }
      }
      this.value = maxValue;
    }
  }
  findNext(): { from: Coord, to: Coord } {
    let nextNode: Node = this.children[0];
    this.children.forEach((node: Node) => {
      if (this.value === node.value) {
        nextNode = node;
      }
    });
    const nextData = nextNode.data;
    const diff: Coord[] = [];
    for (let i = 0; i < MAX_WIDTH; ++i) {
      for (let j = 0; j < MAX_HEIGHT; ++j) {
        if (!pieceEqual(nextData[i][j], this.data[i][j])) {
          diff.push({ x: i, y: j });
        }
      }
    }
    console.log(diff[0], this.data[diff[0].x][diff[0].y]);
    console.log(diff[1], this.data[diff[1].x][diff[1].y]);
    if (this.data[diff[0].x][diff[0].y].group === this.group &&
       this.data[diff[0].x][diff[0].y].group !== 'null') {
      return {
        from: diff[0],
        to: diff[1]
      };
    } else {
      return {
        from: diff[1],
        to: diff[0]
      };
    }
  }
}
