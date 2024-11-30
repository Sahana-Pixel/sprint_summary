import { sendMessageToSlack } from "./slack";

describe("sendMessageToSlack", () => {
    it("should send a message to Slack", async () => {
        const mockMessage = "Test message to Slack";

        // Mocking fetch to simulate success response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                statusText: "OK",
            })
        ) as jest.Mock;

        await sendMessageToSlack(mockMessage);

        expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: mockMessage }),
        });
    });
});
