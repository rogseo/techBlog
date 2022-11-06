
const addPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#add-title').value;
    const description = document.querySelector('#add-description').value;

    if (title && description) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
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
