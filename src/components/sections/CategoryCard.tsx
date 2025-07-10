import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  color?: "blue" | "purple" | "green";
}

export const CategoryCard = ({
  icon: Icon,
  title,
  description,
  to,
  color = "blue",
}: CategoryCardProps) => {
  const colorClasses = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
  };

  return (
    <Link
      to={to}
      className="flex items-start space-x-4 p-5 rounded-xl hover:shadow-xl transition duration-300 bg-white border border-gray-100 hover:border-gray-200"
    >
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};
