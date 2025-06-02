export class Number {
    constructor(value) {
        this.value = value;
        this.x = undefined;
        this.y = undefined;
        Number.numbers.push(this);
    }
    setPosition(x, y) {
        if (this.x !== undefined && this.y !== undefined) {
            const oldCell = document.querySelector(`.puzzle-cell[data-id="${this.y * Number.size + this.x}"]`);
            oldCell.setAttribute("data-empty", "true");
            oldCell.textContent = "";
            oldCell.onclick = () => { };
        }
        const newCell = document.querySelector(`.puzzle-cell[data-id="${y * Number.size + x}"]`);
        newCell.removeAttribute("data-empty");
        newCell.textContent = this.value.toString();
        newCell.onclick = () => this.onClick();
        this.x = x;
        this.y = y;
    }
    emptyNear() {
        if (this.x === undefined || this.y === undefined)
            return undefined;
        if (this.x !== 0 && Number.checkEmpty(this.x - 1, this.y))
            return [this.x - 1, this.y];
        if (this.y !== 0 && Number.checkEmpty(this.x, this.y - 1))
            return [this.x, this.y - 1];
        if (this.x !== Number.size - 1 && Number.checkEmpty(this.x + 1, this.y))
            return [this.x + 1, this.y];
        if (this.y !== Number.size - 1 && Number.checkEmpty(this.x, this.y + 1))
            return [this.x, this.y + 1];
        return undefined;
    }
    onClick() {
        const emptyCellNear = this.emptyNear();
        if (!emptyCellNear)
            return;
        this.setPosition(...emptyCellNear);
    }
    static checkEmpty(x, y) {
        for (let num of Number.numbers) {
            if (num.x === x && num.y === y)
                return false;
        }
        return true;
    }
}
Number.numbers = [];
Number.size = 10;
