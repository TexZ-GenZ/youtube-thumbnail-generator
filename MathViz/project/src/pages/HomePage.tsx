import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Code, Zap } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Math into Visual Magic
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Create stunning 3D mathematical visualizations using AI and natural language
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                Get Started Free
              </Link>
              <Link
                to="/features"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <img
              src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80"
              alt="Mathematical Visualization"
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MathViz?
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to bring your mathematical concepts to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <Brain className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced AI understands your mathematical descriptions and creates precise visualizations
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <Sparkles className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">3D Rendering</h3>
              <p className="text-gray-600">
                Beautiful 3D visualizations using Manim for stunning mathematical animations
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl">
              <Code className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">API Access</h3>
              <p className="text-gray-600">
                Integrate MathViz directly into your applications with our robust API
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Educators and Students
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about MathViz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Mathematics Professor",
                content: "MathViz has revolutionized how I teach complex mathematical concepts to my students."
              },
              {
                name: "Mark Thompson",
                role: "High School Teacher",
                content: "The ability to quickly create visual representations of mathematical problems is invaluable."
              },
              {
                name: "Lisa Rodriguez",
                role: "Student",
                content: "Finally, I can see the mathematics I'm learning come to life! This tool is amazing."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Math?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of educators and students using MathViz today
          </p>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};