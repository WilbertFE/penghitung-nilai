export type SemesterStatus = "Completed" | "In Progress" | "Upcoming";

export interface SubjectEntry {
  id: string;
  name: string;
  score: string;
  grade: string;
  credits: string;
}

export interface SemesterInfo {
  name: string;
  academicYear: string;
  gradeLevel: string;
  type: string;
}

export interface Semester {
  semester: string;
  gpa: number;
  avgScore: number;
  status: SemesterStatus;
}

export interface GpaDataPoint {
  semester: string;
  gpa: number;
}

export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string; // lucide icon name — components resolve to the actual component
  color: string;
  bg: string;
}

export interface PerformanceStat {
  label: string;
  value: string;
  sub: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide icon name
  active?: boolean;
}

export interface User {
  name: string;
  email: string;
  initials: string;
}

export interface GradeSubject {
  id: string;
  name: string;
  score: number;
  grade: string;
  credits: number;
  gradePoints: number;
}

export interface DetailedSemester {
  id: string;
  name: string;
  academicYear: string;
  gpa: number;
  avgScore: number;
  highScore: number;
  lowScore: number;
  status: SemesterStatus;
  subjects: GradeSubject[];
}

export interface ProfileUser extends User {
  fullName: string;
  studentId: string;
  school: string;
  gradeClass: string;
  emailVerified: boolean;
  accountCreated: string;
}
