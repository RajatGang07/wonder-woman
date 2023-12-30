import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { DOMAIN_URL } from "../services"

export default async function ServerPage() {
    const session = await getServerSession(options)

    console.log('getServerSession', session)
    if (!session) {
        redirect(`${DOMAIN_URL.prod}/api/auth/signin?callbackUrl=/server`)
    }

    return (
        <section className="flex flex-col gap-6">
        </section>
    )

}