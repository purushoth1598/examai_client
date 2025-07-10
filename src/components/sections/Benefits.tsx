
import { BenefitCard } from "@/components/ui/benefit-card";
import { Zap, Shield, TrendingUp } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate complete exam papers in minutes, not hours",
      color: "orange" as const
    },
    {
      icon: Shield,
      title: "Secure & Private", 
      description: "Your study materials are kept safe and secure",
      color: "green" as const
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics",
      color: "blue" as const
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ExamAI?</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </section>
  );
};
