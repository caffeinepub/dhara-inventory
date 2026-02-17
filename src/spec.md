# Specification

## Summary
**Goal:** Build a Dhara Enterprises web app for login-based invoice and inventory management, including purchases/sales tracking, order book/ledger, reports, and an A5 print-ready invoice with downloadable PDF and UPI QR payment.

**Planned changes:**
- Add username/password authentication with persistent sessions, roles (Admin/Staff), and admin-only authorization for user management and settings (including initial admin: admin001/admin001).
- Create authenticated app layout with top navbar and routes: Register (Vendor, Customer, User), Inventory (Inventory, Sales, Purchase, Order Book, Ledger), Invoice, Reports, Settings, plus a dashboard home page.
- Implement Vendor and Customer modules: create, list (search/sort), and delete with confirmation; persist in backend with authorization checks.
- Implement admin-only User management: create users, assign roles/permissions, list users, delete/disable users; block disabled users from login.
- Implement Inventory item management: CRUD stock items and record stock-in/stock-out at transaction level via purchases and sales; track on-hand quantity and low-stock thresholds.
- Implement Purchase entry: record vendor, date, line items (qty, cost); atomically increase inventory; list and filter purchases.
- Implement Sales entry: record customer, date, delivery person name, line items (qty, selling price), payment status (paid/unpaid/partial) with due amounts; atomically decrease inventory; highlight pending payments in red.
- Implement Order Book derived from sales: table of sold items/orders with qty/date/delivery person/price/payment status; filtering and red highlight for pending.
- Implement Ledger derived from Order Book/Sales: running balance and final positive/negative balance; clearly indicate pending/unpaid amounts.
- Build Dashboard: sales chart, pending payments list (amount + person name with navigation), and low-inventory widget (items + remaining qty).
- Implement Invoice: generate/select from a sale/order; render a properly aligned print-ready A5 “original invoice” including required firm details and specified fields; add A5 PDF download with deterministic filename.
- Add invoice UPI QR (Paytm/UPI link-based): scannable QR encoding exact invoice total; show admin-only prompt in Settings if UPI config missing.
- Create Reports: daily/monthly sales summary, profit/loss, and GST tax report computed from stored purchases/sales (with configurable GST rates).
- Apply a simple premium UI theme (white/black with minimal accents) with consistent tables/forms/cards and clear red emphasis for unpaid/pending.

**User-visible outcome:** Users can log in and use a navbar-driven app to manage vendors/customers/users (admin-only for users/settings), maintain inventory through purchases and sales, view order book and ledger with pending payment highlights, see a dashboard (sales/pending/low stock), create aligned A5 invoices with downloadable PDFs and UPI QR for exact-amount payment, and generate sales/profit/tax reports.
