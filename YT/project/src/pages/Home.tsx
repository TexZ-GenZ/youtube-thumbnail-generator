import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Sparkles, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create Perfect Video Thumbnails
          <span className="text-indigo-600"> in Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Professional thumbnail editor with AI-powered suggestions. Stand out on YouTube with stunning thumbnails.
        </p>
        <Link
          to="/editor"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Start Creating <Wand2 className="ml-2 h-5 w-5" />
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <Sparkles className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
          <p className="text-gray-600">Get intelligent thumbnail suggestions based on your video content.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <Wand2 className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Editing</h3>
          <p className="text-gray-600">Powerful yet simple editing tools to perfect your thumbnails.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <Zap className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Instant Export</h3>
          <p className="text-gray-600">Download your thumbnails in perfect quality for any platform.</p>
        </div>
      </div>

      <div className="mt-20">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          alt="Editor Preview"
          className="rounded-xl shadow-lg w-full"
        />
      </div>
    </div>
  );
}