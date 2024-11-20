import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleDownloadPDF = async (fileName:string) => {
    const invoiceElement = document.getElementById("invoice");

    if (!invoiceElement) {
        alert("Invoice content not found!");
        return;
    }

    // Hide elements
    const elementsToHide = document.querySelectorAll(".no-print");

    elementsToHide.forEach((el) => {
        // Cast to HTMLElement
        const htmlElement = el as HTMLElement;
        htmlElement.style.display = "none"; // Now 'style' is available
    });

    // Render the content to a canvas
    const canvas = await html2canvas(invoiceElement, {
        scale: 2, // High-quality scaling
        useCORS: true,
    });

    // Restore hidden elements
    elementsToHide.forEach((el) => {
        const htmlElement = el as HTMLElement;
        htmlElement.style.display = ""; // Restore visibility
    });

    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight > pdfHeight) {
        let position = 0;
        let remainingHeight = imgHeight;

        while (remainingHeight > 0) {
            pdf.addImage(imageData, "PNG", 0, position, pdfWidth, pdfHeight);
            remainingHeight -= pdfHeight;
            position -= pdfHeight;

            if (remainingHeight > 0) pdf.addPage();
        }
    } else {
        pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, imgHeight);
    }

    // Save the PDF
    pdf.save(fileName);
};