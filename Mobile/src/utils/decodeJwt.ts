function base64UrlDecode(str: string) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (str.length % 4) {
        case 0: break;
        case 2: str += '=='; break;
        case 3: str += '='; break;
        default: throw new Error('Invalid base64 string');
    }
    return atob(str);
}

export function decodeJwt(token: string) {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        throw new Error('Invalid token format');
    }
    
    const [headerEncoded, payloadEncoded, signatureEncoded] = tokenParts;
    
    try {
        const payload = JSON.parse(base64UrlDecode(payloadEncoded));
        return payload;
    } catch (error) {
        console.error('Failed to decode payload:', error);
        throw error;
    }
}