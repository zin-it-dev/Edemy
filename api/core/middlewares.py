from .models import User


class PasswordChangeEnforcementMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = request.user

        if user.is_authenticated and user.role == User.Role.TEACHER:
            pass

        response = self.get_response(request)
        return response
