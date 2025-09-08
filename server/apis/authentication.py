import requests

from jose import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class Auth0JSONWebTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = request.headers.get("Authorization", None)
        
        if not auth or not auth.startswith('Bearer '):
            return None

        token = auth.split(' ')[1]
        
        try:
            decode = self.verify_token(token)
            if decode:
                data = self.async_user(token)
                
            from .models import User
            
            first_name = f"{data.get('middle_name')} {data.get('family_name')}" if data.get('middle_name') else data.get('family_name')
            nickname = data.get('sub') if 'facebook' in data.get('sub', '') else data.get('nickname')
        
            user, _ = User.objects.get_or_create(
                email=data.get('email', ''),
                defaults={
                    'username': nickname,
                    'last_name': data.get('given_name'),
                    'first_name': first_name,
                    'picture': data.get('picture')
                }
            )
            
            if not _:
                user.email = data.get('email', user.email)
                user.first_name = data.get('given_name', user.first_name)
                user.last_name = data.get('family_name', user.last_name)
                user.picture = data.get('picture', user.picture)
                user.save()
            
            return (user, None)
        except Exception as e:
            raise AuthenticationFailed(f"Token is invalid: {str(e)}")
    
    def verify_token(self, token):
        jwks = requests.get(settings.PUBLIC_KEY_URL).json()
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"],
                }
                    
        if not rsa_key:
            raise AuthenticationFailed("Unable to find appropriate key")

        return jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            audience=settings.API_IDENTIFIER,
            issuer=f"https://{settings.AUTH0_DOMAIN}/",
        )
        
    def async_user(self, token):
        userinfo_url = f"https://{settings.AUTH0_DOMAIN}/userinfo"
        resp = requests.get(
            userinfo_url,
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if resp.status_code != 200:
            raise AuthenticationFailed("Failed to fetch userinfo from Auth0")
        
        return resp.json()