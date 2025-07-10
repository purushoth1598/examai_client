import { UploadCloud, FileText, BrainCog, CheckCircle, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";

export const UploadPage = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const steps = [
    { icon: Upload, label: "Upload Materials", active: true },
    { icon: FileText, label: "Process Content" },
    { icon: BrainCog, label: "Generate Questions" },
    { icon: CheckCircle, label: "Review & Export" },
  ];

  return (
    <>
      <Header showCTA={false} />
      <section className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#fefcff] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-10">
          {/* Step Indicators */}
          <div className="flex justify-center gap-6 mb-12">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow ${step.active ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-sm font-medium ${step.active ? 'text-green-600' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Upload Section */}
          <div className="flex flex-col items-center text-center">
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
                Choose Files
              </div>
            </label>

            {fileName && (
              <p className="mt-3 text-sm text-gray-500">Selected: {fileName}</p>
            )}
          </div>
        </div>
      </section>
    </>

  );
};
