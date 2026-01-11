export enum ViewState {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  APPOINTMENTS = 'APPOINTMENTS',
  RECORDS = 'RECORDS',
  ASSISTANT = 'ASSISTANT',
  EMERGENCY = 'EMERGENCY',
  PROFILE = 'PROFILE',
  SUPPORT = 'SUPPORT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  age?: number;
  bloodType?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

export interface MedicalRecord {
  id: string;
  title: string;
  type: 'Lab Report' | 'Prescription' | 'X-Ray' | 'Other';
  date: string;
  doctor: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}