import { userService } from "../../services/user.service.js"
import { CLEAR_CART } from "../reducers/toy.reducer.js"
import { SET_USER, SET_USER_SCORE } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function login(credentials) {
    console.log('credentials:', credentials)
    try {
        const user = await userService.login(credentials)
        console.log('user login:', user)
        store.dispatch({ type: SET_USER, user })
    } catch (error) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (error) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout(credentials) {
    try {
        await userService.logout(credentials)
        store.dispatch({ type: SET_USER, user: null })
    } catch (error) {
        console.log('user actions -> Cannot logout', err)
    }

}
