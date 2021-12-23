//called in SignIn Page :  call api to log in, and api to GET profile, record all datats in the store
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
        return fetch('http://localhost:3001/api/v1/user/login', requestOptions) // call api to log in
            .then(response => response.json())
            .then(data => {
                try {
                    console.log('success sign in', data)
                    dispatch(loginSuccess(data.body.token, data.status, data.message)); // record token and other...
                    dispatch(AccessProfile(data.body.token, navigate)) // call api to GET profile and record datas (body, status, en token)

                } catch(error) {
                    console.log('error', error)
                }
            })
            .catch(error => {
                dispatch(apiFailure(error));
            })
    }
}

// called by LoginUser, call api to GET profile and record datas (body, status, en token)
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
                    console.log('success get profile', data) // return status: 200, message: "Successfully got user profile data",in case of success
                    dispatch(receiveData(data.body, data.status, token));
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

// called by accessProfile and RecordChange to record datas
export const receiveData = (data, status, token) => {
    return {
        type: 'RECEIVE_DATA',
        payload: {
            data: data,
            status: status,
            token: token
        }
    }
}

// called by LoginUser to record datas (token)
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

// called by LoginUser and RecordChange when a problem gone
export const apiFailure = (status, message) => {
    return {
        type: 'API_FAILURE',
        payload: {
            status: status,
            message: message
        }
    }
}

// called by EditProfile page to use PUT API to store datas to update
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
                dispatch(receiveData(data.body, data.status, token))
                navigate('/user') // after recorded, we go back to user profile
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

//called by RecordChange  when a problem gone
export const resetFailure = () => {
    return {
        type: 'RESET_DATA'
    }
}


//called in Nav to Log out, to erase token
export const LogoutRequest = () => {
    return {
        type: 'USER_LOGGED_OUT'
    }
}