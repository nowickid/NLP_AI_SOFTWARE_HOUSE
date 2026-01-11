import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssignAssetForm from './AssignAssetForm';
import { Asset, Employee } from '../types';
import * as api from '../services/api';
import { jest } from '@jest/globals';

jest.mock('../services/api');

const mockAssets: Asset[] = [
  { id: 1, type: 'Laptop', serial_number: 'LT123', status: 'available' },
  { id: 2, type: 'Monitor', serial_number: 'MN456', status: 'available' },
];

const mockEmployees: Employee[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

describe('AssignAssetForm', () => {
  beforeEach(() => {
    jest.mocked(api.getEmployees).mockResolvedValue(mockEmployees);
    jest.clearAllMocks();
  });

  it('renders the form with assets and employees', async () => {
    const { getByLabelText, findByText } = render(<AssignAssetForm assets={mockAssets} onAssignment={jest.fn()} />);

    await findByText('John Doe');

    expect(getByLabelText('Asset:')).toBeInTheDocument();
    expect(getByLabelText('Employee:')).toBeInTheDocument();
    expect(await findByText('LT123')).toBeInTheDocument();
    expect(await findByText('Jane Smith')).toBeInTheDocument();
  });

  it('submits the form and calls onAssignment', async () => {
    const mockOnAssignment = jest.fn();
    const { getByLabelText, getByText, findByText } = render(<AssignAssetForm assets={mockAssets} onAssignment={mockOnAssignment} />);
    const user = userEvent.setup();

    await findByText('John Doe');

    await user.selectOptions(getByLabelText('Asset:'), '1');
    await user.selectOptions(getByLabelText('Employee:'), '2');

    const assignedData = { asset_id: 1, employee_id: 2 };
    jest.mocked(api.assignAsset).mockResolvedValue(assignedData);

    fireEvent.click(getByText('Assign'));

    await waitFor(() => {
      expect(api.assignAsset).toHaveBeenCalledWith(1, 2);
      expect(mockOnAssignment).toHaveBeenCalledWith(assignedData);
    });
  });
});
