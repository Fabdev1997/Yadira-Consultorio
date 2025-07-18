import React, { createContext, useContext, useState } from 'react';
import { Appointment, Patient, Invoice, Promotion, DashboardMetrics } from '../types';

interface DataContextType {
  appointments: Appointment[];
  patients: Patient[];
  invoices: Invoice[];
  promotions: Promotion[];
  metrics: DashboardMetrics;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '4',
    dentistId: '2',
    date: new Date('2024-01-15T10:30:00'),
    startTime: '10:30',
    endTime: '11:30',
    service: 'Limpieza dental',
    status: 'scheduled',
    cost: 150000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockPatients: Patient[] = [
  {
    id: '4',
    name: 'Carlos Pérez',
    email: 'carlos@paciente.com',
    role: 'patient',
    phone: '+57 300 456 7890',
    birthDate: new Date('1985-05-15'),
    address: 'Calle 123 #45-67, Bogotá',
    emergencyContact: '+57 300 123 4567',
    medicalHistory: [],
    createdAt: new Date('2024-02-15')
  }
];

const mockInvoices: Invoice[] = [
  {
    id: '1',
    patientId: '4',
    dentistId: '2',
    appointmentId: '1',
    issueDate: new Date('2024-01-10'),
    dueDate: new Date('2024-01-25'),
    services: [
      {
        id: '1',
        name: 'Limpieza dental',
        description: 'Limpieza profunda con fluorización',
        quantity: 1,
        unitPrice: 150000,
        total: 150000
      }
    ],
    subtotal: 150000,
    tax: 28500,
    discount: 0,
    total: 178500,
    status: 'paid'
  }
];

const mockPromotions: Promotion[] = [
  {
    id: '1',
    name: '20% OFF en Limpieza',
    description: 'Descuento especial en limpieza dental para nuevos pacientes',
    discountType: 'percentage',
    discountValue: 20,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2024-01-31'),
    isActive: true,
    applicableServices: ['limpieza-dental']
  }
];

const mockMetrics: DashboardMetrics = {
  totalPatients: 1247,
  totalAppointments: 156,
  monthlyRevenue: 67000,
  pendingAppointments: 8,
  completedAppointments: 12,
  cancelledAppointments: 2,
  newPatientsThisMonth: 3,
  averageAppointmentValue: 175000
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [metrics] = useState<DashboardMetrics>(mockMetrics);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, ...updates } : app
    ));
  };

  const addPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(patient => 
      patient.id === id ? { ...patient, ...updates } : patient
    ));
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prev => [...prev, invoice]);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === id ? { ...invoice, ...updates } : invoice
    ));
  };

  const addPromotion = (promotion: Promotion) => {
    setPromotions(prev => [...prev, promotion]);
  };

  const updatePromotion = (id: string, updates: Partial<Promotion>) => {
    setPromotions(prev => prev.map(promo => 
      promo.id === id ? { ...promo, ...updates } : promo
    ));
  };

  return (
    <DataContext.Provider value={{
      appointments,
      patients,
      invoices,
      promotions,
      metrics,
      addAppointment,
      updateAppointment,
      addPatient,
      updatePatient,
      addInvoice,
      updateInvoice,
      addPromotion,
      updatePromotion
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};