# Vercel Migration Guide

This branch (`vercel-migration`) contains code changes for migrating from Netlify to Vercel.

## ⚠️ Important: This is a STAGING branch

- **Production (main branch)** continues running on Netlify
- **This branch** is for Vercel testing only
- DO NOT merge to main until migration is complete and tested

## 🎯 Migration Strategy: Hybrid Architecture

This migration uses a **hybrid approach**:
- ✅ **Web hosting:** Moved to Vercel (faster, better CDN)
- ✅ **CMS authentication:** Stays on Netlify (simple, FREE)
- ✅ **No OAuth setup needed:** Netlify Identity + Git Gateway remain unchanged
- ✅ **Total cost:** $0/month (both platforms on FREE tier)

**Why hybrid?** This gives you the best of both worlds:
- Vercel's superior hosting performance
- Netlify's dead-simple CMS authentication (no GitHub OAuth complexity)
- Both stay completely FREE

## Changes Made

### 1. Adapter Change
- ❌ Removed: `@astrojs/netlify`
- ✅ Added: `@astrojs/vercel`
- Updated `astro.config.mjs` with Vercel adapter

### 2. Contact Form Backend
- ❌ Removed: Netlify Forms integration
- ✅ Added: Formspree integration
- **ACTION REQUIRED:** Replace `YOUR_FORMSPREE_ID` in `src/components/ContactForm.astro`

### 3. CMS Authentication (Hybrid Setup)
- ✅ **Kept:** Netlify Identity + Git Gateway (FREE on Netlify)
- ✅ **Web hosting:** Moved to Vercel
- 🎯 **Strategy:** Hybrid architecture - web on Vercel, CMS auth on Netlify
- **NO ACTION REQUIRED:** Netlify Identity already configured

### 4. Configuration Files
- Created `vercel.json` with headers and settings
- Kept `public/admin/config.yml` with git-gateway backend
- Kept `public/admin/index.html` with Netlify Identity widget

## Required Setup Steps

### Step 1: Create Formspree Account

1. Go to https://formspree.io
2. Sign up for free account
3. Create a new form
4. Get your Form ID (format: `xyzabc123`)
5. Replace `YOUR_FORMSPREE_ID` in these files:
   - `src/components/ContactForm.astro` (line 78)
   - `src/components/ContactForm.astro` (line 272)

### Step 2: Verify Netlify Site Configuration

**Important:** Your existing Netlify site remains active for CMS authentication only (no hosting).

1. Go to Netlify Dashboard: https://app.netlify.com
2. Find your site: `frysava` (or similar)
3. Verify these services are enabled:
   - ✅ **Netlify Identity:** Enabled (Settings > Identity)
   - ✅ **Git Gateway:** Enabled (Settings > Identity > Services > Git Gateway)
   - ✅ **Email notifications:** Configured (invitation, password reset)

**Note:** Netlify FREE tier includes:
- 1,000 Identity users/month
- Unlimited Git Gateway usage
- No need for active site deployment

### Step 3: Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel` (from project root)
4. You'll get a preview URL: `frysava-git-vercel-migration-xxx.vercel.app`

### Step 4: Configure Vercel Environment Variables

In Vercel Dashboard > Project Settings > Environment Variables, add:

```
PUBLIC_GA_MEASUREMENT_ID=G-E4GNK39Y48
PUBLIC_GA_DISABLE_DEV=false
```

### Step 5: CMS User Management

CMS users are managed through **Netlify Identity** (not GitHub):

1. Go to Netlify Dashboard > Identity
2. Click "Invite users"
3. Enter email addresses of CMS admins
4. Users receive invitation email with password setup link
5. After registration, users can access `/admin` on the Vercel-hosted site

**No GitHub repository access needed** - Git Gateway handles commits automatically.

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

| Service | Before (Netlify Only) | After (Hybrid) | Change |
|---------|---------|--------|--------|
| **Web Hosting** | Netlify Free | Vercel Free | $0 |
| **Forms** | Netlify Forms (100/mo) | Formspree (50/mo) | $0 |
| **CMS Auth** | Netlify Identity (1,000 users) | Netlify Identity (1,000 users) | $0 |
| **Git Gateway** | Netlify (unlimited) | Netlify (unlimited) | $0 |
| **Total** | **$0/mo** | **$0/mo** | **$0** |

**Notes:**
- Netlify site remains for CMS auth only (no build/hosting costs)
- Formspree Pro ($8/mo) only if you need > 50 submissions/month
- Netlify Identity Pro ($99/mo) only if you need > 1,000 users/month

## Architecture Overview

### Hybrid Setup Explained

This migration uses a **hybrid architecture** to leverage the best of both platforms:

```
┌─────────────────────────────────────────────────────────────┐
│                     PUBLIC VISITORS                          │
│                  (https://frysava.cz)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   VERCEL HOSTING     │
              │  - Static pages      │
              │  - Fast CDN          │
              │  - Global edge       │
              └──────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                      CMS ADMINS                              │
│              (https://frysava.cz/admin)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  NETLIFY IDENTITY    │
              │  - User auth         │
              │  - Email invites     │
              │  - Password reset    │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   GIT GATEWAY        │
              │  - GitHub commits    │
              │  - Content saves     │
              └──────────────────────┘
```

**Benefits:**
- ✅ Vercel: Faster hosting, better performance
- ✅ Netlify: Simple CMS auth (no OAuth setup needed)
- ✅ FREE tier on both platforms
- ✅ No code changes for CMS users
- ✅ Easy rollback if needed

## Support

For issues during migration:
1. Check Vercel build logs
2. Verify Formspree form ID is correct
3. Verify Netlify Identity is enabled on Netlify site
4. Ensure Git Gateway is configured correctly

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
