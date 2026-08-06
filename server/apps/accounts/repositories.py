from common.repositories import GenericRepository
from accounts.models import User


class UserRepository(GenericRepository):
    def __init__(self):
        super().__init__(User)
