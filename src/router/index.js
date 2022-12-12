import MainMenu from "../component/MainMenu";
import PrepareForBattle from "../Pole/PrepareForBattle";
import AuthorizationMenu from "../authentication/AuthorizationMenu";
import RegistrationMenu from "../authentication/RegistrationMenu";
import BattleTheComputer from "../BattleGround/BattleTheComputer";


export const privateRoutes = [
    {path: '/', element: MainMenu, exact: true},
    {path: '/PrepareForBattle', element: PrepareForBattle, exact: true},
    {path: '/battleTheComputer', element: BattleTheComputer, exact: true}
]

export const publicRoutes = [
    {path: '/authorization', element: AuthorizationMenu, exact: true},
    {path: '/registration', element: RegistrationMenu, exact: true}
]