# Changelog - Aktualizace webu Chalupa Fryšava

**Datum:** 6. ledna 2026
**Verze:** 2.0.1

---

## 🔄 Hotfix - Verze 2.0.1 (6. ledna 2026)

### **Commit cf552cf - Navigace a hash odkazy**

**Opravy:**
- ✅ Přidán odkaz "Pokoje" do hlavní navigace (desktop i mobile menu)
- ✅ Hash odkazy nyní fungují správně ze všech stránek:
  - Na homepage: `#lokalita` (scroll na sekci)
  - Na jiných stránkách: `/#lokalita` (přesměrování na homepage + scroll)
- ✅ Header: Podpora `variant='light'` pro stránky s bílým pozadím
- ✅ Mobilní logo: Zobrazení při scrollování (opacity 0 → 100)
- ✅ Footer: Stejná logika hash odkazů jako v Header

**Řešené problémy:**
- ❌ **Před:** Stránka /pokoje existovala, ale nebyla viditelná v menu
- ✅ **Po:** Link "Pokoje" v hlavní navigaci
- ❌ **Před:** Kliknutí na "Lokalita" z /cenik routovalo na `/cenik/#lokalita`
- ✅ **Po:** Správně routuje na `/#lokalita` (homepage)

**Soubory:**
- `src/components/Header.astro` - přidán /pokoje link, oprava hash logiky
- `src/components/Footer.astro` - oprava hash logiky

---

## 🎯 Hlavní release - Verze 2.0.0 (6. ledna 2026)

Tato aktualizace přináší **kompletní CMS integraci**, **novou galerii** a **UX vylepšení** mobilní verze webu.

---

## ✨ Nové funkce

### 1. **Galerie plně spravovaná přes CMS**
- ✅ Nový datový soubor `gallery.yaml` s 32 fotografiemi
- ✅ 7 kategorií: Exteriér, Zimní atmosféra, Pokoje, Kuchyně, Koupelny & Sauna, Výčep, Půdorysy
- ✅ Každá fotka má alt text, kategorii, pořadí a featured flag
- ✅ Galerie v CMS admin rozhraní (`/admin/`)
- ✅ Carousel na homepage zobrazuje featured fotky

**Soubory:**
- `src/data/gallery.yaml` - nový
- `src/components/Gallery.astro` - refaktorováno
- `public/admin/config.yml` - přidána sekce Galerie

### 2. **Stránka /pokoje s mini galerií**
- ✅ Nová stránka `/pokoje` s přehledem všech pokojů
- ✅ Mini galerie v každé kartě pokoje (2-3 fotky)
- ✅ Navigace šipkami, swipe gesty a klávesnicí
- ✅ Filtrování pokojů podle patra (Přízemí, Patro, Podkroví)
- ✅ 100% obsahu editovatelného přes CMS

**Soubory:**
- `src/pages/pokoje.astro` - nový
- `src/components/RoomCard.astro` - nový
- `src/data/rooms.yaml` - rozšířeno

### 3. **Pokojové karty - Mini galerie s UX vylepšeními**
- ✅ **Swipe gesta** - přejíždění prstem mezi fotkami
- ✅ **Touch targets 44x44px** - šipky splňují WCAG standardy
- ✅ **Šipky viditelné na mobilu** - ne jen na hover
- ✅ **Kompaktní indikátor** - tečky blízko sebe (čistě vizuální)
- ✅ **Keyboard navigace** - šipky vlevo/vpravo

**Soubory:**
- `src/components/RoomCard.astro`

---

## 🔧 Vylepšení CMS

### **Odstranění nadbytečných polí** (27 polí)

**site.yaml:**
- ❌ Odstraněno: `slogan`, `capacity.bedrooms`, `contact.whatsapp`
- ❌ Odstraněno: celá sekce `social` (facebook, instagram)
- ❌ Odstraněno: `rating.max`, `rating.overall_score`, `rating.max_overall`
- ❌ Odstraněno: `highlights`

**about.yaml:**
- ❌ Odstraněno: `description`, celá sekce `history`, `highlights`
- ❌ Odstraněno: `location.title`, celá sekce `quotes`, `special_offers`

**features.yaml:**
- ❌ Odstraněno: `categories.items.available`, `services.available`

**rooms.yaml:**
- ❌ Odstraněno: `summary.plus_gallery`

