import React, { useState } from 'react';
import { Activity, Server, Users, Database, AlertTriangle, Play, Pause, RefreshCw, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const performanceData = [
  { time: '00:00', connections: 45, cpu: 65, memory: 70 },
  { time: '01:00', connections: 52, cpu: 72, memory: 75 },
  { time: '02:00', connections: 48, cpu: 68, memory: 72 },
  { time: '03:00', connections: 70, cpu: 85, memory: 88 },
  { time: '04:00', connections: 55, cpu: 75, memory: 80 },
  { time: '05:00', connections: 60, cpu: 78, memory: 82 },
];

function App() {
  const [isServerRunning, setIsServerRunning] = useState(true);
  const [threadPoolSize, setThreadPoolSize] = useState(10);

  const toggleServer = () => {
    setIsServerRunning(!isServerRunning);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Server className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Java Server Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleServer}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${
                isServerRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isServerRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Server
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Server
                </>
              )}
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatusCard
            title="Active Connections"
            value="127"
            icon={<Users className="h-6 w-6 text-blue-600" />}
            trend="+12%"
          />
          <StatusCard
            title="Thread Pool Usage"
            value={`${threadPoolSize}/20`}
            icon={<Activity className="h-6 w-6 text-green-600" />}
            trend="-5%"
          />
          <StatusCard
            title="Memory Usage"
            value="78%"
            icon={<Database className="h-6 w-6 text-purple-600" />}
            trend="+8%"
          />
          <StatusCard
            title="Error Rate"
            value="0.02%"
            icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}
            trend="-2%"
          />
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="connections" stroke="#3B82F6" name="Connections" />
                <Line type="monotone" dataKey="cpu" stroke="#10B981" name="CPU Usage %" />
                <Line type="monotone" dataKey="memory" stroke="#8B5CF6" name="Memory Usage %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Server Configuration */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Server Configuration</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thread Pool Size</label>
              <input
                type="number"
                value={threadPoolSize}
                onChange={(e) => setThreadPoolSize(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cache Policy</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option>LRU Cache</option>
                <option>MRU Cache</option>
                <option>FIFO Cache</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusCard({ title, value, icon, trend }) {
  const isPositiveTrend = trend.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <h3 className="ml-3 text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <span className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
          isPositiveTrend ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {trend}
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default App;