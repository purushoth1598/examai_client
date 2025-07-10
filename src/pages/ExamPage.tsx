import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, FileText, User, Loader2 } from "lucide-react";
import { ExamData } from '@/types';
import { Header } from "@/components/layout/Header";

// Sample exam data
const sampleExamData = {
  "_id": "685ed9b72a30a16188cf2f27",
  "infront_page": {
    "title": "University of Alathur",
    "subject": "Machine Learning and Artificial Intelligence",
    "total_marks": 50,
    "exam_time": "02:30",
    "description": "Please answer ALL questions from BOTH sections.",
    "secondary_description": "Use a SEPARATE answerbook for each SECTION."
  },
  "questions_data": {
    "num_of_section": 2,
    "section_a": {
      "title": "Section A - Fundamentals and Concepts",
      "child": 5,
      "questions": {
        "1": "Multiple Choice Questions (Choose the correct answer): [2 marks each = 10 marks]\na) What are the three main parts of a machine learning algorithm according to UC Berkeley?\ni) Decision Process, Error Function, Model Optimization Process\nii) Input Data, Processing Unit, Output Results\niii) Training Set, Validation Set, Test Set\niv) Supervised Learning, Unsupervised Learning, Reinforcement Learning\n\nb) Which type of learning uses labeled datasets to train algorithms?\ni) Unsupervised Learning\nii) Supervised Learning\niii) Semi-supervised Learning\niv) Reinforcement Learning\n\nc) What does 'deep' in deep learning refer to?\ni) The complexity of algorithms\nii) The amount of data processed\niii) The number of layers in a neural network\niv) The processing speed\n\nd) Which algorithm is best suited for predicting house prices based on historical data?\ni) Clustering\nii) Linear Regression\niii) Decision Trees\niv) Neural Networks\n\ne) What does GIGO stand for in machine learning context?\ni) Generate Input Generate Output\nii) Garbage In Garbage Out\niii) Good Input Good Output\niv) General Intelligence General Operations",
        "2": "Define machine learning and explain its three main components as identified by UC Berkeley. [6 marks]",
        "3": "Differentiate between supervised learning and unsupervised learning with one example each. [6 marks]",
        "4": "List and briefly explain any four common machine learning algorithms. [8 marks]",
        "5": "What is the difference between machine learning, deep learning, and neural networks? Explain their relationship. [5 marks]"
      }
    },
    "section_b": {
      "title": "Section B - Applications and Challenges",
      "child": 3,
      "questions": {
        "1": "Discuss any five real-world applications of machine learning with specific examples from the provided text. Explain how each application benefits users or businesses. [10 marks]",
        "2": "Analyze the major challenges and ethical concerns in machine learning implementation. Discuss at least four challenges including bias and discrimination, privacy concerns, job impact, and accountability issues. Provide solutions or recommendations for each challenge. [10 marks]",
        "3": "You are tasked with selecting an AI platform for your organization's machine learning needs. Based on the provided information, create a comprehensive checklist of MLOps and Generative AI capabilities that you would evaluate. Explain why each capability is important for successful machine learning implementation. [5 marks]"
      }
    }
  }
};

