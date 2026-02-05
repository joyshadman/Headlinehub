const API_KEY = "pub_d519a9e3bca24c0ab519a31b8467c8a8";

async function fetchDynamicNews(category = 'top') {
    const container = document.getElementById('news-container');
    const heading = document.getElementById('section-heading');

    if (heading) {
        heading.innerText = category === 'top' ? "Top Breaking News" : category.toUpperCase() + " Highlights";
    }

    try {
        const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=${category}`);

        // Check if the response is okay (status 200)
        if (!response.ok) {
            throw new Error('API Limit reached or network error');
        }

        const data = await response.json();

        // If we have results, save them for later and render
        if (data.results && data.results.length > 0) {
            localStorage.setItem(`cached_news_${category}`, JSON.stringify(data.results));
            renderNews(data.results, container);
        } else {
            throw new Error('Empty results');
        }

    } catch (error) {
        console.warn("Using looped/cached news due to error:", error);

        // Fallback: Try to get news from localStorage
        const cachedData = localStorage.getItem(`cached_news_${category}`);

        if (cachedData) {
            const oldNews = JSON.parse(cachedData);
            renderNews(oldNews, container);
        } else {
            container.innerHTML = '<p class="text-center">No cached news available. Please check back later.</p>';
        }
    }
}

// Separate function to handle the HTML creation
function renderNews(articles, container) {
    container.innerHTML = ""; // Clear existing content

    articles.slice(0, 6).forEach(article => {
        const newsCard = `
            <div class="col-lg-4 col-md-6">
                <div class="news-card h-100">
                    <img src="${article.image_url || 'https://via.placeholder.com/400x250?text=Headline+Hub'}" 
                         class="card-img-top" alt="news" style="height:200px; object-fit:cover;">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title fw-bold" style="font-size: 1.2rem;">${article.title}</h3>
                        <div class="mt-auto">
                            <a href="${article.link}" target="_blank" class="btn btn-outline-pop w-100">Full Story</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += newsCard;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchDynamicNews('top');

    window.addEventListener('scroll', function () {
        const nav = document.querySelector('.navbar');
        if (nav) {
            window.scrollY > 80 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }
    });
});