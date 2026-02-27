import { Platform } from 'react-native';

// TODO: Replace with your actual API ID from LocalStack
export const API_ID = 'qrfijywqr0';

export const getBaseUrl = () => {
    if (Platform.OS === 'android') {
        return `http://10.0.2.2:4566/restapis/${API_ID}/dev/_user_request_`;
    }
    return `http://localhost:4566/restapis/${API_ID}/dev/_user_request_`;
};

interface RegisterData {
    name: string;
    email: string;
    cpf: string;
    password: string;
    avatar_url?: string;
}

interface SchedulingData {
    user_id: number;
    service_id: number;
    service_name: string;
    barber_id: number;
    barber_name: string;
    date: string;
    time: string;
    status: string;
}

export const api = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${getBaseUrl()}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },
    register: async (userData: RegisterData) => {
        // userData expects: name, email, cpf, password, avatar_url
        const response = await fetch(`${getBaseUrl()}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    },
    schedule: async (data: SchedulingData) => {
        const response = await fetch(`${getBaseUrl()}/scheduling/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    getDashboard: async (data: any) => {
        const response = await fetch(`${getBaseUrl()}/scheduling/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data}`,
            },
        });
        return response.json();
    }
};
