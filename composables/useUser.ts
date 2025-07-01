export const useUser = () => {
    const token = useCookie('access');
    const refresh = useCookie('refresh');

    const updateToken = async (): Promise<string | null> => {
        try {
            const res = await sendData({ refresh: refresh.value }, '/auth/token/refresh/');
            Object.keys(res).map((key) => {
                const cookie = useCookie(`${key}`);
                cookie.value = res[`${key}`];
            });
            return res.access;
        } catch (error) {
            return null;
        };
    };
    
    return { token, updateToken };
};