import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AssetHistoryModal } from './AssetHistoryModal';
import { getAssetHistory } from '../services/api';

jest.mock('../services/api');

describe('AssetHistoryModal component', () => {
  const assetId = 1;
  const onClose = jest.fn();
  const assignmentHistories = [
    {
      assignment_id: 1,
      employee_name: 'John Doe',
      assigned_at: '2022-01-01T00:00:00.000Z',
      returned_at: '2022-01-15T00:00:00.000Z',
    },
  ];

  it('should display loading state when fetching data', () => {
    getAssetHistory.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve(assignmentHistories), 1000)));
    const { getByText } = render(<AssetHistoryModal assetId={assetId} isOpen={true} onClose={onClose} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render history data after successful fetch', async () => {
    getAssetHistory.mockImplementation(() => Promise.resolve(assignmentHistories));
    const { getAllByRole } = render(<AssetHistoryModal assetId={assetId} isOpen={true} onClose={onClose} />);
    await waitFor(() => expect(getAllByRole('row')).toHaveLength(2));
    const rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent('John Doe');
    expect(rows[1]).toHaveTextContent('1/1/2022');
    expect(rows[1]).toHaveTextContent('1/15/2022');
  });

  it('should display error message when fetch fails', async () => {
    getAssetHistory.mockImplementation(() => Promise.reject(new Error('Failed to fetch asset history')));
    const { getByText } = render(<AssetHistoryModal assetId={assetId} isOpen={true} onClose={onClose} />);
    await waitFor(() => expect(getByText('Failed to fetch asset history.')).toBeInTheDocument());
  });

  it('should call onClose when close button is clicked', () => {
    const { getByText } = render(<AssetHistoryModal assetId={assetId} isOpen={true} onClose={onClose} />);
    const closeButton = getByText('Close');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(<AssetHistoryModal assetId={assetId} isOpen={false} onClose={onClose} />);
    expect(container).toBeEmptyDOMElement();
  });
});