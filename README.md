# 🏡 Chalupa na Fryšavě - Prezentační web

Moderní, rychlý a responzivní web pro pronájem chalupy na Vysočině.

## ✨ Vlastnosti

- 🎨 **Moderní design** - minimalistický, s důrazem na fotografie
- ⚡ **Vysoký výkon** - staticky generovaný web, Lighthouse 90+
- 📱 **Plně responzivní** - perfektní na všech zařízeních
- 🖼️ **96 optimalizovaných fotek** - WebP formát, 3 velikosti
- 📝 **Snadná editace** - Netlify CMS nebo YAML soubory
- 🔍 **SEO optimalizované** - meta tagy, OG, strukturovaná data
- 📬 **Kontaktní formulář** - Formspree integrace
- 📅 **Kalendář obsazenosti** - Google Calendar nebo manuální

## 🚀 Rychlý start

### Instalace

```bash
npm install
```

### Lokální development

```bash
npm run dev
```

Web běží na `http://localhost:4321`

### Build pro produkci

```bash
npm run build
```

### Preview buildu

```bash
npm run preview
```

## 📁 Struktura projektu

```
frysava/
├── src/
│   ├── components/      # React-like komponenty
│   ├── layouts/         # Layouty stránek
│   ├── pages/           # Hlavní stránky
│   ├── data/            # ✏️ YAML konfigurace (editovatelné)
│   │   ├── site.yaml       # Základní info, kontakty
│   │   ├── pricing.yaml    # Ceník
│   │   ├── features.yaml   # Vybavení
│   │   ├── calendar.yaml   # Obsazenost
│   │   └── about.yaml      # O chalupě
│   └── content/         # MDX obsah (FAQ atd.)
│
├── public/
│   ├── images/          # Optimalizované fotky
│   │   ├── original/       # Originály (32 ks)
│   │   ├── thumbnail/      # 400px (96 ks)
│   │   ├── medium/         # 800px (96 ks)
│   │   └── large/          # 1400px (96 ks)
│   └── admin/           # Netlify CMS
│
├── scripts/
│   └── optimize-images.js  # Optimalizace fotek
│
├── EDITOR-GUIDE.md      # 📖 Návod pro majitele
└── netlify.toml         # Netlify konfigurace
```

## ✏️ Editace obsahu

### Varianta A: Netlify CMS (GUI editor)

1. Po nasazení přejděte na `/admin`
2. Přihlaste se přes Netlify Identity
3. Editujte obsah v grafickém editoru

### Varianta B: Manuální editace YAML

Editujte soubory v `src/data/*.yaml`:

```yaml
# src/data/pricing.yaml
seasons:
  - name: "Letní sezóna"
    price_per_person: 750  # Změňte cenu zde
```

Podrobný návod: [EDITOR-GUIDE.md](./EDITOR-GUIDE.md)

## 🖼️ Přidání nových fotografií

1. Nahrajte originály do `public/images/original/`
2. Spusťte optimalizaci:
   ```bash
   node scripts/optimize-images.js
   ```
3. Fotky jsou automaticky zpracovány do 3 velikostí

## 🌐 Deployment na Netlify

### První nasazení

1. Připojte repo k Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Aktivujte Netlify Identity (pro CMS)

### Automatické nasazení

Každý push do `main` větve automaticky nasadí novou verzi.

## 📋 TODO před produkčním nasazením

- [ ] Nastavit správný email v `src/data/site.yaml`
- [ ] Nastavit správný telefon v `src/data/site.yaml`
- [ ] Nastavit Formspree endpoint v `src/components/ContactForm.astro`
- [ ] Napojit Google Calendar (volitelné) v `src/data/calendar.yaml`
- [ ] Nastavit vlastní doménu v Netlify
- [ ] Aktivovat Netlify Identity pro CMS
- [ ] Přidat skutečné fotky (pokud chybí)

## 🛠️ Tech stack

- **Framework:** Astro 5
- **Styling:** Tailwind CSS 3
- **Hosting:** Netlify
- **CMS:** Netlify CMS
- **Formulář:** Formspree
- **Optimalizace:** Sharp (WebP)

## 📊 Výkon

- ⚡ Lighthouse Performance: 90+
- ♿ Accessibility: 90+
- 🔍 SEO: 90+
- ✅ Best Practices: 90+

## 📞 Podpora

Pro více informací viz [EDITOR-GUIDE.md](./EDITOR-GUIDE.md)

---

**Vytvořeno pomocí Claude Code** | **Tech architect review: ✅**
