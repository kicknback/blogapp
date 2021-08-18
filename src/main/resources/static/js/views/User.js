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

/*Searches database for the input string.  Returns user info card, with posts(if existing).  If no user found, returns message stating so.*/
export function searchUser() {
    $("#submit-search").click(function() {
        let uName = $("#username-search").val();
        let uDiv = $("#user-container");
        if (uName === "") {
            alert("Please enter a username to search");
            return;
        }
        uDiv.empty();
        $.get(`http://localhost:8080/api/users/findByUsername?username=${uName}`, function (data, status) {
            console.log(data);
            console.log(status);
            if (!data) {
                uDiv.append(`
                
                    <div class="mt-4"><p>User '${uName}' does not exist</p></div>
                
                `)
                return;
            }
            uDiv.append(`
            
        <!-- user card powered by bbbootstrap snippets-->
        
        <div class="page-content page-container" id="user-content">
            <div class="padding">
                <div class="row container d-flex justify-content-center">
                    <div class="col-md-5">
                        <div class="card user-card">
                            <div class="card-body text-center">
                                <div> <img src="https://img.icons8.com/windows/32/000000/anonymous-mask.png" class="img-lg rounded-circle mb-4" alt="profile image">
                                    <h4>${data.username}</h4>
                                </div>
                                <p class="mt-2 card-text">- Bio goes here -</p> <button class="myButton mb-4 mt-2">Change password</button>
                                <div class="border-top pt-3">
                                    <div class="" id="user-posts-div">
                                        <div class="">
                                            <h6>EMAIL</h6>
                                            <p>${data.email}</p>
                                        </div>
                                        <div class="mb-3">
                                            <h6>POSTS</h6>
                                        </div>
                                    <!-- posts go here, if any for the user -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            `)
            let postDiv = $("#user-posts-div");
            if (data.posts) {
                postDiv.append(`
                    
                    ${data.posts.map(post =>
                    `
                <div class="card" data-id="${post.id}" >
                    <div class="card-header">
                        ${post.title}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${post.content}</p>
                        <button type="button" class="myButton edit" data-toggle="modal" data-target="#ModalCenter">Edit</button>
                        <button type="button" class="myButton delete">Delete</button>
                    </div>
                </div>
            `).join('')}
                    
                `)
            } else {
                postDiv.append(`
                
                    <div class="mt-2">
                        <p>NO POSTS FOUND</p>
                    </div>
                
                `)
            }
        })
    })
}



