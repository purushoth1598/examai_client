
export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface ExamData {
  _id: string;
  infront_page: {
    title: string;
    subject: string;
    total_marks: number;
    exam_time: string;
    description: string;
    secondary_description: string;
  };
  questions_data: {
    num_of_section: number;
    section_a: SectionData;
    section_b: SectionData;
  };
}

export interface SectionData {
  title: string;
  child: number;
  questions: Record<string, string>; // keys like "1", "2", etc.
}

