const addPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const description = document.querySelector('#post-description').value;
    var post_date=Date.now().toLocaleString();

    if (title && description) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, description,post_date }),
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



const addPostBtn = document.querySelector('#add-post');
addPostBtn.addEventListener('click', addPostHandler);
