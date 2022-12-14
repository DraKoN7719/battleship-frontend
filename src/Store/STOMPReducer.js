const defaultState = {
    stompClient: null,
    game: {
        id: null,
        player1: null,
        player2: null,
        resultGame: null,
        fieldPlayer1: null,
        fieldPlayer2: null,
        x: null,
        y: null,
        status: ""
    }
}
const JOIN = "JOIN"
const CLOSE_CONNECT = "CLOSE_CONNECT"

export const STOMPReducer = (state = defaultState, action) => {
    switch (action.type) {
        case JOIN:
            return {...state, stompClient: action.stompClient, game: action.game};
        case CLOSE_CONNECT:
            return {...state, stompClient: null, game: {
                        id: null,
                        player1: null,
                        player2: null,
                        resultGame: null,
                        fieldPlayer1: null,
                        fieldPlayer2: null,
                        x: null,
                        y: null,
                        status: ""
                    }};
        default:
            return state
    }
}

export const joinUser = (stompClient, game) => ({type: JOIN, stompClient, game})
export const closeConnect_User = () => ({type: CLOSE_CONNECT})