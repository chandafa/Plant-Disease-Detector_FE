import { useState } from "react";
import Header from "./components/Header";
// import FileUpload from "./components/FileUpload";
import PlantAnalysis from "./components/PlantAnalysis";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
          {!result ? <PlantAnalysis setResult={setResult} setIsLoading={setIsLoading} setError={setError} /> : <ResultDisplay result={result} onReset={handleReset} />}

          {isLoading && (
            <div className="mt-4 text-center">
              <div className="inline-block w-8 h-8 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
              <p className="mt-2 text-gray-600">Analyzing the image...</p>
            </div>
          )}

          {error && (
            <div className="p-4 mt-4 text-red-700 bg-red-100 border-l-4 border-red-500">
              <p>Error: {error}</p>
              <button onClick={handleReset} className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600">
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
