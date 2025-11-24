import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About E-commerce</h1>
          <p className="text-lg text-gray-600 mb-6">
            Enterprise-grade E-commerce management and workflow automation system designed 
            for professional E-commerce.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-700">To streamline E-commerce workflows and enhance E-commerce management efficiency through cutting-edge technology.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-700">To be the leading platform for E-commerce worldwide, empowering creativity through technology.</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Workflow Automation</h4>
                  <p className="text-gray-600 text-sm">Automate repetitive tasks and focus on creativity</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Client Management</h4>
                  <p className="text-gray-600 text-sm">Manage client relationships and communication</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Secure Data Storage</h4>
                  <p className="text-gray-600 text-sm">Enterprise-grade security for your valuable work</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Real-time Analytics</h4>
                  <p className="text-gray-600 text-sm">Make data-driven decisions for your business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;