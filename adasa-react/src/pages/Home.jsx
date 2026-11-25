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
