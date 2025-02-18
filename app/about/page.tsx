import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
        About mCreatr
      </h1>

      <div className="grid gap-8 md:grid-cols-2 items-center mb-12">
        <div>
          <p className="text-lg mb-4">
            mCreatr is more than just a print-on-demand platform - we're a community of creators, designers, and
            dreamers who believe in the power of self-expression through custom merchandise.
          </p>
          <p className="text-lg mb-4">
            Founded in 2024, mCreatr was born from a simple idea: everyone deserves the opportunity to bring their
            creative visions to life. Whether you're an artist looking to monetize your designs, a business wanting to
            create branded merchandise, or someone who just wants to wear something uniquely you - we're here to make it
            happen.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <Image
            src="/images/about-hero.jpg"
            alt="mCreatr team working on designs"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="">Our Mission</h2>
        <p className="text-lg mb-4">
          We're on a mission to democratize custom merchandise by providing high-quality products, cutting-edge design
          tools, and a platform for creators to showcase their work to the world.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Creativity</h3>
            <p>We believe in the power of imagination and self-expression.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p>We're committed to delivering premium products that exceed expectations.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p>We strive to minimize our environmental impact through responsible practices.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="">Our Technology</h2>
        <p className="text-lg mb-4">
          At mCreatr, we leverage cutting-edge technology to make the design and ordering process as seamless as
          possible. Our intuitive design tool allows you to bring your ideas to life with ease, while our advanced
          printing techniques ensure your designs look stunning on every product.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="">Join Our Community</h2>
        <p className="text-lg mb-4">
          Whether you're here to create, shop, or both, you're part of what makes mCreatr special. We're constantly
          inspired by the creativity and passion of our community.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/featured/submit">Start Creating</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

