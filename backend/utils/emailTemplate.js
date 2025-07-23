"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordEmailTemplate = exports.verifyEmailTemplate = void 0;
const verifyEmailTemplate = (url, email) => ({
  subject: "Verify email address",
  text: `Click on the link to verify the email address ${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Website Design & Development - Pricing Guide</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Inter", sans-serif;
        line-height: 1.6;
        color: #2c3e50;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 20px;
      }

      .pdf-container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        position: relative;
      }

      .header {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        color: white;
        padding: 40px 40px 50px;
        position: relative;
        overflow: hidden;
      }

      @media print {
        .header::before {
          display: none !important;
        }
      }

      .header::before {
        content: "";
        position: absolute;
        top: -50%;
        right: -20%;
        width: 300px;
        height: 300px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
      }

      .header-content {
        position: relative;
        z-index: 2;
      }

      .title {
        font-size: 2.5em;
        font-weight: 700;
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .subtitle {
        font-size: 1.1em;
        opacity: 0.9;
        margin-bottom: 20px;
        font-weight: 300;
      }

      .location-info {
        display: flex;
        gap: 30px;
        font-size: 0.95em;
        margin-top: 20px;
        flex-wrap: wrap;
      }

      .location-item {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.2);
        padding: 8px 16px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
      }

      .content {
        padding: 50px 40px;
      }

      .section {
        margin-bottom: 50px;
      }

      .section-title {
        font-size: 1.8em;
        font-weight: 600;
        color: #4f46e5;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .package {
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 30px;
        margin-bottom: 25px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .package::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
      }

      .package:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
        border-color: #4f46e5;
      }

      .package-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        flex-wrap: wrap;
        gap: 10px;
      }

      .package-name {
        font-size: 1.4em;
        font-weight: 600;
        color: #1e293b;
      }

      .package-price {
        font-size: 1.8em;
        font-weight: 700;
        color: #4f46e5;
      }

      .package-description {
        color: #64748b;
        margin-bottom: 20px;
        font-style: italic;
      }

      .features {
        display: grid;
        gap: 8px;
        margin-bottom: 15px;
      }

      .feature {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #475569;
      }

      .feature::before {
        content: "✓";
        color: #10b981;
        font-weight: bold;
        font-size: 1.1em;
      }

      .perfect-for {
        background: #ecfdf5;
        border: 1px solid #d1fae5;
        border-radius: 8px;
        padding: 12px 16px;
        margin-top: 15px;
      }

      .perfect-for strong {
        color: #065f46;
      }

      .perfect-for-text {
        color: #047857;
        font-size: 0.95em;
      }

      .addons-table {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
      }

      .table-header {
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 20px;
        font-weight: 600;
      }

      .table-row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 16px 20px;
        border-bottom: 1px solid #f1f5f9;
        transition: background-color 0.2s;
      }

      .table-row:hover {
        background-color: #f8fafc;
      }

      .table-row:last-child {
        border-bottom: none;
      }

      .price-cell {
        font-weight: 600;
        color: #4f46e5;
      }

      .support-plans {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        margin-top: 25px;
      }

      .support-plan {
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 25px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .support-plan:hover {
        border-color: #4f46e5;
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
      }

      .plan-name {
        font-size: 1.2em;
        font-weight: 600;
        margin-bottom: 10px;
        color: #1e293b;
      }

      .plan-price {
        font-size: 2em;
        font-weight: 700;
        color: #4f46e5;
        margin-bottom: 5px;
      }

      .plan-period {
        color: #64748b;
        font-size: 0.9em;
        margin-bottom: 15px;
      }

      .plan-features {
        color: #475569;
        font-size: 0.95em;
      }

      .contact-section {
        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        color: white;
        padding: 40px;
        border-radius: 12px;
        text-align: center;
        margin-top: 30px;
      }

      .contact-title {
        font-size: 1.8em;
        font-weight: 600;
        margin-bottom: 15px;
      }

      .special-offer {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        backdrop-filter: blur(10px);
      }

      .contact-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 25px;
      }

      .contact-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: rgba(255, 255, 255, 0.1);
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.95em;
      }

      .icon {
        font-size: 1.2em;
      }

      @media (max-width: 768px) {
        .pdf-container {
          margin: 10px;
          border-radius: 12px;
        }

        .header,
        .content {
          padding: 30px 25px;
        }

        .title {
          font-size: 2em;
        }

        .location-info {
          gap: 15px;
        }

        .package-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }

        .table-header,
        .table-row {
          grid-template-columns: 1.5fr 1fr;
          font-size: 0.9em;
        }
      }

      .print-button {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4f46e5;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
      }

      .print-button:hover {
        background: #4338ca;
        transform: translateY(-2px);
      }

      @media print {
        body {
          background: white;
          padding: 0;
        }

        .pdf-container {
          box-shadow: none;
          border-radius: 0;
        }

        .print-button {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <button class="print-button" onclick="window.print()">
      📄 Download PDF
    </button>

    <div class="pdf-container">
      <div class="header">
        <div class="header-content">
          <h1 class="title">🌐 Website Design & Development</h1>
          <p class="subtitle">
            Helping small businesses build beautiful, modern websites at
            affordable prices
          </p>
          <div class="location-info">
            <div class="location-item">
              <span class="icon">📍</span>
              <span>London, UK</span>
            </div>
            <div class="location-item">
              <span class="icon">💼</span>
              <span>portfolio-mihail.netlify.app</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="section">
          <h2 class="section-title">🛠️ Starter Packages</h2>

          <div class="package">
            <div class="package-header">
              <h3 class="package-name">One-Page Website</h3>
              <div class="package-price">£200</div>
            </div>
            <p class="package-description">
              A clean, modern landing page with all the essentials.
            </p>
            <div class="features">
              <div class="feature">Mobile-responsive design</div>
              <div class="feature">Contact details & business info</div>
              <div class="feature">Social media links</div>
              <div class="feature">Free basic SEO setup</div>
            </div>
            <div class="perfect-for">
              <strong>Perfect for:</strong>
              <div class="perfect-for-text">
                Cafés, hairdressers, freelancers, or event pages
              </div>
            </div>
          </div>

        <div class="section">
          <h2 class="section-title">🚀 Optional Add-Ons</h2>
          <div class="addons-table">
            <div class="table-header">
              <div>Feature</div>
              <div>Price</div>
            </div>
            <div class="table-row">
              <div>Online Booking / Contact Form</div>
              <div class="price-cell">+£80</div>
            </div>
            <div class="table-row">
              <div>Image Gallery / Portfolio</div>
              <div class="price-cell">+£55</div>
            </div>
            <div class="table-row">
              <div>Blog / News Section</div>
              <div class="price-cell">+£105</div>
            </div>
            <div class="table-row">
              <div>Google Maps / Reviews Integration</div>
              <div class="price-cell">+£30</div>
            </div>
            <div class="table-row">
              <div>CMS Integration (editable text/images)</div>
              <div class="price-cell">+£130</div>
            </div>
            <div class="table-row">
              <div>Google Ads Setup & Optimization (3-month campaign)</div>
              <div class="price-cell">+£200</div>
            </div>
            <div class="table-row">
              <div>E-commerce Setup (up to 20 products)</div>
              <div class="price-cell">£580+</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">🔧 Ongoing Support & Hosting</h2>
          <div class="support-plans">
            <div class="support-plan">
              <div class="plan-name">Basic Maintenance</div>
              <div class="plan-price">£15</div>
              <div class="plan-period">per month</div>
              <div class="plan-features">Monthly updates, backups</div>
            </div>
            <div class="support-plan">
              <div class="plan-name">Standard Maintenance</div>
              <div class="plan-price">£35</div>
              <div class="plan-period">per month</div>
              <div class="plan-features">Updates + content edits</div>
            </div>
            <div class="support-plan">
              <div class="plan-name">Premium Hosting & Support</div>
              <div class="plan-price">£60</div>
              <div class="plan-period">per month</div>
              <div class="plan-features">Everything + hosting + email</div>
            </div>
          </div>
        </div>

        <div class="contact-section">
          <h2 class="contact-title">📞 Let's Talk</h2>
          <div class="special-offer">
            <strong>Limited Time Offer:</strong> I'm currently offering
            discounted rates for my first clients as part of my
            portfolio-building phase. Let's build you a fast, modern website
            that makes your business stand out.
          </div>
          <div class="contact-details">
            <div class="contact-item">
              <span class="icon">📧</span>
              <span>mihailghrgh@gmail.com</span>
            </div>
            <div class="contact-item">
              <span class="icon">🌍</span>
              <span>portfolio-mihail.netlify.app</span>
            </div>
            <div class="contact-item">
              <span class="icon">📍</span>
              <span>London, UK</span>
            </div>
            <div class="contact-item">
              <span class="icon">🗓️</span>
              <span>Available for quick turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`,
});
exports.verifyEmailTemplate = verifyEmailTemplate;
const resetPasswordEmailTemplate = (url, email) => ({
    subject: "Reset Your Password ",
    text: `Click on the link to reset your password ${url}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        /* Reset styles for email clients */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }

        /* Main styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333333;
            margin-bottom: 20px;
        }
        
        .message {
            color: #666666;
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 15px 35px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .alternative-link {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            word-break: break-all;
            font-size: 14px;
            color: #666666;
        }
        
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
            font-size: 14px;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            margin: 5px 0;
            font-size: 14px;
            color: #666666;
        }
        
        .security-icon {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        /* Responsive design */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            .content, .header, .footer {
                padding: 20px !important;
            }
            .header h1 {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="security-icon">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/>
                </svg>
            </div>
            <h1>Password Reset Request</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">
                Hello ${email},
            </div>
            
            <div class="message">
                We received a request to reset the password for your account. If you made this request, please click the button below to reset your password.
            </div>
            
            <div class="button-container">
                <a href=${url} class="reset-button">Reset Your Password</a>
            </div>
            
            <div class="message">
                If the button above doesn't work, you can copy and paste the following link into your browser:
            </div>
            
            <div class="alternative-link">
            ${url}
            </div>
            
            <div class="warning">
                <strong>Important:</strong> This password reset link will expire in 30 seconds for security reasons. If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.
            </div>
            
            <div class="message">
                For your security, never share this link with anyone. If you're having trouble, our support team is here to help.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>Regina Olteniei</p>
            <p>Regina Olteniei Ltd</p>
            <p>Need help? Contact us at <a href="reginaOlteniei@gmail.com">reginaOlteniei@gmail.com</a></p>
            <p style="margin-top: 15px; font-size: 12px;">
                This email was sent to ${email}. If you no longer wish to receive these emails, 
                you can <a href="reginaOlteniei@gmail.com">unsubscribe here</a>.
            </p>
        </div>
    </div>
</body>
</html>`,
});
exports.resetPasswordEmailTemplate = resetPasswordEmailTemplate;
