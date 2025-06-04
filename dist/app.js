import { Number } from "./number.js";
const gridElement = document.querySelector("#puzzle-grid");
const size = 4;
window.onload = () => {
    Number.size = size;
    createGrid();
    randomNumbers();
};
function createGrid() {
    gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("data-id", i.toString());
        cell.setAttribute("data-empty", "true");
        cell.classList.add("puzzle-cell");
        gridElement.appendChild(cell);
    }
}
function randomNumbers() {
    for (let i = 1; i < size * size; i++) {
        const currentNumber = new Number(i);
        let x = 0;
        let y = 0;
        do {
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);
        } while (!isCellFree(x, y));
        currentNumber.setPosition(x, y);
    }
    if (checkInvalid())
        Number.swapValues(Number.getNumber(0, 0), Number.getNumber(1, 0));
}
function checkInvalid() {
    let invertions = 0;
    for (let i = 0; i < Number.size * Number.size - 1; i++) {
        const current = Number.getNumber(...Number.indexToPosition(i));
        let next = Number.getNumber(...Number.indexToPosition(i + 1));
        if (current === undefined)
            continue;
        if (next === undefined) {
            i++;
            next = Number.getNumber(...Number.indexToPosition(i + 1));
        }
        ;
        if (next === undefined)
            break;
        if (current.value > next.value)
            invertions++;
    }
    if (Number.size % 2 === 1) {
        return invertions % 2 === 0;
    }
    else {
        const emptyPosition = Number.indexToPosition(Number.getEmptyIndex());
        return emptyPosition[1] % 2 === invertions % 2;
    }
}
function isCellFree(x, y) {
    const cell = document.querySelector(`.puzzle-cell[data-id="${y * size + x}"]`);
    return cell.innerHTML == "";
}
