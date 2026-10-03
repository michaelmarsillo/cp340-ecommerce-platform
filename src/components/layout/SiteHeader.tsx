import { Link, NavLink, useMatch } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from '../ui/BrandMark';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/collection' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy', href: '/privacy' },
];

export function SiteHeader() {
  const onProductsPage = useMatch('/collection') !== null;
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
        <Link className="wordmark" to="/" aria-label="Moss and Mind home">
          <BrandMark className="wordmark-icon" />
          <span>
            moss <span className="wordmark-amp">&</span> mind
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.href} to={item.href} end>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link
          className={`button button-small header-cta${onProductsPage ? ' header-cta-hidden' : ''}`}
          to="/collection"
          aria-hidden={onProductsPage || undefined}
          tabIndex={onProductsPage ? -1 : undefined}
        >
          Browse products <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
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
            <NavLink key={item.href} to={item.href} end onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          {!onProductsPage && (
            <Link to="/collection" onClick={() => setMenuOpen(false)}>
              Browse products <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
