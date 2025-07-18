import React, { useEffect, useState } from 'react';
import { Bell, MessageSquare, Mail, Clock, CheckCircle } from 'lucide-react';

interface NotificationServiceProps {
  appointments: any[];
}

interface NotificationLog {
  id: string;
  appointmentId: string;
  patientName: string;
  type: '24h' | '2h';
  method: 'whatsapp' | 'email';
  status: 'sent' | 'pending' | 'failed';
  sentAt: Date;
  message: string;
}

const NotificationService: React.FC<NotificationServiceProps> = ({ appointments }) => {
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    // Check for appointments that need reminders every minute
    const checkReminders = () => {
      const now = new Date();
      
      appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.date);
        
        // Calculate time difference in milliseconds
        const timeDiff = appointmentDate.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // Check for 24-hour reminder (between 23.5 and 24.5 hours before)
        if (hoursDiff >= 23.5 && hoursDiff <= 24.5) {
          const existingLog = notificationLogs.find(log => 
            log.appointmentId === appointment.id && 
            log.type === '24h'
          );
          
          if (!existingLog) {
            sendReminder(appointment, '24h');
          }
        }
        
        // Check for 2-hour reminder (between 1.5 and 2.5 hours before)
        if (hoursDiff >= 1.5 && hoursDiff <= 2.5) {
          const existingLog = notificationLogs.find(log => 
            log.appointmentId === appointment.id && 
            log.type === '2h'
          );
          
          if (!existingLog) {
            sendReminder(appointment, '2h');
          }
        }
      });
    };

    // Check every minute
    const interval = setInterval(checkReminders, 60 * 1000);
    
    // Initial check
    checkReminders();

    return () => clearInterval(interval);
  }, [appointments, notificationLogs]);

  const sendReminder = (appointment: any, timeframe: '24h' | '2h') => {
    // Send WhatsApp reminder
    sendWhatsAppReminder(appointment, timeframe);
    
    // Send Email reminder
    sendEmailReminder(appointment, timeframe);
  };

  const sendWhatsAppReminder = (appointment: any, timeframe: '24h' | '2h') => {
    const timeText = timeframe === '24h' ? '24 horas' : '2 horas';
    const urgencyEmoji = timeframe === '24h' ? '📅' : '⏰';
    const appointmentTime = new Date(appointment.date).toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const message = `${urgencyEmoji} RECORDATORIO DE CITA - Consultorio Yadira

¡Hola ${appointment.patient}! 👋

Te recordamos que tienes una cita programada en ${timeText}:

📅 Fecha: ${new Date(appointment.date).toLocaleDateString('es-CO')}
🕐 Hora: ${appointmentTime}
👨‍⚕️ Con: ${appointment.dentist}
🦷 Servicio: ${appointment.service}
⏱️ Duración: ${appointment.duration}

📍 UBICACIÓN:
Consultorio Yadira
Calle 123 #45-67, Bogotá
📞 Tel: +57 (1) 234-5678

${timeframe === '24h' 
  ? '⚠️ IMPORTANTE: Si necesitas cancelar o reprogramar, hazlo con al menos 24 horas de anticipación.'
  : '🚨 RECORDATORIO URGENTE: Tu cita es en 2 horas. Por favor confirma tu asistencia.'
}

💡 RECOMENDACIONES:
• Llega 15 minutos antes
• Trae tu documento de identidad
• Si tienes alguna molestia, infórmanos

Para confirmar tu asistencia, responde: SÍ
Para reprogramar, responde: REPROGRAMAR

¡Te esperamos! 😊

---
Consultorio Yadira - Tu sonrisa es nuestra prioridad`;

    console.log(`📱 ENVIANDO WHATSAPP a ${appointment.phone}:`);
    console.log(message);

    // Log the notification
    const log: NotificationLog = {
      id: Math.random().toString(36).substr(2, 9),
      appointmentId: appointment.id,
      patientName: appointment.patient,
      type: timeframe,
      method: 'whatsapp',
      status: 'sent',
      sentAt: new Date(),
      message: message
    };

    setNotificationLogs(prev => [...prev, log]);

    // In a real implementation, this would call WhatsApp Business API
    // Example: await whatsappAPI.sendMessage(appointment.phone, message);
  };

  const sendEmailReminder = (appointment: any, timeframe: '24h' | '2h') => {
    const timeText = timeframe === '24h' ? '24 horas' : '2 horas';
    const urgencyClass = timeframe === '24h' ? 'reminder' : 'urgent';
    const appointmentTime = new Date(appointment.date).toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const subject = `${timeframe === '24h' ? '📅' : '⏰'} Recordatorio de Cita - Consultorio Yadira`;
    
    const htmlMessage = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #9333EA, #EC4899); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .appointment-card { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #9333EA; }
        .urgent { border-left-color: #EF4444 !important; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #9333EA, #EC4899); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
        .warning { background: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🦷 Consultorio Yadira</h1>
            <h2>${timeframe === '24h' ? '📅 Recordatorio de Cita' : '⏰ Recordatorio Urgente'}</h2>
        </div>
        
        <div class="content">
            <p>Estimado/a <strong>${appointment.patient}</strong>,</p>
            
            <p>Esperamos que se encuentre bien. Le recordamos que tiene una cita programada en <strong>${timeText}</strong>:</p>
            
            <div class="appointment-card ${timeframe === '2h' ? 'urgent' : ''}">
                <h3>📋 DETALLES DE LA CITA</h3>
                <div class="info-row">
                    <span class="label">📅 Fecha:</span>
                    <span class="value">${new Date(appointment.date).toLocaleDateString('es-CO', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                </div>
                <div class="info-row">
                    <span class="label">🕐 Hora:</span>
                    <span class="value">${appointmentTime}</span>
                </div>
                <div class="info-row">
                    <span class="label">👨‍⚕️ Profesional:</span>
                    <span class="value">${appointment.dentist}</span>
                </div>
                <div class="info-row">
                    <span class="label">🦷 Servicio:</span>
                    <span class="value">${appointment.service}</span>
                </div>
                <div class="info-row">
                    <span class="label">⏱️ Duración:</span>
                    <span class="value">${appointment.duration}</span>
                </div>
            </div>

            ${timeframe === '2h' ? `
            <div class="warning">
                <strong>🚨 RECORDATORIO URGENTE:</strong> Su cita es en 2 horas. Por favor confirme su asistencia.
            </div>
            ` : `
            <div class="warning">
                <strong>⚠️ IMPORTANTE:</strong> Si necesita cancelar o reprogramar, hágalo con al menos 24 horas de anticipación.
            </div>
            `}

            <h3>📍 INFORMACIÓN DE LA CLÍNICA</h3>
            <p>
                <strong>Consultorio Yadira</strong><br>
                Calle 123 #45-67, Bogotá, Colombia<br>
                📞 Teléfono: +57 (1) 234-5678<br>
                📧 Email: contacto@consultorioyadira.com
            </p>

            <h3>💡 RECOMENDACIONES IMPORTANTES</h3>
            <ul>
                <li>Llegue 15 minutos antes de su cita</li>
                <li>Traiga su documento de identidad</li>
                <li>Si tiene alguna molestia o síntoma, infórmenos</li>
                <li>Use tapabocas durante su visita</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
                <a href="tel:+5712345678" class="button">📞 Llamar para Confirmar</a>
                <a href="https://wa.me/573001234567" class="button">💬 WhatsApp</a>
            </div>
        </div>

        <div class="footer">
            <p><strong>Consultorio Yadira</strong> - Tu sonrisa es nuestra prioridad</p>
            <p style="font-size: 12px; color: #666;">
                Este es un recordatorio automático. Si tiene alguna pregunta, no dude en contactarnos.
            </p>
        </div>
    </div>
</body>
</html>`;

    console.log(`📧 ENVIANDO EMAIL a ${appointment.email}:`);
    console.log(`Subject: ${subject}`);
    console.log('HTML Content:', htmlMessage);

    // Log the notification
    const log: NotificationLog = {
      id: Math.random().toString(36).substr(2, 9),
      appointmentId: appointment.id,
      patientName: appointment.patient,
      type: timeframe,
      method: 'email',
      status: 'sent',
      sentAt: new Date(),
      message: htmlMessage
    };

    setNotificationLogs(prev => [...prev, log]);

    // In a real implementation, this would call Email API
    // Example: await emailAPI.sendEmail(appointment.email, subject, htmlMessage);
  };

  return (
    <div className="mb-6">
      {/* Notification Status Panel */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">Sistema de Recordatorios Automáticos</h3>
              <p className="text-purple-800 text-sm">
                Notificaciones sincronizadas con horarios de citas • Enviadas: {notificationLogs.length}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            {showLogs ? 'Ocultar' : 'Ver'} Registro
          </button>
        </div>

        {/* Notification Schedule Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900">WhatsApp</span>
            </div>
            <p className="text-sm text-gray-600">
              • 24 horas antes: Recordatorio con detalles completos<br/>
              • 2 horas antes: Recordatorio urgente de confirmación
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900">Email</span>
            </div>
            <p className="text-sm text-gray-600">
              • 24 horas antes: Email detallado con información de la clínica<br/>
              • 2 horas antes: Email urgente con botones de acción
            </p>
          </div>
        </div>
      </div>

      {/* Notification Logs */}
      {showLogs && (
        <div className="mt-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h4 className="font-semibold text-gray-900">Registro de Notificaciones Enviadas</h4>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notificationLogs.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notificationLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-1 rounded-full ${
                          log.method === 'whatsapp' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {log.method === 'whatsapp' ? (
                            <MessageSquare className="w-3 h-3 text-green-600" />
                          ) : (
                            <Mail className="w-3 h-3 text-blue-600" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{log.patientName}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.type === '24h' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {log.type === '24h' ? '24 horas' : '2 horas'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-500">
                          {log.sentAt.toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 capitalize">
                      {log.method === 'whatsapp' ? 'WhatsApp' : 'Email'} enviado exitosamente
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No se han enviado notificaciones aún</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationService;