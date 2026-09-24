import { cn } from "@/shared/lib/cn";

import type { ProcessStep } from "../content/types";

type ProcessStepsProps = {
  steps: ProcessStep[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => {
        const accent = index % 2 === 0;

        return (
          <li
            key={step.id}
            className={cn(
              "rounded-3xl p-6",
              accent
                ? "bg-gradient-to-r from-[#233b38] to-[#60a199] text-white shadow-md"
                : "bg-[#ededed] text-slate-900",
            )}
          >
            <p
              className={cn(
                "font-jakarta text-2xl font-extrabold",
                accent ? "text-brand-lime" : "text-brand-teal",
              )}
            >
              {step.number}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p
              className={cn(
                "mt-2 max-w-3xl text-base leading-6",
                accent ? "text-white/85" : "text-[#6f6f6f]",
              )}
            >
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
