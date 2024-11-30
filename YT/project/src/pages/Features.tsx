import React from 'react';
import { Wand2, Sparkles, Zap, Layout, Image, Share2 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Wand2 className="h-8 w-8 text-indigo-600" />,
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent thumbnail suggestions based on your video content and audience preferences.'
    },
    {
      icon: <Layout className="h-8 w-8 text-indigo-600" />,
      title: 'Professional Templates',
      description: 'Choose from hundreds of professionally designed templates to kickstart your thumbnail creation.'
    },
    {
      icon: <Image className="h-8 w-8 text-indigo-600" />,
      title: 'Advanced Image Editor',
      description: 'Powerful editing tools including layers, filters, text effects, and more.'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-indigo-600" />,
      title: 'Smart Objects',
      description: 'Easily add and manipulate text, shapes, and images with smart snapping and alignment.'
    },
    {
      icon: <Share2 className="h-8 w-8 text-indigo-600" />,
      title: 'One-Click Export',
      description: 'Export your thumbnails in multiple formats and sizes optimized for different platforms.'
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-600" />,
      title: 'Real-time Preview',
      description: 'See how your thumbnail will look on different devices and platforms in real-time.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Powerful Features</h2>
        <p className="mt-4 text-xl text-gray-600">Everything you need to create stunning thumbnails</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-indigo-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to create amazing thumbnails?</h3>
        <p className="text-gray-600 mb-6">Join thousands of content creators who trust ThumbnailPro</p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Start Creating Now
        </button>
      </div>
    </div>
  );
}