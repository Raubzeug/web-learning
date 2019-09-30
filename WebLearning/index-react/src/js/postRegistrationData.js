const postRegistrationData = (headers, data) => {
    let result = {
        fetchDone: false,
        success: false,
        errors: []
    }
    fetch('/api/auth/registration/', {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status === 201) {
            result.success = true
        }
        return response.json()})
    .then(data => {
        if (result.success) {
            result.success =
             'You are sucessfully register! Check your mail for verification link.'
        }
        else {
            result.errors = data
            }
        result.fetchDone = true
    })
    .catch(err => console.error(err))

    
}

export default postRegistrationData