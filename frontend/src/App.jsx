import { BrowserRouter ,Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import './App.css';

function App(){

  return(
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  )

}export default App;
