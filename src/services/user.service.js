import { httpService } from "./http.service"


const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials
}



async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) return _setLoggedinUser(user)
    } catch (error) {
        throw ('Invalid login')
        console.log(error);
    }
}

async function signup({ username, password, fullname }) {
    const userToSignup = { username, password, fullname, }
    try {
        console.log(userToSignup);
        
        const user = await httpService.post(BASE_URL + 'signup', userToSignup)
        if (user) return _setLoggedinUser(user)
    } catch (error) {
        console.log(error);
        throw ('Invalid signup')
    }
}


async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (error) {
        console.log(error);
    }
}


function getById(userId) {
    return httpService.get('user/' + userId)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



