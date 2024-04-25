const apiUrl = 'http://localhost:3000';

async function submit() {
    const imageLink = document.getElementById('imageLink').value;
    const description = document.getElementById('description').value;

    try {
        const response = await axios.post(`${apiUrl}/posts`, {
            imageLink,
            description
        });

        if (response.status === 201) {
            const post = response.data;
            displayPost(post);
            document.getElementById('imageLink').value = '';
            document.getElementById('description').value = '';
        } else {
            console.error('Failed to submit post');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayPost(post) {
    const postsContainer = document.getElementById('posts-container');

    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const imgElement = document.createElement('img');
    imgElement.src = post.imageLink;
    postElement.appendChild(imgElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = post.description;
    postElement.appendChild(descriptionElement);

    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');


    // Form to add new comment
    const commentForm = document.createElement('form');

    const commentInput = document.createElement('input');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('name', 'commentText');
    commentInput.setAttribute('placeholder', 'Add a comment...');
    commentForm.appendChild(commentInput);

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // const formData = new FormData(commentForm);
        // const text = formData.get('commentText')
        const text = commentInput.value.trim();
        if (text !== '') {
            try {
                const response = await axios.post(`${apiUrl}/comments`, {
                    postId: post.id,
                    text
                });

                if (response.status === 201) {
                    const newComment = response.data;
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.textContent = newComment.text;
                    commentsContainer.appendChild(commentElement);
                    // Clear comment input after successful submission
                    commentForm.reset();
                } else {
                    console.error('Failed to add comment');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    commentForm.appendChild(submitButton);

    commentsContainer.appendChild(commentForm);


    // Display existing comments
    if (post.Comments && Array.isArray(post.Comments) && post.Comments.length > 0) {
        post.Comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = comment.text;
            commentsContainer.appendChild(commentElement);
        });
    }

    postElement.appendChild(commentsContainer);
    postsContainer.appendChild(postElement);
}


document.addEventListener('DOMContentLoaded',async()=> {
    try {
        const response = await axios.get(`${apiUrl}/posts`);
        const posts = response.data;

        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            displayPost(post);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
});