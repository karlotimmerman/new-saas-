# backend/copilotkit/actions.py

from copilotkit import CopilotKitSDK, Action as CopilotAction

# Define a backend action for CopilotKit
async def fetch_name_for_user_id(userId: str):
    # Replace with your logic to fetch data for a given userId
    return {"name": f"User_{userId}"}

action = CopilotAction(
    name="fetchNameForUserId",
    description="Fetches the user name based on the provided ID",
    parameters=[
        {
            "name": "userId",
            "type": "string",
            "description": "The ID of the user",
            "required": True
        }
    ],
    handler=fetch_name_for_user_id
)

sdk = CopilotKitSDK(actions=[action])
