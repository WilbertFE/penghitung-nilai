import type {
  Semester,
  GpaDataPoint,
  PerformanceStat,
  User,
  ProfileUser,
} from "@/lib/types";

// ─── Student ──────────────────────────────────────────────────────────────────

export const currentUser: User = {
  name: "Wilbert",
  email: "wilbert@student.com",
  initials: "WI",
};

export const profileUser: ProfileUser = {
  name: "Wilbert",
  fullName: "Wilbert Bernardi",
  email: "wilbert@student.com",
  initials: "WB",
  studentId: "STU2024001",
  school: "Methodist-6 Medan",
  gradeClass: "XII Science 1",
  emailVerified: true,
  accountCreated: "January 12, 2024",
};

// ─── Semesters ────────────────────────────────────────────────────────────────

export const semesters: Semester[] = [
  { semester: "Semester 1", gpa: 3.4, avgScore: 82, status: "Completed" },
  { semester: "Semester 2", gpa: 3.6, avgScore: 85, status: "Completed" },
  { semester: "Semester 3", gpa: 3.7, avgScore: 87, status: "Completed" },
  { semester: "Semester 4", gpa: 3.8, avgScore: 90, status: "In Progress" },
];

// ─── GPA chart ────────────────────────────────────────────────────────────────

export const gpaChartData: GpaDataPoint[] = semesters.map(
  ({ semester, gpa }) => ({
    semester: semester.replace("Semester", "Sem"),
    gpa,
  }),
);

// ─── Summary cards ────────────────────────────────────────────────────────────

export const summaryStats = {
  currentGpa: "3.75",
  highestGpa: "3.85",
  totalSemesters: semesters.length,
  averageScore: Math.round(
    semesters.reduce((sum, s) => sum + s.avgScore, 0) / semesters.length,
  ),
};

// ─── Performance snapshot ─────────────────────────────────────────────────────

export const performanceStats: PerformanceStat[] = [
  { label: "GPA Improvement", value: "+0.4", sub: "over 4 semesters" },
  { label: "Best Subject", value: "Calculus", sub: "Score 95" },
  { label: "Credits Earned", value: "64", sub: "of 128 required" },
  { label: "Dean's List", value: "3×", sub: "Semesters 2, 3, 4" },
];
