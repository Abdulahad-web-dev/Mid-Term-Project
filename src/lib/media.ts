export function normalizeMediaUrl(url: string) {
  const fallback = {
    type: "image",
    thumbnail: "/placeholder-ad.jpg",
    embed: null
  };

  if (!url) return fallback;

  // YouTube normalization
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = url.match(ytRegex);
  
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      thumbnail: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`,
      embed: `https://www.youtube.com/embed/${ytMatch[1]}`
    };
  }

  // Fallback to direct image
  return {
    type: "image",
    thumbnail: url,
    embed: null
  };
}
