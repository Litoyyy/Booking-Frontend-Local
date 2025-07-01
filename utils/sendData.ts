export async function sendData(data: any, url: string, newMethod?: String) {
    const user = useUser();
    let token = user.token.value;

    let refreshAttempts = 0;
    const MAX_REFRESH_ATTEMPTS = 1;

    async function makeRequest(token: string) {
        const headers: Record<string, string> = {
            'Content-Type': "application/json",
        };

        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        const fetchData = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        };

        if(newMethod) fetchData.method = `${newMethod}`;

        const response = await fetch(`http://188.120.250.229/api/v1${url}`, fetchData);

        if(response.ok) {
            try {
                return await response.json();
            } catch (e) {
                return response.ok;
            } 
        } else if (response.status === 401) {

            if (url === '/auth/token/refresh/') {
                throw new Error('Refresh token is invalid');
            }

            if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
                throw new Error('Maximum refresh attempts reached');
            }

            refreshAttempts++;
            const newToken = await useUser().updateToken();
            
            if (!newToken) {
                throw new Error('Не удалось обновить токен');
            }

            return await makeRequest(newToken);
        } else {
            throw new Error(response.statusText);
        }

    }

    return makeRequest(token);
}