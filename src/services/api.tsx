const BASE_URL = 'http://localhost:3000/api';

export interface User {
  id?: number;
  email: string;
  password: string;
}

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  position: string;
  isAdmin: boolean;
}


export interface Payroll{
  id_user:string;
  paye_id:string;
  pay_date:string;
  salary:number;
  created_at:string;
  comments:string;
  file_path:string;
}

export const getToken = () => {
  return sessionStorage.getItem('token');
};


export const post = async (endpoint: string, data: any) => {
  const token = getToken();  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  
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

export const get = async (endpoint: string) => {
  const token = getToken(); 
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la requête GET:', error);
    throw error;
  }
};


export const loginUser = async (email: string, password: string) => {
  return post('/login', { email, password });
};

export const createUser = async (userData: UserForm) => {
  return post('/register', userData);
};

export const fetchPayroll = async () => {
  return get('/fetchPayroll');  
};
