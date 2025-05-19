import { useState } from "react";
import axios from "axios";

export default function PlantAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const analyzePlant = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("https://chandafa-plant-disease-detection-ai.hf.space/analyze/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Gagal menganalisis gambar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Deteksi Penyakit Tanaman</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mb-4 p-6 border-2 border-dashed rounded-md text-center transition-all duration-200
          ${isDragOver ? "border-green-500 bg-green-50" : "border-gray-300"}`}
      >
        <p className="mb-2 text-gray-600">Seret dan lepas gambar ke sini, atau klik tombol di bawah untuk memilih file.</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </div>

      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="mx-auto border border-gray-200 rounded-md max-h-64" />
        </div>
      )}

      <button
        onClick={analyzePlant}
        disabled={!file || loading}
        className={`px-4 py-2 rounded-md text-white font-medium
          ${!file || loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
          disabled:opacity-50`}
      >
        {loading ? "Menganalisis..." : "Analisis Penyakit"}
      </button>

      {error && (
        <div className="p-3 mt-4 text-red-700 bg-red-100 border-l-4 border-red-500">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="p-4 mt-6 rounded-md bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold">Hasil Analisis</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-700">Jenis Tanaman</h4>
              <p className="text-lg">{result.plant}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Status</h4>
              <p className={`text-lg ${result.is_healthy ? "text-green-600" : "text-red-600"}`}>{result.is_healthy ? "Sehat" : "Terinfeksi"}</p>
            </div>
          </div>

          {!result.is_healthy && (
            <>
              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Penyakit</h4>
                <p className="text-lg">{result.disease}</p>
                {result.confidence && <p className="text-sm text-gray-500">Tingkat keyakinan: {(result.confidence * 100).toFixed(1)}%</p>}
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Deskripsi</h4>
                <p className="text-gray-600">{result.description}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Perawatan</h4>
                <p className="text-gray-600">{result.treatment}</p>
              </div>
            </>
          )}

          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Pencegahan</h4>
            <p className="text-gray-600">{result.prevention}</p>
          </div>
        </div>
      )}
    </div>
  );
}
