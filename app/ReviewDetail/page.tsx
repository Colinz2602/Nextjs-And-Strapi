import { table } from 'console';
import React from 'react'
import Link from 'next/link'

interface User {
    id: number;
    name: string;
    email: string;
}

const UserPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' })
    const users: User[] = await res.json()
    return (
        <>
            <h1>User Page</h1>
            <p>{new Date().toLocaleTimeString()}</p>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (<tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>))}
                </tbody>
            </table >

            <Link href="/ReviewDetail/new">NewPage</Link>
        </>
    )
}

export default UserPage
