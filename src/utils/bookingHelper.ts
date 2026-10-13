/**
 * Helper to construct direct WhatsApp booking links
 */
export function createWhatsAppBookingUrl(options: {
  phoneDigits: string; // e.g. 918237734777
  salonName: string;
  serviceName?: string;
  clientName?: string;
  preferredDate?: string;
  preferredTime?: string;
  customNotes?: string;
}): string {
  const { phoneDigits, salonName, serviceName, clientName, preferredDate, preferredTime, customNotes } = options;

  let message = `Hello! I would like to book an appointment at ${salonName}.`;

  if (serviceName) {
    message += `\n• Service: ${serviceName}`;
  }
  if (clientName && clientName.trim()) {
    message += `\n• Name: ${clientName.trim()}`;
  }
  if (preferredDate) {
    message += `\n• Preferred Date: ${preferredDate}`;
  }
  if (preferredTime) {
    message += `\n• Preferred Time: ${preferredTime}`;
  }
  if (customNotes && customNotes.trim()) {
    message += `\n• Note: ${customNotes.trim()}`;
  }

  message += `\n\nPlease let me know the available timings. Thank you!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneDigits}?text=${encoded}`;
}