**pricing.yaml:**
- ❌ Odstraněno: `fees.mandatory`, `cancellation.fee`

**calendar.yaml:**
- ❌ **Celá sekce odstraněna** - nebyla používána na frontendu

**reviews.yaml:**
- ❌ Odstraněno: `date`, `group`

**Důvod:** Tato pole byla definována v CMS, ale nebyla použita v žádné frontend komponentě. Odstranění zjednodušuje CMS rozhraní a zlepšuje UX pro editora.

---

## 📄 Stránka /pokoje - 100% CMS pokrytí

### **Nové CMS sekce:**

**Hero sekce:**
```yaml
hero:
  title: Pokoje a ubytování
  subtitle: 6 prostorných pokojů & galerie pro 20 hostů
  image: /images/large/exterier-chalupy-c9c9-570474.webp
  image_alt: Pokoje v chalupě na Fryšavě
```

**Pokoje s mini galerií:**
```yaml
rooms:
  - id: 1
    name: Pokoj I
    capacity: 2
    type: Dvoulůžkový pokoj
    floor: přízemí
    images:
      - /images/large/pokoj-i-pro-dve-osoby-1e8f-570480.webp
      - /images/large/pokoj-i-pro-dve-osoby-e458-570481.webp
```

**Statistiky - labely:**
```yaml
stats_labels:
  rooms: pokojů
  capacity: osob
  floors: patra
  extra_beds: přistýlek
```

**Filtry - labely:**
```yaml
filter_labels:
  all: Všechny
  ground_floor: Přízemí
  first_floor: Patro
  attic: Podkroví
```

**CTA sekce:**
```yaml
cta:
  title: Máte zájem o ubytování?
  description: Kontaktujte nás a domluvíme termín, který vám vyhovuje.
  buttons:
    - text: Poptat termín
      link: /#kontakt
      style: primary
    - text: Zobrazit ceník
      link: /cenik
      style: secondary
```

---

## 🎨 Frontend změny

### **Sekce Vybavení - přesun do CMS**
- ✅ Kategorie "Nadstandardní výbava" přesunuta z hardcoded kódu do `features.yaml`
- ✅ Odstraněn `consolidatedCategories` array z `EquipmentSection.astro`
- ✅ Komponenta nyní čte data přímo z CMS

**Před:**
```javascript
const consolidatedCategories = [
  {
    name: 'Nadstandardní výbava',
    icon: 'sauna',
    items: [/* hardcoded */]
  },
  // ...
];
```

**Po:**
```javascript
const categories = featuresData.categories;
```

### **Ceník - rozšířený modal**
- ✅ Přidány sekce "Check-in / Check-out" a "Platební podmínky" do modalu
- ✅ Modal zobrazuje veškerá data z `pricing.yaml`
- ✅ Odstraněn nadpis z modal headeru (čistší design)

**Soubory:**
- `src/components/PricingSection.astro`

---

## 📱 Mobilní UX vylepšení

### **Kritické opravy:**

1. **Touch targets zvětšeny na 44x44px**
   - Navigační šipky galerie: `w-8 h-8` → `w-11 h-11`
   - Splňuje WCAG 2.1 Level AA standardy

2. **Šipky viditelné na mobilu**
   - Před: `opacity-0 group-hover:opacity-100` (nefunguje na dotyku)
   - Po: `opacity-100 md:opacity-0 md:group-hover:opacity-100`

3. **Swipe gesta implementována**
   - Touch event listeners pro přirozené přejíždění mezi fotkami
   - Minimální vzdálenost swipe: 50px
   - Detekce pouze horizontálního pohybu (ignoruje scroll)
   - Passive listeners pro lepší performance

4. **Kompaktní indikátor pozice**
   - Tečky změněny z `<button>` na `<span>` (čistě vizuální)
   - Gap mezi tečkami: `gap-1.5` (6px) - velmi blízko u sebe
   - Navigace pouze přes šipky a swipe

### **Accessibility:**
- ✅ `aria-label` na všech navigačních prvcích
- ✅ `role="status"` a `aria-live="polite"` na indikátoru
- ✅ Keyboard navigace (Arrow Left/Right)
- ✅ `prefers-reduced-motion` respektováno

---

## 📊 Audity provedené

