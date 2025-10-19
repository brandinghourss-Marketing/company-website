import Landing from "@/Components/About/Landing";
import Process from "@/Components/About/Process";
import Vision from "@/Components/About/Vision";
import React from "react";

const page = () => {
  return (
    <main className="page-container">
      <Landing />
      <Process />
      <Vision />
    </main>
  );
};

export default page;
