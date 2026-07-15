export const WHATSAPP_NUMBER = "6287777373956";
export const WHATSAPP_DISPLAY = "+62 877-7737-3956";
export const INSTAGRAM_URL = "https://www.instagram.com/bece.asia/";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
