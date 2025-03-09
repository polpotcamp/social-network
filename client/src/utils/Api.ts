export async function checkReponse<T>(res:Response):Promise<T|null>{
    if (res.ok) {
        if(res!==null)
        return await res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
export function request<T>(url: string, options?: RequestInit) {
    return fetch(url, options).then(checkReponse<T>)
}
export const BASE_URL = 'http://localhost:5000'