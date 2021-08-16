export default function Navbar(props) {
    return `
        <nav class="container-fluid navbar navbar-expand-lg fixed-top navbar-light bg-light">
            <a class="navbar-brand" href="#">Blog App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" href="/" data-link>Home</a>
                    <a class="nav-link" href="/posts" data-link>Posts</a>
                    <a class="nav-link" href="/about" data-link>About</a>
                    <a class="nav-link" href="/login" data-link>Login</a>
                </div>
            </div>
        </nav>
    `;
}