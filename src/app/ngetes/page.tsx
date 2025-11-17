// export default async function NgetesPage() {
//   const url = process.env.GOOGLE_SCRIPT_PASSWORD_RESET_URL!;

//   const body = {
//     to: "mdaffailhami@gmail.com",
//     subject: "Ngetes Dari NextJS",
//     text: "Ngetes Text\nUWU Wadidaw",
//     html: "Ngetes HTML<br><b>UWU <i>Wadidaw</i></b>",
//   };

//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

//   const { error, message } = await res.json();
//   console.log(error);
//   console.log(message);
//   return <h1 className="text-3xl">{message}</h1>;
// }

"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NgetesPage() {
  return (
    <>
      {" "}
      <h1>aowkwk</h1>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            // action: {
            //   label: "Undo",
            //   onClick: () => console.log("Undo"),
            // },
          })
        }
      >
        Show Toast
      </Button>
    </>
  );
}
