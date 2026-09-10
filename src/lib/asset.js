/**
 * Everything in `public/assets` is served from PUBLIC_URL, which changes when the
 * site is deployed under a repository sub-path (GitHub Pages). Always build media
 * URLs through here rather than hard-coding `/assets/...`.
 */
export const asset = (file) => `${process.env.PUBLIC_URL}/assets/${file}`;

export default asset;
