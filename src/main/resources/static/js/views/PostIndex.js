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