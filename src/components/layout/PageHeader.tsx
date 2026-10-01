import type { ReactNode } from 'react';
import './page-header.css';

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

// Shared page title block for the non-home pages. Renders the page's single <h1>.
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="page-header container">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
