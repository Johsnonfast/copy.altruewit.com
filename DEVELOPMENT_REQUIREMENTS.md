# Altruewit Website - Development Requirements (Beta)

## 1) Company and Positioning
- Company (CN): Shenzhen Zhenzhida Electronic Co., Ltd.
- Company (EN): Shenzhen Zhenzhida Electronic Co., Ltd.
- Brand: Altruewit (use EN brand only in header/logo)
- Business type: B2B
- Positioning: manufacturing-oriented with trade integration capability
- Tone keywords: reliable, youth-focused design, cost-effective

## 2) Goals
- Primary: brand trust and recognition as a reliable company
- Secondary: build Google SEO foundation for organic growth and future ads

## 3) Markets and Languages
- Target regions: North America, Europe, Southeast Asia
- Beta language: English only at root
  - URL: https://www.altruewit.com/
- Phase 2 (later): add Weglot and subdirectories /fr /es /ja /ko

## 4) Core Conversion
- Primary CTA: Request a Quote (RFQ)
- Secondary CTA: direct contact via email

## 5) Site Structure (v1)
- Home
- Products
  - Mini Air Pump (category)
  - Portable Fan (category)
  - Digital Camera (category)
- Product model pages (5 total)
  - Mini Air Pump
  - Portable Fan
  - Kids Camera
  - Instant Printing Camera
  - Digital Camera
- OEM/ODM & Customization
- Quality & Compliance
- About
- Blog (Coming soon in beta)
- Contact / RFQ
- Privacy Policy
- Terms
- Cookie Policy

## 6) Product Strategy (Beta)
- Product counts:
  - AI Product Series: 1 model
  - Outdoor Series: 1 model
  - Camera Series: 3 models
- No product assets available at beta launch
- Use placeholders and "Specs available on request"
- Product model pages set to noindex until assets are provided

## 7) Differentiators (Confirmed)
- Youth-focused industrial design and fast refresh cycles
- Reliable delivery and QC processes
- Cost-effective light customization on mature models

## 8) About Page Copy (One-line)
- Draft: "Altruewit is a Shenzhen-based B2B manufacturer of AI smart devices, delivering reliable quality and cost-effective production."

## 9) OEM/Customization
- Default flow: Inquiry -> Design/Spec -> Sampling -> Mass Production
- Customization items: Color, Logo, Packaging, Manual, Accessories, Bundle
- MOQ, lead time, sampling time: "Available on request"

## 10) Quality & Compliance
- QC steps listed: Final inspection only
- Allow line: "Certifications available on request"

## 11) Usage Scenarios
- AI Product Series / Outdoor Series: camping, beach, BBQ, surfing, hot water cooling
- Cameras:
  - Kids Camera: age 5-12, portable, durable, compact, cute
  - Instant Printing Camera: inkless printing, paper size on request
  - Digital Camera: general

## 12) Navigation and UI
- Header nav: Home / Products (dropdown) / OEM&Customization / Quality&Compliance / About / Blog / Contact
- Header CTA: Request a Quote
- Hero buttons: primary Request a Quote, secondary View Products
- Show contact email in header: summer@altruewit.com
- Blog in nav shows "Coming soon" page

## 13) RFQ Form
- Required fields:
  - Company name, Contact name, Business email, Country/Region,
    Product interest, Estimated order quantity, Requirements message
- Optional fields:
  - Company website, WhatsApp/Phone, Target market, Timeline, Customization
- Product interest options: AI Product Series / Outdoor Series / Camera Series / Other
- Estimated order quantity: free text
- Privacy policy checkbox: required
- Anti-spam: reCAPTCHA v3 + hidden field + rate limit
- Confirmation email to customer: enabled
  - Reply time promise: 1 business day
  - Reply-To: summer@altruewit.com
- Internal notifications: johnson@altruewit.com + summer@altruewit.com
- RFQ data destination: Google Sheet (time zone UTC+8)
  - Sheet owner: qqqqqqqiang@gmail.com
  - Shared editor: 769327232@qq.com

## 14) Contact Info
- Public email: summer@altruewit.com
- Address (show on Contact page):
  - 4/F Building A, Xinyuan Industrial Park, Gushu, Xixiang,
    Bao'an District, Shenzhen, China
- No embedded map

## 15) Legal and Footer
- Footer company name: Shenzhen Zhenzhida Electronic Co., Ltd.
- Footer copyright: current year
- No ICP number shown
- Privacy policy contact email: summer@altruewit.com
- No mention of Holide anywhere (explicitly removed)

## 16) Hosting and Deployment
- Platform: Alibaba Cloud OSS static hosting + CDN
- Region: Hong Kong
- Domain: www.altruewit.com
- Redirect: altruewit.com -> https://www.altruewit.com (301)
- Existing old site has no ranking; no migration constraints

## 17) Analytics and Compliance
- Enable GA4 and Google Search Console
- GDPR/Cookie consent banner required
  - Do not load GA4 until consent

## 18) Visual Direction
- Style: youthful tech
- Allowed: high-quality generic industrial/production stock imagery
- Brand assets not provided; use text logo and placeholders

## 19) Open Items
- reCAPTCHA secret stored in Apps Script properties; site key can live in frontend config
- OSS bucket creation steps needed
- GA4 and GSC setup steps needed
