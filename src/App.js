import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrepareForBattle from "./Pole/PrepareForBattle";
import MainMenu from "./component/MainMenu";
import AuthorizationMenu from "./authentication/AuthorizationMenu";
import RegistrationMenu from "./authentication/RegistrationMenu";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainMenu/>}/>
                    <Route path="/PrepareForBattle" element={<PrepareForBattle/>}/>
                    <Route path="/authorization" element={<AuthorizationMenu/>}/>
                    <Route path="/registration" element={<RegistrationMenu/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
