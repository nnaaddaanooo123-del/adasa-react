import { Link } from 'react-router-dom';
import data from '../data/posts.json';
import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand"><span className="footer-mark">ع</span><strong>عدسة</strong></Link>
          <p>{data.siteInfo.description}</p>
          <div className="social-links">
            <a href={data.siteInfo.social.twitter} target="_blank" rel="noreferrer" aria-label="تويتر">X</a>
            <a href={data.siteInfo.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
            <a href={data.siteInfo.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href={data.siteInfo.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
          </div>
        </div>
        <div className="footer-links"><h3>استكشف</h3><Link to="/">الرئيسية</Link><Link to="/blog">المدونة</Link><Link to="/about">من نحن</Link><a href={`mailto:${data.siteInfo.email}`}>تواصل معنا</a></div>
        <div className="footer-links"><h3>التصنيفات</h3>{data.categories.map((category) => (
          <Link key={category.name} to={`/blog?category=${encodeURIComponent(category.name)}`}>{category.name}</Link>
        ))}</div>
        <Newsletter compact />
      </div>
      <div className="container footer-bottom"><span>© 2026 عدسة. جميع الحقوق محفوظة.</span><span>مشروع تعليمي — فن التصوير، بكل شغف.</span></div>
    </footer>
  );
}
