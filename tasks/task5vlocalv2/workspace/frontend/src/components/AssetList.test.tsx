import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AssetList from './AssetList';
import AssignAssetForm from './AssignAssetForm';
import { Asset as AssetType } from '../types';
import { getAssets, flagForMaintenance } from '../services/api';
import { jest } from '@jest/globals';

jest.mock('../services/api');
jest.mock('./AssignAssetForm', () => {
  return jest.fn(() => null);
});

describe('AssetList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes only available assets to AssignAssetForm', async () => {
    const assets: AssetType[] = [
      { id: 1, type: 'test', serial_number: '123', status: 'available' },
      { id: 2, type: 'test', serial_number: '456', status: 'assigned' },
      { id: 3, type: 'test', serial_number: '789', status: 'maintenance' }
    ];
    jest.mocked(getAssets).mockResolvedValue(assets);

    render(<AssetList />);

    await waitFor(() => {
      expect(getAssets).toHaveBeenCalledTimes(1);
      expect(AssignAssetForm).toHaveBeenLastCalledWith(
        expect.objectContaining({
          assets: [assets[0]]
        }),
        {}
      );
    });
  });

  it('updates asset status and removes it from assignable list when flagged for maintenance', async () => {
    const initialAsset: AssetType = { id: 1, type: 'Laptop', serial_number: 'SN123', status: 'available' };
    const updatedAsset: AssetType = { ...initialAsset, status: 'maintenance' };

    jest.mocked(getAssets).mockResolvedValue([initialAsset]);
    jest.mocked(flagForMaintenance).mockResolvedValue(updatedAsset);

    const { getByText, queryByText, findByText } = render(<AssetList />);

    await waitFor(() => {
      expect(AssignAssetForm).toHaveBeenLastCalledWith(expect.objectContaining({ assets: [initialAsset] }), {});
    });

    const flagButton = getByText('Flag for Maintenance');
    fireEvent.click(flagButton);

    await findByText('Laptop - SN123 (maintenance)');

    await waitFor(() => {
      expect(flagForMaintenance).toHaveBeenCalledWith(initialAsset.id);
      expect(queryByText('Flag for Maintenance')).not.toBeInTheDocument();
      expect(AssignAssetForm).toHaveBeenLastCalledWith(expect.objectContaining({ assets: [] }), {});
    });
  });
});
