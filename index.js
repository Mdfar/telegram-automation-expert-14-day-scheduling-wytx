/**

staqlt Telegram Automation Engine

Core Logic: 14-Day Cyclic Scheduler */

const axios = require('axios'); const cron = require('node-cron'); require('dotenv').config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; const CHANNEL_A = process.env.CHANNEL_A_ID; const CHANNEL_B = process.env.CHANNEL_B_ID;

// Mock Database of Content for the 14-Day Cycle const contentSchedule = [ { day: 1, time: "09:00", type: "post", channel: "A", text: "Welcome to Day 1 of our cycle!" }, { day: 1, time: "12:00", type: "forward", from: "A", to: "B", delay: 3000 }, { day: 14, time: "21:00", type: "post", channel: "B", text: "Final Day Recap. Resetting loop..." } // ... logic would fill the full 14 day array here ];

/**

Sends a message to a specific Telegram channel */ async function sendMessage(chatId, text) { const url = https://api.telegram.org/bot${BOT_TOKEN}/sendMessage; try { await axios.post(url, { chat_id: chatId, text: text }); console.log([SUCCESS] Message sent to ${chatId}); } catch (error) { console.error([ERROR] Telegram API Error: ${error.response?.data?.description || error.message}); } }

/**

Forwards a message between channels */ async function forwardMessage(fromId, toId, messageId) { const url = https://api.telegram.org/bot${BOT_TOKEN}/forwardMessage; try { await axios.post(url, { chat_id: toId, from_chat_id: fromId, message_id: messageId }); console.log([SUCCESS] Forwarded from ${fromId} to ${toId}); } catch (error) { console.error([ERROR] Forwarding failed: ${error.message}); } }

/**

Main Controller: Checks current cycle position and executes tasks */ function runAutomationCycle() { console.log("Checking schedule for active tasks...");

const now = new Date(); // Logic to calculate where we are in the 14-day loop (1-14) const startDate = new Date(process.env.CYCLE_START_DATE); const diffTime = Math.abs(now - startDate); const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); const currentCycleDay = (diffDays % 14) + 1;

const currentTime = ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')};

contentSchedule.forEach(task => { if (task.day === currentCycleDay && task.time === currentTime) { if (task.type === 'post') { sendMessage(task.channel === 'A' ? CHANNEL_A : CHANNEL_B, task.text); } // Additional logic for forwards and sequenced delays would trigger here } }); }

// Check every minute cron.schedule('* * * * *', () => { runAutomationCycle(); });

console.log("staqlt Telegram Engine Started. Monitoring 14-day loop...");