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
        loadSpeakingContent(data.speaking);
        loadTestimonialsContent(data.testimonials);
        loadMediaContent(data.media);
        loadFaqContent(data.faq);
        loadContactContent(data.contact);
        loadCustomSectionsContent(data.customSections);
        
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

function loadSpeakingContent(speaking) {
    if (!speaking || speaking.length === 0) {
        console.warn('No speaking data found');
        return;
    }

    console.log('Loading speaking content:', speaking.length, 'items');

    const speakingGrid = document.querySelector('.speaking-grid');
    if (!speakingGrid) {
        console.error('Speaking grid not found!');
        return;
    }

    speakingGrid.innerHTML = speaking.map(item => `
        <div class="speaking-card ${item.featured ? 'main' : ''}">
            <div class="speaking-badge">${item.badge}</div>
            <h3>${item.title}</h3>
            <p class="speaking-role">${item.role}</p>
            <p>${item.description}</p>
            ${item.topics ? `
                <div class="speaking-topics">
                    ${item.topics.split(',').map(topic => `<span>${topic.trim()}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    console.log('Speaking content updated');
}

function loadTestimonialsContent(testimonials) {
    if (!testimonials || testimonials.length === 0) {
        console.warn('No testimonials data found');
        return;
    }

    console.log('Loading testimonials content:', testimonials.length, 'items');

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) {
        console.error('Testimonials grid not found!');
        return;
    }

    testimonialsGrid.innerHTML = testimonials.map(item => `
        <div class="testimonial-card">
            <p class="testimonial-text">"${item.text}"</p>
            <div class="testimonial-author">
                <strong>${item.author}</strong>
                <span>${item.role}</span>
            </div>
        </div>
    `).join('');
    
    console.log('Testimonials content updated');
}

function loadMediaContent(media) {
    if (!media || media.length === 0) {
        console.warn('No media data found');
        return;
    }

    console.log('Loading media content:', media.length, 'items');

    const mediaGrid = document.querySelector('.media-grid');
    if (!mediaGrid) {
        console.error('Media grid not found!');
        return;
    }

    mediaGrid.innerHTML = media.map(item => `
        <div class="media-card">
            <div class="media-icon">
                <i class="fas fa-${item.icon}"></i>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="media-date">${item.date}</span>
        </div>
    `).join('');
    
    console.log('Media content updated');
}

function loadFaqContent(faq) {
    if (!faq || faq.length === 0) {
        console.warn('No FAQ data found');
        return;
    }

    console.log('Loading FAQ content:', faq.length, 'items');

    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) {
        console.error('FAQ container not found!');
        return;
    }

    faqContainer.innerHTML = faq.map(item => `
        <div class="faq-item">
            <h3 class="faq-question">${item.question}</h3>
            <p class="faq-answer">${item.answer}</p>
        </div>
    `).join('');
    
    console.log('FAQ content updated');
}

function loadCustomSectionsContent(customSections) {
    if (!customSections || customSections.length === 0) {
        console.log('No custom sections to load');
        return;
    }

    console.log('Loading custom sections:', customSections.length, 'sections');

    // Find the contact section to insert custom sections before it
    const contactSection = document.getElementById('contact');
    if (!contactSection) {
        console.error('Contact section not found!');
        return;
    }

    // Remove any existing custom sections first
    document.querySelectorAll('.custom-section').forEach(section => section.remove());

    // Insert each custom section before contact
    customSections.forEach(section => {
        const sectionElement = document.createElement('section');
        sectionElement.className = `section custom-section ${section.dark ? 'section-dark' : ''}`;
        sectionElement.id = section.id;
        sectionElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">${section.title}</h2>
                <div class="custom-content">
                    ${section.content}
                </div>
            </div>
        `;
        contactSection.parentNode.insertBefore(sectionElement, contactSection);
    });
    
    console.log('Custom sections loaded');
}

// Expose function globally for manual refresh
window.refreshContent = loadAllContent;

function loadSpeakingContent(speaking) {
    if (!speaking || speaking.length === 0) {
        console.warn('No speaking data found');
        return;
    }

    console.log('Loading speaking content:', speaking.length, 'items');

    const speakingGrid = document.querySelector('.speaking-grid');
    if (!speakingGrid) {
        console.error('Speaking grid not found!');
        return;
    }

    speakingGrid.innerHTML = speaking.map(item => `
        <div class="speaking-card ${item.isMain ? 'main' : ''}">
            <div class="speaking-badge">${item.badge}</div>
            <h3>${item.title}</h3>
            <p class="speaking-role">${item.role}</p>
            <p>${item.description}</p>
            ${item.topics ? `
                <div class="speaking-topics">
                    ${item.topics.split(',').map(topic => `<span>${topic.trim()}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    console.log('Speaking content updated');
}

function loadTestimonialsContent(testimonials) {
    if (!testimonials || testimonials.length === 0) {
        console.warn('No testimonials data found');
        return;
    }

    console.log('Loading testimonials content:', testimonials.length, 'items');

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) {
        console.error('Testimonials grid not found!');
        return;
    }

    testimonialsGrid.innerHTML = testimonials.map(item => `
        <div class="testimonial-card">
            <p class="testimonial-text">"${item.text}"</p>
            <div class="testimonial-author">
                <strong>${item.author}</strong>
                <span>${item.position}</span>
            </div>
        </div>
    `).join('');
    
    console.log('Testimonials content updated');
}

function loadMediaContent(media) {
    if (!media || media.length === 0) {
        console.warn('No media data found');
        return;
    }

    console.log('Loading media content:', media.length, 'items');

    const mediaGrid = document.querySelector('.media-grid');
    if (!mediaGrid) {
        console.error('Media grid not found!');
        return;
    }

    mediaGrid.innerHTML = media.map(item => `
        <div class="media-card">
            <div class="media-icon">
                <i class="${item.icon}"></i>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="media-date">${item.date}</span>
        </div>
    `).join('');
    
    console.log('Media content updated');
}

function loadFaqContent(faq) {
    if (!faq || faq.length === 0) {
        console.warn('No FAQ data found');
        return;
    }

    console.log('Loading FAQ content:', faq.length, 'items');

    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) {
        console.error('FAQ container not found!');
        return;
    }

    faqContainer.innerHTML = faq.map(item => `
        <div class="faq-item">
            <h3 class="faq-question">${item.question}</h3>
            <p class="faq-answer">${item.answer}</p>
        </div>
    `).join('');
    
    console.log('FAQ content updated');
}

function loadCustomSectionsContent(customSections) {
    if (!customSections || customSections.length === 0) {
        console.log('No custom sections to load');
        return;
    }

    console.log('Loading custom sections:', customSections.length, 'sections');

    // Find the contact section to insert custom sections before it
    const contactSection = document.querySelector('#contact');
    if (!contactSection) {
        console.error('Contact section not found!');
        return;
    }

    // Remove any existing custom sections first
    document.querySelectorAll('.custom-section').forEach(section => section.remove());

    // Insert each custom section before the contact section
    customSections.forEach(section => {
        const sectionElement = document.createElement('section');
        sectionElement.className = `section custom-section ${section.isDark ? 'section-dark' : ''}`;
        sectionElement.id = section.id;
        sectionElement.innerHTML = `
            <div class="container">
                <h2 class="section-title">${section.title}</h2>
                <div class="custom-section-content">
                    ${section.content}
                </div>
            </div>
        `;
        contactSection.parentNode.insertBefore(sectionElement, contactSection);
    });
    
    console.log('Custom sections loaded');
}
