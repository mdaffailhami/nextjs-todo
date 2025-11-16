// "use client";

// import { useState, useEffect } from "react";
// import { Progress } from "./progress";

// export default function LoadingBar() {
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setValue((value) => (value >= 100 ? 0 : value + 10)); // simulate loading
//     }, 200);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Progress value={value} className="h-1 rounded-none" />
//     // <div className="fixed top-0 left-0 z-50 h-1 w-full bg-transparent">
//     // </div>
//   );
// }

export function PendingBar() {
  return (
    <div className="bg-muted h-1 w-full">
      <div className="bg-primary animate-loading-bar h-full w-1/2"></div>
    </div>
  );
}
