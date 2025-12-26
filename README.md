staqlt Telegram 14-Day Automation
Architecture

This solution uses a Cyclic Offset Algorithm to manage content across a 14-day window. Instead of hardcoding dates, we calculate the modulo of the current time against a start date to determine the "Cycle Day."

Deployment

n8n Integration: Import the workflow.json (not shown) into n8n.

Environment Variables:

TELEGRAM_BOT_TOKEN: Your bot token from @BotFather.

CHANNEL_A_ID: Target channel ID.

CHANNEL_B_ID: Secondary channel ID.

CYCLE_START_DATE: The ISO timestamp for Day 1.

Rate Limiting

The system includes a 3-second buffer_delay between interconnected tasks to ensure compliance with Telegram's API limits (max 30 messages/second).

Scaling

To scale, simply add more channel IDs to the .env and extend the contentSchedule object.