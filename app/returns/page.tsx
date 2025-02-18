import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
        Returns & Refunds
      </h1>

      <section className="mb-8">
        <h2 className="">Our Return Policy</h2>
        <p className="mb-4">
          At mCreatr, we want you to be completely satisfied with your purchase. If you're not happy with your order, we
          offer a straightforward return and refund policy:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You have 30 days from the date of delivery to return your item(s).</li>
          <li>Items must be unused and in their original packaging.</li>
          <li>Custom-designed items are non-returnable unless there's a manufacturing defect.</li>
          <li>Refunds will be issued to the original payment method.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="">How to Process a Return</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Log into your mCreatr account.</li>
          <li>Go to your order history and select the item you wish to return.</li>
          <li>Click on the "Return Item" button and follow the prompts.</li>
          <li>Print the provided return label (for domestic returns).</li>
          <li>Pack the item securely in its original packaging.</li>
          <li>Attach the return label to your package.</li>
          <li>Drop off the package at your nearest carrier location.</li>
        </ol>
        <p className="mt-4">
          Once we receive and inspect your return, we'll process your refund. Please allow 5-10 business days for the
          refund to appear on your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="">Exceptions and Special Cases</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Customized products cannot be returned unless there's a manufacturing defect.</li>
          <li>Sale items or items purchased with a discount code may be subject to different return policies.</li>
          <li>If you received a defective or incorrect item, please contact our customer support team immediately.</li>
        </ul>
      </section>

      <section>
        <h2 className="">Need Help?</h2>
        <p className="mb-4">
          If you have any questions about our return policy or need assistance with a return, our customer support team
          is here to help.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </section>
    </div>
  )
}

