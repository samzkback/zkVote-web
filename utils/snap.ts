export const defaultSnapOrigin = `local:http://localhost:7070`;
export type GetSnapsResponse = Record<string, Snap>;
export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_enable',
    params: [{ wallet_snap: {[snapId]: { ...params,},},},],
  });
  return true;
};

export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();
    return Object.values(snaps).find(
      (snap) => snap.id === defaultSnapOrigin && (!version || snap.version === version),);
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

export function requestSnap(
  method: string,
  params?: unknown[],
): Promise<unknown> {
  const result = window.ethereum.request({
    method : "wallet_invokeSnap",
    params : [ defaultSnapOrigin, { method : method, params : params}]
  });
  console.log({ method, params, result });
  return result;
}
