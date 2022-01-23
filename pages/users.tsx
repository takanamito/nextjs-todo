import type { NextPage } from "next";
import Head from "next/head";
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from "../lib/generated/client";
import { useEffect, useState } from "react";

const client = new GraphQLClient("http://localhost:8080/query", { mode: 'cors' })
const sdk = getSdk(client)

const Users: NextPage = () => {
  const [users, setUsers] = useState<Array<User>>([])

  useEffect(() => {
    sdk.getUsers()
      .then((res) => {
        setUsers(res.users)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Head>
        <title>User List</title>
      </Head>

      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li>
            id: {user.id}, name: {user.name}, age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users