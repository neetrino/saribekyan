import type { ReactNode } from "react";

const PLATFORM_HOST = "fs.emis.am";
const PLATFORM_URL = "https://fs.emis.am";

type ForeignAdmissionProps = {
  intro: string[];
  stepsTitle: string;
  steps: string[];
  documentsTitle: string;
  documents: string[];
};

function withPlatformLink(text: string): ReactNode {
  const parts = text.split(PLATFORM_HOST);
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => (
    <span key={`${index}-${part.slice(0, 12)}`}>
      {index > 0 ? (
        <a
          href={PLATFORM_URL}
          target="_blank"
          rel="noreferrer"
          className="text-brand-teal underline underline-offset-2"
        >
          {PLATFORM_HOST}
        </a>
      ) : null}
      {part}
    </span>
  ));
}

export function ForeignAdmission({
  intro,
  stepsTitle,
  steps,
  documentsTitle,
  documents,
}: ForeignAdmissionProps) {
  return (
    <div className="max-w-3xl space-y-8 text-base leading-7 text-[#6f6f6f]">
      <div className="space-y-4">
        {intro.map((paragraph) => (
          <p key={paragraph}>{withPlatformLink(paragraph)}</p>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-medium text-brand-ink">{stepsTitle}</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {steps.map((step) => (
            <li key={step}>{withPlatformLink(step)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium text-brand-ink">{documentsTitle}</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {documents.map((document) => (
            <li key={document}>{document}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