### **1. Homepage CMS Audit**
- Výsledek: **7 z 11 sekcí** plně v CMS
- Identifikováno: 4 sekce s problémy (Galerie, Kalendář, Paralax, Kontakt)
- Opraveno: Galerie nyní 100% v CMS

**Soubor:** `audit-homepage-cms.md`

### **2. /pokoje CMS Audit**
- Výsledek: **100% pokrytí CMS**
- Všechna pole nyní editovatelná

**Soubor:** `audit-pokoje-cms.md`

### **3. Mobilní UX Audit /pokoje**
- Identifikováno: 4 kritické + 8 vysokých + 6 středních problémů
- Opraveno: Všechny kritické problémy (touch targets, swipe, viditelnost)

**Soubor:** `CMS-AUDIT-REPORT.md`

---

## 📁 Struktura změněných souborů

### **Nové soubory:**
```
src/pages/pokoje.astro          - Stránka s přehledem pokojů
src/components/RoomCard.astro   - Karta pokoje s mini galerií
src/data/gallery.yaml           - Galerie s 32 fotografiemi
src/data/faq.yaml              - FAQ data (připraveno)
CHANGELOG.md                    - Tento soubor
```

### **Upravené soubory:**

**Data (CMS):**
```
src/data/rooms.yaml            - Přidána hero, stats_labels, filter_labels, cta, images
src/data/features.yaml         - Přidána kategorie "Nadstandardní výbava"
src/data/pricing.yaml          - Rozšířeno o check-in/checkout, payment
src/data/site.yaml            - Odstraněna nadbytečná pole
src/data/about.yaml           - Odstraněna nadbytečná pole
src/data/reviews.yaml         - Odstraněna nadbytečná pole
```

**Komponenty:**
```
src/components/Gallery.astro         - Refaktor pro čtení z gallery.yaml
src/components/EquipmentSection.astro - Odstranění hardcoded dat
src/components/PricingSection.astro   - Rozšířený modal
src/components/RoomCard.astro         - Nový s UX vylepšeními
```

**CMS konfigurace:**
```
public/admin/config.yml - Přidána Galerie, odstraněna nadbytečná pole
```

---

## 🚀 Jak testovat změny

### **1. CMS Admin**
```bash
# Spustit Netlify Dev
npx netlify dev

# Otevřít CMS admin
http://localhost:8888/admin/

# Ověřit nové sekce:
- ✅ Galerie (kategorie + fotografie)
- ✅ Pokoje (hero, images, stats_labels, filter_labels, cta)
- ✅ Vybavení (kategorie "Nadstandardní výbava")
```

### **2. Frontend**
```bash
# Spustit dev server
npm run dev

# Otevřít stránky:
http://localhost:4323/          - Homepage s novou galerií
http://localhost:4323/pokoje    - Nová stránka pokojů
http://localhost:4323/cenik     - Rozšířený modal
```

### **3. Build**
```bash
npm run build
# Zkontrolovat: Build prošel bez chyb ✓
```

### **4. Mobilní testování**
- Otevřít DevTools → Toggle device toolbar
- Testovat swipe gesta na mini galerii
- Ověřit touch targets (min 44x44px)
- Zkontrolovat viditelnost šipek na mobilu

---

## 🔄 Migrace dat

**Není potřeba žádná migrace.** Všechny změny jsou zpětně kompatibilní:
- Nové CMS sekce jsou volitelné
- Odstraněná pole nebyla používána
- Existující data zůstávají funkční

---

## 🐛 Známé problémy a omezení

### **Nevyřešeno z auditu:**

**Střední priorita:**
- Paralax divider - citát je stále hardcoded
- Kontakt formulář - Formspree placeholder `YOUR_FORM_ID`

**Nízká priorita:**
- Hero výška na mobilu (400px může být moc na malých obrazovkách)
- Footer linky - malé touch targets
- Filtrační tlačítka - nedostatečná výška na mobilu

**Accessibility:**
- Chybí `aria-controls` na filtrech
- Chybí `aria-labelledby` na kartách pokojů

---

## 👥 Tým

**Implementace:** Claude Sonnet 4.5
**Testování:** Manuální + Build CI
**Design:** UX audit + WCAG 2.1 guidelines

---

## 📞 Podpora

Pro otázky nebo problémy:
- Issues: https://github.com/[username]/frysava/issues
- Email: [kontakt]

---

**🎉 Děkujeme za použití Chalupy Fryšava CMS!**
