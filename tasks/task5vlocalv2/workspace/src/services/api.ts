import { AssignmentHistory } from '../types';

export async function getAssetHistory(assetId: string | number): Promise<AssignmentHistory[]> {
  const response = await fetch(`/assets/${assetId}/history`);
  return response.json();
}