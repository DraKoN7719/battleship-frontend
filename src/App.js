import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {publicRoutes, privateRoutes} from "./router";
import {useEffect, useState} from "react";
import {authenticationUser} from "./Store/userReducer";
import {useDispatch, useSelector} from "react-redux";


function App() {
    const isAuth = useSelector((state) => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user?.auth){
            console.log(isAuth)
            dispatch(authenticationUser(user.id, user.login));
        }
    }, [])

    return (
        <div>
            <BrowserRouter>
                {
                    isAuth
                        ?
                        <Routes>
                            {privateRoutes.map(route =>
                                <Route path={route.path} element={<route.element/>} exact={route.exact}/>
                            )}
                            <Route path="*" element={<Navigate replace to="/"/>}/>
                        </Routes>
                        :
                        <Routes>
                            {publicRoutes.map(route =>
                                <Route path={route.path} element={<route.element/>} exact={route.exact}/>
                            )}
                            <Route path="*" element={<Navigate replace to="/authorization"/>}/>
                        </Routes>
                }

            </BrowserRouter>
        </div>
    );
}

export default App;
