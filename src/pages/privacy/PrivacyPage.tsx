import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, upload photos, or contact us for support.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, and to develop new ones.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Retention</h2>
              <p>We store the information we collect for as long as necessary for the purpose for which it was collected.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information stored with us.</p>
            </section>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Contact Us:</strong> If you have any questions about this Privacy Policy, please contact us at privacy@pZugaad.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;