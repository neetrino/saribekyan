import { Link } from "@/i18n/navigation";

import type { OrgNode } from "../content/types";

type OrgChartProps = {
  root: OrgNode;
};

function OrgNodeCard({ node }: { node: OrgNode }) {
  const content = (
    <span className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-ink px-4 py-3 text-center text-sm font-semibold text-white">
      {node.label}
    </span>
  );

  if (node.href) {
    return (
      <Link href={node.href} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}

function OrgBranch({ nodes }: { nodes: OrgNode[] }) {
  return (
    <ul className="mt-6 flex flex-col items-stretch gap-4 lg:flex-row lg:flex-wrap lg:justify-center">
      {nodes.map((node) => (
        <li key={node.id} className="flex flex-col items-center">
          <OrgNodeCard node={node} />
          {node.children && node.children.length > 0 ? (
            <div className="mt-4 w-full max-w-md rounded-3xl bg-[#f5f5f5] p-4">
              <ul className="space-y-2">
                {node.children.map((child) => (
                  <li key={child.id} className="text-center">
                    {child.href ? (
                      <Link
                        href={child.href}
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-3 py-3 text-sm font-medium text-brand-ink transition-colors hover:bg-brand-mint/40"
                      >
                        {child.label}
                      </Link>
                    ) : (
                      <span className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-3 py-3 text-sm font-medium text-brand-ink">
                        {child.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function OrgChart({ root }: OrgChartProps) {
  return (
    <div className="rounded-[32px] bg-gradient-to-b from-[#f7f7f7] to-white p-6 sm:p-8">
      <div className="flex justify-center">
        <OrgNodeCard node={root} />
      </div>
      {root.children && root.children.length > 0 ? (
        <OrgBranch nodes={root.children} />
      ) : null}
    </div>
  );
}
