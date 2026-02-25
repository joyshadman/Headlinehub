const API_KEY = "pub_d519a9e3bca24c0ab519a31b8467c8a8";
const FALLBACK_IMG = "img/placeholder.jpg"; 

async function fetchDynamicNews(cat = 'top') {
    const el = id => document.getElementById(id);
    const container = el('news-container'), heading = el('section-heading');
    
    if (heading) {
        heading.innerHTML = cat === 'top' ? "TOP <span>BREAKING</span> NEWS" : `LATEST IN <span>${cat.toUpperCase()}</span>`;
    }

    try {
        const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=${cat}`);
        if (!res.ok) throw 0;
        const data = await res.json();
        
        if (data.results?.length) {
            localStorage.setItem(`news_${cat}`, JSON.stringify(data.results));
            return renderNews(data.results, container);
        }
        throw 0;
    } catch (e) {
        const cached = JSON.parse(localStorage.getItem(`news_${cat}`) || "[]");
        cached.length ? renderNews(cached, container) : 
        container.innerHTML = `<div class="text-center">
            <p class="mt-5">Offline: No cached ${cat} news found.</p>
            <button class="btn btn-primary" onclick="location.reload()">Retry</button>
        </div>`;
    }
}

function renderNews(articles, container) {
    if (!container) return;
    container.innerHTML = articles.slice(0, 9).map(a => `
        <div class="col-lg-4 col-md-6">
            <div class="news-card h-100 shadow-sm border-0">
                <img src="${a.image_url || FALLBACK_IMG}" 
                     onerror="this.src='${FALLBACK_IMG}'"
                     class="card-img-top" style="height:220px; object-fit:cover;" alt="news">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title fw-bold" style="font-size: 1.15rem; color: #222;">${a.title}</h3>
                    <p class="card-text text-muted small">${a.description ? a.description.substring(0, 100) + '...' : 'Click below to read the full story.'}</p>
                    <div class="mt-auto pt-3">
                        <a href="${a.link}" target="_blank" class="btn btn-outline-dark w-100 fw-bold">Read More</a>
                    </div>
                </div>
            </div>
        </div>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    let activeCat = 'top';
    if (page.includes('technology')) activeCat = 'technology';
    else if (page.includes('sports')) activeCat = 'sports';
    else if (page.includes('health')) activeCat = 'health';
    else if (page.includes('business')) activeCat = 'business';

    fetchDynamicNews(activeCat);
    setInterval(() => {
        fetchDynamicNews(activeCat);
    }, 300000);

    const nav = document.querySelector('.navbar');
    window.onscroll = () => nav?.classList.toggle('scrolled', window.scrollY > 50);
});