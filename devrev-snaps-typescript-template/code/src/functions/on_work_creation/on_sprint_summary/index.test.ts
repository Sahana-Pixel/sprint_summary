// src/functions/on_sprint_summary/index.ts

import axios from 'axios';

const PAT = '<Your_Personal_Access_Token>'; // Replace with your actual PAT

async function onSprintSummary(eventPayload: any) {
  try {
    // Example: Fetch sprint data from DevRev
    const response = await axios.get('https://api.devrev.ai/sprints', {
      headers: {
        Authorization: `Bearer ${PAT}`,
      },
    });

    const sprintData = response.data;

    // TODO: Process sprint data to generate summary
    console.log('Sprint Data:', sprintData);
    return {
      message: 'Sprint summary generated successfully',
    };
  } catch (error) {
    console.error('Error fetching sprint data:', error);
    throw new Error('Failed to generate sprint summary');
  }
}

export default onSprintSummary;
