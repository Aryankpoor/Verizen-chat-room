import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fileUrl } = req.body;

  try {
    const fileContent = await fetch(fileUrl).then(res => res.text());

    const extractionPrompt = `Extract the following information from this invoice and format it as JSON: date, invoice number, total amount, vendor name, and line items. Here's the invoice content:\n\n${fileContent}`;
    const extractionResponse = await openai.completions.create({
      model: "text-davinci-002",
      prompt: extractionPrompt,
      max_tokens: 500,
    });

    const extractedText = extractionResponse.choices[0].text?.trim() || '{}';

    const summarizationPrompt = `Summarize the key details of this invoice in a short paragraph:\n\n${extractedText}`;
    const summarizationResponse = await openai.completions.create({
      model: "text-davinci-002",
      prompt: summarizationPrompt,
      max_tokens: 150,
    });

    const summary = summarizationResponse.choices[0].text?.trim() || '';

    res.status(200).json({ text: extractedText, summary });
  } catch (error) {
    console.error('Error processing invoice:', error);
    res.status(500).json({ message: 'Error processing invoice' });
  }
}