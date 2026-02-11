// Check if user is logged in
if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html';
}

// GitHub Configuration
const GITHUB_CONFIG = {
    owner: 'ARKLOGAMER',
    repo: 'vaishnavweb',
    branch: 'main',
    token: localStorage.getItem('githubToken') || ''
};

// Load existing data on page load
window.addEventListener('DOMContentLoaded', () => {
    checkGitHubToken();
    loadAllData();
});

function checkGitHubToken() {
    if (!GITHUB_CONFIG.token) {
        const token = prompt('Please enter your GitHub Personal Access Token:\n\n(This is needed to save changes to GitHub)\n\nGet it from: https://github.com/settings/tokens');
        if (token) {
            localStorage.setItem('githubToken', token);
            GITHUB_CONFIG.token = token;
        } else {
            alert('GitHub token is required to save changes!');
        }
    }
}

async function loadAllData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        loadHero(data.hero);
        loadAbout(data.about);
        loadWork(data.work);
        loadContact(data.contact);
    } catch (error) {
        console.error('Error loading data:', error);
        // Load defaults if file doesn't exist
        loadHero();
        loadAbout();
        loadWork();
        loadContact();
    }
}

// Hero Section
function loadHero(hero = {}) {
    const defaultHero = {
        name: 'Vaishnav H',
        subtitle: 'Founder & CEO, SCIFY Technologies',
        description: 'Building R&D solutions for sustainability and infrastructure. Speaker at IEEE and IEDC events.',
        stat1Number: '₹2L+',
        stat1Label: 'Grants Won',
        stat2Number: '4+',
        stat2Label: 'Awards',
        stat3Number: '10+',
        stat3Label: 'Talks'
    };

    hero = { ...defaultHero, ...hero };

    document.getElementById('heroName').value = hero.name;
    document.getElementById('heroSubtitle').value = hero.subtitle;
    document.getElementById('heroDescription').value = hero.description;
    document.getElementById('stat1Number').value = hero.stat1Number;
    document.getElementById('stat1Label').value = hero.stat1Label;
    document.getElementById('stat2Number').value = hero.stat2Number;
    document.getElementById('stat2Label').value = hero.stat2Label;
    document.getElementById('stat3Number').value = hero.stat3Number;
    document.getElementById('stat3Label').value = hero.stat3Label;
}

async function saveHero() {
    const heroData = {
        name: document.getElementById('heroName').value,
        subtitle: document.getElementById('heroSubtitle').value,
        description: document.getElementById('heroDescription').value,
        stat1Number: document.getElementById('stat1Number').value,
        stat1Label: document.getElementById('stat1Label').value,
        stat2Number: document.getElementById('stat2Number').value,
        stat2Label: document.getElementById('stat2Label').value,
        stat3Number: document.getElementById('stat3Number').value,
        stat3Label: document.getElementById('stat3Label').value
    };

    await updateGitHubData('hero', heroData);
}

// About Section
function loadAbout(about = {}) {
    const defaultAbout = {
        lead: 'I started SCIFY Technologies to work on real problems in sustainability and infrastructure. We focus on R&D that actually gets built and used.',
        main: 'Beyond running the company, I mentor students at IEEE and IEDC programs, helping them move from ideas to execution.',
        skills: 'R&D, Product Development, Sustainability, EV Systems, Mentorship, Public Speaking',
        currentRole: 'Founder & CEO',
        currentCompany: 'SCIFY Technologies Pvt Ltd'
    };

    about = { ...defaultAbout, ...about };

    document.getElementById('aboutLead').value = about.lead;
    document.getElementById('aboutMain').value = about.main;
    document.getElementById('aboutSkills').value = about.skills;
    document.getElementById('currentRole').value = about.currentRole;
    document.getElementById('currentCompany').value = about.currentCompany;
}

async function saveAbout() {
    const aboutData = {
        lead: document.getElementById('aboutLead').value,
        main: document.getElementById('aboutMain').value,
        skills: document.getElementById('aboutSkills').value,
        currentRole: document.getElementById('currentRole').value,
        currentCompany: document.getElementById('currentCompany').value
    };

    await updateGitHubData('about', aboutData);
}

