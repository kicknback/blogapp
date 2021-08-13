import init from './init.js';

init();

// // Sends the post form data to the backend postscontroller; then empties the form fields
// $("#submit").click(function() {
//     let pId = $("#postid").val().trim();
//     let pTitle = $("#post-title").val().trim();
//     let pContent = $("#post-content").val();
//     let postObj = {
//         id: pId,
//         title: pTitle,
//         content: pContent
//     };
//
//     fetch("http://localhost:8080/api/posts",{
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postObj)
//     }).then(res => res.json()).then(data => {
//         console.log(data);
//         pId.val("");
//         pTitle.val("");
//         pContent.val("");
//
//     }).catch(err => {
//         console.log(`There was an API error of the following: ${err}`);
//         alert(`Sorry, there was an error adding the post ${pTitle}.  Please try again later.`)
//     });
//
//
// })