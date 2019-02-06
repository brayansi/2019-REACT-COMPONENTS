const api = 'http://localhost:3002/api/';

export const ApiService = {
    get(endPoint) {
        return fetch(`${api}${endPoint}`).then(response => response.json());
    },
    post(endPoint, data) {
        return fetch(`${api}${endPoint}`, {
            method: 'POST',
            body:JSON.stringify(data)
        
        })
    },
    delete(endPoint, id) {
        return fetch(`${api}${endPoint}?id=${id}`, {
            method: 'DELETE',       
        }).then(response => response.json());
    }
}