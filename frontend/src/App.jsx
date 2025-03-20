import { BrowserRouter ,Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details_event from "./pages/Details_event/Detail_event"
import './App.css';

function App(){

  return(
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Details_event/:id" element={<Details_event/>}/>

        </Routes>
        <Footer/>
    </BrowserRouter>
  )

}export default App;
