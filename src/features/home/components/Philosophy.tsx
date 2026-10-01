import { ArrowUpRight, BookOpen, Coffee, Sprout } from 'lucide-react';
import { BrandMark } from '../../../components/ui/BrandMark';

const values = [
  {
    icon: Sprout,
    title: 'Room to grow',
    text: 'Small habits. Fresh perspectives. Progress at your own pace.',
  },
  {
    icon: BookOpen,
    title: 'Student life, understood',
    text: 'Created around real campus days, from the library to the long way home.',
  },
  {
    icon: Coffee,
    title: 'The little things matter',
    text: 'A warm cup, a quiet moment, a ritual that feels like yours.',
  },
];

export function Philosophy() {
  return (
    <section className="philosophy-section" id="philosophy" aria-labelledby="philosophy-title">
      <div className="container philosophy-inner">
        <div className="philosophy-art" aria-hidden="true">
          <div className="philosophy-flower">
            <BrandMark />
          </div>
          <span className="philosophy-art-label">
            TAKE ROOT.
            <br />
            <em>Be you.</em>
          </span>
          <span className="philosophy-art-small">a little reminder from moss & mind</span>
        </div>
        <div className="philosophy-copy">
          <span className="eyebrow">A NOTE ON OUR PHILOSOPHY</span>
          <h2 id="philosophy-title">
            You’re a person.
            <br />
            <em>Not a productivity project.</em>
          </h2>
          <p>
            Student life is full of possibility. And sometimes, a very full calendar. We’re building
            Moss & Mind around one simple idea: make a little more room for yourself along the way.
          </p>
          <a className="text-link" href="#field-notes">
            Read our first field note <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="container values-grid">
        {values.map(({ icon: Icon, title, text }) => (
          <div className="value" key={title}>
            <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
