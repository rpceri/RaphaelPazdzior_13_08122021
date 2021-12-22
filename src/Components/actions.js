export const loginUserTTT = (username, password) => ({
    type: "pointScored"
})


export const LoginUser = (username, password, navigate) => {

    //alert (username + ' , ' + password)
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
                    console.log('success sign in', data)
                    dispatch(loginSuccess(data.body.token, data.status, data.message));
                    dispatch(AccessProfile(data.body.token, navigate))

                } catch(e) {
                    console.log('error', e)
                }
            })
            .catch(error => {
                dispatch(loginFailure(error));
            })
    }
}

// appelée par loginUser
export const AccessProfile = (token, navigate) => {

    return (dispatch) => {
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
                    console.log('success get profile', data) // renvoie  status: 200, message: "Successfully got user profile data", enc as de succès
                    dispatch(receiveData(data.body, data.status));
                    let nouvellePage = `/user`
                    console.log('navigat : ', nouvellePage) 
                    navigate(nouvellePage);
                } catch(e) {
                    console.log('error 1', e)
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

