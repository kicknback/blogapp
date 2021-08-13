export default function PostIndex(props) {
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            
            <form>

                <div class="form-group">
                    <label for="postid">Post ID</label>
                    <input type="text" class="form-control" id="postid" placeholder="(Enter number)">
                </div>
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
            
            <div>
                ${props.posts.map(post => `<h3>${post.title}</h3>`).join('')}   
            </div>
        </main>
    `;
}

// Sends the post form data to the backend postscontroller; then empties the form fields
$("#submit").click(function() {
    let pId = $("#postid").val().trim();
    let pTitle = $("#post-title").val().trim();
    let pContent = $("#post-content").val();
    let postObj = {
        id: pId,
        title: pTitle,
        content: pContent
    };

    fetch("http://localhost:8080/api/posts",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postObj)
    }).then(res => res.json()).then(data => {
        console.log(data);
        pId.val("");
        pTitle.val("");
        pContent.val("");

    }).catch(err => {
        console.log(`There was an API error of the following: ${err}`);
        alert(`Sorry, there was an error adding the post ${pTitle}.  Please try again later.`)
    });


})