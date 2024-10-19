import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { twilioClient } from '../../lib/twilio';

const MessagingResponse = twilio.twiml.MessagingResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const twiml = new MessagingResponse();
      const incomingMsg = (req.body.Body as string).toLowerCase();
      const from = req.body.From; // Sender's phone number
      const to = req.body.To; // Your Twilio phone number
  
      console.log(`Received message from ${from} to ${to}: ${incomingMsg}`);
  
      let responseMessage = '';
  
      if (incomingMsg.includes('hello')) {
        responseMessage = `Hello! How can I help you today? Your number is ${from}.`;
      } else if (incomingMsg.includes('bye')) {
        responseMessage = `Goodbye! Have a great day! Message sent to ${to}.`;
      } else {
        responseMessage = "I'm sorry, I didn't understand that command.";
      }
  
      // Respond directly to the incoming message
      twiml.message(responseMessage);
  
      // Optionally, send a separate message using the Twilio client
      try {
        await twilioClient.messages.create({
          body: `This is a separate message sent via Twilio client. Original message: "${incomingMsg}"`,
          from: to, // Your Twilio phone number
          to: from // Sender's phone number
        });
        console.log('Separate message sent successfully');
      } catch (error) {
        console.error('Error sending separate message:', error);
      }
  
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }