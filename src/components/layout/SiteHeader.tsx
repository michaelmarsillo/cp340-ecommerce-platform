import { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from '../ui/BrandMark';

const navigation = [
  { label: 'The collection', href: '#collection' },
  { label: 'Our philosophy', href: '#philosophy' },
  { label: 'Field notes', href: '#/blog' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="announcement">
        A little more balance. One semester at a time.
        <span aria-hidden="true">✳</span>
        Made with students in mind.
      </div>
      <header
        className="site-header container"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && menuOpen) {
            setMenuOpen(false);
            menuButtonRef.current?.focus();
          }
        }}
      >
        <a className="wordmark" href="#" aria-label="Moss and Mind home">
          <BrandMark className="wordmark-icon" />
          <span>
            moss <span className="wordmark-amp">&</span> mind
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button-small header-cta" href="#collection">
          Find your ritual <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#collection" onClick={() => setMenuOpen(false)}>
            Find your ritual <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>
    </>
  );
}
