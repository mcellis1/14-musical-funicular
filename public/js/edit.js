const editForm = document.querySelector('#edit-form')
const pathSegments = window.location.pathname.split('/');

const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-input').value.trim();
    const body = document.querySelector('#body-input').value.trim();

    if (title && body) {
        const response = await fetch(`/api/blogs/${pathSegments[2]}`, {
            method: 'PUT',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blog/${pathSegments[2]}`);
        } else {
            alert('failed to update blog');
        }

        if (response.ok) {
            document.location.replace(`/blog/${pathSegments[2]}`);
        } else {
            alert('failed to update blog');
        }
    }
};

editForm.addEventListener('submit', editFormHandler);
