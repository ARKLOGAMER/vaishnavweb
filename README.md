# Vaishnav H - Portfolio Website

## 🚀 Quick Start

### View the Website
- Main site: `index.html`
- Admin panel: `login.html`

### Admin Login
- Username: `admin`
- Password: `admin123`

## 🔧 How the CMS Works

### 1. Content Storage
All content is stored in `data.json` which is committed to GitHub.

### 2. Admin Panel Sections
The admin panel now includes COMPLETE control over ALL sections:

- **Hero Section** - Name, subtitle, description, and stats
- **About Section** - Lead paragraph, main content, skills, current role
- **Work Section** - Add/edit/remove work items with badges and tags
- **Speaking Section** - Manage speaking engagements and events
- **Testimonials** - Add/edit testimonials from clients and attendees
- **Media & Press** - Showcase media coverage and recognition
- **FAQ Section** - Manage frequently asked questions
- **Contact** - Update email and social media links
- **Custom Sections** - Create entirely new sections with custom content!

### 3. Editing Content
1. Go to `yoursite.com/login.html`
2. Login with admin credentials
3. Navigate between sections using tabs
4. Edit any section, add or remove items
5. Click "Save"
6. Changes push to GitHub automatically
7. Website updates in 1-2 minutes

### 4. Custom Sections Feature
Create unlimited custom sections with:
- Custom titles and IDs
- HTML content support
- Light or dark backgrounds
- Automatic insertion before Contact section

### 5. GitHub Token Setup
First time you login to admin panel, you'll need a GitHub Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "Portfolio Admin"
4. Select scope: `repo` (full control)
5. Generate and copy the token
6. Paste it when admin panel asks

## 📁 File Structure

```
├── index.html              # Main website
├── styles.css              # All styling
├── script.js               # Navigation & interactions
├── content-loader.js       # Loads data.json into website
├── data.json              # ALL CONTENT (edit via admin)
├── login.html             # Admin login page
├── admin.html             # Admin panel with tabs
├── admin.js               # Admin functionality (all sections)
├── admin-styles.css       # Admin panel styling
├── test-loader.html       # Test if content loads
└── dp.png                 # Profile image
```

## 🐛 Troubleshooting

### Changes not showing on website?

1. **Test the loader:**
   - Open `test-loader.html` in browser
   - Check if data.json loads correctly

2. **Clear cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or open in incognito mode

3. **Check GitHub Pages:**
   - Go to repo Settings → Pages
   - Make sure it's enabled and building

4. **Wait for GitHub:**
   - GitHub Pages takes 1-2 minutes to rebuild
   - Check the Actions tab for build status

### Admin panel not saving?

1. **Check GitHub token:**
   - Make sure you entered it correctly
   - Token needs `repo` permission
   - Token must not be expired

2. **Check browser console:**
   - Press F12
   - Look for errors in Console tab

## 🔄 Manual Deploy

If you need to push changes manually:

```bash
git add .
git commit -m "Update content"
git push origin main
```

## 📝 Editing Content Manually

You can also edit `data.json` directly:

1. Open `data.json`
2. Edit the JSON
3. Commit and push to GitHub
4. Website updates automatically

## 🔒 Security Notes

- GitHub token is stored in browser localStorage
- Only admin needs the token
- Regular visitors don't need any credentials
- Change admin password in `login.html` (line 73)

## 🎨 Customization

### Change Colors
Edit `styles.css` variables:
```css
:root {
    --black: #000000;
    --white: #FFFFFF;
}
```

### Change Admin Password
Edit `login.html` line 73:
```javascript
if (username === 'admin' && password === 'YOUR_NEW_PASSWORD') {
```

### Add More Sections
1. Add data to `data.json`
2. Update `content-loader.js` to load it
3. Update `admin.html` to edit it
4. Update `admin.js` to save it

## 📞 Support

If something's not working:
1. Check `test-loader.html`
2. Check browser console (F12)
3. Check GitHub Actions tab
4. Clear browser cache

---

Made with ❤️ by Vaishnav H
