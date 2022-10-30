import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrepareForBattle from "./Pole/PrepareForBattle";
import MainMenu from "./component/MainMenu";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainMenu/>}/>
                    <Route path="/PrepareForBattle" element={<PrepareForBattle/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
