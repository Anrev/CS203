import axios from 'axios'
import { API_URL } from '../../Constants';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

// Service for keeping track of currently authenticated user
// Also facilitates retrieval of currently logged in username
class AuthenticationService {

    // BELOW CODE IS GENERAL FOR BOTH BASIC AND JWT AUTH

    // Log Out
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    // Is User Logged In
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false
        return true
    }

    // Retrieve Current User Name
    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return ''
        return user
    }


    
    // BELOW CODE IS SPECIFICALLY FOR JWT AUTH

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }



    // BELOW CODE IS SPECIFICALLY FOR BASIC AUTH

    // Basic Auth for Spring Security user/pass configured in the application.properties
    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    // Basic Auth token creation
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    // register successful login and store in session storage, append BasicAuthToken to all further requests (since user is authorized)
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    // intercept HTTP requests and include basicAuthHeader
    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config;
            }
        )
    }
}

export default new AuthenticationService();