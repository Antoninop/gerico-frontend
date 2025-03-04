import { toast, Bounce } from 'react-toastify';

const BASE_URL = 'http://127.0.0.1:3005/api';

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

export interface Payroll {
  id_user: string;
  paye_id: string;
  pay_date: string;
  salary: number;
  created_at: string;
  comments: string;
  file_path: string;
}

export const getToken = () => {
  return sessionStorage.getItem('token');
};

const nonToastableCalls: string[] = [
  '/fetchPayroll',
  '/fetchHolidayInfo',
  '/fetchHoliday',
  '/fetchAccountInfo',
  '/fetchUsers',
  '/fetchArchivedUsers',
  '/fetchAskedHoliday',
];

function toast_status(status: number, message: string | undefined, endpoint: string) {
  if (nonToastableCalls.includes(endpoint)) {
    return;
  }

  let toastType: 'success' | 'error' | 'info' | 'warning';

  if (status >= 200 && status < 300) {
    toastType = 'success';
  } else if (status >= 400 && status < 600) {
    toastType = 'error';
  } else {
    toastType = 'info';
  }

  if (status === 666) {
    toastType = 'warning';
  }

  const toastMessage = message || 'Une erreur s\'est produite';

  toast[toastType](toastMessage, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

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

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || responseData.error_message || 'Erreur lors de la requête POST';
      toast_status(response.status, errorMessage, endpoint);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const successMessage = responseData.message || 'Opération réussie !';
    toast_status(response.status, successMessage, endpoint);

    return { status: response.status, data: responseData };
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

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || responseData.error_message || 'Erreur lors de la requête GET';
      toast_status(response.status, errorMessage, endpoint);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const successMessage = responseData.message || 'Opération réussie !';
    toast_status(response.status, successMessage, endpoint);

    return { status: response.status, data: responseData };
  } catch (error) {
    console.error('Erreur lors de la requête GET:', error);
    throw error;
  }
};


export const askHoliday = async (length: string, date: Date) => {
  return post('/askHoliday', { length, date });
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

export const fetchHolidayInfo = async () => {
  return get('/fetchHoliday');
};

export const fetchAccountInfo = async () => {
  return get('/fetchAccountInfo');
};

export const fetchArchivedUsers = async () => {
  return get('/fetchArchivedUsers');
};

export const archiveUser = async (email : string) => {
  return post('/archiveUser', {email});
}

export const UnarchiveUser = async (email : string) => {
  return post('/UnarchiveUser', {email});
}

export const fetchUsers = async () => {
  return get('/fetchUsers');
};

export const fetchAskedHoliday = async () => {
  return get('/fetchAskedHoliday');
};

export const sendCodeResetPass = async (email: string) => {
  return post('/sendCodeResetPass', { email });
};

export const verifyCodeResetPass = async (email: string, code: string) => {
  return post('/verifyCodeResetPass', { email, code });
};


export const Newpassword = async (email: string, id: string , password : string) => {
  return post('/Newpassword', { email, id , password });
};

export const sendInvitation = async (email:string) => {
  return post('/sendInvitation', {email});
};