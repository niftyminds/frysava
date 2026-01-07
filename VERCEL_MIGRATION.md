# Vercel Migration Guide

This branch (`vercel-migration`) contains code changes for migrating from Netlify to Vercel.

## ⚠️ Important: This is a STAGING branch

- **Production (main branch)** continues running on Netlify
- **This branch** is for Vercel testing only
- DO NOT merge to main until migration is complete and tested

## Changes Made

### 1. Adapter Change
- ❌ Removed: `@astrojs/netlify`
- ✅ Added: `@astrojs/vercel`
- Updated `astro.config.mjs` with Vercel adapter

### 2. Contact Form Backend
- ❌ Removed: Netlify Forms integration
- ✅ Added: Formspree integration
- **ACTION REQUIRED:** Replace `YOUR_FORMSPREE_ID` in `src/components/ContactForm.astro`

### 3. CMS Authentication
- ❌ Removed: Netlify Identity + Git Gateway
- ✅ Added: GitHub OAuth via Decap CMS
- **ACTION REQUIRED:** Set up GitHub OAuth App (see below)

### 4. Configuration Files
- Created `vercel.json` with headers and settings
- Updated `public/admin/config.yml` for GitHub backend
- Updated `public/admin/index.html` (removed Identity widget)

## Required Setup Steps

### Step 1: Create Formspree Account

1. Go to https://formspree.io
2. Sign up for free account
3. Create a new form
4. Get your Form ID (format: `xyzabc123`)
5. Replace `YOUR_FORMSPREE_ID` in these files:
   - `src/components/ContactForm.astro` (line 78)
   - `src/components/ContactForm.astro` (line 272)

### Step 2: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name:** Chalupa Frysava CMS
   - **Homepage URL:** `https://frysava.cz`
   - **Authorization callback URL:** `https://sveltia-cms-auth.deno.dev/callback`
4. Click "Register application"
5. Note your **Client ID** and **Client Secret**

### Step 3: Configure Sveltia CMS Auth

1. Go to https://github.com/sveltia/sveltia-cms-auth
2. Fork the repository (or use the hosted version)
3. Deploy to Deno Deploy (free)
4. Add environment variables:
   - `GITHUB_CLIENT_ID`: Your OAuth App Client ID
   - `GITHUB_CLIENT_SECRET`: Your OAuth App Client Secret
   - `GITHUB_REPO`: `niftyminds/frysava`

**Note:** The hosted version at `https://sveltia-cms-auth.deno.dev` is already configured in `public/admin/config.yml`. You just need to provide your GitHub OAuth credentials.

### Step 4: Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel` (from project root)
4. You'll get a preview URL: `frysava-git-vercel-migration-xxx.vercel.app`

### Step 5: Configure Vercel Environment Variables

In Vercel Dashboard > Project Settings > Environment Variables, add:

```
PUBLIC_GA_MEASUREMENT_ID=G-E4GNK39Y48
PUBLIC_GA_DISABLE_DEV=false
GITHUB_CLIENT_ID=your_oauth_client_id
GITHUB_CLIENT_SECRET=your_oauth_secret
```

### Step 6: Add GitHub Repository Collaborators

CMS users must have write access to the repository:

1. Go to https://github.com/niftyminds/frysava/settings/access
2. Invite collaborators (admin users)
3. They must accept invitation

## Testing Checklist

Before merging to main, verify:

### Functionality
- [ ] Homepage loads correctly
- [ ] All pages render without errors
- [ ] Navigation works
- [ ] Images load and display
- [ ] Previo booking widgets work
- [ ] Contact form submits successfully
- [ ] Form submissions arrive in Formspree
- [ ] Success page displays after form submit
- [ ] Cookie consent works
- [ ] GA4 tracking fires

### CMS
- [ ] /admin loads
- [ ] "Login with GitHub" button appears
- [ ] Login redirects to GitHub
- [ ] OAuth callback works
- [ ] CMS dashboard loads
- [ ] Can view collections
- [ ] Can edit content
- [ ] Changes commit to GitHub
- [ ] Site rebuilds after commit
- [ ] Media uploads work

### Performance
- [ ] Run Lighthouse audit
- [ ] Compare to current site
- [ ] Verify Core Web Vitals

## Migration Timeline

### Current Status: ✅ Code Changes Complete

- ✅ Branch created with backup tag
- ✅ Vercel adapter installed
- ✅ Astro config updated
- ✅ Contact form updated for Formspree
- ✅ CMS config updated for GitHub OAuth
- 🔲 Testing on Vercel staging
- 🔲 DNS cutover to production

### Recommended Timeline

1. **Week 1:** Complete setup steps, deploy to Vercel staging
2. **Week 2:** Full testing on staging URL
3. **Week 3:** DNS cutover during low-traffic period
4. **Week 4+:** Monitor, keep Netlify as backup for 2 weeks

## Rollback Plan

If issues occur:

### Before Merge
Simply stay on `main` branch. Netlify continues running normally.

### After Merge
1. Revert DNS to Netlify
2. Or: `git revert` the merge commit
3. Or: `git reset --hard v1.0-pre-vercel-migration`

## Cost Comparison

| Service | Netlify | Vercel | Change |
|---------|---------|--------|--------|
| Hosting | Free | Free | $0 |
| Forms | Free (100/mo) | Formspree Free (50/mo) | $0 |
| Auth | Free | Free (GitHub) | $0 |
| **Total** | **$0/mo** | **$0/mo** | **$0** |

**Note:** Formspree Pro ($8/mo) if you need > 50 submissions/month

## Support

For issues during migration:
1. Check Vercel build logs
2. Verify Formspree form ID is correct
3. Ensure GitHub OAuth app is configured
4. Confirm collaborators have repo access

## Files Changed

- `astro.config.mjs` - Vercel adapter
- `vercel.json` - New file
- `src/components/ContactForm.astro` - Formspree integration
- `public/admin/config.yml` - GitHub backend
- `public/admin/index.html` - Removed Identity widget

## Files to Delete (After Successful Migration)

- `netlify.toml` - No longer needed
- `/public/email-templates/` - No longer needed (GitHub handles auth emails)
- `/netlify/functions/` - No longer needed

---

**Migration prepared by:** Claude Code
**Date:** 2026-01-07
**Backup tag:** `v1.0-pre-vercel-migration`
**Migration branch:** `vercel-migration`
