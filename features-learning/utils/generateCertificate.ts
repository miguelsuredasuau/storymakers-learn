/**
 * Chapter Certificate Generator
 *
 * Generates a professional PDF certificate for completed chapters
 * using jsPDF. Each chapter has a unique design with brand colors.
 */

import { jsPDF } from "jspdf";

interface CertificateOptions {
  userName: string;
  chapterId: "LAYERS" | "AGENTS" | "FRAMEWORK" | "TOOLKIT";
  chapterTitle: string;
  completionDate: Date;
}

// Chapter-specific configurations
const CHAPTER_CONFIG: Record<
  string,
  {
    title: string;
    subtitle: string;
    color: string;
    skills: string[];
  }
> = {
  LAYERS: {
    title: "The 3 Layers",
    subtitle: "Master of Presentation Structure",
    color: "#1a2035",
    skills: [
      "Understanding Block-level narrative architecture",
      "Designing Loop-based storytelling sequences",
      "Crafting effective individual slides",
    ],
  },
  AGENTS: {
    title: "The 3 Agents",
    subtitle: "Master of the Three Presentation Mindsets",
    color: "#F08262",
    skills: [
      "Architect mindset: Logic and structure",
      "Storyteller mindset: Narrative and emotional arc",
      "Designer mindset: Visual clarity and impact",
    ],
  },
  FRAMEWORK: {
    title: "The 10-Step Framework",
    subtitle: "Master of the Storymakers Methodology",
    color: "#82C4CB",
    skills: [
      "Complete brief-to-boardroom process mastery",
      "Arc Matrix and tension management",
      "Professional presentation delivery workflow",
    ],
  },
  TOOLKIT: {
    title: "The Toolkit",
    subtitle: "Master of Practical Application",
    color: "#5BA3A9",
    skills: [
      "Template selection and customization",
      "AI prompt engineering for presentations",
      "Efficient production workflow",
    ],
  },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function generateCertificate(options: CertificateOptions): void {
  const { userName, chapterId, completionDate } = options;
  const config = CHAPTER_CONFIG[chapterId];

  if (!config) {
    console.error("Unknown chapter:", chapterId);
    return;
  }

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  const { r, g, b } = hexToRgb(config.color);
  const navyRgb = hexToRgb("#1a2035");

  // Background - soft cream
  pdf.setFillColor(252, 251, 248);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  // Top accent bar
  pdf.setFillColor(r, g, b);
  pdf.rect(0, 0, pageWidth, 12, "F");

  // Bottom accent bar
  pdf.setFillColor(navyRgb.r, navyRgb.g, navyRgb.b);
  pdf.rect(0, pageHeight - 8, pageWidth, 8, "F");

  // Decorative corner elements (lighter shade)
  const lightR = Math.min(255, r + Math.floor((255 - r) * 0.9));
  const lightG = Math.min(255, g + Math.floor((255 - g) * 0.9));
  const lightB = Math.min(255, b + Math.floor((255 - b) * 0.9));
  pdf.setFillColor(lightR, lightG, lightB);
  pdf.circle(20, 20, 40, "F");
  pdf.circle(pageWidth - 20, pageHeight - 30, 50, "F");

  // Border frame
  pdf.setDrawColor(220, 220, 215);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(15, 18, pageWidth - 30, pageHeight - 36, 3, 3, "S");

  // Inner border with chapter color
  pdf.setDrawColor(r, g, b);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(18, 21, pageWidth - 36, pageHeight - 42, 2, 2, "S");

  // "Certificate of Completion" header
  pdf.setTextColor(150, 150, 145);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.text("CERTIFICATE OF COMPLETION", centerX, 38, { align: "center" });

  // Chapter subtitle (e.g., "Master of...")
  pdf.setTextColor(r, g, b);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "italic");
  pdf.text(config.subtitle, centerX, 50, { align: "center" });

  // Main chapter title
  pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  pdf.setFontSize(36);
  pdf.setFont("helvetica", "bold");
  pdf.text(config.title, centerX, 68, { align: "center" });

  // Decorative line under title
  pdf.setDrawColor(r, g, b);
  pdf.setLineWidth(1);
  const lineWidth = 80;
  pdf.line(centerX - lineWidth / 2, 75, centerX + lineWidth / 2, 75);

  // "This certifies that" text
  pdf.setTextColor(100, 100, 95);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("This certifies that", centerX, 90, { align: "center" });

  // User name
  pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  pdf.setFontSize(28);
  pdf.setFont("helvetica", "bold");
  pdf.text(userName || "Learner", centerX, 105, { align: "center" });

  // Underline under name
  const nameWidth = pdf.getTextWidth(userName || "Learner");
  pdf.setDrawColor(r, g, b);
  pdf.setLineWidth(0.5);
  pdf.line(
    centerX - nameWidth / 2 - 10,
    109,
    centerX + nameWidth / 2 + 10,
    109
  );

  // Completion text
  pdf.setTextColor(100, 100, 95);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("has successfully completed the chapter", centerX, 120, {
    align: "center",
  });

  // Skills section header
  pdf.setTextColor(r, g, b);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("DEMONSTRATED COMPETENCIES", centerX, 134, { align: "center" });

  // Skills list
  pdf.setTextColor(80, 80, 75);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  let skillY = 142;
  for (const skill of config.skills) {
    pdf.text(`• ${skill}`, centerX, skillY, { align: "center" });
    skillY += 6;
  }

  // Date and signature section
  const footerY = pageHeight - 32;

  // Date
  pdf.setTextColor(100, 100, 95);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  const dateStr = completionDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  pdf.text(`Completed: ${dateStr}`, 50, footerY, { align: "center" });

  // Program name
  pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("The Storymakers Method", centerX, footerY, { align: "center" });

  // Credential ID
  pdf.setTextColor(150, 150, 145);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  const credentialId = `SM-${chapterId}-${Date.now().toString(36).toUpperCase()}`;
  pdf.text(`Credential ID: ${credentialId}`, pageWidth - 50, footerY, {
    align: "center",
  });

  // Bottom branding
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.text("storymakers.ai", centerX, pageHeight - 3, { align: "center" });

  // Save the PDF
  const filename = `storymakers-${config.title.toLowerCase().replace(/\s+/g, "-")}-certificate.pdf`;
  pdf.save(filename);
}

export default generateCertificate;
