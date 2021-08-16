import fetchData from "../fetchData.js";
import createView from "../createView.js";

export default function PostIndex(props) {
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main class="">
            
            <form>

                <div class="form-group">
                    <label for="post-title">Title</label>
                    <input type="text" class="form-control" id="post-title" placeholder="'Very cool blog'...">
                </div>
                <div class="form-group">
                    <label for="post-content">Content</label>
                    <textarea class="form-control" id="post-content" rows="3"></textarea>
                </div>
                <button type="submit" class="myButton" id="submit">Submit</button>

            </form>
            <br>
            <div>
            <hr>
            <br>  
            <h2 class="align-self-center">POSTS</h2>
            ${props.posts.map(post =>
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
                                    <!--   <small id="textHelp" class="form-text text-muted"></small>-->
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
            
            </div>
        </main>
    `;
}


/*Sends the post form data to the backend postscontroller; then empties the form fields*/
export function postListener() {

    $("#submit").click(function () {
        // let pId = $("#postid").val().trim();
        let pTitle = $("#post-title").val().trim();
        let pContent = $("#post-content").val();
        let postObj = {
            title: pTitle,
            content: pContent
        };

        fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
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

    $(".edit").click(function () {
        console.log("Edit event fired..");
        let postId = $(this).parent().parent().attr("data-id");
        let postTitle = $(this).parent().siblings(".card-header").text().trim();
        let postContent = $(this).parent().children(".card-text").text().trim();
        let modalTitle = $("#p-title");
        let modalContent = $("#p-content");
        modalTitle.val(postTitle);
        modalContent.val(postContent);

        $("#edit-post").click(function () {
            let putObj = {
                id: postId,
                title: modalTitle.val(),
                content: modalContent.val()
            }
            putObj = JSON.stringify(putObj);

            $.ajax({
                url: `http://localhost:8080/api/posts/${postId}`,
                type: "PUT",
                contentType: "application/json",
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

    $(".delete").click(function () {
        let postId = $(this).parent().parent().attr("data-id");
        let idObj = {
            id: postId
        }
        idObj = JSON.stringify(idObj);

        $.ajax({
            url: `http://localhost:8080/api/posts/${postId}`,
            type: "DELETE",
            contentType: "application/json",
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


















