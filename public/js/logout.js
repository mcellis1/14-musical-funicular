const logoutBtn = document.querySelector('#logout')

const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert('failed to logout')
    }
}

logoutBtn.addEventListener('click', logout)
