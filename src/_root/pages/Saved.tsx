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
  General:["https://drive.google.com/drive/folders/1F7dEL4Rivp1jqgb2Z8HQSK9W23NFiyIV?usp=drive_link"],
  Accenture: ["https://drive.google.com/drive/folders/1g9ogTqCiOCOVyf9Svea6nja4_5fzuN-W?usp=drive_link","https://drive.google.com/drive/folders/13SISxvIsuwIoRjkopkDwvfURfin5fTfz?usp=drive_link"],
  AMCAT: ["https://drive.google.com/drive/folders/1DyII-8_a_XXkiNzyMBvyHWoXyhPJulnl?usp=drive_link"],
  AudiTime: ["https://drive.google.com/drive/folders/1oiJn-YcJwZ7_UQ_keW6qA3-GUW19sK6Q?usp=drive_link"],
  CAPGEMINI: ["https://drive.google.com/drive/folders/1K9WddD5IigS2cYCbESG6vvvMhrsWBmQa?usp=drive_link","https://drive.google.com/drive/folders/1j3T1_QOHoTDoH2wTfduC3Va6vaK9i7GI?usp=drive_link"],
  CISCO:["https://drive.google.com/drive/folders/1HY6bR5SWKixNPyA3bVbvO5AkbcCZX7QU?usp=drive_link"],
  CoCubes:["https://drive.google.com/drive/folders/17iQT-S9qT0HUyA-Ks1QDJs_cTBZp5gGN?usp=drive_link"],
  Cognizant:["https://drive.google.com/drive/folders/104bCPODsCMK1QZnt5gYkRCWkikiYLceU?usp=drive_link"],
  Dell:["https://drive.google.com/drive/folders/1JN6l8_gaheCGckvgDCjikVJP1P3La9ME?usp=drive_link"],
  Deloitte:["https://drive.google.com/drive/folders/1LIC6FIKzz7iaIMGH5srFjmAcxq7VELgx?usp=drive_link"],
  DELL:["https://drive.google.com/drive/folders/1JN6l8_gaheCGckvgDCjikVJP1P3La9ME?usp=drive_link"],
  DevSquare:["https://drive.google.com/drive/folders/13vT_xwvT7oFSHJC5GRp-eUtI-wQbyP-j?usp=drive_link"],
  Elitmus:["https://drive.google.com/drive/folders/19PEMfPMT3cVN2dLfUb0o2ypmb13-XFjL?usp=drive_link"],
  EPAM:["https://drive.google.com/drive/folders/1F8DhoJ7Yi25ek6KXoMxWsesB43C3ycmi?usp=drive_link"],
  HCL:["https://drive.google.com/drive/folders/175aR1q_FR5Q7louoLw1TkRxG0O-DAOxr?usp=drive_link"],
  Hexaware:["https://drive.google.com/drive/folders/1pIidTjMVP5oS08W19ocEpdexWR7bmI_h?usp=drive_link"],
  HUAWEITech:["https://drive.google.com/drive/folders/11QLOTY6HM5lXz-uv3Ys9RjkiuAuy9Kc6?usp=drive_link"],
  IBM:["https://drive.google.com/drive/folders/1trLM1LSlMaWQAR4I0PhIffMej6OuHuKZ?usp=drive_link"],
  Infosys:["https://drive.google.com/drive/folders/14LcfyMo-QiVn7Zw7Kt2GQsbbSC3MyXzM?usp=drive_link"],
  PseudoCode_Papers:["https://drive.google.com/drive/folders/1hkXLZKry95mXtcOjLXy5UPnnef1FA1SS?usp=drive_link"],
  TCS:["https://drive.google.com/drive/folders/1I8QqnzZonRewbSnUMyfC9-tRduEJ4gyB?usp=drive_link"],
  TechMahindra:["https://drive.google.com/drive/folders/1NQxm5nV-HDsadnFqrca1Z_tFxOL2rKwE?usp=drive_link"],
  UNISYS:["https://drive.google.com/drive/folders/1ibrBtv96oO6OY6eymJDvIf3ZoxrOFjhv?usp=drive_link"],
  WIPRO:["https://drive.google.com/drive/folders/1ozH4gd8zApey7IiNo3rEA1yCEPx-wvgH?usp=drive_link"],
  Zenpact:["https://drive.google.com/drive/folders/1xWFAJguXXuvjRKYB5aWBiyrftCxxozK-?usp=drive_link"],
  ZenQ:["https://drive.google.com/drive/folders/1e3NGTVjXP29XyWppBgp-qoU_NL5j7zlQ?usp=drive_link"],
  ZOHO:["https://drive.google.com/drive/folders/1k48XGh_FjHai8-b3KYsgQfpzcKQFhFlL?usp=drive_link"],


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
      <h1 className="text-2xl font-bold mb-4">Placement Material</h1>
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
                  {company} Drive Folder
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
