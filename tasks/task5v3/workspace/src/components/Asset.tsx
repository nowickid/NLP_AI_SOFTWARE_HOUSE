import { Asset as AssetType } from '../types';
import styles from './Asset.module.css';

interface AssetProps {
  asset: AssetType;
}

const Asset = ({ asset }: AssetProps) => {
  return (
    <div className={styles.asset}>
      <h3>{asset.type}</h3>
      <p>Serial: {asset.serial_number}</p>
      <p>Status: <span className={styles[asset.status]}>{asset.status}</span></p>
    </div>
  );
};

export default Asset;
