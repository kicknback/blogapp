import createView from "../createView.js";

export default function User(props) {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>User info</title>
    </head>
    <body>
        <h1 id="user-heading">User information</h1>
    
        <form>

                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username-search" placeholder="Search by username...">
                </div>
                <button type="submit" class="myButton" id="submit-search">Submit</button>

        </form>
        <div id="user-container"></div>
    </body>
</html>`;
}

export function searchUser() {
    $("#submit-search").click(function() {
        let uName = $("#username-search");
        if (uName.val() === "") {
            alert("Please enter a username to search");
        }
        $.get(`http://localhost:8080/api/users/findByUsername?username=${uName.val()}`, function (data, status) {
            console.log(data);
            console.log(status);
        })
    })
}

