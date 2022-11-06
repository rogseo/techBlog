
consol.log("script.js");


const addPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#add-title').value;
    const description = document.querySelector('#add-description').value;
    var post_date=Date.now().toLocaleString();
    console.log(title,description,post_date);

    if (title && description) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, description, post_date }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Successfully post');
            document.location.replace('/api/posts');

        } else {
            alert('Failed to post.');
        }
    }
};

const addCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#comment").value;
    const post_id=comment.target.dataset.id;

    if(comment){
        const response = await fetch('api/comments',{
            method:'POST',
            body: JSON.stringify({comment,post_id
            }),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.ok){
            alert('success');
            document.location.replace('/api/posts');
        }
        else{
            alert('Failed to post');
        }
    }
};


const addPostBtn = document.querySelector('#submit-post');
addPostBtn.addEventListener('click', addPostHandler);
const addCommentBtn = document.querySelector('#comment-submit');
addCommentBtn.addEventListener('click',addCommentHandler);