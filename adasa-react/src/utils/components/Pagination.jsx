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
