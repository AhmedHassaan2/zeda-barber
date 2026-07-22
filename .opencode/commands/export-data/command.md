---
name: export-data
description: Export data from the system in various formats
allowed_tools: ["Read", "Write", "Bash"]
agent: backend
---

# /export-data — Data Export

Export data from the system in various formats.

## Usage

```
/export-data bookings         # Export bookings
/export-data customers        # Export customers
/export-data services         # Export services
/export-data revenue          # Export revenue report
```

## Export Formats

### 1. CSV
- Simple spreadsheet format
- Compatible with Excel
- Easy to analyze

### 2. JSON
- Structured data
- API compatible
- Programmatic use

### 3. PDF
- Formatted reports
- Charts and graphs
- Print-ready

## Data Tables

### Bookings Export
```sql
SELECT 
  b.id,
  b.customer_name,
  b.customer_phone,
  b.customer_email,
  s.name as service,
  t.name as barber,
  b.booking_date,
  b.booking_time,
  b.status,
  b.created_at
FROM bookings b
JOIN services s ON b.service_id = s.id
JOIN team t ON b.barber_id = t.id
ORDER BY b.booking_date DESC;
```

### Revenue Export
```sql
SELECT 
  DATE_TRUNC('month', booking_date) as month,
  COUNT(*) as total_bookings,
  SUM(s.price) as total_revenue
FROM bookings b
JOIN services s ON b.service_id = s.id
WHERE b.status = 'completed'
GROUP BY DATE_TRUNC('month', booking_date)
ORDER BY month DESC;
```

## Process

1. Parse export command and format
2. Query relevant data
3. Format data for export
4. Generate file
5. Provide download link
