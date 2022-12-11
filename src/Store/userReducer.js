const defaultState = {
    idUser: null,
    isAuth: false,
    login: null,
}
const AUTHENTICATION = "AUTHENTICATION"
const LOGOUT = "LOGOUT"

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTHENTICATION:
            return {...state, idUser: action.idUser, isAuth: true, login: action.login};
        case LOGOUT:
            return {...state, idUser: null, isAuth: false, login: null};
        default:
            return state
    }
}

export const authenticationUser = (idUser, login) => ({type: AUTHENTICATION, idUser, login})
export const logoutUser = () => ({type: LOGOUT})