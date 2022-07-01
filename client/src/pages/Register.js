import { useState } from 'react';

function Register() {
    const [username, SetUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(event) {
        event.preventDefault();

        const res = await fetch('/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username, email, password
            }),
        })

        await res.json();
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input
                    value={username}
                    onChange={(e) => SetUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                />
                <br />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />

                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Register;
