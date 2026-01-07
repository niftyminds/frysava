// Netlify Function for custom email notifications
// Triggered by Netlify Forms submission webhook

exports.handler = async (event) => {
  // Only handle POST requests from Netlify Forms
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const formData = data.data;

    // Extract form fields
    const {
      name,
      email,
      phone,
      dateFrom,
      dateTo,
      adults,
      children,
      pets,
      message
    } = formData;

    // Format email body (můžeš přidat HTML)
    const emailBody = `
Nová poptávka z webu Chalupa Fryšava
═══════════════════════════════════════

📋 Kontaktní údaje:
──────────────────────────
Jméno: ${name || 'Neuvedeno'}
Email: ${email || 'Neuvedeno'}
Telefon: ${phone || 'Neuvedeno'}

📅 Termín:
──────────────────────────
Příjezd: ${dateFrom || 'Neuvedeno'}
Odjezd: ${dateTo || 'Neuvedeno'}

👥 Počet hostů:
──────────────────────────
Dospělí: ${adults || 'Neuvedeno'}
Děti: ${children || 'Neuvedeno'}
Mazlíček: ${pets || 'Ne'}

💬 Zpráva:
──────────────────────────
${message || 'Žádná zpráva'}

═══════════════════════════════════════
Odesláno: ${new Date().toLocaleString('cs-CZ')}
    `.trim();

    console.log('Form submission received:', emailBody);

    // TODO: Integrace s emailovým službou (SendGrid, Mailgun, apod.)
    // Příklad SendGrid integrace zde:
    // https://docs.netlify.com/forms/notifications/#webhook-notifications

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notification sent successfully' })
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process submission' })
    };
  }
};
