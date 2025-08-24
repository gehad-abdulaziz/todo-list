import React from "react";

function VisualIllustration({ imgSrc, altText }) {
  return (
    <div className="flex-shrink-0 w-full max-w-sm md:max-w-md lg:max-w-lg rounded-3xl overflow-hidden border-2 border-(--color-text)">
      <img
        src={imgSrc}
        alt={altText}
        className="w-full h-auto object-cover block"
      />
    </div>
  );
}

export default VisualIllustration;


