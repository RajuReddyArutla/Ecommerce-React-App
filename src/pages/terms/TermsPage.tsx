import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using E-commerce, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
              <p>Permission is granted to temporarily use E-commerce for personal and commercial photography management purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Account Responsibilities</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Service Modifications</h2>
              <p>E-commerce reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Governing Law</h2>
              <p>These terms shall be governed and construed in accordance with the laws of your country of residence.</p>
            </section>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> These terms are subject to change. Please review them periodically for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;