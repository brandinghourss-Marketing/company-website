import Collaborate from "@/Components/Landing/Collaborate";
import Landing from "@/Components/Landing/Landing";
import Services from "@/Components/Landing/Services";
import TagLine from "@/Components/Landing/TagLine";
import React from "react";

const page = () => {
  return (
    <main className="px-4 md:px-20 lg:px-50">
      <Landing />
      <TagLine />
      <Services />
      <Collaborate />
    </main>
  );
};

export default page;
