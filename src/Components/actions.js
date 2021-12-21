export const loginUserTTT = (username, password) => ({
    type: "pointScored"
})


export const loginUser = (username, password) => {
    //alert (username + ' , ' + password)
    return function(dispatch) {
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
                    dispatch(loginSuccess(data.body.token, data.status, data.message));
                    dispatch(accessProfile(data.body.token));
                } catch(e) {
                    console.log('error', data)
                }
            })
            .catch(error => {
                dispatch(loginFailure(error));
            })
    }
}

// appelée par loginUser
export const accessProfile = (token) => {
    return function(dispatch) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        //console.log('appel http://localhost:3001/api/v1/user/profile')
        return fetch('http://localhost:3001/api/v1/user/profile', requestOptions)
            .then(response => response.json())
            .then(data => {
                try {
                    console.log('success', data) // renvoie  status: 200, message: "Successfully got user profile data", enc as de succès
                    dispatch(receiveData(data.body, data.status));
                } catch(e) {
                    console.log('error 1', data)
                }
            })
            .catch(error => {
                console.log('error 2', error)
            })
       }
}

// appelée par accessProfile, va utilisé le reducer "userReducer"
export const receiveData = (data, status) => {
    return {
        type: 'RECEIVE_DATA',
        payload: {
            data: data,
            status: status
        }
    }
}

// appelée par loginUser
export const loginSuccess = (token, status, message) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            token: token,
            status: status,
            message: message
        }
    }
}
// appelée par loginUser
export const loginFailure = (status, message) => {
    return {
        type: 'LOGIN_FAILURE',
        payload: {
            status: status,
            message: message
        }
    }
}

