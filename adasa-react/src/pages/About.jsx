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
