const loginForm = document.querySelector('#login-form')

const loginFormHandler = async (event) => {
    event.preventDefault()

    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to log in.')
        }
    }
}

loginForm.addEventListener('submit', loginFormHandler)
