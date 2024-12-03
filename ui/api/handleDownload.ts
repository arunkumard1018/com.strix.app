import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleDownloadPDF = async (fileName: string) => {
    const invoiceElement = document.getElementById("preview");

    if (!invoiceElement) {
        alert("Invoice content not found!");
        return;
    }

    invoiceElement.style.backgroundColor = "white";
    invoiceElement.style.color = "black";

    // Capture the element with html2canvas
    const canvas = await html2canvas(invoiceElement, {
        scale: 1.5, // Adjust scale for resolution (1 or 1.5)
        useCORS: true, // Handle cross-origin images if necessary
        backgroundColor: "#ffffff", // Background to white
    });

    // Hide elements (like print buttons or extra content)
    const elementsToHide = document.querySelectorAll(".no-print");
    elementsToHide.forEach((el) => {
        const htmlElement = el as HTMLElement;
        htmlElement.style.display = "none"; // Hide elements
    });

    // Restore hidden elements after capturing
    elementsToHide.forEach((el) => {
        const htmlElement = el as HTMLElement;
        htmlElement.style.display = ""; // Restore visibility
    });

    // Convert canvas to JPEG (adjust quality if needed)
    const imageData = canvas.toDataURL("image/jpeg", 0.7); // JPEG for better file size

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;

    // Add image to PDF with correct scaling
    if (imgHeight > pdfHeight) {
        let remainingHeight = imgHeight;
        while (remainingHeight > 0) {
            pdf.addImage(imageData, "JPEG", 0, position, pdfWidth, pdfHeight);
            remainingHeight -= pdfHeight;
            position -= pdfHeight;

            // Add a new page if the content exceeds one page
            if (remainingHeight > 0) {
                pdf.addPage();
                position = 0; // Reset position for the next page
            }
        }
    } else {
        // If content fits in one page, add it normally
        pdf.addImage(imageData, "JPEG", 0, 0, pdfWidth, imgHeight);
    }

    // Save the PDF
    pdf.save(fileName);
};
