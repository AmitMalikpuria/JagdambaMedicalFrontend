import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import ZSection from './Component/SuperAdmin/ZSection.js';
import LoginForm from './Component/SuperAdmin/SampleLogin/Login.js';
import SZType from './Component/SuperAdmin/SZType.js';
import MenuMaster from './Component/SuperAdmin/MenuMaster.js';
import Authorizations from './Component/SuperAdmin/Authorizations.js';
import AppUser from './Component/SuperAdmin/AppUser.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginForm />}></Route> */}
        <Route path="/" element={<ZSection />}></Route>
        <Route path="/zsection" element={<ZSection />}></Route>
        <Route path="/sztype" element={<SZType />}></Route>
        <Route path="/menumaster" element={<MenuMaster />}></Route>
        <Route path="/authorizations" element={<Authorizations />}></Route>
        <Route path="/appuser" element={<AppUser />}></Route>
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
