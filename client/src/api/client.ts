const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = 'Une erreur est survenue';

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}