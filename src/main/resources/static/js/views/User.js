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



