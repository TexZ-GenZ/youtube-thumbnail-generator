import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '5 thumbnails per month',
        'Basic editing tools',
        'Standard templates',
        '720p export quality'
      ]
    },
    {
      name: 'Pro',
      price: '$9.99',
      features: [
        'Unlimited thumbnails',
        'Advanced editing tools',
        'Premium templates',
        '4K export quality',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Pro',
        'Custom templates',
        'Team collaboration',
        'API access',
        'Dedicated support'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
        <p className="mt-4 text-xl text-gray-600">Choose the plan that's right for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="mt-4 text-4xl font-bold">{plan.price}</p>
            <p className="text-gray-600 mb-8">{plan.name === 'Free' ? 'Forever free' : 'per month'}</p>
            
            <ul className="space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}