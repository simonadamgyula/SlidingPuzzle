export class Number {
    static numbers: Number[] = [];
    static size: number = 10;

    x: number | undefined;
    y: number | undefined;
    value: number;

    constructor(value: number) {
        this.value = value;
        this.x = undefined;
        this.y = undefined;

        Number.numbers.push(this);
    }

    setPosition(x: number, y: number) {
        if (this.x !== undefined && this.y !== undefined) {
            const oldCell = document.querySelector(`.puzzle-cell[data-id="${this.y * Number.size + this.x}"]`)!;
            oldCell.setAttribute("data-empty", "true")
            oldCell.textContent = "";
            (oldCell as HTMLElement).onclick = () => { };
        }

        const newCell = document.querySelector(`.puzzle-cell[data-id="${y * Number.size + x}"]`)!;
        newCell.removeAttribute("data-empty");
        newCell.textContent = this.value.toString();
        (newCell as HTMLElement).onclick = () => this.onClick();

        this.x = x;
        this.y = y;
    }

    emptyNear(): [number, number] | undefined {
        if (this.x === undefined || this.y === undefined) return undefined;
        if (this.x !== 0 && Number.checkEmpty(this.x - 1, this.y)) return [this.x - 1, this.y];
        if (this.y !== 0 && Number.checkEmpty(this.x, this.y - 1)) return [this.x, this.y - 1];
        if (this.x !== Number.size - 1 && Number.checkEmpty(this.x + 1, this.y)) return [this.x + 1, this.y];
        if (this.y !== Number.size - 1 && Number.checkEmpty(this.x, this.y + 1)) return [this.x, this.y + 1];
        return undefined;
    }

    onClick() {
        const emptyCellNear = this.emptyNear();
        if (!emptyCellNear) return;
        this.setPosition(...emptyCellNear);
    }

    static swapValues(a: Number | undefined, b: Number | undefined) {
        if (!a || !b) {
            (a || b)!.setPosition(...Number.indexToPosition(Number.getEmptyIndex()));
            return;
        }

        if (a.y === undefined || a.x === undefined || b.x === undefined || b.y === undefined) return;

        const aCell = document.querySelector(`.puzzle-cell[data-id="${a.y * Number.size + a.x}"]`)!;
        const bCell = document.querySelector(`.puzzle-cell[data-id="${b.y * Number.size + b.x}"]`)!;

        const temp = [a.x, a.y];
        a.x = b.x, a.y = b.y;
        b.x = temp[0], b.y = temp[1];

        aCell.textContent = b.value.toString();
        bCell.textContent = a.value.toString();
        (bCell as HTMLElement).onclick = () => a.onClick();
        (aCell as HTMLElement).onclick = () => b.onClick();
    }

    static getNumber(x: number, y: number): Number | undefined {
        console.log(x, y);
        const cell = document.querySelector(`.puzzle-cell[data-id="${y * Number.size + x}"]`)!;
        if (!cell || cell.innerHTML === "") return undefined;
        return Number.numbers.find(x => x.value === parseInt(cell.innerHTML));
    }

    static getEmptyIndex(): number {
        const cell = document.querySelector(`.puzzle-cell[data-empty]`);
        return parseInt((cell as HTMLElement).dataset.id!);
    }

    static checkEmpty(x: number, y: number): boolean {
        for (let num of Number.numbers) {
            if (num.x === x && num.y === y) return false;
        }
        return true;
    }

    static indexToPosition(index: number): [number, number] {
        return [index % Number.size, Math.floor(index / Number.size)];
    }
}