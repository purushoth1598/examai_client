import { CategoryCard } from "@/components/sections/CategoryCard";
import { Brain, Cpu, BookOpen } from "lucide-react";

export const ExamCategories = () => {
  const categories = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Test your knowledge of AI concepts, models, and applications.",
      to: "/exam/ai",
      color: "purple" as const,
    },
    {
      icon: Cpu,
      title: "Machine Learning",
      description: "Dive into ML algorithms, training techniques, and data modeling.",
      to: "/exam/machinelearning",
      color: "blue" as const,
    },
    {
      icon: BookOpen,
      title: "Data Science",
      description: "Assess your skills in data analysis, statistics, and visualizations.",
      to: "/exam/ds",
      color: "green" as const,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Explore Exam Categories
        </h2>
        <p className="mt-2 text-lg text-gray-600">Choose a field and challenge your knowledge</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </section>
  );
};
