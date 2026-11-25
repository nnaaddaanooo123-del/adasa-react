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
