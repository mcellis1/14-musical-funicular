const commentForm = document.querySelector('#comment-form')
const pathSegments = window.location.pathname.split('/');

const postFormHandler = async (event) => {
    event.preventDefault();
    const body = document.querySelector('#body-input').value.trim();

    if (body) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_body: body,
                blog_id: `${pathSegments[2]}`
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blog/${pathSegments[2]}`);
        } else {
            alert('failed to post blog');
        }
    }
};

commentForm.addEventListener('submit', postFormHandler);
