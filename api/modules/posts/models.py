from common.models import AbstractInteraction
from django.db import models
from django.utils.translation import gettext_lazy as _


class Comment(AbstractInteraction):
    """
    Stores a single comment entry, related to :model:`app.Comment` and
    :model:`app.User`.
    """

    content = models.TextField(_("content"))

    class Meta(AbstractInteraction.Meta):
        verbose_name = _("comment")
        verbose_name_plural = _("comments")

    def __str__(self):
        return self.content


class Like(AbstractInteraction):
    """
    Stores a single like entry, related to :model:`app.Like` and
    :model:`app.User`.
    """

    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_("Uncheck this box to active the record."),
    )

    class Meta(AbstractInteraction.Meta):
        verbose_name = _("like")
        verbose_name_plural = _("likes")
        constraints = [
            models.UniqueConstraint(
                fields=["creator", "content_type", "object_id"],
                name="unique_active_creator",
            )
        ]
