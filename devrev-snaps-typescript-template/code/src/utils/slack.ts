

import { WebClient } from '@slack/web-api';
import readlineSync from 'readline-sync';

const slackToken = ''; // Replace with your actual Slack bot token
const web = new WebClient(slackToken);

// Update with the Slack channel ID
const channelId = ''; // Replace with your Slack channel ID

// Function to collect sprint summary from user input
function collectSprintData() {
  console.log("Please provide the following information for the Sprint Summary:");

  const whatWentWell = readlineSync.question("What Went Well (comma separated)? ");
  const whatWentWrong = readlineSync.question("What Went Wrong (comma separated)? ");
  const retrospectiveInsights = readlineSync.question("Retrospective Insights (comma separated)? ");

  return {
    whatWentWell,
    whatWentWrong,
    retrospectiveInsights,
  };
}

// Function to send sprint summary to Slack
async function sendSprintSummary() {
  const { whatWentWell, whatWentWrong, retrospectiveInsights } = collectSprintData();

  const sprintSummary = `
    **Sprint Summary**
    
    *What Went Well:*
    - ${whatWentWell.split(',').join('\n- ')}

    *What Went Wrong:*
    - ${whatWentWrong.split(',').join('\n- ')}

    *Retrospective Insights:*
    - ${retrospectiveInsights.split(',').join('\n- ')}
  `;

  try {
    await web.chat.postMessage({
      channel: channelId,
      text: sprintSummary,
    });
    console.log('Sprint summary sent to Slack!');
  } catch (error) {
    console.error('Error sending message to Slack:', error);
  }
}

// Call the function to send the sprint summary
sendSprintSummary();
