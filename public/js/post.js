console.log("Hello");
const addCommentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector("#comment").value;
    console.log(document.querySelector("#comment"));
    const post_id=document.querySelector("#comment").dataset.id;
    console.log(comment,post_id);

    if(comment){
        const response = await fetch('/api/comments',{
            method:'POST',
            body: JSON.stringify({text,post_id
            }),
            headers: {'Content-Type': 'application/json'},
        });
        console.log(response);
        if(response.ok){
            alert('success');
            document.location.replace(`/post/${post_id}`);
        }
        else{
            alert('Failed to post');
        }
    }
};

const addCommentBtn = document.querySelector('#comment-submit');
addCommentBtn.addEventListener('click',addCommentHandler);
