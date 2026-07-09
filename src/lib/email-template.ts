import { siteConfig } from "@/data/photos";

const colors = {
  text: "#171717",
  muted: "#525252",
  faint: "#737373",
  border: "#e5e5e5",
  link: "#171717",
  buttonBg: "#171717",
  buttonText: "#ffffff",
};

const darkColors = {
  text: "#f5f5f5",
  muted: "#a3a3a3",
  faint: "#737373",
  border: "#404040",
  link: "#f5f5f5",
  buttonBg: "#f5f5f5",
  buttonText: "#171717",
};

type EmailTemplateOptions = {
  preheader?: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMultiline(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

export function emailRow(label: string, value: string) {
  return `
    <tr>
      <td class="email-border" style="padding:10px 0;border-bottom:1px solid ${colors.border};vertical-align:top;">
        <p class="email-faint" style="margin:0 0 4px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${colors.faint};">
          ${escapeHtml(label)}
        </p>
        <p class="email-text" style="margin:0;font-size:15px;line-height:1.6;color:${colors.text};">
          ${formatMultiline(value)}
        </p>
      </td>
    </tr>
  `;
}

export function emailParagraph(text: string) {
  return `<p class="email-muted" style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${colors.muted};">${formatMultiline(text)}</p>`;
}

export function emailHeading(text: string) {
  return `<h1 class="email-text" style="margin:0 0 12px;font-size:24px;font-weight:400;line-height:1.3;color:${colors.text};text-align:center;">${escapeHtml(text)}</h1>`;
}

export function emailInfoTable(rows: string) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px auto 8px;border-collapse:collapse;text-align:left;">
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

export function buildBrandedEmail({
  preheader,
  title,
  body,
  cta,
}: EmailTemplateOptions) {
  const preheaderText = preheader ?? title;
  const ctaBlock = cta
    ? `
      <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px auto 8px;">
        <tr>
          <td class="email-button" style="border-radius:9999px;background:${colors.buttonBg};">
            <a href="${escapeHtml(cta.href)}" class="email-button-text" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;color:${colors.buttonText};">
              ${escapeHtml(cta.label)}
            </a>
          </td>
        </tr>
      </table>
    `
    : "";

  return `<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>${escapeHtml(title)}</title>
    <style>
      @media (prefers-color-scheme: dark) {
        .email-text { color: ${darkColors.text} !important; }
        .email-muted { color: ${darkColors.muted} !important; }
        .email-faint { color: ${darkColors.faint} !important; }
        .email-border { border-color: ${darkColors.border} !important; }
        .email-link { color: ${darkColors.link} !important; }
        .email-button { background: ${darkColors.buttonBg} !important; }
        .email-button-text { color: ${darkColors.buttonText} !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:transparent;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheaderText)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:transparent;padding:24px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:transparent;">
            <tr>
              <td class="email-border" style="padding:0 0 20px;border-bottom:1px solid ${colors.border};text-align:center;">
                <p class="email-faint" style="margin:0 0 6px;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:${colors.faint};">
                  ${escapeHtml(siteConfig.name)}
                </p>
                <p class="email-muted" style="margin:0;font-size:13px;line-height:1.6;color:${colors.muted};">
                  Fotograf · Videoproducent · Drone
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0;">
                ${emailHeading(title)}
                ${body}
                ${ctaBlock}
              </td>
            </tr>
            <tr>
              <td class="email-border" style="padding:20px 0 0;border-top:1px solid ${colors.border};text-align:center;">
                <p class="email-muted" style="margin:0 0 8px;font-size:13px;line-height:1.6;color:${colors.muted};">
                  ${escapeHtml(siteConfig.name)}<br />
                  ${escapeHtml(siteConfig.location)}
                </p>
                <p style="margin:0;font-size:13px;line-height:1.6;">
                  <a href="mailto:${escapeHtml(siteConfig.email)}" class="email-link" style="color:${colors.link};text-decoration:underline;">${escapeHtml(siteConfig.email)}</a>
                  &nbsp;·&nbsp;
                  <a href="${escapeHtml(siteConfig.url)}" class="email-link" style="color:${colors.link};text-decoration:underline;">lukassvendsen.dk</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildFromAddress(displayName = siteConfig.name) {
  const address =
    process.env.INQUIRY_FROM_EMAIL ?? "kontakt@lukassvendsen.dk";

  return `${displayName} <${address}>`;
}
