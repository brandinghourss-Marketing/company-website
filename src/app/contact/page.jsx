import Form from "@/Components/Contact/Form";
import Heading from "@/Components/Contact/Heading";
import React from "react";

const page = () => {
  return (
    <main className="page-container min-h-screen flex items-center justify-center">
      <Heading />
      <Form />
    </main>
  );
};

export default page;
