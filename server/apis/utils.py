import hashlib, re

from urllib.parse import urlencode

def gravatar_url(email="edemy@gmail.com", size=40, default='identicon'):
    email_encoded = email.lower().encode('utf-8')
    email_hash = hashlib.sha256(email_encoded).hexdigest()
    params = urlencode({'d': default, 's': str(size)})
    return f"https://www.gravatar.com/avatar/{email_hash}?{params}"


def detect_output_language(text):
    vietnamese_chars = r'[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]'
    return "Vietnamese" if re.search(vietnamese_chars, text, re.IGNORECASE) else "English"
