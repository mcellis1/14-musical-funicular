const postForm = document.querySelector('#post-form')

const postFormHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#title-input').value.trim()
    const body = document.querySelector('#body-input').value.trim()

    if (title && body) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('failed to post blog')
        }
    }
}

postForm.addEventListener('submit', postFormHandler)
