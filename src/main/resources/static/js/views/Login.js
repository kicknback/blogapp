export default function Login(props) {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>Log In</title>
    </head>
    <body>
        <h1 id="login-heading">Log In</h1>
    
        <form id="login-form">
            <label for="email">Email</label>
            <input id="email" name="email" type="text"/>
            <label for="password">Password</label>
            <input id="password" name="password" type="password"/>
            <input id="login-btn"  class="myButton" type="submit" value="Log In"/>
        </form>
    </body>
</html>`;

}


