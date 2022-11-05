
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


const addPostBtn = document.querySelector('#submit-post');
addPostBtn.addEventListener('click', addPostHandler);