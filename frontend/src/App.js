import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage'
import Page2 from './Page2';
import Page3 from './Page3';
import Spin from './Spin'
import Result1 from './Result1';
import Result2 from './Result2';
import Profitez from './Profitez';
import Merci from './Merci';
import Reduction1 from './Reduction1';
import Reduction2 from './Reduction2';
import Reduction3 from './Reduction3';
import Result3 from './Result3';
import KickStream from './kick';




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
        <Route path="/Profitez" element={<Profitez />} />
        <Route path="/Reduction1" element={<Reduction1 />} />
        <Route path="/Reduction2" element={<Reduction2 />} />
        <Route path="/Reduction3" element={<Reduction3 />} />
        <Route path="/Merci" element={<Merci />} />
        <Route path="/Result3" element={<Result3 />} />
        <Route path="/KickStream" element={<KickStream />} />

      </Routes>
    </Router>
  );
}

export default App;
