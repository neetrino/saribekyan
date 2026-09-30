import Image from "next/image";

import { cn } from "@/shared/lib/cn";

type TeamAvatarProps = {
  name: string;
  imageUrl?: string | null;
  className?: string;
  sizes?: string;
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function isRemote(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/** Photo with initials fallback. Box size and colors come from `className`. */
export function TeamAvatar({ name, imageUrl, className, sizes = "80px" }: TeamAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden font-jakarta font-extrabold",
        className,
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes={sizes}
          unoptimized={isRemote(imageUrl)}
          className="object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </div>
  );
}
