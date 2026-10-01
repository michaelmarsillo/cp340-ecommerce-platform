import type { CSSProperties } from 'react';
import { BrandMark } from '../../../components/ui/BrandMark';
import type { ProductTone } from '../types';
import '../catalog.css';

type ProductIllustrationProps = {
  name: string;
  subtitle?: string;
  tone: ProductTone;
  variant?: 'bottle' | 'pouch';
  className?: string;
  style?: CSSProperties;
};

export function ProductIllustration({
  name,
  subtitle = 'A LITTLE MORE BALANCE',
  tone,
  variant = 'bottle',
  className = '',
  style,
}: ProductIllustrationProps) {
  return (
    <div
      className={`product-illustration ${variant} tone-${tone} ${className}`}
      style={style}
      role="img"
      aria-label={`Illustrated Moss and Mind ${name} ${variant}`}
    >
      {variant === 'bottle' && <div className="bottle-cap" />}
      <div className="package-body">
        <div className="package-label">
          <span className="package-brand">moss & mind</span>
          <BrandMark className="package-flower" />
          <span className="package-name">{name}</span>
          <span className="package-caption">{subtitle}</span>
          <span className="package-fineprint">STUDENT RITUALS · CONCEPT</span>
        </div>
      </div>
    </div>
  );
}
