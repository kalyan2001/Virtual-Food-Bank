import React from "react";

function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-5">
      <p className="mb-0">
        © {new Date().getFullYear()} ShareBite | Capstone Project | All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
