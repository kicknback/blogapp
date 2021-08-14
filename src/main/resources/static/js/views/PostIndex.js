import fetchData from "../fetchData.js";
import createView from "../createView.js";

export default function PostIndex(props) {
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            
            <form>

                <div class="form-group">
                    <label for="post-title">Title</label>
                    <input type="text" class="form-control" id="post-title" placeholder="'Very cool blog'...">
                </div>
                <div class="form-group">
                    <label for="post-content">Content</label>
                    <textarea class="form-control" id="post-content" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" id="submit">Submit</button>

            </form>
            <br>
            <div>
            ${props.posts.map(post =>
            `
            <div class="card" data-id="${post.id}" >
                <div class="card-header">
                    ${post.title}
                </div>
                <div class="card-body">
                    <p class="card-text">${post.content}</p>
                    <a href="#" class="btn btn-primary edit">Edit</a>
                    <a href="#" class="btn btn-primary delete">Delete</a>
                </div>
            </div>
            `).join('')}
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
    $(".edit").click(function (){
        console.log("Edit event fired..");


    })

}


















