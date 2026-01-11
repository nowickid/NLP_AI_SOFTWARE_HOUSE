import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Asset from './Asset';
import * as api from '../services/api'; // Import all of api
import { Asset as AssetType } from '../types';

// Mock the api module
jest.mock('../services/api');

describe('Asset component', () => {
  const mockOnAssetUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls flagForMaintenance and onAssetUpdate on button click', async () => {
    const asset: AssetType = { id: 1, type: 'Laptop', serial_number: 'SN123', status: 'available' };
    const updatedAsset: AssetType = { ...asset, status: 'maintenance' };

    // Setup the mock for flagForMaintenance
    const mockedFlagForMaintenance = jest.spyOn(api, 'flagForMaintenance').mockResolvedValue(updatedAsset);

    const { getByText } = render(<Asset asset={asset} onAssetUpdate={mockOnAssetUpdate} />);

    const button = getByText('Flag for Maintenance');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedFlagForMaintenance).toHaveBeenCalledWith(asset.id);
      expect(mockOnAssetUpdate).toHaveBeenCalledWith(updatedAsset);
    });

    mockedFlagForMaintenance.mockRestore(); // Clean up the spy
  });

  it('does not show the maintenance button for assets already in maintenance', () => {
    const asset: AssetType = { id: 1, type: 'Laptop', serial_number: 'SN123', status: 'maintenance' };

    const { queryByText } = render(<Asset asset={asset} onAssetUpdate={mockOnAssetUpdate} />);

    const button = queryByText('Flag for Maintenance');
    expect(button).not.toBeInTheDocument();
  });

  it('shows the return button for assigned assets', () => {
    const asset: AssetType = { id: 1, type: 'Laptop', serial_number: 'SN123', status: 'assigned' };

    const { getByText } = render(<Asset asset={asset} onAssetUpdate={mockOnAssetUpdate} />);

    expect(getByText('Return')).toBeInTheDocument();
  });

  it('does not show the return button for available assets', () => {
    const asset: AssetType = { id: 1, type: 'Laptop', serial_number: 'SN123', status: 'available' };

    const { queryByText } = render(<Asset asset={asset} onAssetUpdate={mockOnAssetUpdate} />);

    expect(queryByText('Return')).not.toBeInTheDocument();
  });
});