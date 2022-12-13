import MainMenu from "../component/MainMenu";
import PrepareForBattle from "../Pole/PrepareForBattle";
import AuthorizationMenu from "../authentication/AuthorizationMenu";
import RegistrationMenu from "../authentication/RegistrationMenu";
import BattleTheComputer from "../BattleGround/BattleTheComputer";
import LoadGame from "../LoadGame/LoadGame";
import GameHistory from "../GameHistory/GameHistory";
import ListUserPlacement from "../UserPlacement/ListUserPlacement";


export const privateRoutes = [
    {path: '/', element: MainMenu, exact: true},
    {path: '/PrepareForBattle', element: PrepareForBattle, exact: true},
    {path: '/battleTheComputer', element: BattleTheComputer, exact: true},
    {path: '/loadGame', element: LoadGame, exact: true},
    {path: '/historyGame', element: GameHistory, exact: true},
    {path: '/listUserPlacement', element: ListUserPlacement, exact: true}
]

export const publicRoutes = [
    {path: '/authorization', element: AuthorizationMenu, exact: true},
    {path: '/registration', element: RegistrationMenu, exact: true}
]