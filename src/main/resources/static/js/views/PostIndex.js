import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function PostIndex(props) {

    return `
        <header class="mb-5">
            <h1>Posts Page</h1>
        </header>
        <main class="">
            <h3 class="my-3">Create new post</h3>
            <form>
                <div class="form-group">
                    <label for="post-title">Title</label>
                    <input type="text" class="form-control" id="post-title" placeholder="'Very cool blog'...">
                </div>
                <div class="form-group">
                    <label for="post-content">Content</label>
                    <textarea class="form-control" id="post-content" rows="3"></textarea>
                </div>
                
                <!-- Tag selecter powered by bbbootstrap -->
                <div class="row d-flex justify-content-start my-3">
                    <div class="col-md-6"> 
                        <select id="choices-multiple-remove-button" placeholder="Select related tags (optional)" multiple>
                             ${props.categories.map(category => `<option value="${category.id}">${category.name}</option>`)} 
                           <!-- ${props.categories.forEach((category) => `<option data-attribute="${category.id}" value="${category.name}">${category.name}</option>`)}-->
                        </select> 
                    </div>
                </div>
                
                <button type="submit" class="myButton" id="submit">Submit</button>
            </form>
            <br>
            <div>
            <hr>
            <br>  
            <h2 class="align-self-center mb-3">POSTS</h2>
            ${getPostsHtml(props.posts)}
            
                <div class="modal fade" id="ModalCenter" data-backdrop="static" data-keyboard="false" tabindex="-1"
                 role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLongTitle">Edit post</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <form>
                                <div class="form-group">
                                    <label for="p-title">Post Title</label>
                                    <input type="text" class="form-control" id="p-title" placeholder="">

                                </div>
                                <div class="form-group">
                                    <label for="p-content">Post Content</label>
                                    <textarea class="form-control" id="p-content" rows="3" placeholder=""></textarea>
                                    <!--   <small id="textHelp" class="form-text text-muted"></small> -->
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="myButton" data-dismiss="modal">Cancel</button>
                            <button type="button" class="myButton" id="edit-post" data-dismiss="modal">Edit Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br><!--
            <hr>
            <br> 
            <h3 class="my-3">Find posts by tag name</h3>
            <form>
                <div class="form-group">
                    <label for="tag-search">Enter tag</label>
                    <input type="text" class="form-control" id="tag-search" placeholder="'Tagname'...">
                </div>
                <button type="submit" class="myButton" id="tag-button">Search</button>
            </form> -->
            
            
            </div>
        </main>
    `;
}

function getPostsHtml(posts) {
    return posts.map(post => `
                <div class="card mb-3" data-id="${post.id}" >
                    <div class="card-header d-flex justify-content-between">
                        <p class="post-title">${post.title}</p><p class="post-user" data-id="${post.user.id}">by: ${post.user.username}</p>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${post.content}</p>
                        <button type="button" class="myButton edit" data-toggle="modal" data-target="#ModalCenter">Edit</button>
                        <button type="button" class="myButton delete">Delete</button>
                    </div>
                    <div class="card-footer d-flex">
                        <div class="categories">${getCategoriesComponent(post.categories)}</div>
                    </div>
                </div>
                `).join('')

}
function getCategoriesComponent(categories) {
    return categories.map(category =>
        `
            <span class="mr-2"><span class="p-2">#${category.name}</span></span>
        `
    ).join("");
}


/*Sends the post form data to the backend postscontroller; then empties the form fields*/
export function postListener() {

    $(document).ready(function(){

        // For dynamic usage of the tag selector when creating a new post
        var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
            removeItemButton: true
        });


        // var url = window.location.pathname;
        // $('.nav-link [href="${url}"]').addClass('active');

    });

    // Post creation listener to build new post based on input fields
    $("#submit").click(function () {
        let pTitle = $("#post-title").val().trim();
        let pContent = $("#post-content").val();

        if (pTitle === "" || pContent === "") {
            alert("Title or content fields cannot be empty.");
            return;
        }

        let catArray = [];

        const $parent = $("#choices-multiple-remove-button");
        let catIds = $parent.children('option').map(function() {
            return { id: parseInt($(this).val())};
        })

        let postObj = {
            title: pTitle,
            content: pContent,
            user: {
                id: 4
            },
            categories: $.makeArray(catIds)
        };
        console.log(postObj);

        fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(postObj)
        }).then(data => {
            console.log(data);
            createView("/posts");
            pTitle = "";
            pContent = "";

        }).catch(err => {
            console.log(`There was an API error of the following: ${err}`);
            alert(`Sorry, there was an error adding the post ${pTitle}.  Please try again later.`)
        });

    })

    // Click listener to edit the selected post
    $(".edit").click(function () {
        console.log("Edit event fired..");
        let postId = $(this).parent().parent().attr("data-id");
        let postTitle = $(this).parent().siblings(".card-header").children(".post-title").text().trim();
        let postContent = $(this).parent().children(".card-text").text().trim();
        let userId = parseInt($(this).parent().siblings(".card-header").children(".post-user").attr("data-id"));
        let modalTitle = $("#p-title");
        let modalContent = $("#p-content");
        modalTitle.val(postTitle);
        modalContent.val(postContent);

        $("#edit-post").click(function () {
            let putObj = {
                id: postId,
                title: modalTitle.val(),
                content: modalContent.val(),
                user: {
                    id: userId
                }
            }
            putObj = JSON.stringify(putObj);

            $.ajax({
                url: `http://localhost:8080/api/posts/${postId}`,
                type: "PUT",
                contentType: getHeaders(),
                data: putObj,
                success: function (result) {
                    console.log(result);
                    createView("/posts");
                },
                error: function (result) {
                    console.log("Caught error for ajax call");
                    console.log(result);
                    alert("There was an issue changing the post.  Please try again later.")
                }
            })
        })
    })

    //  Listener on post delete buttons to remove the selected post
    $(".delete").click(function () {
        let postId = $(this).parent().parent().attr("data-id");
        let idObj = {
            id: postId
        }
        idObj = JSON.stringify(idObj);

        $.ajax({
            url: `http://localhost:8080/api/posts/${postId}`,
            type: "DELETE",
            contentType: getHeaders(),
            data: idObj,
            success: function (result) {
                console.log(result);
                createView("/posts");
            },
            error: function (result) {
                console.log("Caught error for ajax delete call");
                console.log(result);
                createView("/error");
            }
        })
    })

}


















