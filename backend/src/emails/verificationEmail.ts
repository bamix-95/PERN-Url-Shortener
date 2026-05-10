export const verificationEmailTemplate = (
  name: string,
  verificationUrl: string,
): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            
            <tr>
              <td style="background-color: #6366f1; padding: 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">✂️ Sniplink</h1>
                <p style="color: #e0e7ff; margin: 8px 0 0;">URL Shortener</p>
              </td>
            </tr>

            <tr>
              <td style="padding: 40px;">
                <h2 style="color: #111827; font-size: 22px; margin: 0 0 16px;">Hi ${name} 👋</h2>
                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                  Thanks for signing up! Please verify your email address to activate your account and start shortening URLs.
                </p>

                <table cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                  <tr>
                    <td style="background-color: #6366f1; border-radius: 8px;">
                      <a href="${verificationUrl}"
                        style="display: inline-block; padding: 14px 32px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                        Verify Email Address
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">
                  Or copy and paste this link into your browser:
                </p>
                <p style="color: #6366f1; font-size: 14px; word-break: break-all; margin: 0 0 24px;">
                  ${verificationUrl}
                </p>

                <!-- Warning -->
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="background-color: #fef3c7; border-radius: 8px; padding: 16px;">
                      <p style="color: #92400e; font-size: 14px; margin: 0;">
                        ⏰ This link expires in <strong>24 hours</strong>. If you didn't create an account, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

       
            <tr>
              <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                  © ${new Date().getFullYear()} Sniplink. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
