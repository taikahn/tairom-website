import {
  siSpotify,
  siApplemusic,
  siSoundcloud,
  siInstagram,
  siYoutube,
  siLinktree,
} from 'simple-icons';

const toDataUrl = (icon) => {
  const svg = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${icon.path}"/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

export const ICONS = {
  spotify: toDataUrl(siSpotify),
  applemusic: toDataUrl(siApplemusic),
  soundcloud: toDataUrl(siSoundcloud),
  instagram: toDataUrl(siInstagram),
  youtube: toDataUrl(siYoutube),
  linktree: toDataUrl(siLinktree),
};
