import jsPDF from "jspdf";
import type { Message, Persona } from "@/types";

export async function exportElementToPdf(
  messages: Message[],
  persona: Persona,
  filename = "femi-ai-chat.pdf",
) {
  // Create a simple text-based PDF using jsPDF
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 40;
  const maxLineWidth = pageWidth - margin * 2;
  let y = margin;

  pdf.setFont("courier");
  pdf.setFontSize(14);
  pdf.text("femi.ai chat export", margin, y);

  pdf.setFontSize(10);
  const now = new Date().toLocaleString();
  pdf.text(`Exported: ${now}`, pageWidth - margin, y, { align: "right" });
  y += 18;

  pdf.setDrawColor(200);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 12;

  const lineHeightHeader = 12;
  const lineHeight = 14;

  for (const m of messages) {
    const tag = m.role === "user" ? "YO" : persona.tag;
    const who = m.role === "user" ? "You" : persona.name;
    const time = new Date(m.timestamp).toLocaleString();

    const header = `[${tag}] ${who} — ${time}`;
    const headerLines = pdf.splitTextToSize(header, maxLineWidth);

    if (y + headerLines.length * lineHeightHeader > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.setFontSize(10);
    pdf.setTextColor(80);
    pdf.text(headerLines, margin, y);
    y += headerLines.length * lineHeightHeader + 4;

    pdf.setFontSize(11);
    pdf.setTextColor(20);
    const contentLines = pdf.splitTextToSize(m.content, maxLineWidth);
    for (const line of contentLines) {
      if (y + lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += lineHeight;
    }

    y += 10; // spacer between messages
  }

  pdf.save(filename);
}
