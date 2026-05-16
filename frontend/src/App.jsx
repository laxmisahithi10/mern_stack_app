import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Profilepage } from './Pages/Profile/Profilepage';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';
import { Urlshortener } from './Pages/ShortUrl/Urlshortener';
import { Myurls } from './Pages/ShortUrl/Myurls';

function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/profile' element={<Profilepage/>} />
            <Route element={<PrivateRoute/>}>
            <Route path='/url' element={<Urlshortener/>} />
            <Route path='/myurls' element={<Myurls/>} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App
