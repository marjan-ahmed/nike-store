import { redirect } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getSessionDetails } from "@/lib/stripe-utils"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string }
}) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    redirect("/")
  }

  // Verify the session
  const { success, session } = await getSessionDetails(sessionId)

  if (!success) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <p className="text-sm text-muted-foreground">Order reference: {sessionId}</p>
        <div className="pt-4">
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

