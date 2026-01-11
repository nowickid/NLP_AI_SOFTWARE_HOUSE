import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Devices from './pages/Devices';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/devices" element={<Devices />} />
      </Routes>
    </Layout>
  );
}

export default App;
