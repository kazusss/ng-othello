import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  vurtialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  title = 'ng-othello';
  turnBlack = true;
  message = '黒の番です';
  countMessage = ''

  onClick(x: number, y: number) {
    if (this.vurtialBoard[y][x] != 0) {
      alert('その場所には置けません');
      return;
    }
    console.log('' + x + ':' + y);
    const discColor = this.turnBlack ? 1 : 2;
    if (this.checkPut(discColor, x, y) == 0) {
      alert('その場所には置けません');
      return;
    }
    this.vurtialBoard[y][x] = discColor;
    this.checkRight(discColor, x, y, false);
    this.checkLeft(discColor, x, y, false);
    this.checkUp(discColor, x, y, false);
    this.checkDown(discColor, x, y, false);
    this.checkLeftUpper(discColor, x, y, false);
    this.checkRightDown(discColor, x, y, false);
    this.checkRightUpper(discColor, x, y, false);
    this.checkLeftDown(discColor, x, y, false);

    const black = this.count(1);
    const white = this.count(2);
    this.countMessage = `黒:${black} 対 白:${white}`;
    if ((black + white) == 64) {
      if (black == white) {
        this.message = '引き分けです';
        return;
      }
      if (black < white) {
        this.message = `${white}対${black}で白の勝ちです`;
      } else {
        this.message = `${black}対${white}で黒の勝ちです`;
      }
    }
    if (black == 0) {
      this.message = `${white}対${black}で白の勝ちです`;
      return;
    }
    if (white == 0) {
      this.message = `${black}対${white}で黒の勝ちです`;
      return;
    }
    this.turnBlack = !this.turnBlack;
    this.message = this.turnBlack ? '黒の番です' : '白の番です';
  }

  private count(color: number): number {
    let result = 0;
    for (const row of this.vurtialBoard) {
      result += row.filter((disc) => disc == color).length;
    }
    return result;
  }

  private checkPut(discColor: number, x: number, y: number): number {
    let count = 0;
    count += this.checkRight(discColor, x, y, true);
    count += this.checkLeft(discColor, x, y, true);
    count += this.checkDown(discColor, x, y, true);
    count += this.checkUp(discColor, x, y, true);
    count += this.checkLeftUpper(discColor, x, y, true);
    count += this.checkRightDown(discColor, x, y, true);
    count += this.checkRightUpper(discColor, x, y, true);
    count += this.checkLeftDown(discColor, x, y, true);
    return count;
  }

  private checkRight(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ): number {
    let reverseCount = 0;
    if (x == 7) {
      return reverseCount;
    }
    let b = false;
    for (let i = x + 1; i < 8; i++) {
      if (this.vurtialBoard[y][i] == 0) {
        return reverseCount;
      }
      if (this.vurtialBoard[y][i] != discColor) {
        b = true;
        continue;
      }
      if (this.vurtialBoard[y][i] == discColor && b) {
        for (let j = x + 1; j < i; j++) {
          if (!checkOnly) {
            this.vurtialBoard[y][j] = discColor;
          }
          reverseCount++;
        }
        return reverseCount;
      }
    }
    return reverseCount;
  }

  private checkLeft(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ): number {
    let reverseCount = 0;
    if (x == 0) {
      return reverseCount;
    }
    let b = false;
    for (let i = x - 1; i >= 0; i--) {
      if (this.vurtialBoard[y][i] == 0) {
        return reverseCount;
      }
      if (this.vurtialBoard[y][i] != discColor) {
        b = true;
        continue;
      }
      if (this.vurtialBoard[y][i] == discColor && b) {
        for (let j = i + 1; j < x; j++) {
          if (!checkOnly) {
            this.vurtialBoard[y][j] = discColor;
          }
          reverseCount++;
        }
        return reverseCount;
      }
    }
    return reverseCount;
  }

  private checkUp(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ): number {
    let b = false;
    let reverseCount = 0;
    if (y == 0) {
      return reverseCount;
    }
    for (let i = y - 1; i >= 0; i--) {
      if (this.vurtialBoard[i][x] == 0) {
        return reverseCount;
      }
      if (this.vurtialBoard[i][x] != discColor) {
        b = true;
        continue;
      }
      if (this.vurtialBoard[i][x] == discColor && b) {
        for (let j = i + 1; j < y; j++) {
          if (!checkOnly) {
            this.vurtialBoard[j][x] = discColor;
          }
          reverseCount++;
        }
        return reverseCount;
      }
    }
    return reverseCount;
  }

  private checkDown(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ): number {
    let b = false;
    let reverseCount = 0;
    if (7 <= y) {
      return reverseCount;
    }
    for (let i = y + 1; i < 8; i++) {
      if (this.vurtialBoard[i][x] == 0) {
        return reverseCount;
      }
      if (this.vurtialBoard[i][x] != discColor) {
        b = true;
        continue;
      }
      if (this.vurtialBoard[i][x] == discColor && b) {
        for (let j = y + 1; j < i; j++) {
          if (!checkOnly) {
            this.vurtialBoard[j][x] = discColor;
          }
          reverseCount++;
        }
        return reverseCount;
      }
    }
    return reverseCount;
  }

  private checkLeftUpper(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ) {
    let reverseCount = 0;
    if (x == 0 || y == 0) {
      return reverseCount;
    }
    if (
      this.vurtialBoard[y - 1][x - 1] == 0 ||
      this.vurtialBoard[y - 1][x - 1] == discColor
    ) {
      return reverseCount;
    }
    let xx = x - 1;
    let yy = y - 1;
    while (0 <= xx && 0 <= yy) {
      if (this.vurtialBoard[yy][xx] == 0) {
        return 0;
      }
      if (this.vurtialBoard[yy][xx] == discColor) {
        let yyy = yy;
        let xxx = xx;
        while (yyy < y && xxx < x) {
          if (!checkOnly) {
            this.vurtialBoard[yyy][xxx] = discColor;
          }
          reverseCount++;
          yyy++;
          xxx++;
        }
        return reverseCount;
      }
      xx--;
      yy--;
    }
    return 0;
  }

  private checkRightUpper(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ) {
    let reverseCount = 0;
    if (x == 7 || y == 0) {
      return reverseCount;
    }
    if (
      this.vurtialBoard[y - 1][x + 1] == 0 ||
      this.vurtialBoard[y - 1][x + 1] == discColor
    ) {
      return reverseCount;
    }
    let xx = x + 1;
    let yy = y - 1;
    while (7 >= xx && 0 <= yy) {
      if (this.vurtialBoard[yy][xx] == 0) {
        return 0;
      }
      if (this.vurtialBoard[yy][xx] == discColor) {
        let yyy = y;
        let xxx = x;
        while (yyy > yy && xxx < xx) {
          if (!checkOnly) {
            this.vurtialBoard[yyy][xxx] = discColor;
          }
          reverseCount++;
          yyy--;
          xxx++;
        }
        return reverseCount;
      }
      xx++;
      yy--;
    }
    return reverseCount;
  }

  private checkLeftDown(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ) {
    let reverseCount = 0;
    if (x == 0 || y == 7) {
      return reverseCount;
    }
    if (
      this.vurtialBoard[y + 1][x - 1] == 0 ||
      this.vurtialBoard[y + 1][x - 1] == discColor
    ) {
      return reverseCount;
    }
    let xx = x - 1;
    let yy = y + 1;
    while (0 <= xx && 7 >= yy) {
      if (this.vurtialBoard[yy][xx] == 0) {
        return 0;
      }
      if (this.vurtialBoard[yy][xx] == discColor) {
        let yyy = yy;
        let xxx = xx;
        while (yyy > y && xxx < x) {
          if (!checkOnly) {
            this.vurtialBoard[yyy][xxx] = discColor;
          }
          reverseCount++;
          yyy--;
          xxx++;
        }
        return reverseCount;
      }
      xx--;
      yy++;
    }
    return 0;
  }

  private checkRightDown(
    discColor: number,
    x: number,
    y: number,
    checkOnly: boolean
  ) {
    let reverseCount = 0;
    if (x == 7 || y == 7) {
      return reverseCount;
    }
    if (
      this.vurtialBoard[y + 1][x + 1] == 0 ||
      this.vurtialBoard[y + 1][x + 1] == discColor
    ) {
      return reverseCount;
    }
    let xx = x + 1;
    let yy = y + 1;
    while (7 >= xx && 7 >= yy) {
      if (this.vurtialBoard[yy][xx] == 0) {
        return 0;
      }
      if (this.vurtialBoard[yy][xx] == discColor) {
        let yyy = y;
        let xxx = x;
        while (yyy < yy && xxx < xx) {
          if (!checkOnly) {
            this.vurtialBoard[yyy][xxx] = discColor;
          }
          reverseCount++;
          yyy++;
          xxx++;
        }
        return reverseCount;
      }
      xx++;
      yy++;
    }
    return 0;
  }
}
