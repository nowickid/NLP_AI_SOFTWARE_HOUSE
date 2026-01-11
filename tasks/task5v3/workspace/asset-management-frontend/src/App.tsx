import './App.css';
import AssetList from './components/AssetList';
import { Asset } from './types';

function App() {
  const sampleAssets: Asset[] = [
    { id: 1, type: 'Laptop', serial_number: 'SN12345', status: 'assigned' },
    { id: 2, type: 'Monitor', serial_number: 'SN67890', status: 'available' },
    { id: 3, type: 'Keyboard', serial_number: 'SN54321', status: 'maintenance' },
  ];

  return (
    <div className="App">
      <h1>Asset Management</h1>
      <AssetList assets={sampleAssets} />
    </div>
  );
}

export default App;
