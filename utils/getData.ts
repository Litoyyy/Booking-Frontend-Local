export async function getData(url: string, newMethod?: string) {
    const user = useUser();
    let token = user.token.value;

    async function makeRequest(token: string) {
        let method = "GET";
        if(newMethod) method = `${newMethod}`;

        const headers: Record<string, string> = {
            'Content-Type': "application/json",
        };

        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        const response = await fetch(`http://188.120.250.229/api/v1${url}`, {
            method: method,
            headers: headers,
        });


        if(response.ok) {
            try {
                return await response.json();
            } catch (e) {
                return response.ok;
            } 
        } else if (response.status === 401) {

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