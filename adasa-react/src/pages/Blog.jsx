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
