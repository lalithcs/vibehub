"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Links = {
  [key: string]: string[];
};

const links: Links = {
  Google: ["https://www.google.com", "https://mail.google.com"],
  Instagram: ["https://www.instagram.com", "https://business.instagram.com"],
  // Add more companies and their links here
};

const Saved: React.FC = () => {
  const [visibleSections, setVisibleSections] = React.useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (company: string) => {
    setVisibleSections((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Links</h1>
      {Object.keys(links).map((company) => (
        <Collapsible
          key={company}
          open={visibleSections[company]}
          onOpenChange={() => toggleSection(company)}
          className="mb-4"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-lg font-semibold">{company}</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            {links[company].map((link, index) => (
              <div
                key={index}
                className="rounded-md border px-4 py-3 font-mono text-sm"
              >
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default Saved;
