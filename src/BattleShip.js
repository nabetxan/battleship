export class BattleShip {
  constructor(P1, P2) {
    this.P1 = P1;
    this.P2 = P2;
    this.currentPlayer = P1;
  }

  reset(P1, P2) {
    return new BattleShip(P1, P2);
  }
}
