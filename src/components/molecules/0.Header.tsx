import React from "react";

export default function Header() {
  return (
    <header>
      <link rel="icon" href="/unal_logo.png" type="image/png" />
      <div className="flex items-center justify-center max-w mb-2 w-full bg-white p-6 shadow-lg">
        <h1 className = "font-bold text-2xl">Bienvenido</h1>
      </div>
    </header>
  );
}
