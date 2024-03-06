import http from 'http'


/*
    Check if we got cookies from the browser.
    If not, create a session id and set this as cookie to manage users/logins.
    Logout can only be done by invalidating cookies, ie. setting the expire time to the past.
*/
export function composeCookie(req: http.IncomingMessage, res: http.ServerResponse) : string[]{
    // TODO: check if exists, update/delete/add cookie info
    console.log(`TODO: analyse '${req.rawHeaders}'`)
    const userID = 7
    const expires = new Date(); expires.setTime(expires.getTime()+3*60*60*1000 )
    return ['Set-Cookie',`userID=${userID}; Secure; Path=/;`,
            'Set-Cookie',`language=en;expires="${expires.toUTCString()}";HttpOnly=/;`]
  }