import {Routes, Route, Link} from 'react-router-dom';
import HomePage from "../pages/HomePage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";

const AppRouter = () => { // Renombrado para mayor claridad
    return (
        <>
            {/* El <nav> podría estar en un componente Layout separado si crece */}
            <nav style={{marginBottom: '20px', padding: '10px', background: '#f0f0f0'}}>
                <ul>
                    <li style={{display: 'inline', marginRight: '10px'}}>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li style={{display: 'inline', marginRight: '10px'}}>
                        <Link to="/about">Acerca de</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    );
}

export default AppRouter;
