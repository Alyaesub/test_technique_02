import { apiFetch } from './client';
import type { CreateAssignmentPayload } from '../types/assignment';

export function createAssignment(payload: CreateAssignmentPayload) {
  return apiFetch<{ data: unknown }>('/assignments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
