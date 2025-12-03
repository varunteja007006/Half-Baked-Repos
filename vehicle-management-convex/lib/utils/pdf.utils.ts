import { DocumentProps, pdf } from "@react-pdf/renderer";

export async function handlePDFDownload(
  pdfDocument: React.ReactElement<DocumentProps>,
  fileName = "document.pdf",
) {
  const blob = await pdf(pdfDocument).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
