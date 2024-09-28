import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;   
const fromNumber = process.env.TWILIO_FROM_NUMBER; 

const client = twilio(accountSid, authToken);

export const sendSMS = async (to: any, body: any) => {
  try {
    const message = await client.messages.create({
      body,
      from: fromNumber,
      to
    });
    return { success: true, messageSid: message.sid };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error };
  }
};
