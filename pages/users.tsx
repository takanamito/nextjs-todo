import type { NextPage } from "next";
import Head from "next/head";
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from "../lib/generated/client";
import { useEffect, useState } from "react";

const client = new GraphQLClient("http://localhost:8080/query", { mode: 'cors' })
const sdk = getSdk(client)

const Users: NextPage = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    sdk.getUser({ id: '1' })
      .then((res) => {
        console.log(res)
        setUser(res.user)
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
      <p>{user?.id}</p>
      <p>{user?.name}</p>
      <p>{user?.age}</p>
      <p>{user?.gender}</p>
    </div>
  )
}

export default Users