
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        AI-Powered Exam Generation
        <br />
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          & Evaluation System
        </span>
      </h1>
      
      <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed">
        Transform your study materials into comprehensive exam papers with intelligent
        question generation and automated evaluation powered by advanced AI technology.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Generating Exams
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
        >
          Learn How It Works
        </Button>
      </div>
    </section>
  );
};
