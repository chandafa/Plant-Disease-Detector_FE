import { FaLeaf, FaArrowLeft } from "react-icons/fa";

export default function ResultDisplay({ result, onReset }) {
  const severityColors = {
    None: "bg-green-100 text-green-800",
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
    Unknown: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <button onClick={onReset} className="flex items-center mb-4 text-primary hover:text-green-600">
        <FaArrowLeft className="mr-2" />
        Back to Upload
      </button>

      <div className="p-6 mb-6 rounded-lg bg-gray-50">
        <h2 className="mb-4 text-2xl font-bold">Detection Results</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Plant</h3>
            <div className="flex items-center">
              <FaLeaf className="mr-2 text-green-500" />
              <span className="text-xl font-bold">{result.plant || "Unknown"}</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Disease</h3>
            <p className="text-xl font-bold">{result.disease || "Unknown"}</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Severity</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${severityColors[result.severity || "Unknown"]}`}>{result.severity || "Unknown"}</span>
          </div>
        </div>

        <div className="p-4 mt-6 bg-white rounded-lg shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Confidence</h3>
          <div className="w-full h-4 bg-gray-200 rounded-full">
            <div className="h-4 rounded-full bg-primary" style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}></div>
          </div>
          <p className="mt-2 text-right text-gray-600">{(result.confidence * 100).toFixed(1)}% confident</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="mb-4 text-xl font-semibold">Recommendations</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800">Immediate Actions:</h4>
            <p className="mt-1 text-gray-600">{result.disease === "Healthy" ? "No action needed. Your plant appears healthy." : "Isolate the affected plant to prevent spread. Remove severely infected leaves carefully."}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Treatment Options:</h4>
            <p className="mt-1 text-gray-600">
              {result.disease === "Healthy" ? "Continue current care routine." : "Apply appropriate fungicide or treatment based on the specific disease. Consult with a local agricultural expert for precise recommendations."}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Prevention Tips:</h4>
            <ul className="mt-1 space-y-1 text-gray-600 list-disc list-inside">
              <li>Ensure proper spacing between plants for air circulation</li>
              <li>Water at the base to avoid wetting leaves</li>
              <li>Rotate crops annually to prevent disease buildup</li>
              <li>Monitor plants regularly for early signs of disease</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
