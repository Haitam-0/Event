import { BrowserRouter ,Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details_event from "./pages/Details_event/Detail_event"
import Reserver from "./pages/Reserver/Reserver"
import './App.css';

function App(){

  return(
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Details_event/:id" element={<Details_event/>}/>
          <Route path="/Reserver" element={<Reserver/>}/>


        </Routes>
        <Footer/>
    </BrowserRouter>
  )

}export default App;
