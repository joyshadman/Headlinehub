// news.js
const API_KEY = "pub_d519a9e3bca24c0ab519a31b8467c8a8";

async function fetchDynamicNews(category = 'top') {
    const container = document.getElementById('news-container');
    const heading = document.getElementById('section-heading');
    
    // Update Heading
    if (heading) {
        heading.innerText = category === 'top' ? "Top Breaking News" : category.toUpperCase() + " Highlights";
    }

    try {
        // We use category='top' to ensure only important news is fetched
        const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=${category}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            container.innerHTML = ""; // Clear placeholders
            
            data.results.slice(0, 6).forEach(article => {
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
    } catch (error) {
        console.error("Error loading news:", error);
        container.innerHTML = '<p class="text-center">Unable to load important headlines.</p>';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchDynamicNews('top');

    // Sticky Nav Logic
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('.navbar');
        if (nav) {
            window.scrollY > 80 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }
    });
});