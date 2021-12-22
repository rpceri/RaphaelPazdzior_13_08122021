export const LoginUserTTT = (username, password) => ({
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

                } catch(error) {
                    console.log('error', error)
                }
            })
            .catch(error => {
                dispatch(apiFailure(error));
            })
    }
}

// appelée par LoginUser
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
                    //console.log('navigation : ', nouvellePage) 
                    navigate(nouvellePage)
                } catch(error) {
                    console.log('error 1', error)
                }
            })
            .catch(error => {
                console.log('error 2', error)
            })
       }
}

// appelée par accessProfile et RecordChange
export const receiveData = (data, status) => {
    return {
        type: 'RECEIVE_DATA',
        payload: {
            data: data,
            status: status
        }
    }
}

// appelée par LoginUser
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
// appelée par LoginUser et RecordChange
export const apiFailure = (status, message) => {
    return {
        type: 'API_FAILURE',
        payload: {
            status: status,
            message: message
        }
    }
}
// appelée par EditProfile
export const RecordChange = (token, newFirstName, newLastName, navigate) => {
    return (dispatch) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "firstName": newFirstName,
                "lastName": newLastName
            })
        };
        return fetch('http://localhost:3001/api/v1/user/profile', requestOptions)
            .then(response => response.json())
            .then(data => {
                try {
                dispatch(receiveData(data.body, data.status))
                navigate('/user') // après enregistrement, on rivien sur la fich user
                } catch(error) {
                    console.log('erreur put2', error);
                    dispatch(apiFailure(error))
                }
            })
            .catch(error => {
                 console.log('erreur put', error)
                 dispatch(resetFailure())
                 dispatch(apiFailure(error))
                
                 navigate('/')
        })
    }
}

// appelée par RecordChange
export const resetFailure = () => {
    return {
        type: 'RESET_DATA'
    }
}




export const LogoutRequest = () => {
    return {
        type: 'USER_LOGGED_OUT'
    }
}