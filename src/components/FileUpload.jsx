import { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

export default function FileUpload({ setResult, setIsLoading, setError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Upload Leaf Image</h2>
      <p className="mb-6 text-gray-600">Upload a clear photo of a plant leaf to detect potential diseases.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Select Image</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {preview ? (
                <img src={preview} alt="Preview" className="object-contain w-full h-full p-2" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG (MAX. 5MB)</p>
                </div>
              )}
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/jpeg,image/png" />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={!selectedFile} className={`px-6 py-2 rounded-md text-white ${selectedFile ? "bg-primary hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}>
            Detect Disease
          </button>
        </div>
      </form>
    </div>
  );
}
