const BASE_URL = 'http://localhost:3000/api';

export interface User {
  id?: number;
  email: string;
  password: string;
}

export const post = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la requête POST:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  return post('/login', { email, password });
};

