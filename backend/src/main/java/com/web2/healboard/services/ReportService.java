package com.web2.healboard.services;

import com.web2.healboard.models.pagamento.Pagamento;
import com.web2.healboard.repositories.CategoriaEquipamentoRepository;
import com.web2.healboard.repositories.PagamentoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final PagamentoRepository pagamentoRepository;
    private final CategoriaEquipamentoRepository categoriaRepository; // Inject the repository

    public byte[] generateFaturamentoReport(String categoria, LocalDate startDate, LocalDate endDate) throws IOException {
        List<Pagamento> faturamentos;
    
        LocalDateTime startDateTime = null;
        LocalDateTime endDateTime = null;
    
        if (startDate != null && endDate != null) {
            startDateTime = startDate.atStartOfDay();
            endDateTime = endDate.atTime(LocalTime.MAX);
        }
    
        List<Long> categoriaIds = null;
    
        if (categoria != null) {
            // Fetch category IDs based on the name
            categoriaIds = categoriaRepository.findIdsByNome(categoria);
    
            if (categoriaIds.isEmpty()) {
                throw new IllegalArgumentException("No categories found for the given name.");
            }
        }
    
        // Fetch faturamentos based on filters
        if ((categoriaIds == null || categoriaIds.isEmpty()) && startDateTime == null && endDateTime == null) {
            faturamentos = pagamentoRepository.findAll();
        } else if (categoriaIds != null && !categoriaIds.isEmpty() && startDateTime != null && endDateTime != null) {
            faturamentos = pagamentoRepository.findByCategoriaIdInAndDataHoraCriacaoBetween(categoriaIds, startDateTime, endDateTime);
        } else if (categoriaIds != null && !categoriaIds.isEmpty()) {
            faturamentos = pagamentoRepository.findByCategoriaIdIn(categoriaIds);
        } else if (startDateTime != null && endDateTime != null) {
            faturamentos = pagamentoRepository.findByDataHoraCriacaoBetween(startDateTime, endDateTime);
        } else {
            throw new IllegalArgumentException("Invalid filter parameters.");
        }
    
        // Generate PDF
        return createPdf(faturamentos, categoriaIds, startDate, endDate);
    }

    /**
     * Creates a PDF document with the provided faturamentos.
     *
     * @param faturamentos List of faturamentos to include in the report.
     * @param categoriaIds List of category IDs used for filtering (can be null).
     * @param startDate    Start date used for filtering (can be null).
     * @param endDate      End date used for filtering (can be null).
     * @return A byte array representing the generated PDF.
     * @throws IOException If an error occurs during PDF creation.
     */
    private byte[] createPdf(List<Pagamento> faturamentos, List<Long> categoriaIds, LocalDate startDate, LocalDate endDate) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);
    
            PDPageContentStream contentStream = new PDPageContentStream(document, page);
    
            try {
                // Title
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 20);
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 750);
                contentStream.showText("Relatório de Faturamento");
                contentStream.endText();
    
                // Filters Information
                contentStream.setFont(PDType1Font.HELVETICA, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 720);
                StringBuilder filters = new StringBuilder("Filtros aplicados: ");
                if (categoriaIds != null && !categoriaIds.isEmpty()) {
                    filters.append("Id da categoria: ").append(categoriaIds);
                }
                if (startDate != null && endDate != null) {
                    filters.append("Filtro de datas: [").append(startDate).append(" até ").append(endDate).append("]");
                }
                contentStream.showText(filters.toString());
                contentStream.endText();
    
                // Table Header
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 690);
                contentStream.showText(String.format("%-40s %-20s %-20s", "Categoria", "Valor", "Data"));
                contentStream.endText();
    
                // Table Content
                contentStream.setFont(PDType1Font.HELVETICA, 12);
                float yPosition = 670;
                float totalSum = 0; // To accumulate the total sum of the 'Valor' column
    
                for (Pagamento f : faturamentos) {
                    if (yPosition < 50) {
                        // Close current content stream before adding a new page
                        contentStream.close();
    
                        // Add a new page
                        page = new PDPage(PDRectangle.A4);
                        document.addPage(page);
                        yPosition = 750;
    
                        // Open a new content stream for the new page
                        contentStream = new PDPageContentStream(document, page);
    
                        // Repeat headers on new page
                        contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                        contentStream.beginText();
                        contentStream.newLineAtOffset(50, 750);
                        contentStream.showText(String.format("%-40s %-20s %-20s", "Categoria", "Valor", "Data"));
                        contentStream.endText();
    
                        contentStream.setFont(PDType1Font.HELVETICA, 12);
                    }
    
                    contentStream.beginText();
                    contentStream.newLineAtOffset(50, yPosition);
                    String line = String.format("%-40s %-20s %-20s",
                            f.getCategoria().getNome(),
                            f.getValor().toString(),
                            f.getDataHoraCriacao().toLocalDate().toString());
                    contentStream.showText(line);
                    contentStream.endText();
    
                    // Accumulate the total sum
                    totalSum += f.getValor();
    
                    yPosition -= 20;
                }
    
                // Add the total sum at the end of the document
                if (yPosition < 50) {
                    // Close current content stream before adding a new page
                    contentStream.close();
    
                    // Add a new page
                    page = new PDPage(PDRectangle.A4);
                    document.addPage(page);
                    yPosition = 750;
    
                    // Open a new content stream for the new page
                    contentStream = new PDPageContentStream(document, page);
                }
    
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(50, yPosition - 20);
                contentStream.showText(String.format("Total Faturamento: R$ %.2f", totalSum));
                contentStream.endText();
    
            } finally {
                // Ensure the content stream is closed even if an exception occurs
                contentStream.close();
            }
    
            // Save to byte array
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.save(out);
            return out.toByteArray();
        }
    }    
    
    /**
     * Retrieves all reports (Pagamento data) from the database.
     *
     * @return List of all Pagamento entities.
     */
    public List<Pagamento> getAllReports() {
        return pagamentoRepository.findAll();
    }

}
