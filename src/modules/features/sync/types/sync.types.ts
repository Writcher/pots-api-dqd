export interface UploadPayload {
  campanas: Record<string, any>[];
  campanaTipoEnsayo: Record<string, any>[];
  pots: Record<string, any>[];
  ensayos: Record<string, any>[];
  perfiles?: Record<string, any>[];
  deviceId: string;
}