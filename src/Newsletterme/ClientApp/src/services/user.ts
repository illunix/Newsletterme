import axios from 'axios';

export const signUp = async (email: string, password: string) => {
    const credentials = {
        email: email,
        password: password
    };

    axios.post('/api/account/sign-up', credentials)
        .catch(error => {
            console.error(error);
        });
}
