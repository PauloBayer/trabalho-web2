package com.web2.healboard.controllers;

import com.web2.healboard.services.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    /**
     * Endpoint to download the Faturamento report as a PDF.
     *
     * @param categoriaIds Optional list of category UUIDs to filter faturamentos.
     * @param startDate    Optional start date for filtering (format: yyyy-MM-dd).
     * @param endDate      Optional end date for filtering (format: yyyy-MM-dd).
     * @return The PDF file as a downloadable response.
     */
    @GetMapping("/faturamento")
    public ResponseEntity<byte[]> downloadFaturamentoReport(
            @RequestParam(value = "categoriaIds", required = false) String categoriaIds,
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<UUID> categoriaUUIDs = null;

        if (categoriaIds != null && !categoriaIds.isEmpty()) {
            try {
                categoriaUUIDs = Arrays.stream(categoriaIds.split(","))
                        .map(String::trim)
                        .map(UUID::fromString)
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        try {
            byte[] pdfBytes = reportService.generateFaturamentoReport(categoriaUUIDs, startDate, endDate);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            String filename = "Faturamento_Report.pdf";
            headers.setContentDispositionFormData("attachment", filename);
            headers.setContentLength(pdfBytes.length);

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .body(pdfBytes);
        } catch (IllegalArgumentException e) {
            // Return 400 Bad Request with error message
            return ResponseEntity
                    .badRequest()
                    .body(null);
        } catch (IOException e) {
            // Return 500 Internal Server Error
            return ResponseEntity
                    .status(500)
                    .body(null);
        }
    }
}
