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
                    <input type="text" class="form-control" id="username-search" placeholder="Search by username...">
                </div>
                <button type="submit" class="myButton mb-5" id="submit-search">Submit</button>

        </form>
        <br>
        <div id="user-container"></div>
    </body>
</html>`;
}

export function searchUser() {
    $("#submit-search").click(function() {
        let uName = $("#username-search");
        let uDiv = $("#user-container");
        if (uName.val() === "") {
            alert("Please enter a username to search");
        }
        $.get(`http://localhost:8080/api/users/findByUsername?username=${uName.val()}`, function (data, status) {
            console.log(data);
            console.log(status);
            uDiv.append(`
            
                <!-- user card powered by bbbootstrap snippets-->
        <div class="page-content page-container" id="user-content">
            <div class="padding">
                <div class="row container d-flex justify-content-center">
                    <div class="col-md-5">
                        <div class="card user-card">
                            <div class="card-body text-center">
                                <div> <img src="https://img.icons8.com/bubbles/100/000000/administrator-male.png" class="img-lg rounded-circle mb-4" alt="profile image">
                                    <h4>${data.username}</h4>
                                    <p class="text-muted mb-0">Regular User</p>
                                </div>
                                <p class="mt-2 card-text">- Bio goes here -</p> <button class="myButton">Change password</button>
                                <div class="border-top pt-3">
                                    <div class="">
                                        <div class="">
                                            <h6>EMAIL</h6>
                                            <p>${data.email}</p>
                                        </div>
                                        <div class="">
                                            <h6>POSTS</h6>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            `)
        })
    })
}

