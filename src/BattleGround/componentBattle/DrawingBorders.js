export function setArea(x, y, pole) {
    setBorder(x, y, pole);
    let n = 1;
    while (checkBounds(x + n, y) && (pole[x + n][y] === 1 || pole[x + n][y] === 3)) {
        setBorder(x + n, y, pole)
        n++
    }
    n = 1;

    while (checkBounds(x - n, y) && (pole[x - n][y] === 1 || pole[x - n][y] === 3)) {
        setBorder(x - n, y, pole)
        n++
    }
    n = 1;

    while (checkBounds(x, y + n) && (pole[x][y + n] === 1 || pole[x][y + n] === 3)) {
        setBorder(x, y + n, pole)
        n++
    }
    n = 1;

    while (checkBounds(x, y - n) && (pole[x][y - n] === 1 || pole[x][y - n] === 3)) {
        setBorder(x, y - n, pole)
        n++
    }
}

export function setDead(pole, x, y) {
    pole[x][y] = 3;
    let n = 1;
    while (checkBounds(x + n, y) && pole[x + n][y] === 2) {
        pole[x + n][y] = 3;
        n++;
    }
    n = 1;
    while (checkBounds(x - n, y) && pole[x - n][y] === 2) {
        pole[x - n][y] = 3;
        n++;
    }
    n = 1;
    while (checkBounds(x, y + n) && pole[x][y + n] === 2) {
        pole[x][y + n] = 3;
        n++;
    }
    n = 1;
    while (checkBounds(x, y - n) && pole[x][y - n] === 2) {
        pole[x][y - n] = 3;
        n++;
    }
}

export function setBorder(x, y, pole) {
    if (checkBounds(x + 1, y) && pole[x + 1][y] === 0) pole[x + 1][y] = -1
    if (checkBounds(x - 1, y) && pole[x - 1][y] === 0) pole[x - 1][y] = -1
    if (checkBounds(x, y - 1) && pole[x][y - 1] === 0) pole[x][y - 1] = -1
    if (checkBounds(x, y + 1) && pole[x][y + 1] === 0) pole[x][y + 1] = -1

    if (checkBounds(x + 1, y + 1) && pole[x + 1][y + 1] === 0) pole[x + 1][y + 1] = -1
    if (checkBounds(x - 1, y - 1) && pole[x - 1][y - 1] === 0) pole[x - 1][y - 1] = -1
    if (checkBounds(x + 1, y - 1) && pole[x + 1][y - 1] === 0) pole[x + 1][y - 1] = -1
    if (checkBounds(x - 1, y + 1) && pole[x - 1][y + 1] === 0) pole[x - 1][y + 1] = -1
}

export function checkBounds(x, y) {
    return x < 10 && x > -1 && y < 10 && y > -1
}

export function isDead(pole, x, y) {
    let n = 1;
    while (checkBounds(x + n, y) && pole[x + n][y] === 2) {
        n++;
    }
    if (checkBounds(x + n, y) && pole[x + n][y] === 1) return false;
    n = 1;

    while (checkBounds(x - n, y) && pole[x - n][y] === 2) {
        n++;
    }
    if (checkBounds(x - n, y) && pole[x - n][y] === 1) return false;
    n = 1;

    while (checkBounds(x, y + n) && pole[x][y + n] === 2) {
        n++;
    }
    if (checkBounds(x, y + n) && pole[x][y + n] === 1) return false;
    n = 1;

    while (checkBounds(x, y - n) && pole[x][y - n] === 2) {
        n++;
    }
    if (checkBounds(x, y - n) && pole[x][y - n] === 1) return false;
    return true;
}