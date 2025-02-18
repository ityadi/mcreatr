export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fadeIn">
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg">
        Privacy Policy
      </h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>Last updated: [Current Date]</p>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">1. Introduction</h2>
          <p>
            Welcome to mCreatr's Privacy Policy. This policy describes how mCreatr ("we", "our", or "us") collects,
            uses, and protects your personal information when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">2. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>Personal information (e.g., name, email address, shipping address)</li>
            <li>Payment information</li>
            <li>Order history</li>
            <li>Design and customization data</li>
            <li>Usage data and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Send promotional emails (with your consent)</li>
            <li>Prevent fraud and ensure security</li>
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">4. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li>Service providers (e.g., payment processors, shipping companies)</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no method of transmission
            over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your information</li>
            <li>Object to certain processing activities</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">
            7. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar technologies to improve user experience and analyze website traffic. You can
            manage your cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of any significant changes by posting a
            notice on our website.
          </p>
        </section>

        <section>
          <h2 className="font-extrabold tracking-tight text-white drop-shadow-lg">9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@mcreatr.com.</p>
        </section>
      </div>
    </div>
  )
}