// Work Section
function loadWork(work = []) {
    if (work.length === 0) {
        work = [
            {
                badge: '₹2L Grant',
                title: 'KTU Innovation Grant',
                subtitle: 'Project Hydra',
                description: 'Won ₹2 lakh from KTU for developing a water management system.',
                tags: 'R&D, Water Tech',
                featured: true
            }
        ];
    }

    const container = document.getElementById('workItems');
    container.innerHTML = '';

    work.forEach((item, index) => {
        container.innerHTML += `
            <div class="work-item" data-index="${index}">
                <div class="form-group">
                    <label>Badge</label>
                    <input type="text" class="work-badge" value="${item.badge}">
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="work-title" value="${item.title}">
                </div>
                <div class="form-group">
                    <label>Subtitle (optional)</label>
                    <input type="text" class="work-subtitle" value="${item.subtitle || ''}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="work-description">${item.description}</textarea>
                </div>
                <div class="form-group">
                    <label>Tags (comma separated)</label>
                    <input type="text" class="work-tags" value="${item.tags}">
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" class="work-featured" ${item.featured ? 'checked' : ''}>
                        Featured (takes 2 columns)
                    </label>
                </div>
                <button class="btn-remove" onclick="removeWorkItem(${index})">Remove</button>
            </div>
        `;
    });
}

function addWorkItem() {
    const container = document.getElementById('workItems');
    const index = container.children.length;
    
    container.innerHTML += `
        <div class="work-item" data-index="${index}">
            <div class="form-group">
                <label>Badge</label>
                <input type="text" class="work-badge" value="New">
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="work-title" value="New Work Item">
            </div>
            <div class="form-group">
                <label>Subtitle (optional)</label>
                <input type="text" class="work-subtitle" value="">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="work-description">Description here</textarea>
            </div>
            <div class="form-group">
                <label>Tags (comma separated)</label>
                <input type="text" class="work-tags" value="Tag1, Tag2">
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" class="work-featured">
                    Featured (takes 2 columns)
                </label>
            </div>
            <button class="btn-remove" onclick="removeWorkItem(${index})">Remove</button>
        </div>
    `;
}

function removeWorkItem(index) {
    const items = document.querySelectorAll('.work-item');
    if (items[index]) {
        items[index].remove();
    }
}

async function saveWork() {
    const workItems = document.querySelectorAll('.work-item');
    const work = [];

    workItems.forEach(item => {
        work.push({
            badge: item.querySelector('.work-badge').value,
            title: item.querySelector('.work-title').value,
            subtitle: item.querySelector('.work-subtitle').value,
            description: item.querySelector('.work-description').value,
            tags: item.querySelector('.work-tags').value,
            featured: item.querySelector('.work-featured').checked
        });
    });

    await updateGitHubData('work', work);
}

// Contact Section
function loadContact(contact = {}) {
    const defaultContact = {
        email: 'contact@scifytech.com',
        linkedin: '#',
        twitter: '#'
    };

    contact = { ...defaultContact, ...contact };

    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactLinkedIn').value = contact.linkedin;
    document.getElementById('contactTwitter').value = contact.twitter;
}

async function saveContact() {
    const contactData = {
        email: document.getElementById('contactEmail').value,
        linkedin: document.getElementById('contactLinkedIn').value,
        twitter: document.getElementById('contactTwitter').value
    };

    await updateGitHubData('contact', contactData);
}

// GitHub API Functions
async function updateGitHubData(section, data) {
    if (!GITHUB_CONFIG.token) {
        alert('Please set your GitHub token first!');
        checkGitHubToken();
        return;
    }

    try {
        // Get current data.json
        const currentData = await fetch('data.json').then(r => r.json()).catch(() => ({}));
        
        // Update the specific section
        currentData[section] = data;
        
        // Get current file SHA
        const fileUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/data.json`;
        const fileResponse = await fetch(fileUrl, {
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        let sha = '';
        if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            sha = fileData.sha;
        }
        
        // Update file on GitHub
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(currentData, null, 2))));
        
        const updateResponse = await fetch(fileUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update ${section} section`,
                content: content,
                sha: sha,
                branch: GITHUB_CONFIG.branch
            })
        });
        
        if (updateResponse.ok) {
            showSuccess();
            alert('Changes saved to GitHub! Your website will update in 1-2 minutes.\n\nNote: GitHub Pages may take a moment to rebuild.');
            // Reload data after 3 seconds
            setTimeout(() => {
                loadAllData();
            }, 3000);
        } else {
            const error = await updateResponse.json();
            alert('Error saving to GitHub: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving changes: ' + error.message);
    }
}

// Utility functions
function showSuccess() {
    const message = document.getElementById('successMessage');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}
