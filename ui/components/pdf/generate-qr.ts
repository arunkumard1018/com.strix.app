import QRCode from "qrcode";

export const generateQr = ({ qrCodeUrl }: { qrCodeUrl: string }) => {
    try {
        QRCode.toDataURL(qrCodeUrl)
    } catch (error) {
        return "null";
    }
}