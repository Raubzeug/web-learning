import getCookie from './getCookie'

const fetchData = (url, data='', method='GET', authenticated=false) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
        }

    if (authenticated === true) {
        headers['Authorization'] = 'Token ' + localStorage.token
    }

    const fetchParam = {
        method: method,
        headers: headers,
        // credentials: 'include'
    }
    if (data !== '') {
        fetchParam['body'] = JSON.stringify(data)
    }
    

    return fetch(url, fetchParam)   
}

export default fetchData