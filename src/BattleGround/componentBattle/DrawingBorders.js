export function setArea(x, y, pole) {
    setBorder(x, y, pole);
    let n = 1;
    while (checkBounds(x + n, y) && (pole[x + n][y] === 1 || pole[x + n][y] === -1)) {
        setBorder(x + n, y, pole)
        n++
    }
    n = 1;

    while (checkBounds(x - n, y) && (pole[x - n][y] === 1 || pole[x - n][y] === -1)) {
        setBorder(x - n, y, pole)
        n++
    }
    n = 1;

    while (checkBounds(x, y + n) && (pole[x][y + n] === 1 || pole[x][y + n] === -1)) {
        setBorder(x, y + n, pole)
        n++
    }
    n = 1;

    while (checkBounds(x, y - n) && (pole[x][y - n] === 1 || pole[x][y - n] === -1)) {
        setBorder(x, y - n, pole)
        n++
    }
}


export function checkBounds(x, y) {
    return x < 10 && x > -1 && y < 10 && y > -1
}

export function setBorder(x, y, pole) {
    if (checkBounds(x + 1, y) && pole[x + 1][y] === 0) pole[x + 1][y] = 2
    if (checkBounds(x - 1, y) && pole[x - 1][y] === 0) pole[x - 1][y] = 2
    if (checkBounds(x, y - 1) && pole[x][y - 1] === 0) pole[x][y - 1] = 2
    if (checkBounds(x, y + 1) && pole[x][y + 1] === 0) pole[x][y + 1] = 2

    if (checkBounds(x + 1, y + 1) && pole[x + 1][y + 1] === 0) pole[x + 1][y + 1] = 2
    if (checkBounds(x - 1, y - 1) && pole[x - 1][y - 1] === 0) pole[x - 1][y - 1] = 2
    if (checkBounds(x + 1, y - 1) && pole[x + 1][y - 1] === 0) pole[x + 1][y - 1] = 2
    if (checkBounds(x - 1, y + 1) && pole[x - 1][y + 1] === 0) pole[x - 1][y + 1] = 2
}