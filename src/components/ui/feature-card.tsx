import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "blue" | "purple" | "green";
  onClick?: () => void;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color,
  onClick,
}: FeatureCardProps) => {
  const colorClasses = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
  };

  return (
    <Card
      onClick={onClick}
      className={`p-8 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-gray-200/50 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div
        className={`w-16 h-16 ${colorClasses[color]} rounded-2xl flex items-center justify-center mb-6`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </Card>
  );
};
