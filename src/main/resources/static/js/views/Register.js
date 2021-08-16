export default function Register(props) {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>User Registration</title>
    </head>
    <body>
        <h1 id="register-heading">Register User</h1>
    
        <form>

                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter your preferred username">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="blah@blah">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="post-title" placeholder="password">
                </div>
                <button type="submit" class="myButton" id="submit-user">Submit</button>

            </form>
    </body>
</html>`;
}

export function registerListener() {
    $("#submit-user").click(function() {

    })
}