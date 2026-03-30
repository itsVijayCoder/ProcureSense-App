# Add Analysis Flow Guide

This document explains the current Add Analysis experience in ProcureSense and
how to reproduce the same workflow in another product.

The flow is a four-step wizard that starts from an uploaded Request for Proposal
(RFP) PDF, extracts structured data, lets the user review and edit the extracted
content, uploads proposal PDFs, and then performs a final proposal-level review
before starting the analysis.

---

## 1. What The Flow Does

1. The user uploads one RFP PDF.
2. The backend ingests the file and returns an analysis id.
3. The app fetches parsed RFP and analysis data and shows them in editable form.
4. The user uploads one or more proposal PDFs.
5. The app fetches parsed proposal data and shows each proposal in a review
   editor.
6. The user saves all edits and starts the analysis job.

The flow is implemented as a client-side wizard in
`app/(dashboard)/add-analysis/page.js` with four child step components:

- `components/pages/step1.js`
- `components/pages/step2.js`
- `components/pages/step3.js`
- `components/pages/step4.js`

Shared wizard state is stored in `stores/addAnalyse.js`.

---

## 2. High-Level UX Pattern

The current UI uses a card-based wizard layout with a simple, linear
progression.

Key UI traits:

- The page header is minimal: title plus short subtitle.
- Each step sits inside a centered card with a form-like structure.
- Primary actions live in the card footer.
- Secondary actions use outline buttons.
- The interface relies heavily on inline badges to show missing values or
  warnings.
- A restore action is available in the editable review steps so the user can
  revert to the ingested defaults.

If you are implementing this in another project, keep the same mental model: one
task per step, one primary action per step, and visible progress at all times.

---

## 3. Step-By-Step Behavior

### Step 1: Upload RFP

Source: `components/pages/step1.js`

What the user sees:

- A single file input for the RFP document.
- The file must be a PDF.
- Once a file is selected, the UI shows the filename, size, and a remove icon.

Behavior:

- Only one file is allowed.
- On submit, the file is sent to the backend as `multipart/form-data`.
- On success, the backend returns an analysis id.
- The app immediately fetches the parsed RFP data for that id and moves to
  Step 2.

UX guidance for another project:

- Make the upload state obvious.
- Show the selected file as a compact file card instead of leaving the raw input
  visible alone.
- Provide a remove action so the user can correct mistakes before submission.
- Validate file type early and clearly.

### Step 2: Review RFP Metadata

Source: `components/pages/step2.js`

What the user sees:

- Editable analysis metadata such as name, tags, and description.
- Editable extracted RFP information such as company name, release date,
  address, delivery terms, payment terms, scope of work, and contact fields.
- A Restore Default button.
- Badges that call out missing values.

Behavior:

- The step is prefilled from the ingested analysis and RFP data.
- The user edits values directly in the form.
- Tags are managed as individual chips.
- Maximum tags: 6.
- Duplicate tags are blocked.
- Delivery terms, payment terms, and terms and conditions are edited as
  newline-separated text and converted back into arrays for the payload.
- Restore Default resets the fields to the ingested values.
- Submit saves analysis metadata and RFP metadata separately, then moves to
  Step 3.

UX guidance for another project:

- Break the form into visual sections with fieldsets or similarly strong
  grouping.
- Keep the analysis metadata visually distinct from the raw RFP extraction
  fields.
- Use chips or badges for tags so the interaction feels lightweight.
- Show missing data as a warning badge, but do not block editing.
- Keep the restore action visible; this step is the main point where users will
  want to compare parsed data against source data.

Important implementation note:

- The current code validates name, description, and tags before saving. If you
  port this, validate tag count using a clean array-length check instead of
  depending on a possibly undefined value.

### Step 3: Upload Proposals

Source: `components/pages/step3.js`

What the user sees:

- A file input for proposal documents.
- Multiple PDF files can be uploaded.
- Each uploaded file appears in a list with filename, size, and a remove icon.

Behavior:

- The input accepts multiple files.
- The current implementation also uses a directory-style selection hint, so the
  user can select a folder containing PDFs in supported browsers.
- Only PDF files are kept.
- The file list is stored in shared state.
- Submit uploads all proposal files, fetches parsed proposal data, and moves to
  Step 4.

UX guidance for another project:

- Make bulk upload feel intentional, not like a generic file field.
- If you support folder selection, make it explicit in helper text because it is
  browser-dependent.
- Show each file as a removable item so the user can fix a bad upload without
  restarting.
- Keep upload feedback simple and visible; proposal ingestion is the most
  failure-prone step after RFP upload.

### Step 4: Review Each Proposal

Source: `components/pages/step4.js`

What the user sees:

- A proposal-by-proposal editor.
- Previous and Next navigation between proposals.
- A Restore Default action for the current proposal.
- Inline warnings when the proposal company name appears to match the RFP client
  name.
- A final action that changes from Next to Start Analyse on the last proposal.

Behavior:

- The editor loads one proposal at a time.
- Changes are synced back to shared state as the user edits.
- Navigation preserves edits before moving to another proposal.
- Company names are compared against the RFP client name using normalized
  substring matching and fuzzy similarity.
