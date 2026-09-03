import pytest
from accounts import tasks


def test_sync_user_from_clerk_accepts_update_alias(monkeypatch):
    handled = []

    monkeypatch.setattr(
        tasks.ClerkWebhookService,
        "handle_user_created_or_updated",
        lambda data: handled.append(data),
    )

    tasks._handle_clerk_user_event("clerk/user.update", {"id": "user_1"})

    assert handled == [{"id": "user_1"}]


def test_sync_user_from_clerk_propagates_processing_error(monkeypatch):
    monkeypatch.setattr(
        tasks.ClerkWebhookService,
        "handle_user_deleted",
        lambda clerk_id: (_ for _ in ()).throw(RuntimeError("boom")),
    )

    with pytest.raises(RuntimeError, match="boom"):
        tasks._handle_clerk_user_event("clerk/user.deleted", {"id": "user_1"})
