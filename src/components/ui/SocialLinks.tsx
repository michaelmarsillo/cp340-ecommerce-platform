import { Icon, type IconNode } from 'lucide-react';
import { socialProfiles } from '../../config/social';
import './social-links.css';

// This Lucide version has no brand icons. Render platform outlines through
// its shared Icon component to preserve the site's SVG styling.
const instagramIcon: IconNode = [
  ['rect', { x: 3, y: 3, width: 18, height: 18, rx: 5, key: 'frame' }],
  ['circle', { cx: 12, cy: 12, r: 4, key: 'lens' }],
  ['circle', { cx: 17.5, cy: 6.5, r: 0.5, fill: 'currentColor', key: 'flash' }],
];

const linkedinIcon: IconNode = [
  ['rect', { x: 3, y: 3, width: 18, height: 18, rx: 2, key: 'frame' }],
  ['circle', { cx: 7, cy: 7, r: 0.5, fill: 'currentColor', key: 'dot' }],
  ['path', { d: 'M7 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4', key: 'letters' }],
];

const twitterIcon: IconNode = [
  ['path', { d: 'M4 3h4l12 18h-4L4 3ZM20 3l-7 8M4 21l7-8', key: 'x' }],
];

const platforms = [
  { key: 'instagram', label: 'Instagram', icon: instagramIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: linkedinIcon },
  { key: 'twitter', label: 'Twitter / X', icon: twitterIcon },
] as const;

export function SocialLinks() {
  const links = platforms.flatMap((platform) => {
    const href = socialProfiles[platform.key];
    return href ? [{ ...platform, href }] : [];
  });

  // Avoid an empty social navigation landmark when all links are disabled.
  if (links.length === 0) return null;

  return (
    <nav className="social-links" aria-label="Follow Moss & Mind">
      <h2 className="social-links-heading">Follow Moss & Mind</h2>
      <div className="social-links-list">
        {links.map(({ key, label, icon, href }) => (
          <a
            key={key}
            className="social-links-profile"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${label} (opens in a new tab)`}
          >
            <Icon iconNode={icon} size={20} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
