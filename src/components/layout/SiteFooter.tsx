import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '../ui/BrandMark';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <a className="wordmark" href="/" aria-label="Moss and Mind home">
            <BrandMark className="wordmark-icon" />
            <span>
              moss <span className="wordmark-amp">&</span> mind
            </span>
          </a>
          <p>A little more balance. One semester at a time.</p>
        </div>
        <a className="text-link" href="#main-content">
          Back to the top <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Moss & Mind · A CP340 student project</p>
        <a href="#privacy">Privacy & demo information</a>
      </div>
      <div className="container demo-notice" id="privacy">
        <p>
          <strong>A concept, thoughtfully growing.</strong> This is a course demonstration.
          Products, prices, and packaging are fictional; nothing is available to purchase. No
          medical claims are made. This site has no accounts, payment forms, analytics, marketing
          cookies, or third-party trackers. Your collection filter and menu choices stay in page
          memory and reset on reload.
        </p>
        <p>
          When the site is hosted, the hosting provider may process standard connection data, such
          as IP addresses and request logs. A complete privacy page and hosting settings are part of
          the next assignment tasks.
        </p>
      </div>
    </footer>
  );
}
