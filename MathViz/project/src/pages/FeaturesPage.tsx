import React from 'react';
import { Brain, Sparkles, Code, Zap, Lock, Globe } from 'lucide-react';

export const FeaturesPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Understanding',
      description: 'Our advanced AI understands natural language descriptions of mathematical concepts and transforms them into precise visualizations.'
    },
    {
      icon: Sparkles,
      title: '3D Manim Rendering',
      description: 'Create beautiful, high-quality 3D mathematical animations using the power of Manim.'
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'Seamlessly integrate MathViz into your applications with our comprehensive API.'
    },
    {
      icon: Zap,
      title: 'Real-time Preview',
      description: 'See your visualizations come to life in real-time as you describe them.'
    },
    {
      icon: Lock,
      title: 'Secure Export',
      description: 'Export your visualizations in multiple formats with enterprise-grade security.'
    },
    {
      icon: Globe,
      title: 'Cloud Storage',
      description: 'Access your visualizations from anywhere with our cloud storage solution.'
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features for Mathematical Visualization
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to bring mathematical concepts to life
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-white p-6 rounded-lg">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-2">
                  <div className="px-6 py-8 sm:p-10">
                    <h3 className="text-lg font-medium text-gray-900">
                      Ready to get started?
                    </h3>
                    <div className="mt-4 text-sm text-gray-500">
                      Create your first visualization in minutes. No credit card required.
                    </div>
                  </div>
                  <div className="px-6 py-8 bg-gray-50 sm:p-10 sm:rounded-tr-lg sm:rounded-br-lg">
                    <div className="mt-4 sm:mt-0">
                      <a
                        href="/signup"
                        className="block w-full rounded-md border border-transparent bg-indigo-600 px-6 py-4 text-center text-sm font-medium text-white shadow hover:bg-indigo-700"
                      >
                        Start Free Trial
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};