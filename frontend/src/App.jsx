import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      // Parse the input as JSON array
      let parsedData;
      try {
        parsedData = JSON.parse(inputValue);
      } catch (parseError) {
        throw new Error('Invalid JSON format. Please enter a valid JSON array.');
      }

      if (!Array.isArray(parsedData)) {
        throw new Error('Input must be a JSON array.');
      }

      // Send request to backend
      const response = await fetch('http://localhost:5000/api/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to parse data');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setResult(null);
    setError('');
  };

  const exampleData = '["a", "1", "334", "R", "$"]';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            JSON Array Parser
          </h1>
          <p className="text-gray-600">
            Parse your JSON array into numbers, alphabets, and special characters
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Section */}
            <div>
              <label
                htmlFor="jsonInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter JSON Array
              </label>
              <textarea
                id="jsonInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={exampleData}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                rows="4"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Example: {exampleData}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Processing...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">❌ {error}</p>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>

              {/* Numbers */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="mr-2">🔢</span> Numbers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.numbers.length > 0 ? (
                    result.numbers.map((num, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium"
                      >
                        {num}
                      </span>
                    ))
                  ) : (
                    <span className="text-green-600 text-sm italic">No numbers found</span>
                  )}
                </div>
              </div>

              {/* Alphabets */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                  <span className="mr-2">🔤</span> Alphabets
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.alphabets.length > 0 ? (
                    result.alphabets.map((alpha, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {alpha}
                      </span>
                    ))
                  ) : (
                    <span className="text-blue-600 text-sm italic">No alphabets found</span>
                  )}
                </div>
              </div>

              {/* Special Characters */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-800 mb-2 flex items-center">
                  <span className="mr-2">✨</span> Special Characters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.special_characters.length > 0 ? (
                    result.special_characters.map((char, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {char}
                      </span>
                    ))
                  ) : (
                    <span className="text-purple-600 text-sm italic">
                      No special characters found
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Built with React, Vite, Tailwind CSS, Node.js & Express</p>
        </div>
      </div>
    </div>
  );
}

export default App;