- If a proposal name looks like the client name, the UI shows a warning badge,
  an inline note, and a toast warning.
- On the last proposal, the action becomes Start Analyse.
- Before the final submit, numeric fields in the scope of work are converted to
  strings to satisfy backend validation.
- The proposal payload is saved, then the analysis is started, the wizard state
  is cleared, and the app navigates back to the analysis list.

UX guidance for another project:

- Treat this as a review queue, not a normal form.
- Show the proposal index clearly, because users need to know how far they are
  in the batch.
- Keep the previous/next actions fixed in a predictable location.
- Use a strong visual warning when the proposal company name conflicts with the
  RFP client name.
- Preserve the Restore Default behavior so the user can back out of accidental
  edits.

Important implementation note:

- The matching rule is intentionally conservative: exact substring match first,
  then fuzzy similarity with a threshold around 40 percent.
- In another product, tune that threshold to your domain. Procurement data is
  messy, so you want warnings that are useful but not noisy.

---

## 4. Data Model And State

Shared state lives in a Zustand store with these values:

- `analyseId`
- `stage`
- `analyseData`
- `requestForProposalData`
- `proposalData`
- `requestForProposalFileList`
- `proposalFileList`

The wizard page reads from this store to decide which step to show and which
data to prefill.

Practical rule for a new project:

- Keep the upload step state, extracted metadata, and proposal review state in
  one shared store or in a single orchestration layer.
- Do not scatter this across unrelated local component state if you want
  restore/reset behavior to remain predictable.

---

## 5. Backend Contract

The current flow expects these backend actions:

- `POST /ingest/rp` to upload the RFP PDF.
- `GET /analyse/rp?id=...` to fetch parsed RFP and analysis data.
- `POST /analyse/edit` to save analysis metadata.
- `POST /analyse/edit/rp` to save RFP metadata.
- `POST /ingest/p` to upload proposal PDFs.
- `GET /analyse/p?id=...` to fetch parsed proposal data.
- `POST /analyse/edit/p` to save proposal edits.
- `PUT /analyse?id=...` to start the analysis.

Helper functions are centralized in `utils/addAnalyse.js`, and the final start
call is in `utils/dashboard.js`.

Implementation advice for another project:

- Keep ingestion and edit APIs separate.
- Return a stable id from the initial ingestion step, and use that id for all
  later fetch and update operations.
- Make the final start action explicit so the user can review everything before
  triggering processing.

---

## 6. UI/UX Rules Worth Preserving

These are the strongest design patterns from the current implementation:

1. One step per screen.
2. A clear primary action in the footer.
3. A secondary back action when the step supports it.
4. Inline badges for missing fields.
5. Restore defaults in review/edit steps.
6. File preview cards for uploads.
7. Batch editing for proposals with per-item navigation.
8. Strong warning treatment when extracted data looks suspicious.

Recommended improvements if you are building this fresh:

- Add a visible stepper or progress indicator.
- Add autosave or draft persistence if the flow is long.
- Use sticky footer actions on smaller screens.
- Provide loading skeletons during ingestion and fetch operations.
- Add clearer empty states and helper text for file selection.

---

## 7. Validation And Edge Cases

Plan for these cases in the new project:

- No RFP file selected.
- More than one RFP file selected.
- Proposal upload contains non-PDF files.
- Empty required metadata fields.
- Duplicate tags.
- More than the tag limit.
- Proposal company name matches the client name.
- No proposal files uploaded.
- Numeric fields in scope of work arriving as empty strings or numbers.

If you want the UX to feel polished, show errors near the field and also use a
toast for global feedback when submission fails.

---

## 8. Suggested Component Structure For Another Project

If you are recreating this flow, a clean structure would be:

- `AddAnalysisWizard` as the orchestration page.
- `RfpUploadStep`
- `RfpReviewStep`
- `ProposalUploadStep`
- `ProposalReviewStep`
- `useAddAnalysisStore` or a wizard context for shared state.
- `api/addAnalysis` for all backend calls.

That structure keeps the flow readable and makes it easier to reuse the wizard
in a different product.

---

## 9. Porting Checklist

Use this checklist when implementing the same flow elsewhere:

- Define the wizard stages and the transition rules.
- Create a shared state model for ids, uploaded files, and extracted data.
- Implement file ingestion endpoints first.
- Build the review forms after the data contract is stable.
- Add restore-default behavior before adding advanced validation.
- Add conflict detection for suspicious proposal metadata.
- Make the final submission explicit and irreversible only after review.
- Add responsive layout and loading states before release.

---

## 10. Source Files To Review

- `app/(dashboard)/add-analysis/page.js`
- `components/pages/step1.js`
- `components/pages/step2.js`
- `components/pages/step3.js`
- `components/pages/step4.js`
- `stores/addAnalyse.js`
- `utils/addAnalyse.js`
- `utils/dashboard.js`

This guide should give you enough structure to reproduce the flow in another
codebase without copying the UI blindly. Use the same flow model, but adapt the
visual language and validation rules to the target product.
