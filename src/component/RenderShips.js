
export function renderShips(coordinates) {
    //пофиксить выделение кв синим
    let mas =  document.getElementsByClassName('detected')
    for(let i = 0 ; i < 10; i++)
        for(let j = 0 ; j < 10; j++) {
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
                mas[i * 10 + j].className += ' squarePlacement1';
            }
            if (coordinates[i][j] === 0) {
                mas[i * 10 + j].style = ' background-color: white; border-color: black;'
            }

            if (coordinates[i][j] === -1) {
                mas[i * 10 + j].style = ' background-color: red;'
            }
            if (coordinates[i][j] === 2) {
                mas[i * 10 + j].style = ' background-color: grey;'
            }

        }
}

    export function renderShipsBattleComp(coordinates) {
        let mas = document.getElementsByClassName('square')
        for (let i = 0; i < 10; i++)
            for (let j = 0; j < 10; j++) {
                if (coordinates[i][j] === 1) {
                    mas[i * 10 + j].style = ' background-color: red;'
                }
                if (coordinates[i][j] === 2) {
                    mas[i * 10 + j].style = ' background-color: grey;'
                }
                if (coordinates[i][j] === 0) {
                    mas[i * 10 + j].style = ' background-color: white;'
                }
            }
}

export function renderShipsListPlacement(coordinates) {
    let mas =  document.getElementsByClassName('detected')
    for(let i = 0 ; i < 10; i++)
        for(let j = 0 ; j < 10; j++) {
            if (coordinates[i][j] === 1) {
                mas[i * 10 + j].className = 'detected squarePlacement1';
            } else {
                mas[i * 10 + j].className = 'detected squarePlacement3'
            }
        }
}