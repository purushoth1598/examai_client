import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import axios from "axios";

export const UploadPage = () => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("✅ Upload successful!");
      console.log("Response:", response.data);
    } catch (error: any) {
      console.error("Upload error:", error);
      const msg = error?.response?.data || "❌ Upload failed.";
      setUploadStatus(msg);
    }
  };

  return (
    <>
      <Header showCTA={false} />
      <section className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#fefcff] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-10 text-center">
          {/* Upload Section */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
              <UploadCloud className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Study Materials</h3>
            <p className="text-gray-600 max-w-md mb-6">
              Upload your textbooks, notes, or study guides. We support PDFs, Word documents, and images up to 50MB.
            </p>

            <label className="cursor-pointer">
              <input type="file" onChange={handleFileChange} hidden />
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:opacity-90 transition">
                Choose File
              </div>
            </label>

            {fileName && (
              <p className="mt-3 text-sm text-gray-500">Selected: {fileName}</p>
            )}

            {selectedFile && (
              <Button
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6"
                onClick={handleUpload}
              >
                Upload
              </Button>
            )}

            {uploadStatus && (
              <p className="mt-4 text-sm font-medium text-gray-600">{uploadStatus}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
