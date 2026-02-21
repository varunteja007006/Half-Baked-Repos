import {
  QRCode,
  QRCodeCanvas,
  QRCodeSkeleton,
} from "@/components/ui/qr-code";
 
export function QRCodeDemo() {
  return (
    <QRCode value="https://diceui.com" size={200}>
      <QRCodeSkeleton />
      <QRCodeCanvas />
    </QRCode>
  );
}