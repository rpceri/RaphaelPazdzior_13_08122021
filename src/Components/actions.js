
export const loginUser = (username, password) => {
    return (dispatch) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        };
        return fetch('http://localhost:3001/api/v1/user/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                try {
                    console.log('success', data)
                } catch(e) {
                    console.log('error', data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}
