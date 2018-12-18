import { Coord, Piece } from '../store/modules/situation/typings';

interface IPeiceInView {
  piece: Piece;
  coord: Coord;
}

export function initialMax(): IPeiceInView[] {
  const MAXCar_1: Piece = { types: 'car', group: 'MAX', isDead: false };
  const MAXCar_1_Coord = { x: 0, y: 0 };
  const MAXHorse_1: Piece = { types: 'horse', group: 'MAX', isDead: false };
  const MAXHorse_1_Coord = { x: 1, y: 0 };
  const MAXEle_1: Piece = { types: 'elephant', group: 'MAX', isDead: false };
  const MAXEle_1_Coord = { x: 2, y: 0 };
  const MAXGuard_1: Piece = { types: 'guard', group: 'MAX', isDead: false };
  const MAXGuard_1_Coord = { x: 3, y: 0 };
  const MAXGeneral: Piece = { types: 'general', group: 'MAX', isDead: false };
  const MAXGeneral_Coord = { x: 4, y: 0 };
  const MAXGuard_2: Piece = { types: 'guard', group: 'MAX', isDead: false };
  const MAXGuard_2_Coord = { x: 5, y: 0 };
  const MAXEle_2: Piece = { types: 'elephant', group: 'MAX', isDead: false };
  const MAXEle_2_Coord = { x: 6, y: 0 };
  const MAXHorse_2: Piece = { types: 'horse', group: 'MAX', isDead: false };
  const MAXHorse_2_Coord = { x: 7, y: 0 };
  const MAXCar_2: Piece = { types: 'car', group: 'MAX', isDead: false };
  const MAXCar_2_Coord = { x: 8, y: 0 };

  const MAXSoldier_1: Piece = { types: 'soldier', group: 'MAX', isDead: false};
  const MAXSoldier_1_Coord: Coord = { x: 0, y: 3 };
  const MAXSoldier_2: Piece = { types: 'soldier', group: 'MAX', isDead: false};
  const MAXSoldier_2_Coord: Coord = { x: 2, y: 3 };
  const MAXSoldier_3: Piece = { types: 'soldier', group: 'MAX', isDead: false};
  const MAXSoldier_3_Coord: Coord = { x: 4, y: 3 };
  const MAXSoldier_4: Piece = { types: 'soldier', group: 'MAX', isDead: false};
  const MAXSoldier_4_Coord: Coord = { x: 6, y: 3 };
  const MAXSoldier_5: Piece = { types: 'soldier', group: 'MAX', isDead: false};
  const MAXSoldier_5_Coord: Coord = { x: 8, y: 3 };

  const MAXCannon_1: Piece = { types: 'cannon', group: 'MAX', isDead: false};
  const MAXCannon_1_Coord: Coord = { x: 1, y: 2 };
  const MAXCannon_2: Piece = { types: 'cannon', group: 'MAX', isDead: false};
  const MAXCannon_2_Coord: Coord = { x: 7, y: 2 };
  const MAXGroup: IPeiceInView[] = [];
  MAXGroup.push({ piece: MAXCar_1, coord: MAXCar_1_Coord });
  MAXGroup.push({ piece: MAXHorse_1, coord: MAXHorse_1_Coord });
  MAXGroup.push({ piece: MAXEle_1, coord: MAXEle_1_Coord });
  MAXGroup.push({ piece: MAXGuard_1, coord: MAXGuard_1_Coord });

  MAXGroup.push({ piece: MAXGeneral, coord: MAXGeneral_Coord });

  MAXGroup.push({ piece: MAXCar_2, coord: MAXCar_2_Coord });
  MAXGroup.push({ piece: MAXHorse_2, coord: MAXHorse_2_Coord });
  MAXGroup.push({ piece: MAXEle_2, coord: MAXEle_2_Coord });
  MAXGroup.push({ piece: MAXGuard_2, coord: MAXGuard_2_Coord });

  MAXGroup.push({ piece: MAXSoldier_1, coord: MAXSoldier_1_Coord });
  MAXGroup.push({ piece: MAXSoldier_2, coord: MAXSoldier_2_Coord });
  MAXGroup.push({ piece: MAXSoldier_3, coord: MAXSoldier_3_Coord });
  MAXGroup.push({ piece: MAXSoldier_4, coord: MAXSoldier_4_Coord });
  MAXGroup.push({ piece: MAXSoldier_5, coord: MAXSoldier_5_Coord });

  MAXGroup.push({ piece: MAXCannon_1, coord: MAXCannon_1_Coord });
  MAXGroup.push({ piece: MAXCannon_2, coord: MAXCannon_2_Coord });
  return MAXGroup;
}

