import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrepareForBattle from "./Pole/PrepareForBattle";
import MainMenu from "./component/MainMenu";
import BattleTheComputer from "./BattleGround/BattleTheComputer";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainMenu/>}/>
                    <Route path="/PrepareForBattle" element={<PrepareForBattle/>}/>
                    <Route path="/battleTheComputer" element={<BattleTheComputer/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
