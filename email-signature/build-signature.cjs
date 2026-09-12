const fs = require("fs");

const ICON = "https://www.lukassvendsen.dk/email-signature/icons";
const PHOTO = "https://www.lukassvendsen.dk/images/about-lukas-2026.jpg";

function icon(name, alt) {
  return `<img src="${ICON}/${name}.png" width="14" height="14" alt="${alt}" style="display:block;width:14px;height:14px;border:0;outline:none;" />`;
}

function social(name, href, label) {
  return `<a href="${href}" target="_blank" style="text-decoration:none;border:0;display:inline-block;">
              <img src="${ICON}/${name}.png" width="16" height="16" alt="${label}" style="display:block;width:16px;height:16px;border:0;outline:none;" />
            </a>`;
}

function contactRow(iconName, iconAlt, contentHtml) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td width="22" valign="top" style="width:22px;padding:2px 8px 0 0;vertical-align:top;">
                  ${icon(iconName, iconAlt)}
                </td>
                <td valign="top" style="padding:0;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;color:#5e5c58;">
                  ${contentHtml}
                </td>
              </tr>
            </table>`;
}

const signature = `<!-- ========== START: KOPIÉR FRA HER ========== -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td width="168" valign="top" bgcolor="#171716" style="width:168px;background-color:#171716;padding:0;vertical-align:top;line-height:0;font-size:0;">
      <a href="https://www.lukassvendsen.dk/om" target="_blank" style="text-decoration:none;border:0;">
        <img
          src="${PHOTO}"
          width="168"
          height="220"
          alt="Lukas Svendsen, fotograf og videograf"
          style="display:block;width:168px;height:100%;max-height:220px;min-height:220px;border:0;outline:none;text-decoration:none;object-fit:cover;object-position:center top;"
        />
      </a>
    </td>
    <td width="432" valign="middle" bgcolor="#ffffff" style="width:432px;background-color:#ffffff;padding:18px 22px;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;border-top:1px solid rgba(23,23,22,0.12);border-right:1px solid rgba(23,23,22,0.12);border-bottom:1px solid rgba(23,23,22,0.12);">
      <p style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.1;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#171716;">
        Lukas Svendsen
      </p>
      <p style="margin:6px 0 0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.3;color:#5e5c58;">
        Fotograf &amp; videograf
      </p>
      <p style="margin:10px 0 0;padding:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.35;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#171716;">
        Ung &amp; ambitiøs kreativ fotograf
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;margin:12px 0 0;">
        <tr>
          <td style="border-top:1px solid rgba(23,23,22,0.12);font-size:0;line-height:0;height:1px;">&nbsp;</td>
        </tr>
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;margin:12px 0 0;">
        <tr>
          <td width="50%" valign="top" style="width:50%;padding:0 12px 11px 0;vertical-align:top;">
            ${contactRow("location", "Adresse", "Ribersvej 90<br />7200 Grindsted")}
          </td>
          <td width="50%" valign="top" style="width:50%;padding:0 0 11px 0;vertical-align:top;">
            ${contactRow("globe", "Hjemmeside", '<a href="https://www.lukassvendsen.dk/" target="_blank" style="color:#5e5c58;text-decoration:none;">lukassvendsen.dk</a>')}
          </td>
        </tr>
        <tr>
          <td width="50%" valign="top" style="width:50%;padding:0 12px 0 0;vertical-align:top;">
            ${contactRow("email", "E-mail", '<a href="mailto:kontakt@lukassvendsen.dk" style="color:#5e5c58;text-decoration:none;">kontakt@lukassvendsen.dk</a>')}
          </td>
          <td width="50%" valign="top" style="width:50%;padding:0;vertical-align:top;">
            ${contactRow("phone", "Telefon", '<a href="tel:+4524463550" style="color:#5e5c58;text-decoration:none;">+45 24 46 35 50</a>')}
          </td>
        </tr>
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;margin:14px 0 0;">
        <tr>
          <td valign="middle" style="vertical-align:middle;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:0 8px 0 0;">${social("instagram", "https://www.instagram.com/lukassvendsen.dk/", "Instagram")}</td>
                <td style="padding:0 8px 0 0;">${social("facebook", "https://www.facebook.com/profile.php?id=61593622893802", "Facebook")}</td>
                <td style="padding:0;">${social("linkedin", "https://www.linkedin.com/in/lukas-guldager-svendsen-a4a777290/", "LinkedIn")}</td>
              </tr>
            </table>
          </td>
          <td valign="middle" align="right" style="vertical-align:middle;text-align:right;">
            <a href="https://www.lukassvendsen.dk/" target="_blank" style="display:inline-block;background-color:#171716;color:#f5f4f1;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:28px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:0 12px;">
              Se mit arbejde&nbsp;&rarr;
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- ========== SLUT: KOPIÉR TIL HER ========== -->`;

const mobile = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:360px;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td bgcolor="#171716" style="background-color:#171716;padding:0;line-height:0;font-size:0;">
      <a href="https://www.lukassvendsen.dk/om" target="_blank" style="text-decoration:none;border:0;">
        <img src="${PHOTO}" width="360" height="260" alt="Lukas Svendsen" style="display:block;width:100%;max-width:360px;height:260px;border:0;object-fit:cover;object-position:center 28%;" />
      </a>
    </td>
  </tr>
  <tr>
    <td bgcolor="#ffffff" style="background-color:#ffffff;padding:18px 16px;border:1px solid rgba(23,23,22,0.12);border-top:0;">
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#171716;">Lukas Svendsen</p>
      <p style="margin:5px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#5e5c58;">Fotograf &amp; videograf</p>
      <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#171716;">Ung &amp; ambitiøs kreativ fotograf</p>
      <table role="presentation" width="100%" style="width:100%;border-collapse:collapse;margin:12px 0 0;"><tr><td style="border-top:1px solid rgba(23,23,22,0.12);font-size:0;height:1px;">&nbsp;</td></tr></table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:12px 0 0;">
        <tr><td style="padding:0 0 8px 0;">${contactRow("location", "Adresse", "Ribersvej 90, 7200 Grindsted")}</td></tr>
        <tr><td style="padding:0 0 8px 0;">${contactRow("globe", "Hjemmeside", '<a href="https://www.lukassvendsen.dk/" style="color:#5e5c58;text-decoration:none;">lukassvendsen.dk</a>')}</td></tr>
        <tr><td style="padding:0 0 8px 0;">${contactRow("email", "E-mail", '<a href="mailto:kontakt@lukassvendsen.dk" style="color:#5e5c58;text-decoration:none;">kontakt@lukassvendsen.dk</a>')}</td></tr>
        <tr><td style="padding:0 0 10px 0;">${contactRow("phone", "Telefon", '<a href="tel:+4524463550" style="color:#5e5c58;text-decoration:none;">+45 24 46 35 50</a>')}</td></tr>
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:4px 0 12px;">
        <tr>
          <td style="padding:0 8px 0 0;">${social("instagram", "https://www.instagram.com/lukassvendsen.dk/", "Instagram")}</td>
          <td style="padding:0 8px 0 0;">${social("facebook", "https://www.facebook.com/profile.php?id=61593622893802", "Facebook")}</td>
          <td style="padding:0;">${social("linkedin", "https://www.linkedin.com/in/lukas-guldager-svendsen-a4a777290/", "LinkedIn")}</td>
        </tr>
      </table>
      <a href="https://www.lukassvendsen.dk/" style="display:inline-block;background:#171716;color:#f5f4f1;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:30px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:0 12px;">Se mit arbejde&nbsp;&rarr;</a>
    </td>
  </tr>
</table>`;

