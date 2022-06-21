import { BrowserRouter, Route, Routes } from "react-router-dom";
import MusicLayout from "./layout/MusicLayout/MusicLayout";
import NotFound from "./page/NotFound";
import { ROUTE_MUSIC_LAYOUT } from "./router";
import { Navigate } from "react-router-dom";
// libray styles
import "rc-slider/assets/index.css";
import "swiper/css";
// import Login from "./page/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* main route */}
                <Route element={<MusicLayout />}>
                    {ROUTE_MUSIC_LAYOUT.map((route, index) => {
                        const Component = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Component />}
                            />
                        );
                    })}
                </Route>
                {/* orther route */}
                {/* <Route path='/login' element={<Login />} /> */}
                <Route path='/not-found' element={<NotFound />} />
                <Route
                    path='*'
                    element={<Navigate replace to='/not-found' />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
