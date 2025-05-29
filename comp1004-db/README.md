# COMP1004 Coursework Submission

**Student Name:** Temilade Agunpopo  
**Submission Date:** 15 May 2025

---

## Overview

This project implements a web-based vehicle and people management system using HTML, CSS, and JavaScript, connected to a Supabase PostgreSQL database. The program passes all coursework requirements including accessibility, responsive design, database integration, and Playwright testing compatibility.

---

## Accessibility

- Achieved a **100% accessibility score** on Google Lighthouse for all three pages (`people.html`, `vehicle.html`, `add-vehicle.html`).
- Fixed common accessibility issues including:
  - Proper `<label>` usage for all form fields.
  - Meaningful `alt` attributes on all images.
  - Adequate button sizes and spacing for touch targets.
- See attached screenshot: `lighthouse.png`.

---

## Responsive Design

- The layout is fully responsive using CSS Grid and Flexbox.
- At screen widths below 500px:
  - Navigation links stack vertically.
  - Sidebar moves below the main content.
  - Footer and other sections adjust for mobile usability.
- See attached screenshot: `responsive.png`.

---

## JavaScript Testing and Edge Cases

The JavaScript modules (`people.js`, `vehicle.js`, `add-vehicle.js`) implement all required features with strong error handling. Notable test cases and edge cases handled are listed below:

- **People Search:**
  - Partial and case-insensitive name matching.
  - Exact license number matching.
  - Error if both or neither input fields are filled.
  - Displays “No result found” when no matches.

- **Vehicle Search:**
  - Exact registration (VehicleID) lookup.
  - Handles vehicles without linked owners.
  - Shows appropriate messages for missing vehicles.

- **Add Vehicle:**
  - Owner name search with partial matching.
  - Ability to add new owner if not found.
  - Prevents duplicate owners by checking all owner fields.
  - Prevents duplicate VehicleID insertion.
  - Requires all vehicle and owner fields before submission.
  - Gracefully handles empty or invalid inputs.
  - Handles simultaneous submission attempts with clear error messages.

---

## Playwright Compatibility

- All required HTML element IDs and labels match the coursework specification.
- Headings and button texts are consistent for automated tests.
- No known compatibility issues with provided Playwright tests.
- Tested locally and with the supplied Playwright test suite.

---

## Additional Features

- Added client-side validation for date inputs to prevent future DOB or expired licenses.
- Added confirmation prompts before overwriting existing vehicles during add.
- Enhanced UI feedback with clear success and error messages.
- Improved keyboard navigation support for accessibility.

---

## Supabase Project

- Supabase URL: `https://gkhejfrrckaaoxjpxjti.supabase.co`
- Database schema was not modified from the original provided.
- I tried to create a Cron job setup to prevent project sleep.

---

## How to Run

1. Serve the project folder using a local HTTP server (e.g., VSCode Live Server or Python's `http.server`).
2. Open the HTML pages in a modern browser.
3. Ensure internet access for loading the Supabase JS client from CDN.
4. Interact with the pages to search, add people and vehicles.

---

Thank you for reviewing my coursework.

---

*End of README.md*