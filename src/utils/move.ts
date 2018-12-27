import { Coord, Piece, MAX_WIDTH, MAX_HEIGHT } from '../store/modules/situation/typings';

export function isValidMove(
  map: Piece[][],
  piece: Piece,
  from: Coord,
  to: Coord,
  turn: 'RED' | 'BLACK'
): boolean {
  // wrong turn
  if (piece.group !== turn) {
    return false;
  }
  // no movement
  if (from.x === to.x && from.y === to.y) {
    return false;
  }
  // out of range
  if (to.x < 0 || to.x >= MAX_WIDTH || to.y < 0 || to.y >= MAX_HEIGHT) {
    return false;
  }
  // piece of the same group placed at to
  const toPiece = map[to.x][to.y];
  if (toPiece.group === piece.group) {
    return false;
  }
  // action of diff types
  if (piece.types === 'car') {
    // go straight
    if (from.x !== to.x && from.y !== to.y) {
      return false;
    }
    // stumble
    if (from.x === to.x) {
      let inc: number = 0;
      inc = (from.y > to.y) ? -1 : 1;
      for (let y = from.y + inc; y !== to.y; y += inc) {
        if (map[from.x][y].types !== 'null') {
          return false;
        }
      }
    } else if (from.y === to.y) {
      let inc: number = 0;
      inc = (from.x > to.x) ? -1 : 1;
      for (let x = from.x + inc; x !== to.x; x += inc) {
        if (map[x][from.y].types !== 'null') {
          return false;
        }
      }
    }
  } else if (piece.types === 'horse') {
    // bound in 2 * 2 step
    if (Math.abs(to.x - from.x) === 2) {
      if (Math.abs(to.y - from.y) !== 1) {
        return false;
      }
      // stumble
      if (to.x - from.x === 2) {
        const nextPiece = map[from.x + 1][from.y];
        if (nextPiece.types !== 'null') {
          return false;
        }
      } else if (to.x - from.x === -2) {
        const nextPiece = map[from.x - 1][from.y];
        if (nextPiece.types !== 'null') {
          return false;
        }
      }
    } else if (Math.abs(to.y - from.y) === 2) {
      if (Math.abs(from.x - to.x) !== 1) {
        return false;
      }
      // stumble
      if (to.y - from.y === 2) {
        const nextPiece = map[from.x][from.y + 1];
        if (nextPiece.types !== 'null') {
          return false;
        }
      } else if (to.y - from.y === -2) {
        const nextPiece = map[from.x][from.y - 1];
        // console.log(nextPiece);
        if (nextPiece.types !== 'null') {
          return false;
        }
      }
    } else {
      return false;
    }
  } else if (piece.types === 'cannon') {
    // go straight
    if (from.x !== to.x && from.y !== to.y) {
      return false;
    }
    if (map[to.x][to.y].types !== 'null' && map[to.x][to.y].group !== piece.group) {
      // attack
      if (from.x === to.x) {
        let inc: number = 0;
        let count: number = 0;
        inc = (from.y > to.y) ? -1 : 1;
        for (let y = from.y + inc; y !== to.y; y += inc) {
          if (map[from.x][y].types !== 'null') {
            count ++;
          }
        }
        if (count !== 1) {
          return false;
        }
      } else if (from.y === to.y) {
        let inc: number = 0;
        let count: number = 0;
        inc = (from.x > to.x) ? -1 : 1;
        for (let x = from.x + inc; x !== to.x; x += inc) {
          if (map[x][from.y].types !== 'null') {
            count ++;
          }
        }
        if (count !== 1) {
          return false;
        }
      }
    } else if (map[to.x][to.y].types === 'null') {
      // move
      if (from.x === to.x) {
        let inc: number = 0;
        inc = (from.y > to.y) ? -1 : 1;
        for (let y = from.y + inc; y !== to.y; y += inc) {
          if (map[from.x][y].types !== 'null') {
            return false;
          }
        }
      } else if (from.y === to.y) {
        let inc: number = 0;
        inc = (from.x > to.x) ? -1 : 1;
        for (let x = from.x + inc; x !== to.x; x += inc) {
          if (map[x][from.y].types !== 'null') {
            return false;
          }
        }
      }
    }
  } else if (piece.types === 'general') {
    if (piece.group === 'RED') {
      // bound in palace
      if (to.x < 3 || to.x > 5 || to.y > 2) {
        return false;
      }
    } else {
      // bound in palace
      if (to.y < 7 || to.x < 3 || to.x > 5) {
        return false;
      }
    }
    // go straight
    if (from.x !== to.x && from.y !== to.y) {
      return false;
    }
    // one step forward
    if (from.x === to.x) {
      if (Math.abs(from.y - to.y) !== 1) {
        return false;
      }
    } else if (from.y === to.y) {
      if (Math.abs(from.x - to.x) !== 1) {
        return false;
      }
    }
  } else if (piece.types === 'guard') {
    // RED palace
    if (piece.group === 'RED') {
      if (from.x === 4 && from.y === 1) {
        if (!(to.x === 3 && to.y === 0) && !(to.x === 5 && to.y === 0) &&
          !(to.x === 3 && to.y === 2) && !(to.x === 5 && to.y === 2)) {
          return false;
        }
      } else {
        if (to.x !== 4 || to.y !== 1) {
          return false;
        }
      }
    }
    // BLACK palace
    if (piece.group === 'BLACK') {
      if (from.x === 4 && from.y === 8) {
        if (!(to.x === 3 && to.y === 9) && !(to.x === 5 && to.y === 9) &&
          !(to.x === 3 && to.y === 7) && !(to.x === 5 && to.y === 7)) {
          return false;
        }
      } else {
        if (to.x !== 4 || to.y !== 8) {
          return false;
        }
      }
    }
  } else if (piece.types === 'elephant') {
    // cannot cross the river
    if (piece.group === 'RED') {
      if (to.y > 4) {
        return false;
      }
    }
    if (piece.group === 'BLACK') {
      if (to.y <= 4) {
        return false;
      }
    }
    if (Math.abs(from.x - to.x) !== 2 || Math.abs(from.y - to.y) !== 2) {
      return false;
    }
    // stumble
    const middleX = (from.x + to.x) / 2;
    const middleY = (from.y + to.y) / 2;
    if (map[middleX][middleY].types !== 'null') {
      return false;
    }
  } else if (piece.types === 'soldier') {
    // go straight
    if (from.x !== to.x && from.y !== to.y) {
      return false;
    }
    // move one step
    if (from.x === to.x) {
      if (Math.abs(to.y - from.y) !== 1) {
        return false;
      }
    } else if (from.y === to.y) {
      if (Math.abs(from.x - to.x) !== 1) {
        return false;
      }
    }
    // RED soldier
    if (piece.group === 'RED') {
      // not allowed to go back
      if (from.y > to.y) {
        return false;
      }
      // haven't cross the river
      if (from.y <= 4) {
        // not allowed to move laterally
        if (from.x !== to.x) {
          return false;
        }
      }
    }
    // BLACK soldier
    if (piece.group === 'BLACK') {
      // not allowed to go back
      if (from.y < to.y) {
        return false;
      }
      // haven't cross the river
      if (from.y >= 5) {
        if (from.x !== to.x) {
          return false;
        }
      }
    }
  }
  return true;
}
