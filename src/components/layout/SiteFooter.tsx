import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandMark } from '../ui/BrandMark';
import { SocialLinks } from '../ui/SocialLinks';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link className="wordmark" to="/" aria-label="Moss and Mind home">
            <BrandMark className="wordmark-icon" />
            <span>
              moss <span className="wordmark-amp">&</span> mind
            </span>
          </Link>
          <p>A little more balance. One semester at a time.</p>
        </div>
        <a className="text-link" href="#main-content">
          Back to the top <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <SocialLinks />
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Moss & Mind · A CP340 student project</p>
        <Link to="/privacy">Privacy & demo information</Link>
      </div>
      <div className="container demo-notice" id="privacy">
        <p>
          <strong>A concept, thoughtfully growing.</strong> This is a course demonstration.
          Products, prices, and packaging are fictional; nothing is available to purchase. No
          medical claims are made. Stripe-hosted test checkout simulates payments without charging
          real money or shipping products. Use test details only. This site has no accounts or
          application analytics. Your collection filter and menu choices stay in page memory and
          reset on reload.
        </p>
        <p>
          Hosted on Vercel, which may process connection information such as IP addresses and
          request logs to deliver and protect this website. Read our privacy notice for the demo's
          settings and data handling.
        </p>
      </div>
    </footer>
  );
}
