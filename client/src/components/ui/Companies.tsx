import React from "react";
import { FaGoogleWallet, FaPaypal } from "react-icons/fa";
import { SiAccenture, SiAdobe } from "react-icons/si";
import { TfiMicrosoftAlt } from "react-icons/tfi";

const Companies: React.FC = () => {
  return (
    <section className="py-lg-5 py-4">
      <p className="text-primary text-center">Trusted by learners from</p>
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-5 mt-lg-5 mt-3">
        <TfiMicrosoftAlt size={50} />
        <FaGoogleWallet size={50} />
        <SiAccenture size={50} />
        <SiAdobe size={50} />
        <FaPaypal size={50} />
      </div>
    </section>
  );
};

export default Companies;
