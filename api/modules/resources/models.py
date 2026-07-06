from django.db import models
from django.utils.translation import gettext_lazy as _


class Coupon(models.Model):
    class DiscountTypes(models.TextChoices):
        PERCENTAGE_DISCOUNT = "percentage_discount"
        FIXED_CART_DISCOUNT = "fixed_cart_discount"
        FIXED_PRODUCT_DISCOUNT = "fixed_product_discount"
        BOGO = "bogo", _("BOGO (Buy X GET X/Y) Offer")

    class DisplayIn(models.TextChoices):
        MY_ACCOUNT = "my_account"
        CHECKOUT = "checkout"
        CART = "cart"

    code = models.CharField(max_length=20, unique=True, null=True)
    amount = models.FloatField(default=0)
    start_date = models.DateTimeField(auto_now=True)
    expiry_date = models.DateTimeField()
    free_shipping = models.BooleanField(default=False)
    description = models.TextField(max_length=200)
    discount_type = models.CharField(max_length=40, choices=DiscountTypes.choices)
    apply_automatically = models.BooleanField(default=False)
    # display_in = MultiSelectField(max_length=20, max_choices=3, choices=DisplayIn.choices, null=True)
    minimum_spend = models.IntegerField(default=0, null=True)
    maximum_spend = models.IntegerField(default=0, null=True)
    individual_use_only = models.BooleanField(default=False)
    exclude_sale_items = models.BooleanField(default=False)
    email_restrictions = models.TextField(
        help_text="Comma separated list of emails to restrict for access to this coupon",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.code
