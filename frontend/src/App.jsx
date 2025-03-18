import { BrowserRouter ,Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Events from "./pages/Events/Events"
import './App.css';

function App(){

  return(
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>

        </Routes>
        <Footer/>
    </BrowserRouter>
  )

}export default App;
