import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // The user will replace this empty string with their Google Apps Script Web App URL
    // e.g., const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

    if (!GOOGLE_SCRIPT_URL) {
      console.warn('No Google Script URL configured. Data was not sent to Sheets.');
      // Proceeding with success for local testing purposes before the user configures the URL.
      // In production, you'd want to handle this error uniquely.
    } else {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form to Google Sheets');
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
