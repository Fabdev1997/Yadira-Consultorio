export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'dentist' | 'assistant' | 'patient';
  phone?: string;
  specialization?: string;
  license?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  birthDate: Date;
  address: string;
  emergencyContact: string;
  medicalHistory: MedicalRecord[];
  insurance?: string;
}

export interface Dentist extends User {
  role: 'dentist';
  specialization: string;
  license: string;
  availability: TimeSlot[];
  patients: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  dentistId: string;
  date: Date;
  startTime: string;
  endTime: string;
  service: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  dentistId: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  notes: string;
  images?: string[];
  nextAppointment?: Date;
}

export interface Invoice {
  id: string;
  patientId: string;
  dentistId: string;
  appointmentId: string;
  issueDate: Date;
  dueDate: Date;
  services: InvoiceService[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'issued' | 'paid' | 'cancelled';
  dianUUID?: string;
  xmlContent?: string;
  digitalSignature?: string;
}

export interface InvoiceService {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  applicableServices: string[];
}

export interface DashboardMetrics {
  totalPatients: number;
  totalAppointments: number;
  monthlyRevenue: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  newPatientsThisMonth: number;
  averageAppointmentValue: number;
}