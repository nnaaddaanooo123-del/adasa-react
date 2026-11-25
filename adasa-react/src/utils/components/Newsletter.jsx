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
