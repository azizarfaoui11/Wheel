import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage'
import Page2 from './Page2';
import Page3 from './Page3';
import Spin from './Spin'
import Result1 from './Result1';
import Result2 from './Result2';
import Merci from './Merci';
import Reduction3 from './Reduction3';
import Result3 from './Result3';
import AddProduit from './addproduct';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/Spin" element={<Spin />} />
        <Route path="/Result1" element={<Result1 />} />
        <Route path="/Result2" element={<Result2 />} />
        <Route path="/Reduction" element={<Reduction3 />} />
        <Route path="/Merci" element={<Merci />} />
        <Route path="/Result3" element={<Result3 />} />
         <Route path="/addproduct" element={<AddProduit />} />


      </Routes>
    </Router>
  );
}

export default App;
