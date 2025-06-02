import { Number } from "./number.js";

const gridElement = document.querySelector("#puzzle-grid")!;

const size: number = 10;

window.onload = () => {
    Number.size = size;
    createGrid();
    randomNumbers();
}

function createGrid() {
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("data-id", i.toString());
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
        } while (!isCellFree(x, y))

        currentNumber.setPosition(x, y);
    }
}

function isCellFree(x: number, y: number) {
    const cell = document.querySelector(`.puzzle-cell[data-id="${y * size + x}"]`)!;
    return cell.innerHTML == "";
}