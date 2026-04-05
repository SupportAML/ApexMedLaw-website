import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'support@apexmedlaw.com';
const FROM_EMAIL = 'ApexMedLaw <noreply@updates.apexmedlaw.com>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const {
    firstName, lastName, email, phone,
    specialty, subspecialties, boardCertifications,
    yearsExperience, caseExperience, statesLicensed,
    availability, feeRange, bio,
  } = req.body;

  if (!firstName || !lastName || !email || !specialty || !boardCertifications || !availability) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Physician Application — Dr. ${firstName} ${lastName} (${specialty})`,
        html: `
          <h2>New Physician Expert Witness Application</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee; width: 180px;">Name</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">Dr. ${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Primary Specialty</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${specialty}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Subspecialties</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${subspecialties || 'None listed'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Board Certifications</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${boardCertifications.replace(/\n/g, '<br>')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Years of Experience</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${yearsExperience || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Expert Witness Experience</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${caseExperience || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Availability</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${availability}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Fee Range</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${feeRange || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">States Licensed</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${statesLicensed || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; vertical-align: top;">Bio</td>
              <td style="padding: 8px 12px;">${bio ? bio.replace(/\n/g, '<br>') : 'Not provided'}</td>
            </tr>
          </table>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return res.status(500).json({ error: 'Failed to send application' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Application submission error:', error);
    return res.status(500).json({ error: 'Failed to send application' });
  }
}
