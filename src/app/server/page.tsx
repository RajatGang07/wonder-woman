import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function ServerPage() {
    const session = await getServerSession(options)

    console.log('getServerSession', session)
    if (!session) {
        redirect('http://localhost:3000/api/auth/signin?callbackUrl=/server')
    }

    return (
        <section className="flex flex-col gap-6">
        </section>
    )

}