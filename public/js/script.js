console.log("script.js");
const addPostHandler = async (event) => {
    event.preventDefault();
    console.log(event.target.dataset.id);

    const title = document.querySelector('#add-title').value;
    const description = document.querySelector('#add-description').value;
    var id=event.target.dataset.id;
    var route=`/api/posts/${id}`;
    console.log(route);

    if (title && description) {
        const response = await fetch(route, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        if (response.ok) {
            alert('Successfully post');
            document.location.replace('/api/posts');

        } else {
            alert('Failed to update.');
        }
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log(event.target.dataset.id);

    var id=event.target.dataset.id;
    var route=`/api/posts/${id}`;

    const response = await fetch(route, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
        console.log(response);

        if (response.ok) {
            alert('Successfully delete');
            document.location.replace('/api/posts');

        } else {
            alert('Failed to delete.');
        }
    };


const editPostBtn = document.querySelector('#edit-post');
editPostBtn.addEventListener('click', addPostHandler);
const deleteBtn = document.querySelector('#delete-post');
deleteBtn.addEventListener('click', deletePostHandler);