export function initialMin(): IPeiceInView[] {
  const MINCar_1: Piece = { types: 'car', group: 'MIN', isDead: false };
  const MINCar_1_Coord = { x: 0, y: 9 };
  const MINHorse_1: Piece = { types: 'horse', group: 'MIN', isDead: false };
  const MINHorse_1_Coord = { x: 1, y: 9 };
  const MINEle_1: Piece = { types: 'elephant', group: 'MIN', isDead: false };
  const MINEle_1_Coord = { x: 2, y: 9 };
  const MINGuard_1: Piece = { types: 'guard', group: 'MIN', isDead: false };
  const MINGuard_1_Coord = { x: 3, y: 9 };
  const MINGeneral: Piece = { types: 'general', group: 'MIN', isDead: false };
  const MINGeneral_Coord = { x: 4, y: 9 };
  const MINGuard_2: Piece = { types: 'guard', group: 'MIN', isDead: false };
  const MINGuard_2_Coord = { x: 5, y: 9 };
  const MINEle_2: Piece = { types: 'elephant', group: 'MIN', isDead: false };
  const MINEle_2_Coord = { x: 6, y: 9 };
  const MINHorse_2: Piece = { types: 'horse', group: 'MIN', isDead: false };
  const MINHorse_2_Coord = { x: 7, y: 9 };
  const MINCar_2: Piece = { types: 'car', group: 'MIN', isDead: false };
  const MINCar_2_Coord = { x: 8, y: 9 };

  const MINSoldier_1: Piece = { types: 'soldier', group: 'MIN', isDead: false};
  const MINSoldier_1_Coord: Coord = { x: 0, y: 6 };
  const MINSoldier_2: Piece = { types: 'soldier', group: 'MIN', isDead: false};
  const MINSoldier_2_Coord: Coord = { x: 2, y: 6 };
  const MINSoldier_3: Piece = { types: 'soldier', group: 'MIN', isDead: false};
  const MINSoldier_3_Coord: Coord = { x: 4, y: 6 };
  const MINSoldier_4: Piece = { types: 'soldier', group: 'MIN', isDead: false};
  const MINSoldier_4_Coord: Coord = { x: 6, y: 6 };
  const MINSoldier_5: Piece = { types: 'soldier', group: 'MIN', isDead: false};
  const MINSoldier_5_Coord: Coord = { x: 8, y: 6 };

  const MINCannon_1: Piece = { types: 'cannon', group: 'MIN', isDead: false};
  const MINCannon_1_Coord: Coord = { x: 1, y: 7 };
  const MINCannon_2: Piece = { types: 'cannon', group: 'MIN', isDead: false};
  const MINCannon_2_Coord: Coord = { x: 7, y: 7 };

  const MINGroup: IPeiceInView[] = [];
  MINGroup.push({ piece: MINCar_1, coord: MINCar_1_Coord });
  MINGroup.push({ piece: MINHorse_1, coord: MINHorse_1_Coord });
  MINGroup.push({ piece: MINEle_1, coord: MINEle_1_Coord });
  MINGroup.push({ piece: MINGuard_1, coord: MINGuard_1_Coord });

  MINGroup.push({ piece: MINGeneral, coord: MINGeneral_Coord });

  MINGroup.push({ piece: MINCar_2, coord: MINCar_2_Coord });
  MINGroup.push({ piece: MINHorse_2, coord: MINHorse_2_Coord });
  MINGroup.push({ piece: MINEle_2, coord: MINEle_2_Coord });
  MINGroup.push({ piece: MINGuard_2, coord: MINGuard_2_Coord });

  MINGroup.push({ piece: MINSoldier_1, coord: MINSoldier_1_Coord });
  MINGroup.push({ piece: MINSoldier_2, coord: MINSoldier_2_Coord });
  MINGroup.push({ piece: MINSoldier_3, coord: MINSoldier_3_Coord });
  MINGroup.push({ piece: MINSoldier_4, coord: MINSoldier_4_Coord });
  MINGroup.push({ piece: MINSoldier_5, coord: MINSoldier_5_Coord });

  MINGroup.push({ piece: MINCannon_1, coord: MINCannon_1_Coord });
  MINGroup.push({ piece: MINCannon_2, coord: MINCannon_2_Coord });
  return MINGroup;
}
