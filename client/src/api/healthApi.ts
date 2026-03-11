import { apiFetch } from './client';

export interface HealthResponse {
  success: string;
  message: string;
}

export function getHealth() {
  return apiFetch<HealthResponse>('/health');
}