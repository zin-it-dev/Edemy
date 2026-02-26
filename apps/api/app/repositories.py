from common.repositories import GenericRepository

from .models import Category


class CategoryRepository(GenericRepository):
    def __init__(self):
        super().__init__(Category)
