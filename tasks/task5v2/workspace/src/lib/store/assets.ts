import { create } from 'zustand';
import { Asset } from '../api';
import { DefaultService } from '../../api';

interface AssetState {
  assets: Asset[];
  isLoading: boolean;
  fetchAssets: () => Promise<void>;
}

export const useAssetStore = create<AssetState>((set) => ({
  assets: [],
  isLoading: false,
  fetchAssets: async () => {
    set({ isLoading: true });
    try {
      const assets = await DefaultService.getAssets();
      set({ assets, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch assets:', error);
      set({ isLoading: false });
    }
  },
}));
