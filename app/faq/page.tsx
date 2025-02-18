"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const faqs = [
  {
    category: "Orders",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "To place an order, simply browse our products, select the item you want, customize it if desired, and add it to your cart. Once you're ready, proceed to checkout and follow the steps to complete your purchase.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 1 hour of placing it. After that, we start processing orders and cannot guarantee changes. Please contact our customer support team as soon as possible if you need to make changes.",
      },
    ],
  },
  {
    category: "Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Shipping times vary depending on your location and the shipping method chosen. Standard shipping within the US typically takes 5-7 business days. International shipping can take 10-14 business days. Expedited shipping options are available at checkout.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the shipping options and costs during the checkout process.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Custom-designed items are non-returnable unless there's a manufacturing defect.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "To initiate a return, log into your account, go to your order history, and select the 'Return' option for the relevant item. Follow the prompts to generate a return label and instructions.",
      },
    ],
  },
  {
    category: "Customi zation",
    questions: [
      {
        question: "What file formats accept for custom designs?",
        answer:
          "We accept PNG, JPG, and SVG files for custom designs. For best results, we recommend using high-resolution images (at least 300 DPI) with transparent backgrounds where applicable.",
      },
      {
        question: "Can I preview my custom design before ordering?",
        answer:
          "Yes, our customization tool provides a real-time preview of your design on the selected product. This allows you to see how your design will look before finalizing your order.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All transactions are securely processed and encrypted.",
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer:
          "Yes, we use industry-standard SSL encryption to protect your personal and payment information. We are PCI DSS compliant and never store your full credit card details on our servers.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
        Frequently Asked Questions
      </h1>

      <div className="mb-8">
        <Label htmlFor="search" className="mb-2 block">
          Search FAQs
        </Label>
        <Input
          id="search"
          type="search"
          placeholder="Type your question here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {filteredFaqs.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className=" font-extrabold tracking-tight text-white drop-shadow-lg">{category.category}</h2>
          <Accordion type="single" collapsible className="w-full">
            {category.questions.map((faq, faqIndex) => (
              <AccordionItem key={faqIndex} value={`${category.category}-${faqIndex}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

      {filteredFaqs.length === 0 && (
        <p className="text-muted-foreground">No matching questions found. Please try a different search term.</p>
      )}
    </div>
  )
}

