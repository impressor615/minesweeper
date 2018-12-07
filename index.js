class MineSweeper {
  constructor(
    rows = 10,
    columns = 10,
    bombCount = 10,
    bombSymbol = '*',
  ) {
    this._rows = rows;
    this._columns = columns;
    this._bbCount = bombCount;
    this._bbSymbol = bombSymbol;
    this._bbsLocation = [];
    this._validated = false;
    this._result = Array.from({ length: rows })
      .map(() => Array(columns).fill(0));
  }

  generateBombs() {
    while (this._bbsLocation.length < this._bbCount) {
      const rndRowIdx = Math.floor(Math.random() * 10);
      const rndColumnIdx = Math.floor(Math.random() * 10);
      const isIncluded = this._bbsLocation.find(
        ([bbRow, bbColumn]) => (bbRow === rndRowIdx) && (bbColumn === rndColumnIdx)
      );
      if (isIncluded) continue;
      this._bbsLocation.push([rndRowIdx, rndColumnIdx]);
      this._result[rndRowIdx][rndColumnIdx] = this._bbSymbol;
    }

    return this;
  }

  generateNumbers() {
    const targetIndexes = this._bbsLocation.map((item) => {
      const rowCnt = item[0];
      const columnCnt = item[1];
      const result = [
        [rowCnt - 1, columnCnt - 1],
        [rowCnt - 1, columnCnt],
        [rowCnt - 1, columnCnt + 1],

        [rowCnt, columnCnt - 1],
        [rowCnt, columnCnt + 1],

        [rowCnt + 1, columnCnt - 1],
        [rowCnt + 1, columnCnt],
        [rowCnt + 1, columnCnt + 1],
      ];

      return result;
    });

    targetIndexes.forEach((item) => (
      item.forEach(([rowIdx, columnIdx]) => {
        if (
          rowIdx < 0 ||
          columnIdx < 0 ||
          rowIdx > (this._rows - 1) ||
          columnIdx > (this._columns - 1)
        ) return;

        const currentItem = this._result[rowIdx][columnIdx];
        if (currentItem === this._bbSymbol) return;

        const newNumber = currentItem + 1;
        this._result[rowIdx][columnIdx] = newNumber;
      })
    ));

    this._isNumGenerated = true;
    return this;
  }

  validate() {
    if (this._bbsLocation.length !== this._bbCount) {
      console.log('bombs should be generated before printing');
      return this;
    }

    if (!this._isNumGenerated) {
      console.log('numbers should be generated before printing');
      return this;
    }

    this._validated = true;
    return this;
  }

  print() {
    if (!this._validated) {
      return;
    }

    console.log(this._result);
  }
}

const mineSweeper = new MineSweeper();
mineSweeper
  .generateBombs()
  .generateNumbers()
  .validate()
  .print()