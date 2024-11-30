import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Brain, Play, History, Settings, Loader2 } from 'lucide-react';
import { generateVisualization } from '../services/visualization';
import { toast } from 'react-hot-toast';

export const DashboardPage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ code: string; video: string } | null>(null);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error('Please enter a mathematical concept');
      return;
    }

    setLoading(true);
    try {
      const result = await generateVisualization(prompt);
      setResult(result);
      toast.success('Visualization generated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate visualization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Create Visualization</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your mathematical concept
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="E.g., Show a 3D visualization of a double integral over a sphere..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {loading ? 'Generating...' : 'Generate Visualization'}
              </button>
            </form>

            {result && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Generated Visualization</h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full h-full"
                    src={`data:video/mp4;base64,${result.video}`}
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-md font-medium mb-2">Generated Code</h4>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code>{result.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Visualizations</h2>
            <div className="space-y-4">
              {/* Placeholder for recent visualizations */}
              <p className="text-gray-500">No visualizations yet. Create your first one!</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <Brain className="h-8 w-8 text-indigo-600" />
              <div className="ml-3">
                <h2 className="text-xl font-bold">Welcome, {user?.name}!</h2>
                <p className="text-sm text-gray-500">{user?.plan} Plan</p>
              </div>
            </div>

            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-50"
              >
                <History className="h-5 w-5 mr-3" />
                History
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-50"
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </a>
            </nav>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Usage Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Visualizations</span>
                  <span>0/50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};