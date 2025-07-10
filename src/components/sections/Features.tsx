import { FeatureCard } from "@/components/ui/feature-card";
import { Upload, Zap, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: "Upload Materials",
      description:
        "Upload your study materials easily. Our system reads text from PDFs, documents, and images with high accuracy.",
      color: "blue" as const,
      onClick: () => navigate("/upload"),
    },
    {
      icon: Zap,
      title: "Smart Generation",
      description:
        "AI creates 10-20 university-style questions tailored to your content, ensuring comprehensive coverage.",
      color: "purple" as const,
      onClick: () => navigate("/generate"),
    },
    {
      icon: CheckCheck,
      title: "Instant Evaluation",
      description:
        "Get detailed feedback on your answers with grades and personalized improvement suggestions.",
      color: "green" as const,
      onClick: () => navigate("/evaluate"),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};
