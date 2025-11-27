function doPost(e) {
  try {
    const { to, subject, text, html } = JSON.parse(e.postData.contents);

    // Send email
    MailApp.sendEmail({
      to,
      subject,
      body: text,
      htmlBody: html,
    });

    const response = {
      isError: false,
      message: "Email sent",
      data: null,
    };

    return ContentService.createTextOutput(
      JSON.stringify(response),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    const response = {
      isError: true,
      message: error.message || "Failed to send email",
      data: null,
    };

    return ContentService.createTextOutput(
      JSON.stringify(response),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
