export function renderShips(coordinates) {
    let mas = document.getElementsByClassName('detected')
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 10; j++) {
            if (coordinates[i][j] === 1) {
                mas[i * 10 + j].className = 'detected squarePlacement1'
            }
            if (coordinates[i][j] === 2 || coordinates[i][j] === 4 || coordinates[i][j] === 6 || coordinates[i][j] === 8) {
                mas[i * 10 + j].className = 'detected squarePlacement2';
            }
            if (coordinates[i][j] === 0) {
                mas[i * 10 + j].className = 'detected square squarePlacement'
            }
        }
}


export function renderShipsBattle(coordinates) {
    let mas = document.getElementsByClassName('squareBattle')
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 10; j++) {
            if (coordinates[i][j] === 1) {
                mas[i * 10 + j].className = 'squareBattle squarePlacement1';
            }
            if (coordinates[i][j] === 0) {
                mas[i * 10 + j].style = ' background-color: white; border-color: black;'
            }
            if (coordinates[i][j] === 2 || coordinates[i][j] === 3) {
                mas[i * 10 + j].style = 'border-color : red;  --weight: 1px; --aa: 1px; /* anti-aliasing */ --color: red; border-radius: 3px; background: linear-gradient(45deg, transparent calc(50% - var(--weight) - var(--aa)), var(--color) calc(50% - var(--weight)), var(--color) calc(50% + var(--weight)), transparent calc(50% + var(--weight) + var(--aa))), linear-gradient(-45deg, lightgrey calc(50% - var(--weight) - var(--aa)), var(--color) calc(50% - var(--weight)), var(--color) calc(50% + var(--weight)), lightgrey calc(50% + var(--weight) + var(--aa)));'
            }
            if (coordinates[i][j] === -1) {
                mas[i * 10 + j].style = '  background-image: radial-gradient(black 15%, black 0%, white 0%);'
            }

        }
}

export function renderShipsBattleComp(coordinates) {
    let mas = document.getElementsByClassName('square')

    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 10; j++) {
            if (coordinates[i][j] === -1) {
                mas[i * 10 + j].style = '  background-image: radial-gradient(black 15%, black 0%, white 0%);'
            }
            if (coordinates[i][j] === 2 || coordinates[i][j] === 3) {
                mas[i * 10 + j].style = 'border-color : red;  --weight: 1px; --aa: 1px; /* anti-aliasing */ --color: red; border-radius: 3px; background: linear-gradient(45deg, transparent calc(50% - var(--weight) - var(--aa)), var(--color) calc(50% - var(--weight)), var(--color) calc(50% + var(--weight)), transparent calc(50% + var(--weight) + var(--aa))), linear-gradient(-45deg, lightgrey calc(50% - var(--weight) - var(--aa)), var(--color) calc(50% - var(--weight)), var(--color) calc(50% + var(--weight)), lightgrey calc(50% + var(--weight) + var(--aa)));'
            }
            if (coordinates[i][j] === 0) {
                mas[i * 10 + j].style = 'square background-color: white;'
            }
        }
}

export function renderShipsListPlacement(coordinates) {
    let mas = document.getElementsByClassName('detected')
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 10; j++) {
            if (coordinates[i][j] === 1) {
                mas[i * 10 + j].className = 'detected squarePlacement1';
            } else {
                mas[i * 10 + j].className = 'detected squarePlacement3'
            }
        }
}