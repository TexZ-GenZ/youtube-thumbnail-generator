import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl">ThumbnailPro</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/features" className="text-gray-700 hover:text-indigo-600">Features</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600">Pricing</Link>
            <Link to="/editor" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}