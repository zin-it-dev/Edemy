from .models import User

def sync_clerk_user(event):
    type = event.get('type')
    data = event.get('data', {})
    
    clerk_id = data.get('id')
    if not clerk_id:
        return
    
    if type == 'user.created' or type == 'user.updated':
        email_addresses = data.get('email_addresses', [])
        primary_email = next((e['email_address'] for e in email_addresses if e.get('id') == data.get('primary_email_address_id')), 
                            email_addresses[0]['email_address'] if email_addresses else None)

        if not primary_email:
            return 

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        picture = data.get('image_url')
        
        User.objects.update_or_create(
            clerk_id=clerk_id, 
            defaults={
                'username': f'clerk_{clerk_id}',
                'email': primary_email,
                'first_name': first_name,
                'last_name': last_name,
                'picture': picture
            }
        )
    elif type == 'user.deleted':
        User.objects.filter(clerk_id=clerk_id).update(is_active=False)