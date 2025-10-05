"use client";
import { useState, useEffect } from 'react';
import { 
  Settings, 
  Zap, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  BarChart3, 
  Eye,
  TestTube,
  Switch,
  Activity,
  DollarSign,
  Clock,
  TrendingUp
} from 'lucide-react';
import { apiRequest } from '@/lib/apiClient';

interface AIProvider {
  name: string;
  description: string;
  status: 'available' | 'error' | 'not_configured';
  models: string[];
  current_model: string;
  free_tier: boolean;
  rate_limits: {
    requests_per_minute: number;
    requests_per_day?: number;
    tokens_per_minute?: number;
  };
  error?: string;
}

interface ProvidersStatus {
  providers: {
    openai: AIProvider;
    gemini: AIProvider;
  };
  current_primary: string;
  current_fallback: string;
  timestamp: number;
}

interface UsageStats {
  providers: {
    [key: string]: {
      requests: number;
      tokens_used: number;
      estimated_cost: number;
      average_response_time: number;
      success_rate: number;
    };
  };
  total: {
    requests: number;
    tokens_used: number;
    estimated_cost: number;
    average_response_time: number;
  };
}

const AIProvidersManagement = () => {
  const [providersStatus, setProvidersStatus] = useState<ProvidersStatus | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [switchingProvider, setSwitchingProvider] = useState(false);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{[key: string]: any}>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProvidersData();
  }, []);

  const loadProvidersData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statusResponse, usageResponse] = await Promise.all([
        apiRequest<{ success: boolean; data: ProvidersStatus }>('/api/admin/ai-providers/status'),
        apiRequest<{ success: boolean; data: UsageStats }>('/api/admin/ai-providers/usage-stats')
      ]);

      if (statusResponse.success) {
        setProvidersStatus(statusResponse.data);
      }

      if (usageResponse.success) {
        setUsageStats(usageResponse.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load AI providers data');
    } finally {
      setLoading(false);
    }
  };

  const switchPrimaryProvider = async (provider: string, model?: string) => {
    try {
      setSwitchingProvider(true);
      setError(null);

      const response = await apiRequest<{ success: boolean; data: any }>('/api/admin/ai-providers/switch', {
        method: 'POST',
        body: JSON.stringify({ provider, model })
      });

      if (response.success) {
        await loadProvidersData(); // Refresh data
        alert(`Successfully switched primary provider to ${provider}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to switch provider');
    } finally {
      setSwitchingProvider(false);
    }
  };

  const testProvider = async (provider: string, model?: string) => {
    try {
      setTestingProvider(provider);
      setError(null);

      const response = await apiRequest<{ success: boolean; data: any }>('/api/admin/ai-providers/test', {
        method: 'POST',
        body: JSON.stringify({ 
          provider, 
          model,
          testPrompt: "Generate a brief test response to verify the AI provider is working correctly."
        })
      });

      if (response.success) {
        setTestResults(prev => ({
          ...prev,
          [provider]: response.data
        }));
      }
    } catch (err: any) {
      setTestResults(prev => ({
        ...prev,
        [provider]: { error: err.message }
      }));
    } finally {
      setTestingProvider(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'not_configured':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'not_configured':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading AI providers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-blue-600" />
                AI Providers Management
              </h1>
              <p className="mt-2 text-gray-600">
                Manage OpenAI ChatGPT and Google Gemini API configurations
              </p>
            </div>
            <button
              onClick={loadProvidersData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Current Configuration */}
        {providersStatus && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Current Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Primary Provider</div>
                <div className="text-lg font-bold text-blue-900 capitalize">
                  {providersStatus.current_primary}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  {providersStatus.providers[providersStatus.current_primary as keyof typeof providersStatus.providers]?.current_model}
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Fallback Provider</div>
                <div className="text-lg font-bold text-green-900 capitalize">
                  {providersStatus.current_fallback || 'None'}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {providersStatus.current_fallback ? 
                    providersStatus.providers[providersStatus.current_fallback as keyof typeof providersStatus.providers]?.current_model 
                    : 'No fallback configured'
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Providers Grid */}
        {providersStatus && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {Object.entries(providersStatus.providers).map(([providerKey, provider]) => (
              <div key={providerKey} className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  {/* Provider Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.description}</p>
                      </div>
                    </div>
                    {getStatusIcon(provider.status)}
                  </div>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getStatusColor(provider.status)}`}>
                    {provider.status === 'available' && 'Available'}
                    {provider.status === 'error' && 'Error'}
                    {provider.status === 'not_configured' && 'Not Configured'}
                  </div>

                  {/* Provider Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Model:</span>
                      <span className="font-medium">{provider.current_model || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Free Tier:</span>
                      <span className={`font-medium ${provider.free_tier ? 'text-green-600' : 'text-red-600'}`}>
                        {provider.free_tier ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate Limit:</span>
                      <span className="font-medium">
                        {provider.rate_limits?.requests_per_minute || 'N/A'} req/min
                      </span>
                    </div>
                  </div>

                  {/* Error Message */}
                  {provider.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{provider.error}</p>
                    </div>
                  )}

                  {/* Test Results */}
                  {testResults[providerKey] && (
                    <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-2">Test Result:</div>
                      {testResults[providerKey].error ? (
                        <p className="text-sm text-red-600">{testResults[providerKey].error}</p>
                      ) : (
                        <div className="space-y-1 text-xs text-gray-600">
                          <p><strong>Response:</strong> {testResults[providerKey].response}</p>
                          <p><strong>Tokens:</strong> {testResults[providerKey].tokens_used}</p>
                          <p><strong>Time:</strong> {testResults[providerKey].processing_time_ms}ms</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => testProvider(providerKey, provider.current_model)}
                      disabled={testingProvider === providerKey}
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      {testingProvider === providerKey ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <TestTube className="w-4 h-4" />
                      )}
                      <span>Test</span>
                    </button>
                    
                    {provider.status === 'available' && providersStatus.current_primary !== providerKey && (
                      <button
                        onClick={() => switchPrimaryProvider(providerKey, provider.current_model)}
                        disabled={switchingProvider}
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {switchingProvider ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Switch className="w-4 h-4" />
                        )}
                        <span>Set Primary</span>
                      </button>
                    )}
                    
                    {providersStatus.current_primary === providerKey && (
                      <div className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        <span>Primary</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Usage Statistics */}
        {usageStats && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Usage Statistics (Last 30 Days)
              </h2>

              {/* Total Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Total Requests</div>
                      <div className="text-2xl font-bold text-blue-900">
                        {usageStats.total.requests.toLocaleString()}
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-600 font-medium">Tokens Used</div>
                      <div className="text-2xl font-bold text-green-900">
                        {usageStats.total.tokens_used.toLocaleString()}
                      </div>
                    </div>
                    <Activity className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-purple-600 font-medium">Total Cost</div>
                      <div className="text-2xl font-bold text-purple-900">
                        ${usageStats.total.estimated_cost.toFixed(2)}
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-orange-600 font-medium">Avg Response</div>
                      <div className="text-2xl font-bold text-orange-900">
                        {usageStats.total.average_response_time}ms
                      </div>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Provider-specific Stats */}
              <div className="space-y-4">
                {Object.entries(usageStats.providers).map(([provider, stats]) => (
                  <div key={provider} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 capitalize">{provider}</h3>
                      <span className="text-sm text-gray-600">
                        Success Rate: {stats.success_rate}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Requests</div>
                        <div className="font-semibold">{stats.requests.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Tokens</div>
                        <div className="font-semibold">{stats.tokens_used.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Cost</div>
                        <div className="font-semibold">${stats.estimated_cost.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Avg Time</div>
                        <div className="font-semibold">{stats.average_response_time}ms</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIProvidersManagement;
