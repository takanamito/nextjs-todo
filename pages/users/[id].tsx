import type { NextPage } from "next"
import Head from "next/head"
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from "../../lib/generated/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const client = new GraphQLClient("http://localhost:8080/query", { mode: 'cors' })
const sdk = getSdk(client)

const User: NextPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!router.isReady) { return } 

    sdk.getUser({ id: id?.toString() })
      .then((res) => {
        setUser(res.user)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id, router])

  return (
    <div>
      <Head>
        <title>User: {user?.name}</title>
      </Head>

      <h1>User: {user?.name}</h1>
      <p>id: {user?.id}</p>
      <p>age: {user?.age}</p>
      <p>gender: {user?.gender}</p>
    </div>
  )
}

export default User