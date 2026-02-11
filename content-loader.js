// Load content from data.json when page loads
window.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading content from data.json...');
    await loadAllContent();
});

async function loadAllContent() {
    try {
        // Add cache busting to ensure fresh data
        const timestamp = new Date().getTime();
        const response = await fetch(`data.json?t=${timestamp}`);
        
        if (!response.ok) {
            throw new Error('Failed to load data.json');
        }
        
        const data = await response.json();
        console.log('Data loaded:', data);
        
        loadHeroContent(data.hero);
        loadAboutContent(data.about);
        loadWorkContent(data.work);
        loadContactContent(data.contact);
        
        console.log('Content loaded successfully!');
    } catch (error) {
        console.error('Error loading content:', error);
        alert('Error loading content. Please refresh the page.');
    }
}

function loadHeroContent(hero) {
    if (!hero) {
        console.warn('No hero data found');
        return;
    }

    console.log('Loading hero content:', hero);

    // Update hero content
    const titleElement = document.querySelector('.hero-title');
    const subtitleElement = document.querySelector('.hero-subtitle');
    const descriptionElement = document.querySelector('.hero-description');
    
    if (titleElement) {
        titleElement.textContent = hero.name;
        console.log('Updated title:', hero.name);
    }
    if (subtitleElement) {
        subtitleElement.textContent = hero.subtitle;
        console.log('Updated subtitle:', hero.subtitle);
    }
    if (descriptionElement) {
        descriptionElement.textContent = hero.description;
        console.log('Updated description');
    }

    // Update stats
    const stats = document.querySelectorAll('.stat');
    console.log('Found stats:', stats.length);
    
    if (stats[0]) {
        stats[0].querySelector('.stat-number').textContent = hero.stat1Number;
        stats[0].querySelector('.stat-label').textContent = hero.stat1Label;
    }
    if (stats[1]) {
        stats[1].querySelector('.stat-number').textContent = hero.stat2Number;
        stats[1].querySelector('.stat-label').textContent = hero.stat2Label;
    }
    if (stats[2]) {
        stats[2].querySelector('.stat-number').textContent = hero.stat3Number;
        stats[2].querySelector('.stat-label').textContent = hero.stat3Label;
    }
}

function loadAboutContent(about) {
    if (!about) {
        console.warn('No about data found');
        return;
    }

    console.log('Loading about content');

    // Update about content
    const leadElement = document.querySelector('.about-main .lead');
    const paragraphs = document.querySelectorAll('.about-main p');
    const mainParagraph = paragraphs[1];
    
    if (leadElement) {
        leadElement.textContent = about.lead;
    }
    if (mainParagraph) {
        mainParagraph.textContent = about.main;
    }

    // Update skills
    const skillsContainer = document.querySelector('.skills');
    if (skillsContainer && about.skills) {
        const skills = about.skills.split(',').map(s => s.trim());
        skillsContainer.innerHTML = skills.map(skill => 
            `<span class="skill">${skill}</span>`
        ).join('');
        console.log('Updated skills');
    }

    // Update current role
    const infoCards = document.querySelectorAll('.info-card');
    if (infoCards[0]) {
        const roleElement = infoCards[0].querySelector('strong');
        const companyElement = infoCards[0].querySelectorAll('p')[1];
        
        if (roleElement) roleElement.textContent = about.currentRole;
        if (companyElement) companyElement.textContent = about.currentCompany;
    }
}

function loadWorkContent(work) {
    if (!work || work.length === 0) {
        console.warn('No work data found');
        return;
    }

    console.log('Loading work content:', work.length, 'items');

    const workGrid = document.querySelector('.work-grid');
    if (!workGrid) {
        console.error('Work grid not found!');
        return;
    }

    workGrid.innerHTML = work.map(item => `
        <div class="work-card ${item.featured ? 'featured' : ''}">
            <div class="work-badge">${item.badge}</div>
            <h3>${item.title}</h3>
            ${item.subtitle ? `<p class="work-subtitle">${item.subtitle}</p>` : ''}
            <p>${item.description}</p>
            <div class="work-tags">
                ${item.tags.split(',').map(tag => `<span>${tag.trim()}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    console.log('Work content updated');
}

function loadContactContent(contact) {
    if (!contact) {
        console.warn('No contact data found');
        return;
    }

    console.log('Loading contact content');

    // Update contact links
    const emailLinks = document.querySelectorAll('a[href^="mailto"]');
    emailLinks.forEach(link => {
        link.href = `mailto:${contact.email}`;
    });

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        const icon = card.querySelector('i');
        if (icon && icon.classList.contains('fa-linkedin')) {
            card.href = contact.linkedin;
        }
        if (icon && icon.classList.contains('fa-twitter')) {
            card.href = contact.twitter;
        }
    });
    
    console.log('Contact content updated');
}

// Expose function globally for manual refresh
window.refreshContent = loadAllContent;
