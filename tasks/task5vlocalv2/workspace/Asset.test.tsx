import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Asset from './Asset';
import { Asset as AssetType } from '../types';

jest.mock('../services/api');

describe('Asset component', () => {
  it('calls flagForMaintenance when button is clicked', async () => {
    const asset: AssetType = { id: 1, type: 'test', serial_number: '123', status: 'available' };
    const onAssetUpdate = jest.fn();
    const { getByText } = render(<Asset asset={asset} onAssetUpdate={onAssetUpdate} />);
    const button = getByText('Flag for Maintenance');
    fireEvent.click(button);
    await waitFor(() => expect(flagForMaintenance).toHaveBeenCalledTimes(1));
    expect(flagForMaintenance).toHaveBeenCalledWith(asset.id);
  });

  it('calls onAssetUpdate with updated asset', async () => {
    const asset: AssetType = { id: 1, type: 'test', serial_number: '123', status: 'available' };
    const updatedAsset: AssetType = { id: 1, type: 'test', serial_number: '123', status: 'maintenance' };
    const onAssetUpdate = jest.fn();
    (flagForMaintenance as jest.Mock).mockResolvedValue(updatedAsset);
    const { getByText } = render(<Asset asset={asset} onAssetUpdate={onAssetUpdate} />);
    const button = getByText('Flag for Maintenance');
    fireEvent.click(button);
    await waitFor(() => expect(onAssetUpdate).toHaveBeenCalledTimes(1));
    expect(onAssetUpdate).toHaveBeenCalledWith(updatedAsset);
  });

  it('does not render Flag for Maintenance button for maintenance asset', () => {
    const asset: AssetType = { id: 1, type: 'test', serial_number: '123', status: 'maintenance' };
    const onAssetUpdate = jest.fn();
    const { queryByText } = render(<Asset asset={asset} onAssetUpdate={onAssetUpdate} />);
    expect(queryByText('Flag for Maintenance')).not.toBeInTheDocument();
  });
});