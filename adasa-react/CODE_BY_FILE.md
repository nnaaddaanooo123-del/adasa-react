# كود عدسة — كل ملف لوحده

النسخة الحالية تشمل صفحة من نحن وروابطها في الهيدر والفوتر والرئيسية. كل عنوان هو مسار الملف وتحته كوده الكامل فقط. الصور والخطوط في ZIP؛ الأفضل فك ضغطه بدل نسخ الأكواد بدون الأصول. شرح التشغيل والفهم في README.md.

## ترتيب القراءة

ابدأ بـ main.jsx ثم App.jsx لفهم Routing، ثم Blog.jsx للبحث والتصفية والترقيم، وBlogDetails.jsx للتفاصيل وAbout.jsx لصفحة من نحن. المكونات مسؤولة عن أجزاء الواجهة المتكررة. CSS العام في index.css وتنسيق من نحن في about.css.


## package.json

```json
{
  "name": "adasa-blog",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@11.25.0",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 3000",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0 --port 3000"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.0",
    "vite": "^7.2.2"
  }
}
```


## index.html

```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="عدسة، مدونة عربية لتعلم فن التصوير الفوتوغرافي ونصائح الإضاءة والمعدات." />
    <link rel="icon" type="image/png" href="/images/logo.png" />
    <title>عدسة — عالم التصوير</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```


## vite.config.js

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', port: 3000, strictPort: true, allowedHosts: true },
});
```


## src/main.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './fonts.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```


## src/App.jsx

```jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
```


## src/pages/Home.jsx

```jsx
import { Link } from 'react-router-dom';
import data from '../data/posts.json';
import PostCard from '../components/PostCard';
import SectionHeading from '../components/SectionHeading';
import Newsletter from '../components/Newsletter';
import Icon from '../components/Icon';

export default function Home() {
  const featuredPosts = data.posts.filter((post) => post.featured).slice(0, 3);
  const latestPosts = data.posts.filter((post) => !post.featured).slice(0, 3);
  const categoryIcons = ['sun', 'users', 'mountain', 'settings', 'camera'];
  const stats = [
    { value: '+50', label: 'مقالة', icon: 'book' },
    { value: '+10ألف', label: 'قارئ', icon: 'users' },
    { value: '4', label: 'تصنيفات', icon: 'folder' },
    { value: '6', label: 'كاتب', icon: 'pen' },
  ];

  return (
    <>
      <section className="home-hero grid-background">
        <div className="container hero-content">
          <span className="eyebrow"><span className="live-dot" />مرحباً بك في عدسة</span>
          <h1>اكتشف <span>فن</span><br />التصوير الفوتوغرافي</h1>
          <p>انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في<br className="desktop-break" /> التصوير.</p>
          <div className="hero-actions">
            <Link to="/blog" className="button button-primary">استكشف المقالات<Icon name="arrow" /></Link>
            <Link to="/about" className="button button-outline"><Icon name="info" size={18} />اعرف المزيد</Link>
          </div>
          <div className="hero-stats">{stats.map((stat) => (
            <div key={stat.label} className="stat-card"><Icon name={stat.icon} size={24} /><strong dir="ltr">{stat.value}</strong><small>{stat.label}</small></div>
          ))}</div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <SectionHeading label="مميز" title="مقالات مختارة" description="محتوى منتقى لبدء رحلة تعلمك" linkText="عرض الكل" />
          <div className="featured-posts">{featuredPosts.map((post) => <PostCard key={post.id} post={post} featured />)}</div>
        </div>
      </section>

      <section className="section topics-section" id="topics">
        <div className="container">
          <SectionHeading label="التصنيفات" title="استكشف حسب الموضوع" description="اعثر على محتوى مصمم حسب اهتماماتك" centered />
          <div className="categories-grid">{data.categories.map((category, index) => (
            <Link className="category-card" key={category.name} to={`/blog?category=${encodeURIComponent(category.name)}`}>
              <span className="category-icon"><Icon name={categoryIcons[index]} size={26} /></span>
              <h3>{category.name}</h3>
              <p>{data.posts.filter((post) => post.category === category.name).length} مقالات</p>
              <Icon name="arrow" className="category-arrow" />
            </Link>
          ))}</div>
        </div>
      </section>

      <section className="section latest-section">
        <div className="container">
          <SectionHeading label="الأحدث" title="أحدث المقالات" description="محتوى جديد طازج من المطبعة" linkText="عرض جميع المقالات" />
          <div className="posts-grid">{latestPosts.map((post) => <PostCard key={post.id} post={post} />)}</div>
        </div>
      </section>
      <section className="section newsletter-section"><div className="container"><Newsletter /></div></section>
    </>
  );
}
```


## src/pages/Blog.jsx

```jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import data from '../data/posts.json';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import Icon from '../components/Icon';

export default function Blog() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const postsPerPage = 6;

  useEffect(() => {
    setPage(1);
  }, [category]);

  // الأول نفلتر الداتا، وبعدها نختار مقالات الصفحة الحالية.
  const filteredPosts = data.posts.filter((post) => {
    const matchesCategory = category === 'all' || post.category === category;
    const text = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`;
    const matchesSearch = text.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPage = Math.min(page, totalPages || 1);
  const startIndex = (currentPage - 1) * postsPerPage;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  function changeCategory(event) {
    setPage(1);
    const value = event.target.value;
    setSearchParams(value === 'all' ? {} : { category: value });
  }

  function changePage(newPage) {
    setPage(newPage);
    document.getElementById('blog-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function resetFilters() {
    setSearch('');
    setSearchParams({});
    setPage(1);
  }

  return (
    <>
      <section className="blog-hero grid-background">
        <div className="container">
          <span className="eyebrow"><Icon name="book" size={15} />مدونتنا</span>
          <h1>استكشف <span>مقالاتنا</span></h1>
          <p>اكتشف الدروس والرؤى وأفضل الممارسات في عالم التصوير الفوتوغرافي</p>
        </div>
      </section>
      <section className="blog-section">
        <div className="container">
          <div className="blog-toolbar">
            <div className="search-input"><Icon name="search" size={20} />
              <input type="search" placeholder="ابحث في المقالات..." aria-label="ابحث في المقالات"
                value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} />
            </div>
            <div className="filter-control">
              <label htmlFor="category">التصنيف</label>
              <select id="category" value={category} onChange={changeCategory}>
                <option value="all">جميع المقالات</option>
                {data.categories.map((item) => <option value={item.name} key={item.name}>{item.name}</option>)}
                {category !== 'all' && !data.categories.some((item) => item.name === category) && <option value={category}>{category}</option>}
              </select>
            </div>
          </div>
          <div className="results-bar" id="blog-results">
            <p role="status">عرض <strong>{filteredPosts.length}</strong> مقالات{filteredPosts.length > 0 && <span> — {startIndex + 1} إلى {startIndex + visiblePosts.length}</span>}</p>
            <div className="view-switch" role="group" aria-label="طريقة عرض المقالات">
              <button className={view === 'grid' ? 'active' : ''} aria-label="عرض شبكي" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><Icon name="grid" /></button>
              <button className={view === 'list' ? 'active' : ''} aria-label="عرض قائمة" aria-pressed={view === 'list'} onClick={() => setView('list')}><Icon name="list" /></button>
            </div>
          </div>
          {visiblePosts.length > 0 ? (
            <div className={view === 'grid' ? 'posts-grid' : 'posts-list'}>
              {visiblePosts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="empty-state"><Icon name="search" size={44} /><h2>لم نعثر على مقالات</h2><p>جرّب كلمة بحث أخرى أو غيّر التصنيف.</p><button className="button button-primary" onClick={resetFilters}>عرض جميع المقالات</button></div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </div>
      </section>
    </>
  );
}
```


## src/pages/BlogDetails.jsx

```jsx
import { Link, useParams } from 'react-router-dom';
import data from '../data/posts.json';
import Author from '../components/Author';
import PostCard from '../components/PostCard';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import NotFound from './NotFound';
import formatDate from '../utils/formatDate';

export default function BlogDetails() {
  const { slug } = useParams();
  const post = data.posts.find((item) => item.slug === slug);

  if (!post) return <NotFound />;

  const blocks = post.content.split('\n\n');
  const headings = blocks.map((text, index) => ({ text, index })).filter((block) => block.text.startsWith('## '));
  const relatedPosts = data.posts.filter((item) => item.category === post.category && item.id !== post.id).slice(0, 3);

  return (
    <>
      <section className="article-hero">
        <img className="article-cover" src={`/images/posts/${post.id}.jpg`} alt={post.title} />
        <div className="container article-hero-content">
          <nav className="breadcrumbs" aria-label="مسار الصفحة">
            <Link to="/" aria-label="الرئيسية"><Icon name="home" size={16} /></Link><Icon name="next" size={14} />
            <Link to="/blog">المدونة</Link><Icon name="next" size={14} /><span>{post.category}</span>
          </nav>
          <div className="article-heading">
            <div className="article-meta">
              <Link className="category-badge" to={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
              <time dateTime={post.date}>{formatDate(post.date)}</time><span><Icon name="clock" size={16} />{post.readTime}</span>
            </div>
            <h1>{post.title}</h1><div className="hero-author"><Author post={post} /></div>
          </div>
        </div>
      </section>
      <div className="container article-layout">
        <article className="article-content">
          <blockquote>{post.excerpt}</blockquote>
          {blocks.map((block, index) => block.startsWith('## ') ? (
            <h2 id={`section-${index}`} key={index}><span className="heading-icon"><Icon name="camera" size={20} /></span>{block.slice(3)}</h2>
          ) : <p key={index}>{block}</p>)}
          <div className="article-tags"><h3>الوسوم</h3><div>{post.tags.map((tag) => <Link key={tag} to={`/blog?category=${encodeURIComponent(post.category)}`}>#{tag}</Link>)}</div></div>
          <div className="author-box"><span className="eyebrow">كاتب المقال</span><Author post={post} /><p>{post.author.role} شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي.</p></div>
        </article>
        <aside className="article-sidebar">
          <div className="toc"><h3><Icon name="list" />محتويات المقال</h3>
            {headings.map((heading, index) => <a key={heading.index} href={`#section-${heading.index}`}><span>{index + 1}</span>{heading.text.slice(3)}</a>)}
          </div>
          <div className="reading-info"><Icon name="clock" size={24} /><strong>{post.readTime}</strong><span>وقت القراءة</span></div>
          <div className="sidebar-promo"><Icon name="mail" size={28} /><h3>لا تفوّت جديدنا</h3><p>المزيد من الإلهام ينتظر عدستك.</p><Link to="/blog" className="button button-primary">تصفح المزيد<Icon name="arrow" size={16} /></Link></div>
        </aside>
      </div>
      {relatedPosts.length > 0 && <section className="section related-section"><div className="container">
        <SectionHeading label="اقرأ أيضاً" title="مقالات قد تعجبك" description="استكشف المزيد من المحتوى المميز" linkText="عرض الكل" />
        <div className="posts-grid">{relatedPosts.map((item) => <PostCard key={item.id} post={item} />)}</div>
      </div></section>}
    </>
  );
}
```


## src/pages/About.jsx

```jsx
import { Link } from 'react-router-dom';
import data from '../data/posts.json';
import Icon from '../components/Icon';
import '../about.css';

export default function About() {
  const stats = [
    { value: '+2مليون', label: 'قارئ شهرياً', icon: 'users' },
    { value: '+500', label: 'مقالة منشورة', icon: 'book' },
    { value: '+50', label: 'كاتب خبير', icon: 'pen' },
    { value: '+15', label: 'تصنيف', icon: 'folder' },
  ];

  const values = [
    { title: 'الجودة أولاً', description: 'محتوى مدروس ومكتوب بخبرة', icon: 'target' },
    { title: 'تركيز عملي', description: 'أمثلة واقعية يمكنك تطبيقها اليوم', icon: 'bolt' },
    { title: 'المجتمع', description: 'تعلم مع آلاف المصورين', icon: 'handshake' },
    { title: 'دائماً محدث', description: 'أحدث الاتجاهات وأفضل الممارسات', icon: 'refresh' },
  ];

  // نعرض كل كاتب مرة واحدة حتى لو له أكثر من مقالة.
  const authors = data.posts.filter((post, index) =>
    data.posts.findIndex((item) => item.author.name === post.author.name) === index
  );

  const socialLinks = [
    { name: 'twitter', label: 'عدسة على تويتر', url: data.siteInfo.social.twitter },
    { name: 'github', label: 'عدسة على GitHub', url: data.siteInfo.social.github },
    { name: 'linkedin', label: 'عدسة على LinkedIn', url: data.siteInfo.social.linkedin },
  ];

  return (
    <>
      <section className="about-hero grid-background">
        <div className="container">
          <span className="eyebrow"><span className="live-dot" />من نحن</span>
          <h1>مهمتنا هي <span>الإعلام والإلهام</span></h1>
          <p>{data.siteInfo.description} نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.</p>
          <div className="about-stats">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <Icon name={stat.icon} size={28} />
                <strong dir="ltr">{stat.value}</strong>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="about-section-heading">
            <h2 className="values-title">قيمنا</h2>
            <p>المبادئ التي توجه كل ما نقوم بإنشائه</p>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <div className="value-card" key={value.title}>
                <Icon name={value.icon} size={38} />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <div className="about-section-heading">
            <span className="eyebrow">فريقنا</span>
            <h2>تعرف على كتابنا</h2>
            <p>فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع.</p>
          </div>
          <div className="team-grid">
            {authors.map((post) => (
              <div className="team-card" key={post.author.name}>
                <div className="team-avatar">
                  <img src={`/images/authors/${post.id}.jpg`} alt={post.author.name} loading="lazy" />
                  <span className="team-badge" aria-hidden="true"><Icon name="check" size={12} /></span>
                </div>
                <h3>{post.author.name}</h3>
                <p>{post.author.role}</p>
                <div className="team-social-links">
                  {socialLinks.map((social) => (
                    <a key={social.name} href={social.url} target="_blank" rel="noreferrer"
                      aria-label={social.label} className={`team-social ${social.name}`}>
                      <Icon name={social.name} size={17} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact">
        <div className="container">
          <h2>لديك أسئلة؟ دعنا نتحدث!</h2>
          <p>نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا، أو تريد المساهمة، أو تريد فقط إلقاء التحية، لا تتردد في التواصل.</p>
          <div className="hero-actions">
            <a href={`mailto:${data.siteInfo.email}`} className="button contact-button"><Icon name="mail" size={19} />تواصل معنا</a>
            <Link to="/blog" className="button contact-outline">تصفح المقالات</Link>
          </div>
        </div>
      </section>
    </>
  );
}
```


## src/pages/NotFound.jsx

```jsx
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
```


## src/components/Navbar.jsx

```jsx
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
```


## src/components/Footer.jsx

```jsx
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
```


## src/components/PostCard.jsx

```jsx
import { Link } from 'react-router-dom';
import Author from './Author';
import Icon from './Icon';
import formatDate from '../utils/formatDate';

export default function PostCard({ post, featured = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className={featured ? 'post-card featured-card' : 'post-card'}>
      <div className="post-image">
        <img src={`/images/posts/${post.id}.jpg`} alt={post.title} loading="lazy" />
        <span className="image-badge">{featured ? 'مميز' : post.category}</span>
      </div>
      <div className="post-body">
        <div className="post-meta">
          {featured && <span className="category-badge">{post.category}</span>}
          <span><Icon name="clock" size={14} />{post.readTime}</span>
          {!featured && <><span className="meta-dot">•</span><time dateTime={post.date}>{formatDate(post.date)}</time></>}
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="post-bottom">
          <Author post={post} showDate={featured} />
          <span className={featured ? 'read-link' : 'card-arrow'}>
            {featured && 'اقرأ المقال'}<Icon name="arrow" size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
```


## src/components/Author.jsx

```jsx
import formatDate from '../utils/formatDate';

export default function Author({ post, showDate = false }) {
  return (
    <div className="author">
      <img src={`/images/authors/${post.id}.jpg`} alt={post.author.name} loading="lazy" />
      <div>
        <strong>{post.author.name}</strong>
        <small>{showDate ? formatDate(post.date) : post.author.role}</small>
      </div>
    </div>
  );
}
```


## src/components/Pagination.jsx

```jsx
import Icon from './Icon';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination-area">
      <nav className="pagination" aria-label="صفحات المقالات">
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="الصفحة السابقة">
          <Icon name="previous" size={18} />
        </button>
        {pages.map((page) => (
          <button key={page} className={page === currentPage ? 'active' : ''}
            aria-current={page === currentPage ? 'page' : undefined} aria-label={`الصفحة ${page}`}
            onClick={() => onPageChange(page)}>{page}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="الصفحة التالية">
          <Icon name="next" size={18} />
        </button>
      </nav>
      <p>صفحة {currentPage} من {totalPages}</p>
    </div>
  );
}
```


## src/components/ScrollToTop.jsx

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```


## src/components/Newsletter.jsx

```jsx
import { useState } from 'react';
import Icon from './Icon';

export default function Newsletter({ compact = false }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('النموذج تجريبي فقط؛ لم يتم إرسال أو حفظ بريدك الإلكتروني.');
  }

  return (
    <div className={compact ? 'newsletter compact-newsletter' : 'newsletter'}>
      {!compact && <div className="newsletter-icon"><Icon name="mail" size={30} /></div>}
      <h2>{compact ? 'ابقَ على اطلاع' : <>اشترك في <span>نشرتنا الإخبارية</span></>}</h2>
      <p>{compact ? 'اشترك للحصول على أحدث المقالات والتحديثات.' : 'احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني'}</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); }}
          placeholder="أدخل بريدك الإلكتروني" aria-label={compact ? 'البريد الإلكتروني في الفوتر' : 'البريد الإلكتروني للنشرة'} required />
        <button className="button button-primary" type="submit">{compact ? 'اشترك' : 'اشترك الآن'}<Icon name="arrow" size={18} /></button>
      </form>
      <p className="form-message" role="status">{message}</p>
      {!compact && <div className="newsletter-note">
        <div className="avatar-stack">{[1, 2, 3].map((id) => <img key={id} src={`/images/authors/${id}.jpg`} alt="" loading="lazy" />)}</div>
        <span>انضم لـ <strong>+10,000</strong> مصور <span className="note-extra">• بدون إزعاج • إلغاء الاشتراك في أي وقت</span></span>
      </div>}
    </div>
  );
}
```


## src/components/SectionHeading.jsx

```jsx
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
```


## src/components/Icon.jsx

```jsx
const paths = {
  arrow: 'M19 12H5m7 7-7-7 7-7',
  next: 'm15 18-6-6 6-6',
  previous: 'm9 18 6-6-6-6',
  search: 'm21 21-4.5-4.5M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0',
  camera: 'M14 4h-4L8 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-2-3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  clock: 'M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  grid: 'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M13 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  folder: 'M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
  pen: 'm16 3 5 5-13 13H3v-5L16 3Zm-3 3 5 5',
  book: 'M4 3h14a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2V3Zm0 14h16M8 7h8M8 11h6',
  mountain: 'm3 20 7-16 4 9 3-6 5 13H3Zm4-9 3 2 3-2',
  settings: 'M4 7h16M4 17h16M8 4v6m8 4v6',
  mail: 'M3 5h18v14H3V5Zm0 0 9 8 9-8',
  info: 'M12 11v6m0-10h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  home: 'm3 10 9-7 9 7v11h-7v-7h-4v7H3V10Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  target: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-4 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  bolt: 'm13 2-9 12h7l-1 8 10-12h-7l0-8Z',
  refresh: 'M20 7V3m0 4h-4M4 17v4m0-4h4M20 7a9 9 0 0 0-15-2M4 17a9 9 0 0 0 15 2',
  handshake: 'm2 8 4-4 4 2 4-2 8 4-4 10-4 3-4-2-4-2-4-9Zm8-2-3 4 3 2 3-3 5 5m-8 1 4 4m-7-2 4 3',
  check: 'm5 12 4 4 10-10',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  github: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 6.84c.85 0 1.71.12 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.73c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  linkedin: 'M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z',
};

export default function Icon({ name, size = 20, className = '' }) {
  const filled = ['twitter', 'github', 'linkedin'].includes(name);

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name] || paths.camera} />
    </svg>
  );
}
```


## src/utils/formatDate.js

```javascript
export default function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
```


## src/index.css

```css
:root {
  font-family: 'Tajawal', sans-serif;
  color: #f5f5f5;
  background: #0a0a0a;
  font-synthesis: none;
  --orange: #ff6900;
  --muted: #909090;
  --border: #262626;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 110px; }
body { margin: 0; }
a { color: inherit; text-decoration: none; }
button, input, select { font: inherit; }
button, select { cursor: pointer; }
button { color: inherit; }
img { max-width: 100%; display: block; }
svg { flex-shrink: 0; }
h1, h2, h3, p { margin-top: 0; }
button, a, input, select { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 2px solid #ff8d40; outline-offset: 5px; }
::selection { color: white; background: #a84305; }
.container { width: min(1280px, calc(100% - 64px)); margin-inline: auto; }
.button { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 48px; padding: 14px 24px; border-radius: 12px; border: 1px solid transparent; font-weight: 700; line-height: 1.2; transition: background .2s, transform .2s; }
.button:hover { transform: translateY(-2px); }
.button-primary { background: linear-gradient(110deg, #f97316, #f55b00); color: white; }
.button-primary:hover { background: #ff7a1c; }
.button-outline { background: transparent; border-color: #363636; }
.button-outline:hover { border-color: var(--orange); background: #18120d; }
.icon-button { display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); background: #161616; width: 42px; height: 42px; border-radius: 10px; }
.eyebrow { display: inline-flex; gap: 8px; align-items: center; border: 1px solid #f9731629; background: #f9731610; color: #fb923c; border-radius: 50px; font-size: 14px; font-weight: 500; padding: 8px 16px; line-height: 1.2; }
.eyebrow::before { content: ''; width: 6px; height: 6px; background: var(--orange); border-radius: 50%; }
.live-dot { width: 6px; height: 6px; background: #fa872d; border-radius: 50%; box-shadow: 0 0 10px #f9731655; }
.grid-background { background-image: radial-gradient(ellipse at 20% 25%, #f973160e, transparent 40%), radial-gradient(ellipse at 75% 80%, #d4940808, transparent 40%), linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px); background-size: auto, auto, 60px 60px, 60px 60px; }

/* شريط التنقل */
.site-header { height: 84px; position: sticky; top: 0; z-index: 50; background: #111111ed; backdrop-filter: blur(16px); border-bottom: 1px solid #ffffff06; }
.navbar { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.brand { display: inline-flex; align-items: center; gap: 12px; }
.brand img { width: 54px; height: 54px; object-fit: contain; }
.brand strong { display: block; font-size: 28px; line-height: 1.1; font-weight: 800; }
.brand small { display: block; color: #b5a386; font-size: 11px; margin-top: 6px; }
.nav-links { display: flex; align-items: center; gap: 4px; background: #0a0a0a; border: 1px solid #242424; padding: 5px; border-radius: 30px; }
.nav-links a { padding: 10px 24px; border-radius: 25px; color: #a4a4a4; font-size: 15px; transition: .2s; }
.nav-links a:hover { color: white; }
.nav-links a.active { background: var(--orange); color: white; font-weight: 700; }
.nav-actions { display: flex; gap: 24px; align-items: center; }
.nav-cta { border-radius: 28px; min-height: 46px; font-size: 15px; }
.search-link { color: #aaa; display: flex; }
.search-link:hover { color: var(--orange); }
.mobile-menu { display: none; }
.skip-link { position: absolute; top: -100px; padding: 10px 20px; background: var(--orange); }
.skip-link:focus { top: 4px; z-index: 60; }

/* مقدمة الرئيسية */
.home-hero { padding: 120px 0 105px; min-height: 760px; text-align: center; position: relative; }
.home-hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 90px; background: linear-gradient(transparent, #0a0a0a); pointer-events: none; }
.hero-content { position: relative; z-index: 1; }
.home-hero .eyebrow { color: #ccc; margin-bottom: 28px; }
.home-hero h1 { font-size: clamp(42px, 5.8vw, 80px); line-height: 1.3; font-weight: 900; letter-spacing: -2px; margin-bottom: 25px; }
.home-hero h1 span, .blog-hero h1 span { color: #fb9e24; }
.home-hero > .container > p { font-size: 22px; color: #9b9b9b; line-height: 1.8; margin-bottom: 30px; }
.hero-actions { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 16px; }
.hero-actions .button { padding: 18px 28px; border-radius: 15px; min-height: 58px; }
.hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 700px; margin: 64px auto 0; gap: 16px; }
.stat-card { background: #151515bb; border: 1px solid #252525; border-radius: 22px; padding: 20px 16px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.stat-card svg { color: #ff7b16; }
.stat-card strong { color: #ffa22e; font-size: 30px; font-weight: 800; line-height: 1; }
.stat-card small { color: #858585; font-size: 14px; }

/* الأقسام وبطاقات المقالات */
.section { padding: 88px 0; }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 25px; margin-bottom: 40px; }
.section-heading h2 { font-size: 48px; font-weight: 800; line-height: 1.3; margin: 16px 0 10px; letter-spacing: -1px; }
.section-heading p { font-size: 18px; color: var(--muted); margin-bottom: 0; line-height: 1.6; }
.section-heading > .button { min-height: 44px; font-size: 15px; padding: 12px 20px; margin-bottom: 5px; }
.section-heading.centered { display: block; text-align: center; }
.featured-section { background: linear-gradient(120deg, #21100677, transparent 70%); border-top: 1px solid #26150a; }
.featured-posts { display: flex; flex-direction: column; gap: 28px; }
.posts-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; }
.post-card { min-width: 0; background: #141414; border: 1px solid #282828; border-radius: 22px; overflow: hidden; display: flex; flex-direction: column; transition: border-color .25s, transform .25s, box-shadow .25s; }
.post-card:hover { border-color: #ff690060; transform: translateY(-5px); box-shadow: 0 15px 35px #00000030; }
.post-image { position: relative; overflow: hidden; aspect-ratio: 1.8; background: #1c1c1c; }
.post-image > img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.post-card:hover .post-image > img { transform: scale(1.055); }
.image-badge { position: absolute; right: 16px; top: 16px; border: 1px solid #ffffff12; background: #101010a6; backdrop-filter: blur(10px); border-radius: 20px; padding: 6px 12px; font-size: 12px; font-weight: 700; color: white; }
.post-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
.post-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: #818181; font-size: 12px; margin-bottom: 14px; }
.post-meta > span { display: inline-flex; align-items: center; gap: 5px; }
.meta-dot { color: #505050; }
.post-body h3 { margin-bottom: 12px; font-size: 22px; line-height: 1.55; font-weight: 700; transition: color .2s; }
.post-card:hover h3 { color: #ff8d3c; }
.post-body > p { color: #8f8f8f; font-size: 15px; line-height: 1.85; margin-bottom: 24px; }
.post-bottom { margin-top: auto; padding-top: 18px; border-top: 1px solid #262626; display: flex; gap: 12px; align-items: center; justify-content: space-between; }
.author { display: flex; align-items: center; gap: 12px; text-align: right; }
.author > img { height: 40px; width: 40px; object-fit: cover; border: 2px solid #323232; border-radius: 50%; }
.author strong { display: block; font-size: 14px; font-weight: 700; }
.author small { display: block; font-size: 12px; color: #7c7c7c; margin-top: 5px; }
.card-arrow { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #ff690011; border: 1px solid #ff690025; color: #f97316; transition: .2s; }
.post-card:hover .card-arrow { background: var(--orange); color: white; }
.featured-card { flex-direction: row; min-height: 350px; }
.featured-card .post-image { width: 50%; flex-shrink: 0; aspect-ratio: auto; }
.featured-card .post-body { padding: 40px; }
.featured-card h3 { font-size: 30px; line-height: 1.55; }
.featured-card .image-badge { background: linear-gradient(110deg, #ff8d11, #f97316); right: 24px; top: 24px; font-size: 13px; }
.category-badge { display: inline-flex; align-items: center; padding: 7px 12px; color: #ff8d3c; background: #ff690015; border: 1px solid #ff690025; border-radius: 25px; font-size: 13px; }
.read-link { display: inline-flex; align-items: center; gap: 10px; color: var(--orange); font-weight: 700; font-size: 15px; }
.topics-section { background: #111; border-block: 1px solid #202020; }
.categories-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 20px; }
.category-card { position: relative; border: 1px solid #292929; background: #181818; padding: 28px; border-radius: 20px; transition: .2s; }
.category-card:hover { background: #ff690010; border-color: #f9731680; transform: translateY(-5px); }
.category-icon { display: inline-flex; padding: 13px; border-radius: 14px; border: 1px solid #f9731625; background: #ff690010; color: #ff7c21; margin-bottom: 22px; }
.category-card h3 { font-size: 21px; margin-bottom: 8px; }
.category-card p { color: var(--muted); font-size: 14px; margin-bottom: 0; }
.category-arrow { position: absolute; left: 24px; bottom: 30px; color: #f97316; opacity: 0; transition: opacity .2s; }
.category-card:hover .category-arrow { opacity: 1; }

/* النشرة والفوتر */
.newsletter-section { background: #0d0d0d; padding-top: 35px; }
.newsletter { max-width: 960px; margin-inline: auto; background: radial-gradient(ellipse at top, #f9731618, transparent 75%), #161616; border: 1px solid #f9731633; border-radius: 28px; padding: 55px 48px; text-align: center; }
.newsletter-icon { display: flex; width: 66px; height: 66px; border-radius: 18px; background: linear-gradient(130deg, #ff8215, #f55b00); align-items: center; justify-content: center; margin: 0 auto 24px; }
.newsletter h2 { font-size: 38px; line-height: 1.4; margin-bottom: 14px; }
.newsletter h2 span { color: #ff8b36; }
.newsletter > p { color: var(--muted); font-size: 17px; line-height: 1.8; }
.newsletter-form { display: flex; gap: 12px; max-width: 620px; margin: 26px auto 0; }
.newsletter-form input { min-width: 0; flex: 1; background: #0a0a0a; border: 1px solid #333; color: white; padding: 16px 20px; border-radius: 12px; outline-offset: 3px; }
.newsletter-form input::placeholder { color: #666; }
.newsletter-form input:focus { border-color: var(--orange); }
.form-message { margin: 12px 0 0; color: #ffa05b !important; font-size: 13px !important; }
.form-message:empty { display: none; }
.newsletter-note { margin-top: 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px; font-size: 14px; color: #898989; }
.newsletter-note strong { color: #ccc; }
.avatar-stack { display: flex; direction: ltr; }
.avatar-stack img { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #161616; margin-right: -8px; }
.note-extra { font-size: 12px; margin-right: 10px; color: #666; }
.site-footer { border-top: 1px solid #222; background: #101010; padding: 64px 0 0; }
.footer-grid { display: grid; grid-template-columns: 1.25fr .65fr .7fr 1fr; gap: 60px; padding-bottom: 48px; }
.footer-mark { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 25px; border-radius: 13px; background: var(--orange); font-weight: 800; }
.footer-brand .brand { margin-bottom: 24px; }
.footer-brand p { color: #858585; font-size: 15px; line-height: 1.9; }
.social-links { display: flex; gap: 10px; margin-top: 24px; }
.social-links a { width: 38px; height: 38px; background: #1a1a1a; border: 1px solid #292929; color: #888; border-radius: 10px; display: flex; align-items: center; justify-content: center; font: 600 13px sans-serif; transition: .2s; }
.social-links a:hover { background: var(--orange); color: white; border-color: var(--orange); }
.footer-links h3 { font-size: 18px; margin: 8px 0 24px; }
.footer-links h3::before { content: ''; display: inline-block; width: 22px; height: 3px; background: var(--orange); margin-left: 10px; vertical-align: middle; }
.footer-links > a { display: block; font-size: 15px; color: #858585; margin-bottom: 17px; }
.footer-links > a:hover { color: #fb923c; }
.compact-newsletter { margin: 0; background: none; border: none; padding: 0; text-align: right; }
.compact-newsletter h2 { font-size: 18px; margin: 8px 0 24px; }
.compact-newsletter > p { font-size: 14px; line-height: 1.8; }
.compact-newsletter .newsletter-form { flex-direction: column; margin: 20px 0 0; }
.compact-newsletter .newsletter-form input { width: 100%; padding: 13px 16px; background: #171717; font-size: 14px; }
.compact-newsletter .button { min-height: 43px; padding: 12px; font-size: 14px; }
.footer-bottom { border-top: 1px solid #252525; display: flex; justify-content: space-between; gap: 20px; color: #686868; font-size: 13px; padding-block: 25px; }

/* صفحة المدونة */
.blog-hero { padding: 76px 0 64px; text-align: center; }
.blog-hero h1 { font-size: 60px; line-height: 1.25; font-weight: 900; margin: 22px 0; letter-spacing: -1.5px; }
.blog-hero p { color: #919191; font-size: 19px; line-height: 1.7; margin-bottom: 0; }
.blog-section { padding-bottom: 80px; }
.blog-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 24px 0; border-bottom: 1px solid #252525; }
.search-input { position: relative; width: 390px; max-width: 100%; }
.search-input > svg { position: absolute; left: 17px; top: 50%; transform: translateY(-50%); color: #666; pointer-events: none; }
.search-input input { background: #151515; border: 1px solid #2c2c2c; border-radius: 12px; padding: 15px 17px 15px 48px; color: white; width: 100%; }
.search-input input::placeholder { color: #777; }
.filter-control { display: flex; align-items: center; gap: 14px; }
.filter-control label { color: #aaa; font-size: 15px; }
.filter-control select { color: #ececec; background: #161616; border: 1px solid #36302b; border-radius: 12px; padding: 14px 18px; min-width: 210px; }
.filter-control select:hover { border-color: var(--orange); }
.results-bar { display: flex; align-items: center; justify-content: space-between; padding: 28px 0; scroll-margin-top: 84px; }
.results-bar p { color: #999; margin: 0; font-size: 15px; }
.results-bar strong { color: #eee; font-weight: 500; }
.results-bar p > span { font-size: 13px; color: #666; }
.view-switch { display: flex; background: #161616; border: 1px solid #282828; border-radius: 12px; padding: 4px; gap: 2px; }
.view-switch button { border: none; width: 38px; height: 36px; display: flex; align-items: center; justify-content: center; background: transparent; color: #777; border-radius: 8px; }
.view-switch button.active { color: white; background: var(--orange); }
.posts-list { display: flex; flex-direction: column; gap: 24px; }
.posts-list .post-card { flex-direction: row; min-height: 245px; }
.posts-list .post-image { width: 34%; flex-shrink: 0; aspect-ratio: auto; }
.posts-list .post-body { padding: 28px 34px; }
.posts-list .post-body h3 { font-size: 26px; }
.posts-list .post-body > p { margin-bottom: 18px; }
.pagination-area { text-align: center; margin-top: 48px; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 8px; }
.pagination button { min-width: 46px; height: 46px; border-radius: 12px; border: 1px solid #2d2d2d; background: #151515; display: flex; justify-content: center; align-items: center; font-weight: 700; }
.pagination button.active { background: var(--orange); color: white; border-color: var(--orange); }
.pagination button:hover:not(:disabled):not(.active) { border-color: #ff690077; color: #ff8d3c; }
.pagination button:disabled { opacity: .3; cursor: not-allowed; }
.pagination-area > p { color: #777; font-size: 14px; margin: 18px 0 0; }
.empty-state { text-align: center; padding: 80px 16px; background: #111; border: 1px dashed #333; border-radius: 22px; }
.empty-state > svg { color: #f97316; margin-bottom: 20px; }
.empty-state h2 { font-size: 28px; margin-bottom: 12px; }
.empty-state p { color: #888; margin-bottom: 25px; }

/* تفاصيل المقال */
.article-hero { min-height: 660px; position: relative; }
.article-cover { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.article-hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, #0a0a0a 2%, #0a0a0abb 35%, #0a0a0a20 100%); }
.article-hero-content { position: relative; z-index: 1; padding: 32px 0 54px; min-height: 660px; display: flex; flex-direction: column; justify-content: space-between; }
.breadcrumbs { display: flex; align-items: center; gap: 12px; width: fit-content; padding: 12px 18px; background: #0a0a0a65; backdrop-filter: blur(12px); border: 1px solid #ffffff15; border-radius: 24px; font-size: 14px; }
.breadcrumbs > span { color: #ff9a4b; }
.breadcrumbs a:hover { color: #ff9a4b; }
.article-heading { max-width: 1000px; }
.article-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 20px; color: #b1b1b1; font-size: 14px; }
.article-meta .category-badge { background: var(--orange); color: white; border: 0; padding: 10px 18px; font-weight: 700; }
.article-meta > span { display: flex; gap: 6px; align-items: center; }
.article-heading h1 { font-size: 56px; font-weight: 800; line-height: 1.4; margin: 24px 0 30px; }
.hero-author { display: inline-block; background: #171717bb; border: 1px solid #ffffff19; border-radius: 18px; padding: 14px 18px; }
.hero-author .author > img { width: 52px; height: 52px; border-color: #f97316; }
.hero-author .author strong { font-size: 17px; }
.article-layout { display: grid; grid-template-columns: minmax(0, 1fr) 310px; gap: 48px; padding-top: 24px; padding-bottom: 64px; }
.article-content { min-width: 0; }
.article-content blockquote { margin: 0 0 40px; padding: 26px 30px; background: linear-gradient(120deg, #291605, #171209); border: 1px solid #57321180; border-right: 3px solid var(--orange); border-radius: 16px; color: #d1c2ad; font-size: 20px; line-height: 1.9; font-style: italic; }
.article-content > p { color: #b7b7b7; font-size: 18px; line-height: 2.15; white-space: pre-line; margin-bottom: 32px; }
.article-content > h2 { display: flex; align-items: center; gap: 14px; font-size: 28px; line-height: 1.5; margin: 42px 0 20px; scroll-margin-top: 112px; }
.heading-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 12px; color: #ff791a; background: #f9731612; border: 1px solid #f9731630; }
.article-sidebar { align-self: start; position: sticky; top: 108px; }
.toc { background: #121212; border: 1px solid #282828; border-radius: 18px; padding: 24px; }
.toc h3 { display: flex; align-items: center; gap: 10px; font-size: 18px; margin-bottom: 22px; }
.toc h3 svg { color: var(--orange); }
.toc > a { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #999; padding: 12px 0; line-height: 1.5; }
.toc > a span { width: 25px; height: 25px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 7px; background: #242424; color: #999; font-size: 12px; }
.toc > a:hover { color: #ff8b35; }
.reading-info { display: flex; flex-direction: column; gap: 10px; text-align: center; align-items: center; border: 1px solid #252525; border-radius: 18px; background: #131313; padding: 24px; margin-top: 20px; }
.reading-info > svg { color: var(--orange); }
.reading-info strong { font-size: 18px; }
.reading-info > span { color: #777; font-size: 13px; }
.sidebar-promo { text-align: center; padding: 28px 20px; margin-top: 20px; border-radius: 18px; background: #241306; border: 1px solid #f9731625; }
.sidebar-promo > svg { color: var(--orange); margin-bottom: 16px; }
.sidebar-promo h3 { margin-bottom: 12px; }
.sidebar-promo p { color: #a49381; font-size: 14px; line-height: 1.7; }
.article-tags { border-top: 1px solid #282828; padding: 30px 0; margin-top: 40px; }
.article-tags h3 { font-size: 16px; }
.article-tags > div { display: flex; flex-wrap: wrap; gap: 10px; }
.article-tags a { padding: 9px 15px; background: #191919; border: 1px solid #303030; color: #aaa; font-size: 14px; border-radius: 20px; }
.article-tags a:hover { border-color: var(--orange); color: var(--orange); }
.author-box { padding: 30px; border: 1px solid #2d2d2d; border-radius: 20px; background: #151515; }
.author-box .eyebrow { margin-bottom: 20px; }
.author-box .author > img { width: 64px; height: 64px; }
.author-box .author strong { font-size: 20px; }
.author-box p { font-size: 16px; color: #999; margin: 20px 0 0; line-height: 1.8; }
.related-section { border-top: 1px solid #252525; background: #101010; }

/* الصفحة غير الموجودة */
.not-found { padding: 100px 0 110px; min-height: 650px; text-align: center; }
.error-number { display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 170px; font-weight: 900; color: var(--orange); line-height: 1.4; }
.error-number > span { height: 125px; width: 125px; border: 3px solid #ff690055; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: #ff690009; }
.not-found h1 { font-size: 36px; line-height: 1.4; margin-bottom: 20px; }
.not-found p { color: #999; font-size: 18px; line-height: 1.9; margin-bottom: 32px; }

/* التابلت والموبايل */
@media (max-width: 1100px) {
  .container { width: calc(100% - 48px); }
  .footer-grid { gap: 30px; }
  .post-body { padding: 20px; }
  .post-body h3 { font-size: 20px; }
  .featured-card .post-body { padding: 30px; }
  .featured-card h3 { font-size: 26px; }
  .categories-grid { gap: 14px; }
  .category-card { padding: 22px 16px; }
  .category-card h3 { font-size: 18px; }
  .article-layout { grid-template-columns: minmax(0, 1fr) 270px; gap: 28px; }
  .article-heading h1 { font-size: 48px; }
}
@media (max-width: 800px) {
  .site-header { height: 74px; }
  .brand img { width: 44px; height: 44px; }
  .brand strong { font-size: 24px; }
  .nav-links a { padding: 10px 18px; }
  .nav-actions { gap: 14px; }
  .nav-cta { padding: 12px 18px; font-size: 13px; }
  .home-hero { padding: 90px 0 85px; min-height: auto; }
  .home-hero h1 { font-size: 58px; }
  .home-hero > .container > p { font-size: 19px; }
  .hero-stats { max-width: 600px; }
  .section { padding: 64px 0; }
  .section-heading h2 { font-size: 36px; }
  .section-heading p { font-size: 16px; }
  .posts-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
  .featured-card { min-height: 320px; }
  .featured-card .post-body { padding: 24px; }
  .featured-card h3 { font-size: 22px; }
  .featured-card .post-body > p { font-size: 14px; }
  .read-link { font-size: 13px; gap: 5px; }
  .categories-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
  .newsletter { padding: 40px 30px; }
  .newsletter h2 { font-size: 30px; }
  .compact-newsletter { padding: 0; }
  .compact-newsletter h2 { font-size: 18px; }
  .blog-hero { padding: 60px 0 40px; }
  .blog-hero h1 { font-size: 48px; }
  .blog-hero p { font-size: 17px; }
  .filter-control select { min-width: 170px; }
  .article-hero, .article-hero-content { min-height: 560px; }
  .article-heading h1 { font-size: 40px; }
  .article-layout { grid-template-columns: 1fr; }
  .article-sidebar { position: static; display: none; }
  .article-content > p { font-size: 17px; }
}
@media (max-width: 760px) {
  .nav-cta { display: none; }
  .mobile-menu { display: inline-flex; }
  .nav-links { display: none; position: absolute; top: 74px; left: 16px; right: 16px; padding: 12px; border-radius: 16px; background: #171717; box-shadow: 0 20px 40px #0008; }
  .nav-links.is-open { display: flex; flex-direction: column; align-items: stretch; }
  .nav-links a { text-align: center; border-radius: 10px; padding: 14px; }
}
@media (max-width: 560px) {
  .container { width: calc(100% - 32px); }
  .navbar { gap: 12px; }
  .brand { gap: 8px; }
  .brand small { font-size: 9px; }
  .nav-actions { gap: 12px; }
  .home-hero { padding: 65px 0 68px; }
  .home-hero .eyebrow { font-size: 12px; margin-bottom: 22px; }
  .home-hero h1 { font-size: 43px; line-height: 1.4; letter-spacing: -1px; }
  .home-hero > .container > p { font-size: 17px; line-height: 1.8; }
  .desktop-break { display: none; }
  .hero-actions { gap: 12px; }
  .hero-actions .button { min-height: 50px; padding: 15px 18px; font-size: 14px; gap: 8px; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); max-width: 330px; gap: 12px; margin-top: 40px; }
  .stat-card { padding: 20px 12px; border-radius: 18px; }
  .stat-card strong { font-size: 26px; }
  .section { padding: 48px 0; }
  .section-heading { flex-wrap: wrap; align-items: flex-start; gap: 20px; margin-bottom: 28px; }
  .section-heading h2 { font-size: 32px; margin-top: 14px; }
  .section-heading p { font-size: 15px; }
  .section-heading > .button { font-size: 13px; }
  .posts-grid { grid-template-columns: 1fr; gap: 24px; }
  .post-body { padding: 24px; }
  .post-body h3 { font-size: 22px; }
  .post-image { aspect-ratio: 1.75; }
  .featured-card { flex-direction: column; }
  .featured-card .post-image { width: 100%; aspect-ratio: 1.6; }
  .featured-card .post-body { padding: 25px; }
  .featured-card h3 { font-size: 24px; }
  .featured-card .post-body > p { font-size: 15px; }
  .categories-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .category-card { padding: 24px 20px; }
  .category-card h3 { font-size: 18px; }
  .category-card:last-child { grid-column: 1 / -1; }
  .category-arrow { display: none; }
  .newsletter { padding: 32px 20px; border-radius: 22px; }
  .newsletter h2 { font-size: 27px; }
  .newsletter > p { font-size: 15px; }
  .newsletter-form { flex-direction: column; }
  .newsletter-note { line-height: 1.8; }
  .note-extra { display: block; margin-right: 0; }
  .site-footer { padding-top: 42px; }
  .footer-grid { gap: 32px 24px; }
  .footer-brand, .compact-newsletter { grid-column: 1 / -1; }
  .compact-newsletter { padding: 0; }
  .compact-newsletter h2 { font-size: 18px; }
  .footer-bottom { flex-direction: column; text-align: center; gap: 10px; line-height: 1.7; }
  .blog-hero { padding: 48px 0 32px; }
  .blog-hero h1 { font-size: 40px; letter-spacing: -.5px; }
  .blog-hero p { font-size: 16px; }
  .blog-toolbar { flex-direction: column; align-items: stretch; gap: 16px; padding: 20px 0; }
  .search-input { width: 100%; }
  .filter-control { justify-content: space-between; }
  .filter-control select { flex: 1; }
  .results-bar { padding: 24px 0; }
  .results-bar p { font-size: 14px; }
  .results-bar p > span { display: block; margin-top: 5px; font-size: 12px; }
  .posts-list .post-card { flex-direction: column; }
  .posts-list .post-image { width: 100%; aspect-ratio: 2.4; }
  .posts-list .post-body { padding: 20px; }
  .posts-list .post-body h3 { font-size: 20px; }
  .pagination { gap: 6px; }
  .pagination button { min-width: 37px; height: 40px; border-radius: 10px; font-size: 14px; }
  .article-hero, .article-hero-content { min-height: 540px; }
  .article-hero-content { padding-top: 22px; padding-bottom: 30px; }
  .breadcrumbs { font-size: 12px; padding: 10px 13px; gap: 8px; }
  .article-heading h1 { font-size: 32px; line-height: 1.5; margin: 20px 0 24px; }
  .article-meta { gap: 12px; font-size: 12px; }
  .article-meta .category-badge { padding: 8px 12px; font-size: 12px; }
  .hero-author { padding: 12px 14px; }
  .hero-author .author > img { width: 42px; height: 42px; }
  .hero-author .author strong { font-size: 15px; }
  .article-layout { padding-top: 8px; padding-bottom: 40px; }
  .article-content blockquote { padding: 20px; font-size: 17px; margin-bottom: 30px; }
  .article-content > p { font-size: 16px; line-height: 2; }
  .article-content > h2 { font-size: 23px; gap: 10px; margin-top: 32px; }
  .heading-icon { width: 34px; height: 34px; flex-shrink: 0; }
  .author-box { padding: 24px; }
  .not-found { padding: 65px 0 80px; min-height: 570px; }
  .error-number { font-size: 125px; }
  .error-number > span { width: 95px; height: 95px; }
  .error-number svg { width: 58px; }
  .not-found h1 { font-size: 28px; }
  .not-found p { font-size: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
```


## src/about.css

```css
/* صفحة من نحن */
.about-hero { padding: 96px 0; text-align: center; }
.about-hero h1 { font-size: 60px; font-weight: 900; line-height: 1.3; letter-spacing: -1px; margin: 24px 0; }
.about-hero h1 span { color: #fb923c; }
.about-hero > .container > p { max-width: 850px; margin: 0 auto; color: #9b9b9b; font-size: 20px; line-height: 1.8; }
.about-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); max-width: 896px; margin: 48px auto 0; gap: 16px; }
.about-stats .stat-card { background: #161616; padding: 24px; border-radius: 24px; gap: 12px; }
.about-stats .stat-card strong { font-size: 30px; }
.about-stats .stat-card small { font-size: 14px; }
.about-values { background: #111; padding: 80px 0; border-block: 1px solid #262626; }
.about-section-heading { text-align: center; margin-bottom: 64px; }
.about-section-heading h2 { font-size: 36px; font-weight: 800; line-height: 1.4; margin: 16px 0; }
.about-section-heading p { color: #999; font-size: 18px; line-height: 1.8; margin: 0; }
.values-title { display: inline-flex; align-items: center; gap: 16px; }
.values-title::before, .values-title::after { content: ''; width: 5px; height: 32px; background: linear-gradient(#ff6500, #fca511); border-radius: 5px; }
.values-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
.value-card { background: #161616; border: 1px solid #262626; border-radius: 16px; padding: 24px 18px; text-align: center; transition: border-color .2s; }
.value-card > svg { color: #f97316; margin-bottom: 16px; }
.value-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.value-card p { font-size: 14px; color: #888; line-height: 1.8; margin: 0; }
.value-card:hover { border-color: #f9731650; }
.about-team { padding: 80px 0; background: #0a0a0a; }
.team-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
.team-card { min-width: 0; text-align: center; background: #161616; border: 1px solid #262626; border-radius: 16px; padding: 24px; transition: border-color .3s; }
.team-card:hover { border-color: #f9731650; }
.team-avatar { display: inline-block; position: relative; margin-bottom: 20px; }
.team-avatar > img { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; outline: 4px solid #262626; transition: outline-color .3s; }
.team-card:hover .team-avatar > img { outline-color: #f9731650; }
.team-badge { position: absolute; bottom: -4px; right: -4px; width: 24px; height: 24px; background: #f97316; border: 2px solid #161616; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; }
.team-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; line-height: 1.5; }
.team-card > p { color: #f97316; font-size: 14px; font-weight: 500; margin-bottom: 20px; line-height: 1.6; }
.team-social-links { display: flex; justify-content: center; gap: 12px; }
.team-social { background: #262626; color: #777; width: 36px; height: 36px; border-radius: 8px; display: inline-flex; justify-content: center; align-items: center; transition: background .2s, color .2s; }
.team-social:hover { color: white; }
.team-social.twitter:hover { background: #f97316; }
.team-social.github:hover { background: #404040; }
.team-social.linkedin:hover { background: #2563eb; }
.about-contact { padding: 80px 0; text-align: center; background: linear-gradient(135deg, #ea580c, #ff6900 50%, #eab308); }
.about-contact h2 { font-size: 36px; font-weight: 800; line-height: 1.5; margin-bottom: 24px; }
.about-contact p { max-width: 680px; margin: 0 auto 36px; font-size: 18px; color: #fff9; line-height: 1.8; }
.about-contact .button { border-radius: 12px; padding: 16px 28px; }
.contact-button { background: #0a0a0a; color: white; }
.contact-button:hover { background: #222; }
.contact-outline { border: 1px solid #ffffff80; background: transparent; color: white; }
.contact-outline:hover { background: #ffffff15; }

@media (max-width: 800px) {
  .about-hero { padding: 72px 0; }
  .about-hero h1 { font-size: 46px; }
  .about-hero > .container > p { font-size: 18px; }
  .about-stats .stat-card { padding: 24px 12px; }
  .about-stats .stat-card strong { font-size: 26px; }
  .about-values, .about-team, .about-contact { padding: 64px 0; }
  .about-section-heading { margin-bottom: 40px; }
  .values-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
  .team-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
}
@media (max-width: 560px) {
  .about-hero { padding: 56px 0; }
  .about-hero h1 { font-size: 38px; line-height: 1.45; letter-spacing: -.5px; }
  .about-hero > .container > p { font-size: 17px; }
  .about-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 360px; gap: 12px; margin-top: 36px; }
  .about-stats .stat-card { padding: 22px 16px; border-radius: 18px; }
  .about-values, .about-team, .about-contact { padding: 48px 0; }
  .about-section-heading h2 { font-size: 30px; }
  .about-section-heading p { font-size: 16px; }
  .values-grid { gap: 12px; }
  .value-card { padding: 24px 12px; }
  .value-card p { font-size: 13px; }
  .team-grid { grid-template-columns: 1fr; gap: 20px; }
  .team-card { padding: 28px; }
  .about-contact h2 { font-size: 29px; }
  .about-contact p { font-size: 16px; margin-bottom: 28px; }
  .about-contact .button { padding: 16px 20px; }
}
```


## src/fonts.css

```css
@font-face {
  font-family: 'Tajawal';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/tajawal-0.ttf) format('truetype');
}
@font-face {
  font-family: 'Tajawal';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(/fonts/tajawal-1.ttf) format('truetype');
}
@font-face {
  font-family: 'Tajawal';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts/tajawal-2.ttf) format('truetype');
}
@font-face {
  font-family: 'Tajawal';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(/fonts/tajawal-3.ttf) format('truetype');
}
@font-face {
  font-family: 'Tajawal';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(/fonts/tajawal-4.ttf) format('truetype');
}
```


## src/data/posts.json

```json
{
  "posts": [
    {
      "id": 1,
      "slug": "mastering-golden-hour-photography",
      "title": "إتقان تصوير الساعة الذهبية: دليل شامل",
      "excerpt": "تعلم كيفية التقاط صور مذهلة خلال الساعة الذهبية مع نصائح احترافية حول الإضاءة والتكوين.",
      "content": "الساعة الذهبية هي أكثر الأوقات سحراً للتصوير الفوتوغرافي. ذلك الوقت القصير بعد شروق الشمس وقبل غروبها حيث يكون الضوء ناعماً ودافئاً وساحراً.\n\n## لماذا الساعة الذهبية؟\n\nالضوء خلال هذا الوقت له صفات فريدة: ظلال طويلة ناعمة، ألوان دافئة ذهبية، وتباين منخفض يجعل كل شيء يبدو أجمل. البورتريهات تكتسب توهجاً طبيعياً والمناظر الطبيعية تتحول إلى لوحات فنية.\n\n## التحضير المسبق\n\nخطط لجلسة التصوير مسبقاً. استخدم تطبيقات مثل PhotoPills لمعرفة وقت الساعة الذهبية بدقة في موقعك. وصل قبل 30 دقيقة لاختيار أفضل زاوية.\n\n## إعدادات الكاميرا\n\nاستخدم ISO منخفض للحصول على أقل ضوضاء. فتحة العدسة تعتمد على ما تريد: f/1.8-f/2.8 للبورتريهات مع خلفية ضبابية، أو f/8-f/11 للمناظر الطبيعية الحادة.\n\n## التكوين الفني\n\nضع الشمس خلف موضوعك للحصول على تأثير الإضاءة الخلفية الساحر. أو استخدمها كمصدر جانبي لإبراز الملمس والعمق.\n\n## الخلاصة\n\nالساعة الذهبية هي هدية للمصورين. استغلها جيداً وستحصل على صور لا تُنسى تتميز بجمالها الطبيعي.",
      "category": "إضاءة",
      "author": {
        "name": "سالم أحمد",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        "role": "مصور محترف"
      },
      "image": "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&h=400&fit=crop",
      "date": "2026-01-15",
      "readTime": "8 دقائق للقراءة",
      "featured": true,
      "tags": [
        "إضاءة",
        "الساعة الذهبية",
        "تصوير خارجي"
      ]
    },
    {
      "id": 2,
      "slug": "portrait-photography-secrets",
      "title": "أسرار تصوير البورتريه: كيف تلتقط روح الشخصية",
      "excerpt": "اكتشف تقنيات احترافية لتصوير بورتريهات تعبيرية تكشف عن شخصية الموضوع الحقيقية.",
      "content": "تصوير البورتريه هو فن التقاط جوهر الإنسان في صورة واحدة. ليس مجرد توثيق الملامح، بل كشف القصة خلف العيون.\n\n## التواصل مع الموضوع\n\nقبل أن تمسك الكاميرا، تحدث مع الشخص. اجعله يشعر بالراحة. الابتسامة الحقيقية والنظرة الطبيعية تأتي فقط عندما يثق بك الموضوع.\n\n## اختيار العدسة المناسبة\n\nعدسات 85mm و 50mm هي الكلاسيكيات لتصوير البورتريه. توفر ضغطاً مثالياً للملامح وخلفية ضبابية جميلة.\n\n## الإضاءة الطبيعية\n\nالنافذة الكبيرة هي أفضل صديق لمصور البورتريه. ضع الموضوع بزاوية 45 درجة من النافذة للحصول على إضاءة ثلاثية الأبعاد رائعة.\n\n## التركيز على العيون\n\nالعيون هي نافذة الروح. تأكد دائماً من أن العيون حادة ومركزة. استخدم نقطة تركيز واحدة على العين الأقرب للكاميرا.\n\n## الخلفية والتكوين\n\nاختر خلفية بسيطة لا تشتت الانتباه. استخدم قاعدة الأثلاث لوضع العيون في النقاط القوية.\n\n## الخلاصة\n\nالبورتريه الناجح يحكي قصة. عندما تجمع بين التقنية والتواصل الإنساني، تخلق صوراً خالدة.",
      "category": "بورتريه",
      "author": {
        "name": "محمد علي",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        "role": "مصور بورتريه"
      },
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      "date": "2026-01-12",
      "readTime": "6 دقائق للقراءة",
      "featured": true,
      "tags": [
        "بورتريه",
        "تصوير أشخاص",
        "إضاءة طبيعية"
      ]
    },
    {
      "id": 3,
      "slug": "landscape-photography-guide",
      "title": "دليل تصوير المناظر الطبيعية: من المبتدئ إلى المحترف",
      "excerpt": "استكشف تقنيات تصوير المناظر الطبيعية الخلابة وكيفية التقاط جمال الطبيعة بعدستك.",
      "content": "تصوير المناظر الطبيعية هو رحلة إلى قلب الطبيعة. إنه فن يتطلب الصبر والتخطيط والعين الفنية لرؤية الجمال في كل مكان.\n\n## المعدات الأساسية\n\nحامل ثلاثي قوي ضروري للحصول على صور حادة. عدسة واسعة الزاوية (16-35mm) مثالية لالتقاط المشاهد الواسعة. فلاتر ND و Polarizer ستفتح لك آفاقاً إبداعية جديدة.\n\n## توقيت التصوير\n\nالساعة الزرقاء والساعة الذهبية هي أفضل الأوقات. الضوء يكون ناعماً والألوان غنية. لا تخف من التصوير في الطقس الدرامي - الغيوم والعواصف تضيف شخصية للصورة.\n\n## التكوين الفني\n\nابحث عن عناصر المقدمة المثيرة للاهتمام. صخرة، زهرة، أو مسار يقود العين نحو الخلفية. استخدم خطوط التوجيه لخلق عمق في الصورة.\n\n## إعدادات الكاميرا\n\nفتحة f/8-f/16 للحصول على حدة من المقدمة للخلفية. ISO منخفض قدر الإمكان. استخدم وضع Live View والتكبير للتركيز اليدوي الدقيق.\n\n## المعالجة اللاحقة\n\nصور بصيغة RAW لأقصى مرونة في التعديل. تعديل الإضاءة والألوان بلطف يبرز جمال المشهد دون إفراط.\n\n## الخلاصة\n\nتصوير المناظر الطبيعية يعلمك التأمل والصبر. كل صورة هي ذكرى من رحلة لا تُنسى.",
      "category": "مناظر طبيعية",
      "author": {
        "name": "إبراهيم حسن",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        "role": "مصور طبيعة"
      },
      "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      "date": "2026-01-10",
      "readTime": "10 دقائق للقراءة",
      "featured": true,
      "tags": [
        "مناظر طبيعية",
        "تصوير خارجي",
        "طبيعة"
      ]
    },
    {
      "id": 4,
      "slug": "camera-settings-basics",
      "title": "أساسيات إعدادات الكاميرا: مثلث التعريض الضوئي",
      "excerpt": "افهم العلاقة بين فتحة العدسة وسرعة الغالق وحساسية ISO للتحكم الكامل في صورك.",
      "content": "مثلث التعريض الضوئي هو أساس كل صورة ناجحة. فهم هذه العناصر الثلاثة يحررك من الوضع التلقائي ويمنحك السيطرة الإبداعية الكاملة.\n\n## فتحة العدسة (Aperture)\n\nفتحة العدسة تتحكم في كمية الضوء وعمق الميدان. الأرقام الصغيرة (f/1.4, f/2.8) تعني فتحة أكبر، ضوء أكثر، وخلفية ضبابية. الأرقام الكبيرة (f/11, f/16) تعني حدة أكبر في كل الصورة.\n\n## سرعة الغالق (Shutter Speed)\n\nسرعة الغالق تتحكم في تجميد الحركة. 1/500 ثانية تجمد الرياضيين، 1/60 مناسبة للمواضيع الثابتة، والسرعات البطيئة تخلق تأثيرات ضبابية إبداعية.\n\n## حساسية ISO\n\nISO هو حساسية المستشعر للضوء. ISO 100-400 للإضاءة الجيدة، أعلى من ذلك للإضاءة المنخفضة. كلما زاد ISO، زادت الضوضاء في الصورة.\n\n## التوازن بين الثلاثة\n\nهذه العناصر مترابطة. إذا زدت واحداً، يجب تعديل الآخرين للحفاظ على التعريض الصحيح. تدرب على الوضع اليدوي حتى تصبح هذه العلاقة طبيعية.\n\n## نصائح عملية\n\nابدأ بوضع أولوية فتحة العدسة (Av/A) للتحكم في عمق الميدان، أو أولوية الغالق (Tv/S) للتحكم في الحركة.\n\n## الخلاصة\n\nإتقان مثلث التعريض يفتح لك عالماً من الإبداع. تدرب يومياً وستصبح هذه الإعدادات طبيعة ثانية.",
      "category": "تقنيات",
      "author": {
        "name": "داود خالد",
        "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        "role": "مدرب تصوير"
      },
      "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop",
      "date": "2026-01-08",
      "readTime": "7 دقائق للقراءة",
      "featured": false,
      "tags": [
        "إعدادات الكاميرا",
        "مبتدئين",
        "تقنيات"
      ]
    },
    {
      "id": 5,
      "slug": "photo-composition-rules",
      "title": "قواعد التكوين الفوتوغرافي: كيف تجعل صورك أكثر جاذبية",
      "excerpt": "تعلم قواعد التكوين الأساسية التي يستخدمها المصورون المحترفون لإنشاء صور مؤثرة بصرياً.",
      "content": "التكوين هو الفرق بين صورة عادية وصورة استثنائية. إنه كيفية ترتيب العناصر داخل الإطار لتوجيه عين المشاهد وإيصال رسالتك.\n\n## قاعدة الأثلاث\n\nقسّم الإطار إلى تسعة أجزاء متساوية بخطين أفقيين وعموديين. ضع العناصر المهمة على هذه الخطوط أو تقاطعاتها للحصول على توازن بصري جذاب.\n\n## الخطوط التوجيهية\n\nاستخدم الخطوط الطبيعية في المشهد - طريق، نهر، سور - لقيادة عين المشاهد نحو الموضوع الرئيسي.\n\n## الإطار داخل الإطار\n\nاستخدم عناصر في المقدمة كإطار طبيعي: باب، نافذة، أغصان شجرة. هذا يضيف عمقاً ويركز الانتباه.\n\n## التماثل والأنماط\n\nالتماثل يخلق شعوراً بالهدوء والتوازن. الأنماط المتكررة تجذب العين. كسر النمط يخلق نقطة اهتمام قوية.\n\n## المساحة السلبية\n\nلا تخف من الفراغ. المساحة الفارغة حول الموضوع يمكن أن تكون قوية بنفس قوة الموضوع نفسه.\n\n## كسر القواعد\n\nاعرف القواعد جيداً، ثم اكسرها بوعي. أحياناً الصورة غير التقليدية هي الأقوى تأثيراً.\n\n## الخلاصة\n\nالتكوين مهارة تتطور مع الممارسة. صوّر كثيراً، ادرس أعمال المصورين العظماء، وطور عينك الفنية.",
      "category": "تقنيات",
      "author": {
        "name": "ليث محمود",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
        "role": "فنان بصري"
      },
      "image": "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop",
      "date": "2026-01-05",
      "readTime": "9 دقائق للقراءة",
      "featured": false,
      "tags": [
        "تكوين",
        "قواعد التصوير",
        "فن"
      ]
    },
    {
      "id": 6,
      "slug": "mobile-photography-tips",
      "title": "تصوير الهاتف المحمول: كيف تلتقط صوراً احترافية بهاتفك",
      "excerpt": "اكتشف كيف تحول هاتفك الذكي إلى أداة تصوير قوية مع هذه النصائح والتقنيات.",
      "content": "أفضل كاميرا هي التي معك دائماً. هاتفك الذكي يمكن أن يلتقط صوراً مذهلة إذا عرفت كيف تستخدمه بشكل صحيح.\n\n## نظّف العدسة\n\nأبسط نصيحة وأهمها. العدسة المتسخة تسبب ضبابية وفقدان للتباين. امسحها بقطعة قماش ناعمة قبل كل جلسة تصوير.\n\n## استخدم الإضاءة الطبيعية\n\nكاميرات الهواتف تتألق في الإضاءة الجيدة. صوّر بالقرب من النوافذ أو في الخارج. تجنب الإضاءة القاسية المباشرة.\n\n## ثبّت يدك\n\nالاهتزاز عدو الصورة الحادة. أمسك الهاتف بكلتا يديك، اسند مرفقيك على جسمك، أو استخدم حاملاً ثلاثياً صغيراً.\n\n## تجنب التكبير الرقمي\n\nالتكبير الرقمي يفقد الجودة. بدلاً من ذلك، اقترب من موضوعك أو قص الصورة لاحقاً.\n\n## جرب تطبيقات التصوير\n\nتطبيقات مثل Lightroom Mobile و VSCO توفر تحكماً يدوياً وأدوات تحرير قوية. صوّر بصيغة RAW إذا كان هاتفك يدعمها.\n\n## التكوين مهم\n\nفعّل شبكة الأثلاث في إعدادات الكاميرا. طبق قواعد التكوين نفسها التي تستخدمها مع الكاميرا الاحترافية.\n\n## الخلاصة\n\nهاتفك أداة إبداعية قوية. المهارة والعين الفنية أهم من المعدات. صوّر كل يوم وشاهد تطورك.",
      "category": "معدات",
      "author": {
        "name": "جمال عبدالله",
        "avatar": "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
        "role": "مصور ومراجع تقني"
      },
      "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
      "date": "2026-01-03",
      "readTime": "8 دقائق للقراءة",
      "featured": false,
      "tags": [
        "تصوير الهاتف",
        "نصائح",
        "مبتدئين"
      ]
    },
    {
      "id": 7,
      "slug": "night-photography-techniques",
      "title": "تصوير الليل والنجوم: دليلك لالتقاط سماء الليل",
      "excerpt": "تعلم كيفية تصوير النجوم ودرب التبانة والمناظر الليلية الساحرة مع هذه التقنيات المتقدمة.",
      "content": "تصوير الليل عالم ساحر مليء بالتحديات والمكافآت. عندما تنام المدينة، تستيقظ السماء بملايين النجوم في انتظار عدستك.\n\n## المعدات الضرورية\n\nكاميرا بأداء جيد في ISO العالي ضرورية. عدسة سريعة (f/1.4-f/2.8) تسمح بدخول أكبر قدر من الضوء. حامل ثلاثي قوي وثابت لا غنى عنه.\n\n## إعدادات التصوير\n\nابدأ بـ ISO 1600-3200، فتحة f/2.8 أو أوسع، وسرعة غالق 15-25 ثانية. استخدم قاعدة 500 لتجنب تتبع النجوم: اقسم 500 على البعد البؤري للحصول على أقصى وقت تعريض.\n\n## التركيز في الظلام\n\nالتركيز التلقائي لا يعمل في الظلام. استخدم التركيز اليدوي على نجم ساطع أو ضوء بعيد. كبّر على الشاشة للتأكد من الحدة.\n\n## اختيار الموقع\n\nابتعد عن التلوث الضوئي للمدن. استخدم تطبيقات مثل Dark Sky Finder للعثور على أماكن مظلمة. القمر الجديد أفضل وقت لتصوير النجوم.\n\n## معالجة الصور\n\nصور RAW ضرورية. ارفع الظلال، عدّل توازن اللون الأبيض، وزد التباين. برامج مثل Lightroom و Photoshop أساسية.\n\n## الخلاصة\n\nتصوير الليل يتطلب صبراً وتجربة. لكن عندما ترى درب التبانة في صورتك الأولى، ستدرك أن كل الجهد يستحق.",
      "category": "إضاءة",
      "author": {
        "name": "خالد الفيصل",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
        "role": "مصور فلكي"
      },
      "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
      "date": "2026-01-01",
      "readTime": "11 دقائق للقراءة",
      "featured": false,
      "tags": [
        "تصوير ليلي",
        "نجوم",
        "درب التبانة"
      ]
    },
    {
      "id": 8,
      "slug": "street-photography-guide",
      "title": "تصوير الشارع: فن التقاط الحياة اليومية",
      "excerpt": "اكتشف أسرار تصوير الشارع وكيفية توثيق اللحظات العفوية في الحياة اليومية.",
      "content": "تصوير الشارع هو فن التقاط الحياة كما هي. لحظات عابرة، تعبيرات صادقة، وقصص إنسانية تحدث أمامنا كل يوم.\n\n## الكاميرا المناسبة\n\nالكاميرا الصغيرة غير الملفتة أفضل. الهاتف الذكي أو كاميرا ميرورليس صغيرة. تجنب المعدات الضخمة التي تجذب الانتباه.\n\n## كن غير مرئي\n\nارتدِ ملابس عادية. تحرك ببطء وثقة. لا تتصرف كمصور - كن جزءاً من المشهد. الناس يتجاهلون من يبدو طبيعياً.\n\n## التوقع والصبر\n\nالصورة الرائعة تتطلب انتظار اللحظة المناسبة. ابحث عن إضاءة جميلة أو خلفية مثيرة، ثم انتظر دخول الشخص المناسب.\n\n## احترام الخصوصية\n\nتصوير الشارع ليس تطفلاً. كن محترماً. إذا طلب شخص عدم تصويره، احترم رغبته. تجنب تصوير الأطفال بدون إذن.\n\n## سرد القصص\n\nالصورة الجيدة تحكي قصة. ابحث عن التفاعلات البشرية، التناقضات، والمشاعر. السياق والبيئة جزء من القصة.\n\n## الشجاعة\n\nالخوف من الاقتراب طبيعي لكنه عائق. كلما اقتربت، كانت الصورة أقوى. تدرب حتى يصبح الاقتراب طبيعياً.\n\n## الخلاصة\n\nتصوير الشارع يعلمك رؤية الجمال في العادي. اخرج بكاميرتك اليوم واستكشف مدينتك بعيون جديدة.",
      "category": "بورتريه",
      "author": {
        "name": "نادر سعيد",
        "avatar": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face",
        "role": "مصور شوارع"
      },
      "image": "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&h=400&fit=crop",
      "date": "2025-12-28",
      "readTime": "7 دقائق للقراءة",
      "featured": false,
      "tags": [
        "تصوير شوارع",
        "توثيق",
        "حياة يومية"
      ]
    },
    {
      "id": 9,
      "slug": "food-photography-basics",
      "title": "تصوير الطعام: كيف تجعل أطباقك تبدو شهية",
      "excerpt": "تعلم تقنيات تصوير الطعام الاحترافية لإنشاء صور تثير الشهية وتجذب العيون.",
      "content": "تصوير الطعام فن يجمع بين الطهي والتصوير. الهدف هو جعل المشاهد يشتهي الطبق من خلال الصورة وحدها.\n\n## الإضاءة الطبيعية\n\nالضوء الطبيعي الناعم هو الأفضل لتصوير الطعام. ضع الطبق بالقرب من نافذة كبيرة. استخدم عاكساً أبيض لملء الظلال.\n\n## زوايا التصوير\n\nثلاث زوايا رئيسية: من الأعلى مباشرة (90°) للأطباق المسطحة، 45° للأطباق ذات الارتفاع، ومستوى العين للمشروبات والطبقات.\n\n## تنسيق الطبق\n\nالتقديم مهم جداً. استخدم أطباق بسيطة لا تنافس الطعام. أضف عناصر ديكور مكملة: أعشاب طازجة، قماش، أدوات خشبية.\n\n## الألوان المتناسقة\n\nالألوان تؤثر على الشهية. الأخضر والأحمر يعززان الشهية. الأزرق يقللها. اختر ألوان الخلفية والإكسسوارات بعناية.\n\n## السرعة مهمة\n\nالطعام يفقد جاذبيته بسرعة. الآيس كريم يذوب، البخار يختفي. جهز كل شيء مسبقاً وصوّر بسرعة.\n\n## الخدع الاحترافية\n\nرشة ماء على الخضار تجعلها طازجة. الزيت يعطي لمعاناً. بخاخ الجلسرين يخلق قطرات ماء ثابتة.\n\n## الخلاصة\n\nتصوير الطعام يتطلب ممارسة. ابدأ بوجباتك اليومية وطور مهاراتك تدريجياً.",
      "category": "تقنيات",
      "author": {
        "name": "هاني الشمري",
        "avatar": "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
        "role": "مصور طعام"
      },
      "image": "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=400&fit=crop",
      "date": "2025-12-25",
      "readTime": "8 دقائق للقراءة",
      "featured": false,
      "tags": [
        "تصوير طعام",
        "تنسيق",
        "إضاءة"
      ]
    },
    {
      "id": 10,
      "slug": "wildlife-photography-tips",
      "title": "تصوير الحياة البرية: كيف تلتقط عجائب الطبيعة",
      "excerpt": "دليل شامل لتصوير الحيوانات في بيئتها الطبيعية مع نصائح للمعدات والتقنيات.",
      "content": "تصوير الحياة البرية تحدٍ مثير يجمع بين المغامرة والفن. كل صورة ناجحة هي نتيجة ساعات من الانتظار والصبر.\n\n## المعدات الأساسية\n\nعدسة تليفوتو طويلة (200-600mm) ضرورية للاقتراب دون إزعاج الحيوانات. حامل أحادي أو ثلاثي للثبات. كاميرا سريعة في التركيز.\n\n## فهم سلوك الحيوان\n\nادرس الحيوان الذي تريد تصويره. اعرف أوقات نشاطه، أماكن تواجده، وسلوكياته. هذه المعرفة توقعك للحظة المثالية.\n\n## الصبر والانتظار\n\nالحياة البرية لا تنتظرك. قد تقضي ساعات دون نتيجة. استمتع بالوقت في الطبيعة واعتبر كل لقطة مكافأة.\n\n## احترام الحيوانات\n\nلا تقترب كثيراً. لا تطعم الحيوانات. لا تزعجها لتحصل على صورة. رفاهية الحيوان أهم من أي صورة.\n\n## الإضاءة والتوقيت\n\nالصباح الباكر والمساء أفضل الأوقات. الحيوانات أكثر نشاطاً والضوء أجمل. تجنب منتصف النهار.\n\n## إعدادات الكاميرا\n\nسرعة غالق عالية (1/500 أو أسرع) لتجميد الحركة. تركيز مستمر (AF-C) لمتابعة الحيوان. وضع التصوير المتتابع للحظات السريعة.\n\n## الخلاصة\n\nتصوير الحياة البرية رحلة طويلة من التعلم. كل يوم في الطبيعة يعلمك شيئاً جديداً عن عالم الحيوان.",
      "category": "مناظر طبيعية",
      "author": {
        "name": "عمر الراشد",
        "avatar": "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
        "role": "مصور حياة برية"
      },
      "image": "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&h=400&fit=crop",
      "date": "2025-12-22",
      "readTime": "10 دقائق للقراءة",
      "featured": false,
      "tags": [
        "حياة برية",
        "طبيعة",
        "حيوانات"
      ]
    },
    {
      "id": 11,
      "slug": "black-white-photography",
      "title": "التصوير بالأبيض والأسود: فن الضوء والظل",
      "excerpt": "اكتشف جمال التصوير أحادي اللون وكيفية إنشاء صور قوية بدون ألوان.",
      "content": "التصوير بالأبيض والأسود يجرد الصورة من الألوان ليكشف عن جوهرها: الضوء والظل والشكل والعاطفة.\n\n## لماذا الأبيض والأسود؟\n\nإزالة الألوان تزيل التشتت وتركز الانتباه على العناصر الأساسية: التكوين، الملمس، التباين، والتعبير. بعض المشاهد تتحدث بقوة أكبر بدون ألوان.\n\n## متى تختار الأبيض والأسود\n\nالمشاهد ذات التباين العالي، الملمس الغني، والأشكال القوية. البورتريهات العاطفية. المشاهد المعمارية. الطقس الدرامي.\n\n## التفكير بالأبيض والأسود\n\nتعلم رؤية المشهد بدرجات الرمادي. ما الذي سيصبح أبيض؟ أسود؟ رمادي متوسط؟ هذه الرؤية تأتي مع الممارسة.\n\n## التعريض الصحيح\n\nالتحكم في مدى درجات الرمادي مهم. استخدم الهيستوجرام للتأكد من وجود تفاصيل في الأبيض والأسود. تجنب الإفراط في التعريض.\n\n## المعالجة اللاحقة\n\nالتحويل إلى أبيض وأسود ليس مجرد إزالة التشبع. تحكم في كيفية تحول كل لون إلى درجة رمادية. جرب الفلاتر الافتراضية.\n\n## الإلهام\n\nادرس أعمال عمالقة الأبيض والأسود: Ansel Adams، Henri Cartier-Bresson، Sebastião Salgado. تعلم من رؤيتهم الفريدة.\n\n## الخلاصة\n\nالأبيض والأسود ليس غياباً للون، بل حضوراً قوياً للضوء. جربه واكتشف عالماً جديداً من الجمال.",
      "category": "تقنيات",
      "author": {
        "name": "فارس العلي",
        "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face",
        "role": "فنان فوتوغرافي"
      },
      "image": "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&h=400&fit=crop",
      "date": "2025-12-20",
      "readTime": "9 دقائق للقراءة",
      "featured": false,
      "tags": [
        "أبيض وأسود",
        "تباين",
        "فن"
      ]
    },
    {
      "id": 12,
      "slug": "photo-editing-lightroom",
      "title": "أساسيات تعديل الصور في Lightroom",
      "excerpt": "تعلم كيفية استخدام Adobe Lightroom لتحسين صورك وإنشاء أسلوب بصري مميز.",
      "content": "Lightroom هو المعيار الذهبي لتعديل الصور. سواء كنت مبتدئاً أو محترفاً، هذا البرنامج يوفر كل ما تحتاجه.\n\n## استيراد وتنظيم\n\nابدأ بإنشاء نظام تنظيم فعال. استخدم الكلمات المفتاحية، التقييمات، والمجموعات. التنظيم الجيد يوفر ساعات لاحقاً.\n\n## التعديلات الأساسية\n\nابدأ بتصحيح التعريض وتوازن اللون الأبيض. ثم التباين والإبرازات والظلال. هذه التعديلات الأساسية تحسن معظم الصور.\n\n## منحنى الدرجات\n\nأداة قوية للتحكم الدقيق في التباين والألوان. منحنى S الخفيف يضيف عمقاً. تعلم استخدام منحنيات RGB الفردية.\n\n## HSL والألوان\n\nتحكم في كل لون على حدة: تشبعه، سطوعه، وتدرجه. هذا يعطيك سيطرة إبداعية كاملة على مظهر الصورة.\n\n## الحدة وتقليل الضوضاء\n\nكل صورة تحتاج قدراً من الحدة. قلل الضوضاء في صور ISO العالي. التوازن مهم - لا تفرط.\n\n## الأسلوب الشخصي\n\nطور أسلوباً بصرياً مميزاً. احفظه كـ Preset واستخدمه كنقطة بداية. أسلوبك يميز عملك عن الآخرين.\n\n## الخلاصة\n\nتعديل الصور جزء أساسي من التصوير الرقمي. تعلم Lightroom استثمار سيرافقك طوال رحلتك الفوتوغرافية.",
      "category": "معدات",
      "author": {
        "name": "سامي الحربي",
        "avatar": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face",
        "role": "خبير تعديل صور"
      },
      "image": "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=400&fit=crop",
      "date": "2025-12-18",
      "readTime": "12 دقائق للقراءة",
      "featured": false,
      "tags": [
        "Lightroom",
        "تعديل صور",
        "برامج"
      ]
    },
    {
      "id": 13,
      "slug": "macro-photography-world",
      "title": "عالم التصوير الماكرو: اكتشف التفاصيل الخفية",
      "excerpt": "انغمس في عالم التصوير المقرب واكتشف جمال التفاصيل الصغيرة التي تفوتنا بالعين المجردة.",
      "content": "التصوير الماكرو يكشف عالماً خفياً من الجمال. قطرات الندى، عيون الحشرات، بتلات الزهور - تفاصيل لا تراها العين المجردة.\n\n## المعدات المتخصصة\n\nعدسة ماكرو حقيقية (نسبة 1:1) هي الأفضل. البديل: أنابيب التمديد أو العدسات المقربة. الإضاءة الحلقية مفيدة جداً.\n\n## تحديات عمق الميدان\n\nعمق الميدان ضحل جداً في الماكرو. حتى f/16 قد لا تكفي. التقنية: Focus Stacking - عدة صور بتركيزات مختلفة تدمج في واحدة.\n\n## الإضاءة الدقيقة\n\nالضوء الطبيعي المنتشر مثالي. استخدم عاكسات صغيرة. فلاش الماكرو أو LED يوفر تحكماً أكبر. تجنب الظلال القاسية.\n\n## الثبات المطلق\n\nأي اهتزاز يدمر الصورة. حامل ثلاثي ثقيل، جهاز تحكم عن بعد، قفل المرآة. بعض المصورين يحبسون أنفاسهم!\n\n## إيجاد المواضيع\n\nالطبيعة مليئة بالمواضيع. الحشرات في الصباح الباكر (بطيئة من البرد)، الزهور بعد المطر، الأوراق الخريفية. انظر للأسفل أكثر.\n\n## الصبر والمثابرة\n\nالماكرو يتطلب صبراً استثنائياً. الحشرة تطير، الريح تحرك الزهرة. استمر في المحاولة.\n\n## الخلاصة\n\nالماكرو يغير طريقة رؤيتك للعالم. فجأة، حديقتك تصبح غابة استوائية مليئة بالعجائب.",
      "category": "تقنيات",
      "author": {
        "name": "رامي الخطيب",
        "avatar": "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=100&h=100&fit=crop&crop=face",
        "role": "مصور ماكرو"
      },
      "image": "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&h=400&fit=crop",
      "date": "2025-12-15",
      "readTime": "10 دقائق للقراءة",
      "featured": false,
      "tags": [
        "ماكرو",
        "تفاصيل",
        "حشرات"
      ]
    },
    {
      "id": 14,
      "slug": "long-exposure-photography",
      "title": "التعريض الطويل: كيف تصور الحركة والزمن",
      "excerpt": "تعلم تقنيات التعريض الطويل لإنشاء صور إبداعية تظهر الحركة بطريقة فنية ساحرة.",
      "content": "التعريض الطويل يحول الثواني إلى لوحات فنية. الماء يصبح حريراً، السيارات خطوطاً ضوئية، والغيوم أشرطة في السماء.\n\n## المعدات الضرورية\n\nحامل ثلاثي ثابت أساسي. فلاتر ND لتقليل الضوء في النهار. جهاز تحكم عن بعد لتجنب اهتزاز الكاميرا.\n\n## حساب التعريض\n\nفلتر ND 10 stops يمدد التعريض 1000 مرة. إذا كان التعريض الطبيعي 1/125، يصبح 8 ثوانٍ. استخدم تطبيقات الحساب.\n\n## مواضيع مثالية\n\nالشلالات والأنهار تتحول لحرير. أضواء السيارات تخلق خطوطاً. الغيوم المتحركة تضيف دراما. البحر يصبح ضباباً.\n\n## التركيز قبل الفلتر\n\nركز قبل وضع فلتر ND الداكن. الكاميرا لا ترى من خلاله. استخدم التركيز اليدوي ولا تغيره بعد وضع الفلتر.\n\n## التجربة والتعلم\n\nلا يوجد تعريض مثالي لكل مشهد. جرب أوقاتاً مختلفة. راجع النتائج على الشاشة. عدّل وكرر.\n\n## الإبداع بلا حدود\n\nجرب التصوير في أوقات مختلفة: غروب الشمس، الساعة الزرقاء، الليل. كل وقت يعطي نتائج مختلفة.\n\n## الخلاصة\n\nالتعريض الطويل يعلمك رؤية العالم بطريقة مختلفة. الزمن يصبح مادة تشكلها بإبداعك.",
      "category": "إضاءة",
      "author": {
        "name": "باسم المصري",
        "avatar": "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=100&h=100&fit=crop&crop=face",
        "role": "مصور فني"
      },
      "image": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop",
      "date": "2025-12-12",
      "readTime": "8 دقائق للقراءة",
      "featured": false,
      "tags": [
        "تعريض طويل",
        "ND فلتر",
        "إبداع"
      ]
    },
    {
      "id": 15,
      "slug": "wedding-photography-guide",
      "title": "تصوير حفلات الزفاف: دليل المصور المحترف",
      "excerpt": "تعلم أساسيات تصوير حفلات الزفاف من التحضير إلى تسليم الصور النهائية.",
      "content": "تصوير الزفاف مسؤولية كبيرة. يوم لا يتكرر، لحظات لا تعود، وذكريات ستبقى للأبد. الضغط عالٍ لكن المكافأة أكبر.\n\n## التحضير المسبق\n\nاجتمع مع العروسين. افهم توقعاتهم ورؤيتهم. زر الموقع مسبقاً. اعرف جدول اليوم بالتفصيل.\n\n## المعدات والنسخ الاحتياطي\n\nكاميرتان على الأقل. عدسات متنوعة (24-70, 70-200, 35, 85). فلاشات متعددة. بطاريات وكروت ذاكرة إضافية. لا مجال للفشل.\n\n## اللحظات الرئيسية\n\nالتحضيرات، الدخلة، القبلة الأولى، الرقصة الأولى، قطع الكيك، رمي الباقة. كن جاهزاً لكل لحظة ولا تفوت أياً منها.\n\n## العمل مع الضوء\n\nالكنائس والقاعات غالباً ذات إضاءة صعبة. تعلم استخدام الفلاش المرتد. ابحث عن مصادر الضوء الطبيعي.\n\n## التعامل مع الناس\n\nأنت قائد لجلسات التصوير الجماعية. كن حازماً لكن لطيفاً. اعرف أسماء أفراد العائلة المهمين.\n\n## المعالجة والتسليم\n\nآلاف الصور تحتاج فرزاً وتعديلاً. ضع جدولاً زمنياً واقعياً. التسليم في الوقت المحدد يبني سمعتك.\n\n## الخلاصة\n\nتصوير الزفاف يجمع كل مهارات التصوير. إنه تحدٍ كبير لكنه أيضاً فرصة لخلق فن يدوم للأجيال.",
      "category": "بورتريه",
      "author": {
        "name": "منصور الزهراني",
        "avatar": "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&h=100&fit=crop&crop=face",
        "role": "مصور زفاف"
      },
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop",
      "date": "2025-12-10",
      "readTime": "11 دقائق للقراءة",
      "featured": false,
      "tags": [
        "زفاف",
        "مناسبات",
        "احترافي"
      ]
    },
    {
      "id": 16,
      "slug": "drone-photography-basics",
      "title": "التصوير بالدرون: منظور جديد للعالم",
      "excerpt": "اكتشف عالم التصوير الجوي وتعلم أساسيات استخدام الدرون لالتقاط صور من زوايا فريدة.",
      "content": "التصوير بالدرون يفتح آفاقاً جديدة. زوايا كانت مستحيلة أصبحت في متناول يدك. منظور الطائر يكشف جمالاً مخفياً.\n\n## اختيار الدرون المناسب\n\nDJI تقود السوق بموديلات مثل Mini و Air و Mavic. الكاميرا، وقت الطيران، والثبات عوامل مهمة. ابدأ بدرون للمبتدئين.\n\n## القوانين واللوائح\n\nاعرف قوانين بلدك. معظم الدول تتطلب تسجيلاً ورخصة. مناطق ممنوعة حول المطارات والمنشآت الحكومية. الجهل بالقانون لا يعفيك.\n\n## التحكم والطيران\n\nتدرب في مناطق مفتوحة أولاً. تعلم الإقلاع والهبوط بسلاسة. فهم أوضاع الطيران المختلفة. الممارسة تصنع الإتقان.\n\n## التكوين من الأعلى\n\nالأنماط والأشكال تبدو مختلفة من الأعلى. ابحث عن التماثل، الخطوط التوجيهية، والتباينات. الظلال تصبح عناصر تكوين.\n\n## التوقيت والإضاءة\n\nالساعة الذهبية من الجو أكثر سحراً. الظلال الطويلة تضيف عمقاً. يوم غائم يعطي إضاءة متساوية جيدة.\n\n## السلامة أولاً\n\nلا تطر فوق الناس. راقب البطارية دائماً. عد للمنزل قبل نفاد الطاقة. الطقس العاصف خطير.\n\n## الخلاصة\n\nالدرون أداة إبداعية قوية. استخدمها بمسؤولية واكتشف عالماً جديداً من الجمال.",
      "category": "معدات",
      "author": {
        "name": "فيصل الدوسري",
        "avatar": "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=100&h=100&fit=crop&crop=face",
        "role": "مصور جوي"
      },
      "image": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=400&fit=crop",
      "date": "2025-12-08",
      "readTime": "9 دقائق للقراءة",
      "featured": false,
      "tags": [
        "درون",
        "تصوير جوي",
        "DJI"
      ]
    },
    {
      "id": 17,
      "slug": "product-photography-essentials",
      "title": "تصوير المنتجات: أساسيات التصوير التجاري",
      "excerpt": "تعلم كيفية تصوير المنتجات بشكل احترافي لمتجرك الإلكتروني أو عملائك التجاريين.",
      "content": "تصوير المنتجات فن يجمع بين الدقة التقنية والإبداع البصري. صورة المنتج الجيدة تبيع نفسها.\n\n## إعداد الاستوديو\n\nلا تحتاج استوديو ضخم. طاولة بيضاء، خلفية بيضاء أو رمادية، وإضاءة جيدة كافية للبداية. صندوق الضوء (Light Box) خيار ممتاز للمنتجات الصغيرة.\n\n## الإضاءة المثالية\n\nالإضاءة الناعمة المنتشرة تزيل الظلال القاسية. استخدم سوفت بوكس أو شراشف بيضاء لتنعيم الضوء. الإضاءة من الجانب تبرز الملمس والتفاصيل.\n\n## الخلفية والتنسيق\n\nالخلفية البيضاء النظيفة معيار التجارة الإلكترونية. لكن لا تخف من التجربة: الخشب، الرخام، أو الأقمشة يمكن أن تضيف شخصية للمنتج.\n\n## الزوايا المتعددة\n\nصور المنتج من عدة زوايا: أمامية، جانبية، من الأعلى، وتفاصيل مقربة. العميل يريد رؤية كل شيء قبل الشراء.\n\n## التعديل والتنقيح\n\nإزالة الغبار والعيوب الصغيرة ضرورية. تصحيح الألوان لتطابق المنتج الحقيقي. الاتساق في الأسلوب عبر كل المنتجات.\n\n## الخلاصة\n\nتصوير المنتجات استثمار يعود بأضعاف. صور احترافية تعني ثقة أكبر ومبيعات أعلى.",
      "category": "تقنيات",
      "author": {
        "name": "لؤي الصالح",
        "avatar": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face",
        "role": "مصور تجاري"
      },
      "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop",
      "date": "2025-12-05",
      "readTime": "8 دقائق للقراءة",
      "featured": false,
      "tags": [
        "تصوير منتجات",
        "تجاري",
        "استوديو"
      ]
    },
    {
      "id": 18,
      "slug": "architecture-photography",
      "title": "تصوير العمارة: كيف تلتقط روح المباني",
      "excerpt": "اكتشف تقنيات تصوير المباني والهندسة المعمارية بطريقة فنية تبرز جمالها وتفاصيلها.",
      "content": "تصوير العمارة يحول المباني إلى أعمال فنية. الخطوط والأشكال والضوء والظل تتراقص معاً لتخلق صوراً آسرة.\n\n## العدسات المناسبة\n\nعدسة واسعة الزاوية (16-35mm) أساسية لالتقاط المباني الكاملة. عدسة Tilt-Shift تصحح التشوه وتبقي الخطوط مستقيمة. التليفوتو لتفاصيل الواجهات.\n\n## التعامل مع التشوه\n\nالخطوط المائلة مشكلة شائعة. صور من منتصف ارتفاع المبنى إن أمكن. أو صحح التشوه في مرحلة ما بعد المعالجة.\n\n## الإضاءة والتوقيت\n\nالضوء الجانبي يبرز الملمس والعمق. الساعة الزرقاء مثالية للمباني المضاءة. النهار الغائم يعطي إضاءة ناعمة متساوية.\n\n## الخطوط والأشكال\n\nابحث عن الأنماط المتكررة، التماثل، والخطوط التوجيهية. الهندسة المعمارية غنية بعناصر التكوين الطبيعية.\n\n## التفاصيل المعمارية\n\nلا تكتفِ بالصورة الشاملة. اقترب من التفاصيل: النوافذ، الأعمدة، الزخارف، السلالم. كل تفصيل يحكي قصة.\n\n## الخلاصة\n\nتصوير العمارة يعلمك رؤية الجمال في المألوف. كل مبنى له شخصية تنتظر أن تُكتشف.",
      "category": "مناظر طبيعية",
      "author": {
        "name": "طارق النعيمي",
        "avatar": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop&crop=face",
        "role": "مصور معماري"
      },
      "image": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=400&fit=crop",
      "date": "2025-12-02",
      "readTime": "9 دقائق للقراءة",
      "featured": false,
      "tags": [
        "عمارة",
        "مباني",
        "هندسة"
      ]
    },
    {
      "id": 19,
      "slug": "sports-action-photography",
      "title": "تصوير الرياضة والحركة: تجميد اللحظة الحاسمة",
      "excerpt": "تعلم تقنيات تصوير الأحداث الرياضية والحركة السريعة بوضوح ودقة احترافية.",
      "content": "تصوير الرياضة يتطلب سرعة البديهة والمعدات المناسبة. لحظة الانتصار أو الهزيمة تحدث في جزء من الثانية.\n\n## المعدات السريعة\n\nكاميرا بتركيز تلقائي سريع ومعدل تصوير متتابع عالي (10+ صور/ثانية). عدسات تليفوتو سريعة (70-200 f/2.8، 400 f/2.8). بطاقات ذاكرة سريعة.\n\n## إعدادات الكاميرا\n\nسرعة غالق 1/1000 ثانية على الأقل لتجميد الحركة. تركيز مستمر (AF-C) مع تتبع. ISO تلقائي مع حد أقصى. وضع التصوير المتتابع.\n\n## توقع الحركة\n\nاعرف اللعبة. توقع أين ستكون اللحظة الحاسمة. ركز مسبقاً على تلك النقطة. الخبرة تبني هذا الحدس.\n\n## الموقع والزاوية\n\nابحث عن موقع يتيح خلفية نظيفة. ضوء الشمس خلفك أو جانبياً. زاوية منخفضة تجعل الرياضي يبدو أكثر قوة.\n\n## التعبيرات والعواطف\n\nليست الحركة فقط مهمة. ابحث عن لحظات العاطفة: الفرح، الألم، التركيز. هذه هي الصور التي تبقى.\n\n## الخلاصة\n\nتصوير الرياضة ماراثون لا سباق قصير. كل مباراة فرصة للتعلم والتحسن. استمر في المحاولة.",
      "category": "بورتريه",
      "author": {
        "name": "أحمد الشهري",
        "avatar": "https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=100&h=100&fit=crop&crop=face",
        "role": "مصور رياضي"
      },
      "image": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
      "date": "2025-11-28",
      "readTime": "10 دقائق للقراءة",
      "featured": false,
      "tags": [
        "رياضة",
        "حركة",
        "سرعة"
      ]
    },
    {
      "id": 20,
      "slug": "flash-photography-basics",
      "title": "أساسيات التصوير بالفلاش: تحكم كامل في الإضاءة",
      "excerpt": "افهم كيفية استخدام الفلاش الخارجي لإنشاء إضاءة احترافية في أي موقف.",
      "content": "الفلاش أداة قوية تحررك من قيود الإضاءة المتاحة. مع الفهم الصحيح، يصبح أفضل صديق للمصور.\n\n## أنواع الفلاش\n\nالفلاش المدمج محدود القوة والمرونة. الفلاش الخارجي (Speedlight) أقوى ويمكن توجيهه. فلاشات الاستوديو للتحكم الكامل.\n\n## الفلاش المرتد\n\nلا توجه الفلاش مباشرة للوجه. ارتده عن السقف أو الجدار للحصول على ضوء ناعم طبيعي. السقف الأبيض أفضل عاكس.\n\n## TTL مقابل Manual\n\nTTL يقيس الضوء تلقائياً - سريع ومريح. الوضع اليدوي يعطي تحكماً كاملاً ونتائج متسقة. تعلم كليهما.\n\n## موازنة الفلاش مع المحيط\n\nالفلاش لا يجب أن يطغى على الإضاءة الطبيعية. قلل قوته ليكمل الضوء المتاح بدلاً من استبداله.\n\n## High-Speed Sync\n\nللتصوير بسرعة غالق أعلى من سرعة المزامنة، فعّل HSS. مفيد لملء الظلال في ضوء الشمس القوي.\n\n## الخلاصة\n\nالفلاش يفتح إمكانيات لا حدود لها. ابدأ بالأساسيات ثم تعمق تدريجياً. الممارسة هي المفتاح.",
      "category": "إضاءة",
      "author": {
        "name": "ماجد القحطاني",
        "avatar": "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&h=100&fit=crop&crop=face",
        "role": "مصور استوديو"
      },
      "image": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=400&fit=crop",
      "date": "2025-11-25",
      "readTime": "8 دقائق للقراءة",
      "featured": false,
      "tags": [
        "فلاش",
        "إضاءة صناعية",
        "Speedlight"
      ]
    },
    {
      "id": 21,
      "slug": "travel-photography-tips",
      "title": "تصوير السفر: كيف توثق رحلاتك بصور لا تُنسى",
      "excerpt": "نصائح عملية لتصوير السفر تساعدك على التقاط جوهر كل مكان تزوره.",
      "content": "تصوير السفر يجمع كل أنواع التصوير: مناظر طبيعية، شوارع، بورتريهات، طعام، وعمارة. كل رحلة فرصة للتعلم.\n\n## التحضير للرحلة\n\nابحث عن وجهتك مسبقاً. اعرف أفضل مواقع التصوير وأوقاتها. لكن كن مستعداً للمفاجآت - أجمل الصور غالباً غير مخططة.\n\n## المعدات الخفيفة\n\nالسفر يعني المشي كثيراً. كاميرا واحدة وعدستان كافية لمعظم الحالات. حقيبة مريحة وخفيفة ضرورية.\n\n## احترام الثقافة المحلية\n\nاستأذن قبل تصوير الناس. احترم الأماكن المقدسة. تعلم بضع كلمات من اللغة المحلية. التواصل يفتح الأبواب.\n\n## استيقظ مبكراً\n\nأفضل الضوء وأقل الزحام في الصباح الباكر. التضحية بساعات النوم تستحق للحصول على صور فريدة.\n\n## احكِ قصة\n\nلا تصور المعالم فقط. صور الحياة اليومية، الطعام المحلي، التفاصيل الصغيرة. هذه هي روح المكان.\n\n## الخلاصة\n\nتصوير السفر يجعل الرحلة أكثر عمقاً. تنظر أكثر، تلاحظ أكثر، تتذكر أكثر. السفر بكاميرا تجربة مختلفة تماماً.",
      "category": "مناظر طبيعية",
      "author": {
        "name": "ياسر العتيبي",
        "avatar": "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=100&h=100&fit=crop&crop=face",
        "role": "مصور رحالة"
      },
      "image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
      "date": "2025-11-22",
      "readTime": "9 دقائق للقراءة",
      "featured": false,
      "tags": [
        "سفر",
        "رحلات",
        "توثيق"
      ]
    },
    {
      "id": 22,
      "slug": "color-theory-photography",
      "title": "نظرية الألوان في التصوير: كيف تستخدم الألوان بذكاء",
      "excerpt": "افهم كيف تؤثر الألوان على مشاعر المشاهد وكيف تستخدمها لتعزيز صورك.",
      "content": "الألوان لغة بصرية قوية. فهمها يرفع صورك من الجيدة إلى الاستثنائية.\n\n## عجلة الألوان\n\nالألوان الأساسية (أحمر، أزرق، أصفر) والثانوية (برتقالي، أخضر، بنفسجي). الألوان المتقابلة تخلق تبايناً قوياً. المتجاورة تخلق انسجاماً.\n\n## سيكولوجية الألوان\n\nالأحمر: طاقة وعاطفة. الأزرق: هدوء وثقة. الأخضر: طبيعة وتوازن. الأصفر: سعادة وتفاؤل. استخدم هذه المعاني في صورك.\n\n## التباين اللوني\n\nالألوان المتقابلة (أحمر/أخضر، أزرق/برتقالي) تجذب الانتباه. استخدمها لإبراز موضوعك أو خلق دراما بصرية.\n\n## الانسجام اللوني\n\nالألوان المتقاربة تخلق شعوراً بالوحدة والهدوء. مناسبة للصور الهادئة والتأملية.\n\n## درجات الحرارة اللونية\n\nالألوان الدافئة (أحمر، برتقالي) تقدم للأمام. الباردة (أزرق، أخضر) تتراجع. استخدم هذا لخلق عمق.\n\n## الخلاصة\n\nالوعي بالألوان يغير طريقة رؤيتك وتصويرك. ابدأ بملاحظة الألوان في كل مكان حولك.",
      "category": "تقنيات",
      "author": {
        "name": "دحام الحسيني",
        "avatar": "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face",
        "role": "فنان بصري"
      },
      "image": "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&h=400&fit=crop",
      "date": "2025-11-18",
      "readTime": "7 دقائق للقراءة",
      "featured": false,
      "tags": [
        "ألوان",
        "نظرية",
        "تكوين"
      ]
    },
    {
      "id": 23,
      "slug": "newborn-baby-photography",
      "title": "تصوير المواليد: فن التقاط البراءة",
      "excerpt": "تعلم تقنيات تصوير الأطفال حديثي الولادة بأمان واحترافية.",
      "content": "تصوير المواليد تخصص رقيق يتطلب صبراً وحذراً ومهارة. كل طفل فريد وكل جلسة مغامرة جديدة.\n\n## السلامة أولاً\n\nسلامة الطفل فوق كل اعتبار. لا تضعه في أوضاع غير آمنة. اغسل يديك دائماً. حافظ على دفء الغرفة (حوالي 26-28 درجة).\n\n## التوقيت المثالي\n\nأفضل عمر للتصوير: 5-14 يوم. الطفل لا يزال نعساً ومرناً. بعد ذلك يصبح أكثر يقظة وصعوبة في الوضعيات.\n\n## البيئة المريحة\n\nضوضاء بيضاء تهدئ الطفل. إضاءة ناعمة طبيعية. تجنب الفلاش. اجعل الأهل قريبين للراحة النفسية.\n\n## الأوضاع الآمنة\n\nوضع السلة والتكور الكلاسيكي آمن ومحبوب. تجنب الأوضاع المعقدة التي تراها في Pinterest - كثير منها مركب في الفوتوشوب.\n\n## الإكسسوارات والألوان\n\nألوان هادئة وإكسسوارات بسيطة. الطفل هو النجم. تجنب الإفراط في الديكور الذي يشتت الانتباه.\n\n## الخلاصة\n\nتصوير المواليد مسؤولية كبيرة ومكافأة أكبر. كل صورة ذكرى ستعتز بها العائلة للأبد.",
      "category": "بورتريه",
      "author": {
        "name": "نايف المطيري",
        "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face",
        "role": "مصور مواليد"
      },
      "image": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=400&fit=crop",
      "date": "2025-11-15",
      "readTime": "10 دقائق للقراءة",
      "featured": false,
      "tags": [
        "مواليد",
        "أطفال",
        "بورتريه"
      ]
    },
    {
      "id": 24,
      "slug": "real-estate-photography",
      "title": "تصوير العقارات: كيف تجعل المنزل يبيع نفسه",
      "excerpt": "تعلم تقنيات تصوير العقارات التي تجعل المنازل تبدو أفضل ما يمكن.",
      "content": "تصوير العقارات مجال مربح ومطلوب. صورة جيدة يمكن أن تكون الفرق بين بيع سريع وعقار راكد.\n\n## المعدات الأساسية\n\nعدسة واسعة الزاوية (16-35mm) ضرورية لإظهار المساحات. حامل ثلاثي لصور حادة ومستوية. فلاش للتحكم في الإضاءة.\n\n## تحضير المكان\n\nنظف وأزل الفوضى. أضف لمسات بسيطة: زهور، مجلات، فوط مرتبة. افتح الستائر والأبواب لإظهار التدفق.\n\n## الإضاءة المتوازنة\n\nالتحدي: موازنة ضوء النوافذ الساطع مع الداخل المظلم. استخدم HDR أو إضاءة إضافية. تجنب النوافذ المحترقة.\n\n## الزوايا الصحيحة\n\nصور من زاوية الغرفة لإظهار أكبر مساحة. ارتفاع الكاميرا حوالي 120 سم. أبقِ الخطوط العمودية مستقيمة.\n\n## التصوير الخارجي\n\nالساعة الزرقاء مع أضواء المنزل مضاءة تخلق صوراً دافئة ومرحبة. صور الحديقة والمسبح والمرافق.\n\n## الخلاصة\n\nتصوير العقارات يجمع بين التقنية والتسويق. افهم ما يريد المشتري رؤيته وقدمه بأفضل صورة.",
      "category": "تقنيات",
      "author": {
        "name": "عبدالله الغامدي",
        "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
        "role": "مصور عقارات"
      },
      "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop",
      "date": "2025-11-12",
      "readTime": "8 دقائق للقراءة",
      "featured": false,
      "tags": [
        "عقارات",
        "تجاري",
        "واسع الزاوية"
      ]
    },
    {
      "id": 25,
      "slug": "raw-vs-jpeg-explained",
      "title": "RAW مقابل JPEG: متى تستخدم كلاً منهما",
      "excerpt": "افهم الفرق بين صيغتي الصور الأكثر شيوعاً واختر الأنسب لاحتياجاتك.",
      "content": "الجدل بين RAW و JPEG قديم قدم التصوير الرقمي. لكل منهما مكانه ووقته.\n\n## ما هو RAW؟\n\nRAW هو كل البيانات التي التقطها المستشعر بدون معالجة. ملف كبير يحتوي على أقصى معلومات ممكنة. يتطلب معالجة لاحقة.\n\n## ما هو JPEG؟\n\nJPEG ملف مضغوط ومعالج في الكاميرا. أصغر حجماً وجاهز للاستخدام مباشرة. لكنه يفقد بعض البيانات.\n\n## مزايا RAW\n\nمرونة هائلة في التعديل. تصحيح التعريض بسهولة. تعديل توازن اللون الأبيض بعد التصوير. استعادة تفاصيل من الظلال والإبرازات.\n\n## مزايا JPEG\n\nملفات صغيرة = مساحة أكبر. جاهز للمشاركة مباشرة. معالجة الكاميرا غالباً ممتازة. مثالي للتصوير السريع والكميات الكبيرة.\n\n## متى تستخدم كلاً منهما\n\nRAW: التصوير الاحترافي، الإضاءة الصعبة، عندما تريد أقصى جودة. JPEG: اللقطات اليومية، المساحة محدودة، السرعة مطلوبة.\n\n## الخلاصة\n\nكثير من المصورين يصورون RAW+JPEG معاً. جرب كليهما واختر ما يناسب أسلوبك واحتياجاتك.",
      "category": "معدات",
      "author": {
        "name": "كريم الفهد",
        "avatar": "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=100&h=100&fit=crop&crop=face",
        "role": "خبير تقني"
      },
      "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      "date": "2025-11-08",
      "readTime": "6 دقائق للقراءة",
      "featured": false,
      "tags": [
        "RAW",
        "JPEG",
        "صيغ الصور"
      ]
    },
    {
      "id": 26,
      "slug": "self-portrait-photography",
      "title": "تصوير البورتريه الذاتي: كن موضوعك الخاص",
      "excerpt": "تعلم كيف تصور نفسك بشكل احترافي وإبداعي دون الحاجة لمساعد.",
      "content": "البورتريه الذاتي فن قديم تجدد بالتصوير الفوتوغرافي. أنت المصور والموديل معاً.\n\n## لماذا البورتريه الذاتي؟\n\nتدريب مجاني متاح دائماً. استكشاف الذات والتعبير الفني. تطوير مهاراتك في الإضاءة والتكوين والتعديل.\n\n## المعدات اللازمة\n\nحامل ثلاثي ثابت. جهاز تحكم عن بعد أو مؤقت ذاتي. مرآة لمراقبة الوضعية. تطبيق التحكم بالكاميرا على الهاتف مفيد جداً.\n\n## التركيز بدونك\n\nضع شيئاً في مكانك للتركيز عليه (كرسي، وسادة). استخدم التركيز اليدوي وثبته. أو استخدم وضع تتبع العين إن كان متاحاً.\n\n## الإضاءة والوضعيات\n\nجرب بحرية. لا أحد ينتظرك. العب مع الضوء والظلال. جرب تعابير وأوضاع لن تطلبها من شخص آخر.\n\n## التعديل والأسلوب\n\nالبورتريه الذاتي مساحة للتجربة. جرب أساليب تعديل جديدة. طور صوتك البصري الخاص.\n\n## الخلاصة\n\nالبورتريه الذاتي رحلة اكتشاف ذات. كل صورة تعلمك شيئاً عن نفسك وعن فنك.",
      "category": "بورتريه",
      "author": {
        "name": "سلطان الراجحي",
        "avatar": "https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop&crop=face",
        "role": "فنان تصوير"
      },
      "image": "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&h=400&fit=crop",
      "date": "2025-11-05",
      "readTime": "7 دقائق للقراءة",
      "featured": false,
      "tags": [
        "بورتريه ذاتي",
        "إبداع",
        "تعبير"
      ]
    },
    {
      "id": 27,
      "slug": "lens-guide-beginners",
      "title": "دليل العدسات للمبتدئين: كيف تختار عدستك الأولى",
      "excerpt": "افهم أنواع العدسات المختلفة واختر الأنسب لأسلوب تصويرك واحتياجاتك.",
      "content": "العدسة أهم من الكاميرا في كثير من الأحيان. فهم العدسات يساعدك على اتخاذ قرارات شراء حكيمة.\n\n## البعد البؤري\n\nيُقاس بالمليمتر (mm). الأرقام الصغيرة = زاوية واسعة. الأرقام الكبيرة = تقريب. 50mm تقريباً ما تراه العين البشرية.\n\n## فتحة العدسة\n\nf/1.8 أكبر من f/4. فتحة أكبر = ضوء أكثر + خلفية أكثر ضبابية. العدسات السريعة (f/1.4-f/2.8) أغلى وأكبر.\n\n## عدسة الـ 50mm\n\nالنيفتي فيفتي (50mm f/1.8) أفضل استثمار للمبتدئين. رخيصة، خفيفة، وتعطي نتائج رائعة. تعلمك الحركة والتكوين.\n\n## العدسات الزوم مقابل الثابتة\n\nالزوم مرنة وعملية. الثابتة (Prime) أخف وأسرع وأحد. للتعلم، الثابتة تجبرك على التفكير أكثر.\n\n## العدسات حسب التخصص\n\nبورتريه: 85mm. مناظر: 16-35mm. ماكرو: عدسة ماكرو مخصصة. حياة برية: 100-400mm.\n\n## الخلاصة\n\nلا تشترِ عدسات لا تحتاجها. ابدأ بعدسة واحدة واتقنها قبل الانتقال للتالية. العدسة الأفضل هي التي تستخدمها.",
      "category": "معدات",
      "author": {
        "name": "فهد السبيعي",
        "avatar": "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=100&h=100&fit=crop&crop=face",
        "role": "مراجع معدات"
      },
      "image": "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&h=400&fit=crop",
      "date": "2025-11-02",
      "readTime": "9 دقائق للقراءة",
      "featured": false,
      "tags": [
        "عدسات",
        "معدات",
        "مبتدئين"
      ]
    },
    {
      "id": 28,
      "slug": "minimalist-photography",
      "title": "التصوير البسيط (Minimalist): قوة الفراغ",
      "excerpt": "اكتشف جمال البساطة في التصوير وكيف تخلق صوراً قوية بعناصر قليلة.",
      "content": "الأقل هو الأكثر. التصوير البسيط يزيل كل ما هو غير ضروري ليتحدث الجوهر.\n\n## فلسفة البساطة\n\nكل عنصر في الصورة يجب أن يكون له غرض. إذا لم يضف شيئاً، فهو يطرح. الفراغ ليس خالياً - إنه يتنفس.\n\n## المساحة السلبية\n\nالفراغ حول الموضوع يعطيه قوة وهيبة. لا تخف من ترك 80% من الإطار فارغاً. الموضوع الصغير في فراغ كبير يجذب الانتباه.\n\n## الخطوط والأشكال\n\nالتصوير البسيط يعتمد على الهندسة. خط واحد، شكل واحد، نمط متكرر. البساطة في العناصر، القوة في التنفيذ.\n\n## الألوان المحدودة\n\nألوان قليلة أو لون واحد. الأبيض والأسود طبيعي للبساطة. لون واحد مع خلفية محايدة.\n\n## إيجاد المواضيع\n\nالمباني الحديثة، السماء الفارغة، الأشياء اليومية المعزولة. البساطة في كل مكان لمن يعرف كيف ينظر.\n\n## الخلاصة\n\nالتصوير البسيط ليس سهلاً. إزالة العناصر أصعب من إضافتها. لكن النتيجة صور لا تُنسى.",
      "category": "تقنيات",
      "author": {
        "name": "راشد الجاسر",
        "avatar": "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=100&h=100&fit=crop&crop=face",
        "role": "فنان بصري"
      },
      "image": "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=400&fit=crop",
      "date": "2025-10-28",
      "readTime": "6 دقائق للقراءة",
      "featured": false,
      "tags": [
        "بساطة",
        "Minimalist",
        "تكوين"
      ]
    }
  ],
  "categories": [
    {
      "name": "إضاءة",
      "count": 3,
      "color": "emerald"
    },
    {
      "name": "بورتريه",
      "count": 3,
      "color": "purple"
    },
    {
      "name": "مناظر طبيعية",
      "count": 2,
      "color": "blue"
    },
    {
      "name": "تقنيات",
      "count": 5,
      "color": "orange"
    },
    {
      "name": "معدات",
      "count": 3,
      "color": "emerald"
    }
  ],
  "siteInfo": {
    "name": "عدسة",
    "tagline": "عالم التصوير الفوتوغرافي",
    "description": "مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.",
    "email": "hello@adasah.com",
    "social": {
      "twitter": "https://twitter.com/adasah",
      "github": "https://github.com/adasah",
      "linkedin": "https://linkedin.com/company/adasah",
      "youtube": "https://youtube.com/@adasah"
    }
  }
}
```


## pnpm-workspace.yaml

```yaml
allowBuilds:
  esbuild: true
```


## .gitignore

```text
node_modules/
dist/
.env
.env.*
*.log
.DS_Store
```
