import createView from "../createView.js";

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
                    <input type="password" class="form-control" id="password" placeholder="Enter robust password">
                </div>
                 <div class="form-group">
                    <label for="con-password">Confirm Password</label>
                    <input type="password" class="form-control" id="con-password" placeholder="Re-enter password">
                </div>
                <button type="submit" class="myButton" id="submit-user">Submit</button>

        </form>
    </body>
</html>`;
}

export function registerListener() {
    $("#submit-user").click(function() {
        let username = $("#username").val();
        let email = $("#email").val();
        let pass = $("#password").val();
        let conPass = $("#con-password").val();

        if (conPass !== pass) {
            alert("Passwords do not match.  Please try re-typing them.");
            $("#password").val("");
            $("#con-password").val("");
            return;
        }

        console.log(`User ${username} was successfully created...`);

        let userObj = {
            username: username,
            email: email,
            password: pass
        }

        let request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(userObj)
        };

        fetch("http://localhost:8080/api/users/create", request)
            .then((response) => {
                console.log(response.status)
                createView("/");
            }).catch(function (err) {
            console.log("There was an error of " + err);
        });
    })
}