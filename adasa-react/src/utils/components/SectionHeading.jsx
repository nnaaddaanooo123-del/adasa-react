import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function SectionHeading({ label, title, description, linkText, centered = false }) {
  return (
    <div className={centered ? 'section-heading centered' : 'section-heading'}>
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {linkText && <Link to="/blog" className="button button-primary">{linkText}<Icon name="arrow" size={18} /></Link>}
    </div>
  );
}
