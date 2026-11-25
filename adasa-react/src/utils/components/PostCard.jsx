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
