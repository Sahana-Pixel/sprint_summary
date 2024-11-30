import { client, publicSDK } from "@devrev/typescript-sdk";
import { sendMessageToSlack } from '../../utils/slack'; // Import Slack utility function
import { AxiosResponse } from 'axios'; // Import AxiosResponse for type definition

// Define the expected structure of the response from worksList
interface WorkItem {
  title: string;
  description: string | null;
  created_by: string;
}

interface WorksListResponse {
  items: WorkItem[];
}

// Handles individual events
export async function handleEvent(event: any) {
  const devrevPAT = event.context.secrets.service_account_token;
  const APIBase = event.execution_metadata.devrev_endpoint;
  const devrevSDK = client.setup({
    endpoint: APIBase,
    token: devrevPAT,
  });

  try {
    // Fetch the latest work item and type the response properly
    const response: AxiosResponse<WorksListResponse> = await devrevSDK.worksList({
      limit: 1,
      type: [publicSDK.WorkType.Ticket],
    });

    // Extract work details (now TypeScript knows that response.items exists)
    const workItem = response.data.items[0];
    if (workItem) {
      const { title, description, created_by } = workItem;

      // Prepare a Slack message
      const message = `New Work Created: \nTitle: ${title}\nDescription: ${description || "No description"}\nCreated by: ${created_by}`;

      // Send the message to Slack
      await sendMessageToSlack(message);
    }

    return response;
  } catch (error) {
    console.error("Error handling event:", error);
    return error;
  }
}

// Run function for processing multiple events
export const run = async (events: any[]) => {
  for (let event of events) {
    await handleEvent(event);
  }
};

export default run;
