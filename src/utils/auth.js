import auth0 from 'auth0-js'
import { navigateTo } from 'gatsby-link'

console.log(process.env)

const AUTH0_DOMAIN = 'miguelmaldonadoo.auth0.com'
const AUTH0_CLIENT_ID = 'YhyazTSZ514UMeiAQVzSEWcyN6X6QPo7'

class Auth {
  accessToken
  idToken
  expiresAt
  userProfile

  auth0 = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: 'https://awesome-goldwasser-f1b5bd.netlify.com/callback',
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getIdToken = this.getIdToken.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    if (typeof window !== 'undefined') {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
        } else if (err) {
          console.log(err)
        }

        // Return to the homepage after authentication.
        navigateTo('/')
      })
    }
  }

  getAccessToken() {
    return this.accessToken
  }

  getIdToken() {
    return this.idToken
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = expiresAt

    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile
      }
      // navigateTo to the home route
      navigateTo('/')
    })
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null
    this.idToken = null
    this.expiresAt = 0
    this.userProfile = null

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')

    // navigateTo to the home route
    navigateTo('/')
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt
  }

  getUser() {
    return this.userProfile
  }

  getUserName() {
    if (this.getUser()) {
      return this.getUser().name
    }
  }
}

const auth = new Auth()
export default auth