const html = `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mailsignatur · Lukas Svendsen</title>
  <style>
    body { margin:0; background:#ebe9e4; color:#171716; font-family:Arial,Helvetica,sans-serif; }
    .preview-page { max-width:920px; margin:0 auto; padding:40px 20px 72px; }
    .preview-page h1 { margin:0 0 8px; font-size:28px; letter-spacing:-0.03em; font-weight:700; }
    .preview-page .lede { margin:0 0 28px; max-width:54ch; color:#5e5c58; font-size:15px; line-height:1.6; }
    .preview-meta { margin:0 0 10px; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#5e5c58; }
    .preview-frame { background:#f5f4f1; border:1px solid rgba(23,23,22,0.12); padding:28px 24px; margin-bottom:28px; }
    .preview-frame.mobile { width:380px; max-width:100%; padding:20px 16px; }
    .howto { margin-top:8px; padding:20px 22px; background:#f5f4f1; border:1px solid rgba(23,23,22,0.12); font-size:14px; line-height:1.6; color:#5e5c58; }
    .howto strong { color:#171716; }
    .howto code { font-family:Consolas,Monaco,monospace; font-size:12px; background:#ebe9e4; padding:1px 5px; }
  </style>
</head>
<body>
  <div class="preview-page">
    <h1>Mailsignatur</h1>
    <p class="lede">
      To-kolonne kort i paper/ink-stil. Rent portræt uden dekoration, professionelle ikoner
      til kontakt og sociale medier.
    </p>
    <p class="preview-meta">Desktop · 600 px</p>
    <div class="preview-frame">
${signature}
    </div>
    <p class="preview-meta">Mobil · ca. 360 px</p>
    <div class="preview-frame mobile">
${mobile}
    </div>
    <div class="howto">
      <strong>Sådan bruger du den</strong><br />
      Kopiér HTML mellem <code>START: KOPIÉR FRA HER</code> og <code>SLUT: KOPIÉR TIL HER</code>.<br />
      Ikoner: PNG på <code>${ICON}/</code> (SVG-kilder samme mappe). Deploy <code>public/email-signature/</code> med sitet.
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(
  "H:/Fotograf/email-signature/lukas-svendsen-mailsignatur.html",
  html
);
// Local icon preview (relative paths) — not for email copy, not deployed
fs.writeFileSync(
  "H:/Fotograf/email-signature/lukas-svendsen-mailsignatur.preview.html",
  html.split(ICON).join("icons")
);

// Outlook-ready: only the signature, as a full HTML document (.htm)
const outlookOnly = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Lukas Svendsen</title>
</head>
<body style="margin:0;padding:16px;background:#ffffff;">
${signature.replace(/<!-- ========== START: KOPIÉR FRA HER ========== -->\n?/, "").replace(/\n?<!-- ========== SLUT: KOPIÉR TIL HER ========== -->/, "")}
</body>
</html>
`;
fs.writeFileSync(
  "H:/Fotograf/email-signature/outlook-signatur.htm",
  outlookOnly
);
console.log("written ok (HTML stays in email-signature/; icons host via public/)");
