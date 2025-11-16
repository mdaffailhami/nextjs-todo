export default async function NgetesPage() {
  const url = process.env.GOOGLE_SCRIPT_RESET_PASSWORD_URL!;

  const body = {
    to: "mdaffailhami@gmail.com",
    subject: "Ngetes Dari NextJS",
    text: "Ngetes Text\nUWU Wadidaw",
    html: "Ngetes HTML<br><b>UWU <i>Wadidaw</i></b>",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { error, message } = await res.json();
  console.log(error);
  console.log(message);
  return <h1 className="text-3xl">{message}</h1>;
}
