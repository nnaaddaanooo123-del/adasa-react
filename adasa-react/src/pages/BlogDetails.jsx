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
