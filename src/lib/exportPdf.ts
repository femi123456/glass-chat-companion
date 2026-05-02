import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportElementToPdf(el: HTMLElement, filename: string) {
  const canvas = await html2canvas(el, {
    backgroundColor: "#080809",
    scale: 2,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(filename);
}
