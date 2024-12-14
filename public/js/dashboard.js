const deletePostHandler = async (event) => {
    let result = confirm('are you sure you want to delete this blog?');

    if (result) {
        event.preventDefault();
        const clicked = event.target
        const id = clicked.dataset.id

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.location.assign('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        return
    }
};

const deleteButton = document.querySelectorAll('#deleteBtn');

for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deletePostHandler);
}
