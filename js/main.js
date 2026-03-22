/* main.js - 공통 유틸리티 */
const SUPABASE_URL = 'https://ihcyoqfjnvvtoxtyhrhd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NXunyAEKeeEdLHwZJNZXLA_j2MrnWoZ';
window.supabaseClient = typeof window !== 'undefined' && window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

function formatDateKo(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`;
}

function showToast(message, type = '') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  const icon = type === 'success'
    ? 'fa-check-circle'
    : type === 'error'
    ? 'fa-exclamation-circle'
    : 'fa-info-circle';
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function createScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-top';
  btn.className = [
    'fixed bottom-6 right-6 w-11 h-11',
    'bg-gray-900 text-white rounded-full shadow-lg',
    'flex items-center justify-center z-40',
    'hover:bg-primary transition-colors no-print'
  ].join(' ');
  btn.style.cssText = 'opacity:0; transform:translateY(1rem);';
  btn.innerHTML = '<i class="fas fa-chevron-up text-sm"></i>';
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(1rem)';
    }
  });
}

function injectMetaTags() {
  if (document.querySelector('meta[name="description"]')) return;
  const metaHTML = `
    <!-- 공통 SEO 태그 (JS로 주입됨) -->
    <meta name="description" content="전국러닝협회(KNRA) 공식 홈페이지입니다. 대한민국 러닝 문화 발전과 건강한 커뮤니티 형성을 위해 헌신합니다." />
    <meta name="keywords" content="전국러닝협회, KNRA, 마라톤, 러닝크루, 러닝, 달리기, 러너" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="전국러닝협회 - 달리는 대한민국, 건강한 미래" />
    <meta property="og:description" content="전국러닝협회(KNRA) 공식 홈페이지입니다. 대한민국 러닝 문화 발전과 건강한 커뮤니티 형성을 위해 헌신합니다." />
  `;
  document.head.insertAdjacentHTML('beforeend', metaHTML);
}

async function loadComponents() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch('components/header.html'),
      fetch('components/footer.html')
    ]);
    const headerEl = document.getElementById('header-placeholder');
    if (headerEl) headerEl.outerHTML = await headerRes.text();
    
    const footerEl = document.getElementById('footer-placeholder');
    if (footerEl) footerEl.outerHTML = await footerRes.text();

    // Active Nav Update
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#main-header a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (path === href && href !== 'index.html' && href !== 'admin.html') {
        if (link.classList.contains('nav-link')) {
          link.classList.remove('text-gray-600', 'border-transparent');
          link.classList.add('text-primary', 'border-primary');
        } else if (link.classList.contains('block')) {
          link.classList.remove('text-gray-700');
          link.classList.add('text-primary', 'bg-gray-50');
        }
      }
    });

    // Rebind header events
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
    
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
      mainHeader.classList.toggle('scrolled', window.scrollY > 50);
      window.addEventListener('scroll', () => mainHeader.classList.toggle('scrolled', window.scrollY > 50));
    }
  } catch(e) { console.error('Failed to load components', e); }
}

document.addEventListener('DOMContentLoaded', () => { 
  injectMetaTags();
  createScrollToTop(); 
  loadComponents();
});
