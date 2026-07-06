from django.db import models


class Enrollment(Interaction):
    """
    Stores a single enrollment entry, related to :model:`app.Enrollment` :model:`app.Course` and
    :model:`app.User`.
    """

    class Status(models.TextChoices):
        PENDING = "PE", _("Pending")
        COMPLETED = "CO", _("Completed")
        CANCELLED = "CA", _("Cancelled")

    status = models.CharField(
        _("status"),
        max_length=2,
        choices=Status,
        default=Status.PENDING,
    )

    class Meta(Interaction.Meta):
        verbose_name = _("enrollment")
        verbose_name_plural = _("enrollments")


class Payment:
    """
    Stores a single payment entry, related to :model:`app.Payment` and
    :model:`app.User`.
    """

    class Methods(models.TextChoices):
        MOMO = "momo", _("MoMo")
        VNPAY = "vnpay", _("VNPAY")
        STRIPE = "stripe", _("STRIPE")

    enrollment = models.ForeignKey(
        Enrollment, on_delete=models.CASCADE, verbose_name=_("enrollment")
    )
    total_price = models.DecimalField(
        _("total price"), max_digits=10, decimal_places=2, default=0.00
    )
    transaction_id = models.CharField(_("transaction id"), max_length=255, unique=True)
    method = models.CharField(
        _("method"),
        max_length=10,
        choices=Methods,
        default=Methods.STRIPE,
    )

    class Meta:
        verbose_name = _("payment")
        verbose_name_plural = _("payments")
