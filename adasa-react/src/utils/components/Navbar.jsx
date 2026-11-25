import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">انتقل للمحتوى</a>
      <div className="container navbar">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src="/images/logo.png" alt="شعار عدسة" />
          <span><strong>عدسة</strong><small>عالم التصوير الفوتوغرافي</small></span>
        </Link>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="التنقل الرئيسي" id="main-nav">
          <NavLink to="/" end onClick={closeMenu}>الرئيسية</NavLink>
          <NavLink to="/blog" onClick={closeMenu}>المدونة</NavLink>
          <NavLink to="/about" onClick={closeMenu}>من نحن</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/blog" className="search-link" aria-label="البحث في المقالات" onClick={closeMenu}><Icon name="search" /></Link>
          <Link to="/blog" className="button button-primary nav-cta" onClick={closeMenu}>ابدأ القراءة</Link>
          <button className="icon-button mobile-menu" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
