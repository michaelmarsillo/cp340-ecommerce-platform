import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/layout/PageHeader';
import './privacy.css';

export function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRIVACY / COURSE DEMO"
        title={
          <>
            A little clarity about <em>your data.</em>
          </>
        }
        description="How this Moss & Mind demo works, what it collects, and the settings we use. Updated October 28, 2026."
      />
      <div className="privacy-content container">
        <section aria-labelledby="privacy-demo">
          <h2 id="privacy-demo">A student project</h2>
          <p>
            Moss & Mind is a CP340 e-commerce course concept. Products, prices, and packaging are
            fictional. This version has no user accounts or real purchases. Stripe test checkout
            demonstrates payments and an order confirmation without charging real money or shipping
            any products.
          </p>
        </section>
        <section aria-labelledby="privacy-stripe">
          <h2 id="privacy-stripe">Stripe test checkout</h2>
          <p>
            When you choose test checkout, our server sends the selected product names, quantities,
            and CAD prices to Stripe. Stripe hosts the payment form and may collect the test email,
            billing information, and test card details you enter. Use fictional test information and
            Stripe test cards only.
          </p>
          <p>
            Card details go directly to Stripe and are not handled by our application. On return,
            our server checks the checkout status with Stripe and displays only the payment
            reference, products, and total. We do not maintain an order database. Test sessions
            remain in the Stripe sandbox until deleted there. Stripe may use its own cookies and
            collect technical information on its hosted checkout. See{' '}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
              Stripe's privacy policy
            </a>
            .
          </p>
        </section>
        <section aria-labelledby="privacy-data">
          <h2 id="privacy-data">Your choices stay in the page</h2>
          <p>
            Product filters, open product details, the navigation menu, and expanded Blog posts use
            temporary page state. They reset when you reload. Our application does not write cookies
            or save these choices in local or session storage.
          </p>
          <p>
            We have not installed analytics or advertising trackers, embedded third-party content,
            or forms that collect your personal information. Product visuals and the About page's 3D
            model are served from this website.
          </p>
        </section>
        <section aria-labelledby="privacy-host">
          <h2 id="privacy-host">Hosting on Vercel</h2>
          <p>
            Vercel delivers and protects this website. The hosting provider may process technical
            connection information, such as IP addresses and request logs, even though our
            application does not collect account credentials or card details. Checkout references
            are sent to our Vercel-hosted endpoint to verify test payments.
          </p>
          <p>
            See{' '}
            <a
              href="https://vercel.com/legal/privacy-notice"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel's privacy notice
            </a>{' '}
            for its data-handling practices. We do not set or promise a custom retention period for
            provider logs.
          </p>
        </section>
        <section aria-labelledby="privacy-settings">
          <h2 id="privacy-settings">Settings for this demo</h2>
          <ul>
            <li>The public website uses HTTPS and remains accessible for course review.</li>
            <li>
              We ask search engines not to index or follow the demo using noindex and nofollow
              directives. These requests are not password protection.
            </li>
            <li>
              Our referrer policy does not send the page address when you follow links to other
              websites.
            </li>
            <li>
              Camera, microphone, and location access are disabled through the site's browser
              permissions policy.
            </li>
            <li>
              Deployment source and build logs are configured to require Vercel account access. The
              public website remains accessible for course review.
            </li>
          </ul>
        </section>
        <section aria-labelledby="privacy-updates">
          <h2 id="privacy-updates">As the project grows</h2>
          <p>
            If we add accounts, live payments, analytics, or other services in a later version, we
            will update this notice and review the settings before collecting that information.
          </p>
        </section>
        <Link className="text-link" to="/collection">
          Back to products
        </Link>
      </div>
    </>
  );
}
