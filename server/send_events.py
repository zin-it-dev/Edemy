import urllib.request
import json
import time

events = [
    {
        "name": "clerk/user.created",
        "data": {
            "id": "user_test_inngest_1",
            "email_addresses": [{"email_address": "test1@edemy.app"}],
            "first_name": "Test",
            "last_name": "Created",
        },
    },
    {
        "name": "clerk/user.updated",
        "data": {
            "id": "user_test_inngest_1",
            "email_addresses": [{"email_address": "test1_updated@edemy.app"}],
            "first_name": "Test",
            "last_name": "Updated",
        },
    },
    {
        "name": "clerk/user.deleted",
        "data": {"id": "user_test_inngest_1", "deleted": True},
    },
]

url = "http://localhost:8288/e/test"

print("Sending events to Inngest Dev Server at http://localhost:8288/e/test...")

for event in events:
    data = json.dumps(event).encode("utf-8")
    req = urllib.request.Request(
        url, data=data, headers={"Content-Type": "application/json"}
    )
    try:
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode("utf-8"))
        print(f"[SUCCESS] Sent {event['name']} - Event IDs: {result.get('ids', [])}")
    except Exception as e:
        print(f"[ERROR] Failed to send {event['name']}: {e}")
    time.sleep(1)  # Small delay between events
