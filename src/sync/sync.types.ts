export interface UploadPayload {
  campanas: Record<string, any>[];
  pots: Record<string, any>[];
  ensayos: Record<string, any>[];
  deviceId: string;
}
