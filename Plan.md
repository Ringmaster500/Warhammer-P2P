# P2P Warhammer Rental Marketplace: Master AI Execution Plan

## 🛠️ Phase 1: Infrastructure & Foundation
**Goal:** Stand up the core environment so the frontend has something to talk to.

* [ ] **1.1 Server Setup:** Provision VPS and install Coolify.
* [ ] **1.2 Database:** Deploy a single Postgres instance via Coolify.
* [ ] **1.3 Object Storage:** Provision Cloudflare R2 bucket and set up CORS policies for direct browser uploads.
* [ ] **1.4 Backend Engine:** Deploy Directus via Coolify, connect it to the Postgres database and R2 bucket.
* [ ] **1.5 API Proxies:** Expose the Directus API and secure it with initial admin tokens.

## 🗄️ Phase 2: Database Schema & Core Logic
**Goal:** Define the exact shape of the data in Directus before any UI is built.

* [ ] **2.1 User Roles:** Create `Host` and `Renter` roles in Directus.
* [ ] **2.2 Collections (Tables) - Listings:** Create table with Title, Description, Daily_Rate, Replacement_Value, R2_Image_URLs.
* [ ] **2.3 Collections (Tables) - Bookings:** Create table with Listing_ID, Renter_ID, Start_Date, End_Date, Total_Cost, Status (Pending, Shipped, Active, Returning, Complete, Disputed).
* [ ] **2.4 Collections (Tables) - KYC_Status:** Create table with Stripe_Identity_ID and Verification_Status.
* [ ] **2.5 Relational Mapping:** Link Users to Listings (One-to-Many) and Users to Bookings in Directus.

## 🎨 Phase 3: Frontend Foundation & API Integrations
**Goal:** Build the UI shell and hook up the third-party services.

* [ ] **3.1 Initialize App:** Scaffold Next.js boilerplate with Tailwind CSS.
* [ ] **3.2 Theming:** Implement the orange-dominant design system (e.g., primary hex `#F97316`) focusing on high-contrast Call-to-Action buttons for psychological urgency.
* [ ] **3.3 Component Library:** Build reusable UI components (Nav bar, modal wrappers, input fields, image carousels).
* [ ] **3.4 Auth State:** Connect Next.js to Directus authentication endpoints (Login/Register/Logout).
* [ ] **3.5 Stripe Connect:** Setup platform account, generate test API keys, and build a Directus endpoint to handle Connect onboarding.
* [ ] **3.6 Stripe Identity:** Configure identity verification webhooks to update the `KYC_Status` table in Directus.
* [ ] **3.7 Shippo API:** Configure Shippo test API keys and set up basic address validation endpoints.

## 🤝 Phase 4: Core User Flows
**Goal:** Build the interfaces for users to list items and book them.

* [ ] **4.1 Listing Creation Flow:** Build Next.js form for hosts to upload Warhammer armies. Ensure images upload to R2 and return URLs to Directus.
* [ ] **4.2 Host Calendar Management:** Build UI for hosts to block out unavailable dates.
* [ ] **4.3 Host Dashboard:** Build view for active listings, pending rentals, and Stripe Connect payout status.
* [ ] **4.4 The Marketplace:** Build the public-facing search grid, filtering, and individual listing detail pages.
* [ ] **4.5 KYC UI Integration:** Build the trigger that forces a user to complete Stripe Identity before they can click "Book Now."
* [ ] **4.6 Booking Calendar:** Build the date-picker that cross-references Directus to ensure dates are available.

## 📦 Phase 5: The Logistics Engine
**Goal:** Stitch the money and the shipping together safely.

* [ ] **5.1 Pre-Authorization Checkout:** Build Stripe checkout session that charges the rental fee AND authorizes a hold for the `Replacement_Value`.
* [ ] **5.2 Webhook Engine:** Create a Directus Flow to catch the `payment_intent.succeeded` webhook from Stripe.
* [ ] **5.3 Shippo Label Generation:** Upon payment success, trigger a script to hit the Shippo API to generate TWO labels (Host -> Renter, Renter -> Host) and save tracking numbers to the `Bookings` collection.
* [ ] **5.4 Condition Photo Gate:** Build UI requiring the Host to upload 3 "packed box" photos to R2 before the frontend reveals the outbound shipping label.

## 🛡️ Phase 6: Escrow & Dispute Resolution
**Goal:** Handle the return trip and release the funds.

* [ ] **6.1 Transit Webhooks:** Configure Directus to listen to Shippo tracking updates. When the outbound package is marked `Delivered`, update the Booking status to `Active`.
* [ ] **6.2 Return Gate:** Build UI requiring the Renter to upload return condition photos to unlock their return shipping label.
* [ ] **6.3 The 24-Hour Timer:** When the return package is marked `Delivered`, start a 24-hour countdown in Directus.
* [ ] **6.4 Money Release:** If 24 hours pass with no dispute, trigger the Stripe API to release the renter's deposit hold and execute the payout to the Host's bank account.
* [ ] **6.5 Dispute Flow:** Build a Super Admin dashboard for you to manually review condition photos, capture the deposit hold if needed, and resolve conflicts.