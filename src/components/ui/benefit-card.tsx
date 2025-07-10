
import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "orange" | "green" | "blue";
}

export const BenefitCard = ({ icon: Icon, title, description, color }: BenefitCardProps) => {
  const colorClasses = {
    orange: "bg-orange-500",
    green: "bg-green-500",
    blue: "bg-blue-500"
  };

  return (
    <div className="flex items-start space-x-4">
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};
