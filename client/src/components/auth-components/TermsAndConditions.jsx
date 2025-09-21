const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Please read these terms and conditions carefully before using our
          website.
        </p>

        {/* Sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Introduction
            </h2>
            <p>
              By accessing or using our website, you agree to be bound by these
              Terms & Conditions. If you do not agree, you must not use this
              website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. Use of Website
            </h2>
            <p>
              You may use our website for personal and non-commercial purposes
              only. Any misuse of the website, including unauthorized access,
              data extraction, or infringement of intellectual property rights,
              is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. User Accounts
            </h2>
            <p>
              When you create an account, you must provide accurate and complete
              information. You are responsible for safeguarding your account
              credentials and all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Orders & Payments
            </h2>
            <p>
              All purchases made through the website are subject to product
              availability and payment confirmation. We reserve the right to
              refuse or cancel orders at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We are not liable for any damages resulting from the use or
              inability to use our website. This includes but is not limited to
              damages for loss of profits, data, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions from time to time. Any
              changes will be posted on this page, and continued use of the site
              indicates your acceptance of the revised terms.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
