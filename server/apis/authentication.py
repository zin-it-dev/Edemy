import requests, logging

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from jose import jwt, jwk

from .repositories import UserRepository

logger = logging.getLogger(__name__)

cached_jwks: dict | None = None

def get_clerk_jwks() -> dict:
    global cached_jwks
    if cached_jwks is None:
        try:
            response = requests.get(settings.CLERK_JWKS_URL)
            response.raise_for_status() 
            cached_jwks = response.json()
        except Exception as e:
            logger.error(f"Failed to fetch Clerk JWKS from URL: {settings.CLERK_JWKS_URL}. Error: {e}")
            raise AuthenticationFailed("Failed to fetch required authentication keys.")
    return cached_jwks


class ClerkAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
        
        token = auth_header.split(' ')[1]
        
        try:
            jwks = get_clerk_jwks()
            
            header = jwt.get_unverified_header(token)
            key_id = header.get('kid')
            
            key_data = next(key for key in jwks['keys'] if key['kid'] == key_id)
            key = jwk.construct(key_data)
        
            payload = jwt.decode(
                token, 
                key, 
                algorithms=["RS256"],
                options={"verify_signature": True, "verify_aud": False} 
            )

            clerk_id = payload.get('sub')
            
            user = UserRepository().get_by_clerk_id(clerk_id)
            
            return (user, token)
            
        except ObjectDoesNotExist:
            raise AuthenticationFailed('User account not synchronized or inactive.')
        except StopIteration:
            raise AuthenticationFailed('Invalid key ID in token header.')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired.')
        except Exception as e:
            logger.error(f"Clerk JWT Verification Error: {e}")
            raise AuthenticationFailed('Authentication failed due to invalid token.')