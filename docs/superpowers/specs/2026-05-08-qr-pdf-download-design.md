# QR Code PDF Download Feature — Design Spec

**Date:** 2026-05-08  
**Module:** DHO (Desenvolvimento e Treinamento)  
**Feature:** Download QR code as print-ready PDF

---

## Overview

Add download capability to QR codes generated in the **Presença Digital** view. Users can download a PDF containing:
- QR code image (centered, high resolution)
- Training title, date, and location
- Print-ready A4 format

**Use case:** Trainer generates QR, downloads PDF, shares with instructor to display to students during training.

---

## Architecture

### Component Changes

**File:** `src/features/dho/DHOViews.tsx` (PresencaDigitalView)

#### Current State (lines 300–326)
QR code displayed in card with:
- QR image (state.dataUrl)
- Participant list below

#### New Structure
```
QR Card Layout:
┌─ CardContent
│  ├─ [QR Image Container]
│  │  ├─ <img> element
│  │  └─ [Download PDF Button] ← NEW
│  └─ [Participants List]
```

### Button Placement
- Position: Right of QR image, same vertical center
- Icon: `Download` (lucide-react)
- Size: `sm` (consistent with existing action buttons)
- Trigger: `downloadQrPdf(treinamentoId)`

### PDF Generation

**Library:** jsPDF (https://github.com/parallels/jsPDF)
- Already installed in project dependencies
- Lightweight, no server-side dependency

**Function:** `generateQrPdf(qrDataUrl, title, date, location)`
- Input: QR dataUrl, training metadata
- Output: Blob (triggers browser download)
- Filename: `treinamento-{id}-qr.pdf`

**PDF Spec:**
- Format: A4 portrait
- Layout:
  - Margin: 20mm all sides
  - QR image: 150×150mm, centered
  - Text section below (120mm width):
    - Title (bold, 14pt)
    - Date + Location (12pt, gray)
  - Font: system default (jsPDF default)

### Data Flow

1. User clicks download button in QR card
2. `downloadQrPdf()` called with:
   - `qrDataUrl` (from state)
   - `treinamentoId`, `titulo`, `data`, `local` (from mockTreinamentosPresenca)
3. `generateQrPdf()` creates PDF document:
   - Add QR image to canvas
   - Add text metadata below
4. Browser downloads as `treinamento-{id}-qr.pdf`
5. No state changes, no side effects

### State Management
- No new state needed
- Button state: `isGenerating` (optional, for UX feedback)
- Reuse existing `qrStates` to access QR data

---

## Files to Create/Modify

1. **Modify:** `src/features/dho/DHOViews.tsx`
   - Add `downloadQrPdf` function
   - Add Download button to QR card layout
   - Wire click handler

2. **Check:** Dependencies
   - jsPDF should already be in `package.json` (verify)
   - If not, add: `npm install jspdf`

---

## Error Handling

- QR image fails to load: catch error, show toast `"Erro ao gerar PDF"`
- PDF generation fails: catch error, show toast
- Missing training data: graceful fallback (use available fields, skip missing)

---

## Testing Checklist

- [ ] Button appears next to QR image when QR generated
- [ ] Click downloads PDF with correct filename
- [ ] PDF opens in default viewer (or downloads to Downloads folder)
- [ ] PDF contains QR code image
- [ ] PDF contains training title, date, location
- [ ] PDF is print-ready (margins, sizing correct on A4)
- [ ] Works for multiple QR codes (state isolation)
- [ ] Error handling: toast on failure

---

## Future Considerations

- Add PNG/SVG export if needed later (menu approach)
- Print styles (CSS @media print) if needed
- QR code size configuration per use case
- Email integration (send PDF directly to instructor)

---

## Dependencies

- **jsPDF:** PDF generation
- **lucide-react:** Download icon (already imported)
- **qrcode:** QR generation (already in use)

No new major dependencies required.
