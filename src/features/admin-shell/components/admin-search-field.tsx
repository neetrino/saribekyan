import { adminInputClass } from "./admin-field-styles";

type AdminSearchFieldProps = {
  name: string;
  defaultValue?: string;
  placeholder: string;
  ariaLabel: string;
};

/** Search input with a leading magnifying-glass icon. */
export function AdminSearchField({ name, defaultValue, placeholder, ariaLabel }: AdminSearchFieldProps) {
  return (
    <div className="relative min-w-64 flex-1">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#6f6f6f]"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`${adminInputClass} pl-10`}
      />
    </div>
  );
}
