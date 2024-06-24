import React, { useState } from "react";
import PreviewModal from "./PreviewModal";
import Test2 from "./PreviewContent";

export const Test = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid h-screen place-content-center bg-neutral-950">
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
      >
        Open drawer
      </button>

      <PreviewModal open={open} setOpen={setOpen}>
        <Test2 />
      </PreviewModal>
    </div>
  );
};