import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export default function NotFound() {
  return (
    <section className="not-found grid-background">
      <div className="container">
        <span className="eyebrow">خارج الإطار</span>
        <div className="error-number" dir="ltr">4<span><Icon name="camera" size={80} /></span>4</div>
        <h1>عفواً، الصفحة غير موجودة</h1>
        <p>يبدو أن هذه اللقطة ضاعت. الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <div className="hero-actions"><Link to="/" className="button button-primary"><Icon name="home" size={18} />العودة للرئيسية</Link><Link to="/blog" className="button button-outline">تصفح المقالات<Icon name="arrow" size={18} /></Link></div>
      </div>
    </section>
  );
}
