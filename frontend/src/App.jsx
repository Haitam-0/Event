// import { BrowserRouter ,Route,Routes} from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Home from "./pages/Home/Home";
// import Footer from "./components/Footer/Footer";
// import Details_event from "./pages/Details_event/Detail_event"
// import Reserver from "./pages/Reserver/Reserver";
// import Cart from './pages/Cart/Cart.jsx'
// import './App.css';
// import Login from "./pages/login/login.jsx";
// import  SiNgin from "./pages/signin/SignIn.jsx";
// import PrivateRoute from "./components/Protect/PrivateRoute.jsx"; // Import the private route
// import AdminDashboard from "./pages/Admin/Admin.jsx";


// function App(){

//   return(
//     <BrowserRouter>
//       <Navbar/>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/Details_event/:id" element={<Details_event/>}/>
//           <Route path="/Reserver" element={<Reserver/>}/>
//           <Route path="/Cart" element={<Cart/>}/>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/signin" element={<SiNgin/>}/>
//           <PrivateRoute path="/admin" component={AdminDashboard} />






//         </Routes>
//         <Footer/>
//     </BrowserRouter>
//   )

// }export default App;

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Details_event from "./pages/Details_event/Detail_event";
import Reserver from "./pages/Reserver/Reserver";
import Cart from './pages/Cart/Cart.jsx';
import './App.css';
import Login from "./pages/login/login.jsx";
import SiNgin from "./pages/signin/SignIn.jsx";
import PrivateRoute from "./components/Protect/PrivateRoute.jsx"; // Import the private route
import AdminDashboard from "./pages/Admin/Admin.jsx";
import Events from "./pages/Events/Events.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Details_event/:id" element={<Details_event />} />
        <Route path="/Reserver" element={<Reserver />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SiNgin />} />
        <Route path="/events" element={<Events />} />

        
        {/* Protect Admin route with PrivateRoute */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
