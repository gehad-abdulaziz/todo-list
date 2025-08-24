import React from "react";

function RightVisualIllustration({ children }) {
  return (
    <div className="flex flex-col items-start p-6 rounded-3xl bg-(--light-bg) w-full max-w-md md:max-w-lg h-160 gap-4">
      {children}
    </div>
  );
}

export default RightVisualIllustration;
