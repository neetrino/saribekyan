type Translate = (key: string) => string;

export function mapInfoItems(
  t: Translate,
  prefix: string,
  ids: readonly string[],
): Array<{ id: string; title: string; description: string }> {
  return ids.map((id) => ({
    id,
    title: t(`${prefix}.${id}.title`),
    description: t(`${prefix}.${id}.description`),
  }));
}

export function mapPeople(
  t: Translate,
  prefix: string,
  ids: readonly string[],
): Array<{ id: string; name: string; role: string; bio: string }> {
  return ids.map((id) => ({
    id,
    name: t(`${prefix}.${id}.name`),
    role: t(`${prefix}.${id}.role`),
    bio: t(`${prefix}.${id}.bio`),
  }));
}

export function mapGallery(
  t: Translate,
  prefix: string,
  ids: readonly string[],
  images: readonly string[],
): Array<{ id: string; src: string; alt: string }> {
  const fallback = images[0] ?? "";

  return ids.map((id, index) => ({
    id,
    src: images[index] ?? fallback,
    alt: t(`${prefix}.${id}.alt`),
  }));
}

export function mapVideos(
  t: Translate,
  prefix: string,
  ids: readonly string[],
  posters: readonly string[],
): Array<{ id: string; poster: string; title: string; description: string }> {
  const fallback = posters[0] ?? "";

  return ids.map((id, index) => ({
    id,
    poster: posters[index] ?? fallback,
    title: t(`${prefix}.${id}.title`),
    description: t(`${prefix}.${id}.description`),
  }));
}
