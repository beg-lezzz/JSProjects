export const getDataFromAPI = async (urlAPI) => {
    const res = await fetch(urlAPI);
    return await res.json();
};

export const writeToLocalStorage = async (urlAPI) => {
    try {
        const users = await getDataFromAPI(urlAPI);
        localStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
        console.error(e);
    }
}