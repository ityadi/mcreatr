import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
        Shipping Information
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping Policies</h2>
        <p className="mb-4">
          At mCreatr, we strive to deliver your custom creations as quickly and efficiently as possible. We offer
          various shipping options to meet your needs.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>All orders are processed within 1-3 business days.</li>
          <li>Shipping times are in addition to the processing time.</li>
          <li>We ship to most countries worldwide.</li>
          <li>Customs fees may apply for international orders.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Estimated Delivery Times</h2>
        <Table>
          <TableCaption>Estimated delivery times by region and shipping method</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Standard Shipping</TableHead>
              <TableHead>Expedited Shipping</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>United States</TableCell>
              <TableCell>5-7 business days</TableCell>
              <TableCell>2-3 business days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Canada</TableCell>
              <TableCell>7-10 business days</TableCell>
              <TableCell>3-5 business days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Europe</TableCell>
              <TableCell>10-14 business days</TableCell>
              <TableCell>5-7 business days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rest of World</TableCell>
              <TableCell>14-21 business days</TableCell>
              <TableCell>7-10 business days</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
        <p className="mb-4">
          Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use this
          number to track your package on our website or the carrier's website.
        </p>
        <p>
          Please note that it may take up to 24 hours for tracking information to become available after you receive
          your shipping confirmation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
        <p className="mb-4">While we strive to ship to as many locations as possible, there are some restrictions:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We cannot ship to P.O. boxes for certain product types.</li>
          <li>Some countries have import restrictions on certain materials or products.</li>
          <li>Additional customs fees or taxes may apply for international shipments.</li>
        </ul>
        <p className="mt-4">
          If you have any questions about shipping to your location, please contact our customer support team.
        </p>
      </section>
    </div>
  )
}