const ExamPage = () => {
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<ExamData>("/api/exam/machinelearning") // This hits your Vite proxy
      .then((res) => {
        setExamData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch exam:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleRadioChange = (questionId: string, subQuestion: string, value: string) => {
    const fullQuestionId = `${questionId}_${subQuestion}`;
    setAnswers(prev => ({
      ...prev,
      [fullQuestionId]: value
    }));
  };

  const isMultipleChoice = (question: string) => {
    return question.includes('Multiple Choice Questions') || question.includes('Choose the correct answer');
  };

  const parseMultipleChoiceQuestion = (question: string) => {
    const lines = question.split('\n');
    const parts = [];
    let currentQuestion = '';
    let currentOptions = [];

    for (const line of lines) {
      if (line.match(/^[a-e]\)/)) {
        if (currentQuestion && currentOptions.length > 0) {
          parts.push({ question: currentQuestion, options: currentOptions });
          currentOptions = [];
        }
        currentQuestion = line;
      } else if (line.match(/^[i-v]+\)/)) {
        currentOptions.push(line);
      } else if (line.trim() && !line.includes('Multiple Choice Questions') && !line.includes('[') && !line.includes('marks')) {
        currentQuestion += ' ' + line;
      }
    }

    if (currentQuestion && currentOptions.length > 0) {
      parts.push({ question: currentQuestion, options: currentOptions });
    }

    return parts;
  };

  const renderMultipleChoiceQuestion = (questionId: string, question: string) => {
    const mcqParts = parseMultipleChoiceQuestion(question);

    return (
      <div className="space-y-6">
        {mcqParts.map((part, index) => (
          <div key={index} className="border-l-2 border-gray-300 pl-4">
            <p className="font-medium text-gray-800 mb-3">{part.question}</p>
            <RadioGroup
              value={answers[`${questionId}_${index}`] || ''}
              onValueChange={(value) => handleRadioChange(questionId, index.toString(), value)}
              className="space-y-2"
            >
              {part.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${questionId}_${index}_${optionIndex}`} />
                  <Label htmlFor={`${questionId}_${index}_${optionIndex}`} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    );
  };

  const formatQuestion = (question: string) => {
    return question.split('\n').map((line, index) => (
      <div key={index} className="mb-2">
        {line}
      </div>
    ));
  };

  const handleSubmit = () => {
    console.log('Exam answers:', answers);
    alert('Exam submitted successfully!');
  };

  if (loading || !examData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 text-sm">Loading Exam...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header showCTA={false} />
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm text-gray-600">Student ID: ___________</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm text-gray-600">
                    Time: {currentTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-blue-900">
                {examData.infront_page.title}
              </CardTitle>
              <h2 className="text-xl font-semibold text-gray-700 mt-2">
                {examData.infront_page.subject}
              </h2>
              <div className="flex justify-center gap-8 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Total Marks: {examData.infront_page.total_marks}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {examData.infront_page.exam_time} hours</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-medium text-gray-800 mb-2">
                {examData.infront_page.description}
              </p>
              <p className="text-sm text-gray-600">
                {examData.infront_page.secondary_description}
              </p>
            </CardContent>
          </Card>

          {/* Section A */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-800">
                {examData.questions_data.section_a.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(examData.questions_data.section_a.questions).map(([questionNum, question]) => (
                <div key={`section_a_${questionNum}`} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Question {questionNum}:
                  </h3>
                  {isMultipleChoice(question) ? (
                    renderMultipleChoiceQuestion(`section_a_${questionNum}`, question)
                  ) : (
                    <>
                      <div className="text-gray-700 mb-4 whitespace-pre-line">
                        {formatQuestion(question)}
                      </div>
                      <Textarea
                        placeholder="Write your answer here..."
                        value={answers[`section_a_${questionNum}`] || ''}
                        onChange={(e) => handleAnswerChange(`section_a_${questionNum}`, e.target.value)}
                        className="min-h-[120px]"
                      />
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section B */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-800">
                {examData.questions_data.section_b.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(examData.questions_data.section_b.questions).map(([questionNum, question]) => (
                <div key={`section_b_${questionNum}`} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Question {questionNum}:
                  </h3>
                  {isMultipleChoice(question) ? (
                    renderMultipleChoiceQuestion(`section_b_${questionNum}`, question)
                  ) : (
                    <>
                      <div className="text-gray-700 mb-4 whitespace-pre-line">
                        {formatQuestion(question)}
                      </div>
                      <Textarea
                        placeholder="Write your answer here..."
                        value={answers[`section_b_${questionNum}`] || ''}
                        onChange={(e) => handleAnswerChange(`section_b_${questionNum}`, e.target.value)}
                        className="min-h-[150px]"
                      />
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center mb-8">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </div>
    </>

  );
};

export default ExamPage;
