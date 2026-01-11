import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AssetsPage from './Assets';
import { useAssetStore } from '@/lib/store/assets';
import { MemoryRouter } from 'react-router-dom';

// Mock the store module
vi.mock('@/lib/store/assets');

// Prepare mock functions with stable references
const mockFetchAssets = vi.fn();
const mockAddAsset = vi.fn();
const mockUseAssetStore = useAssetStore as jest.Mock;

describe('AssetsPage', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure isolation
    vi.clearAllMocks();
    
    // Provide a default mock implementation for the store
    mockUseAssetStore.mockReturnValue({
      assets: [],
      loading: false,
      error: null,
      fetchAssets: mockFetchAssets,
      addAsset: mockAddAsset,
    });
  });

  it('should call fetchAssets on component mount', () => {
    render(<MemoryRouter><AssetsPage /></MemoryRouter>);
    expect(mockFetchAssets).toHaveBeenCalledTimes(1);
  });

  it('should render loading state correctly', () => {
    mockUseAssetStore.mockReturnValue({
      loading: true,
      fetchAssets: mockFetchAssets,
    });
    render(<MemoryRouter><AssetsPage /></MemoryRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error state correctly', () => {
    mockUseAssetStore.mockReturnValue({
      error: 'Failed to fetch',
      fetchAssets: mockFetchAssets,
    });
    render(<MemoryRouter><AssetsPage /></MemoryRouter>);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('should render the data table with assets', () => {
    const assets = [
      { id: 1, type: 'Laptop', serial_number: 'SN123', status: 'available' },
      { id: 2, type: 'Mouse', serial_number: 'SN456', status: 'assigned' },
    ];
    mockUseAssetStore.mockReturnValue({
      assets,
      loading: false,
      error: null,
      fetchAssets: mockFetchAssets,
    });

    render(<MemoryRouter><AssetsPage /></MemoryRouter>);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('SN456')).toBeInTheDocument();
  });

  it('should open the create asset dialog, submit the form, and close', async () => {
    const user = userEvent.setup();
    // Make the mock async to simulate a real API call
    mockAddAsset.mockResolvedValue(undefined);

    render(<MemoryRouter><AssetsPage /></MemoryRouter>);

    // 1. Open the dialog
    await user.click(screen.getByRole('button', { name: /create asset/i }));
    const dialogTitle = await screen.findByRole('heading', { name: /create new asset/i });
    expect(dialogTitle).toBeInTheDocument();

    // 2. Fill out the form
    await user.type(screen.getByLabelText(/type/i), 'Monitor');
    await user.type(screen.getByLabelText(/serial number/i), 'SN-MON-001');

    // 3. Submit the form
    await user.click(screen.getByRole('button', { name: 'Create' }));

    // 4. Assert that the addAsset function was called with the correct data
    await waitFor(() => {
      expect(mockAddAsset).toHaveBeenCalledWith({
        type: 'Monitor',
        serial_number: 'SN-MON-001',
      });
    });

    // 5. Assert that the dialog has closed after submission
    expect(screen.queryByRole('heading', { name: /create new asset/i })).not.toBeInTheDocument();
  });
});
