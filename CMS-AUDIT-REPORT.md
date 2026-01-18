# Netlify CMS Audit Report - Chalupa na Fryšavě

**Datum:** 2025-12-31
**Auditor:** Claude Code + Tech Architect Agent + Code Spec Agent
**Cíl:** Identifikovat nesrovnalosti mezi CMS konfigurací a skutečným obsahem webu

---

## Executive Summary

### Klíčová zjištění:

- **35% CMS obsahu je nepoužité** - 3 celé YAML soubory (rooms.yaml, calendar.yaml, gallery.yaml)
- **30+ polí v CMS** nemá žádné zobrazení na frontendu
- **Galerie "No entries"** - CMS kolekce je prázdná, Gallery.astro čte z filesystemu
- **12+ hardcoded prvků** na frontendu, které nejsou editovatelné přes CMS

### Statistika:

| Metrika | Hodnota |
|---------|---------|
| **Celkem polí v CMS** | ~85 |
| **Použitých na frontendu** | ~55 (65%) |
| **Nepoužitých v CMS** | ~30 (35%) |
| **Hardcoded na frontendu** | ~12 prvků |
| **Prázdné kolekce** | 1 (gallery folder) |
| **Nepoužité YAML soubory** | 3 (rooms.yaml, calendar.yaml, gallery.yaml) |

---

# 1. NADBYTEČNÉ V CMS (jsou v config.yml, ale NEJSOU použity na frontendu)

## 1.1 site.yaml - Nepoužitá pole

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **`highlights`** (Rychlé benefity) | site.yaml, řádek 91-93 | **NEPOUZITO** - nikde se nezobrazuje | ODSTRANIT z CMS nebo přidat zobrazení |
| **`social.facebook`** | site.yaml, řádek 77 | **NEPOUZITO** - žádný odkaz na FB | ODSTRANIT nebo přidat ikony sociálních sítí do footer |
| **`social.instagram`** | site.yaml, řádek 78 | **NEPOUZITO** - žádný odkaz na IG | ODSTRANIT nebo přidat ikony sociálních sítí do footer |
| **`contact.whatsapp`** | site.yaml, řádek 60 | **NEPOUZITO** - žádný WA kontakt zobrazen | ODSTRANIT nebo přidat WA tlačítko |
| **`rating.overall_score`** | site.yaml, řádek 87 | **NEPOUZITO** - používá se jen `score` | ODSTRANIT (redundantní) |
| **`rating.max_overall`** | site.yaml, řádek 88 | **NEPOUZITO** | ODSTRANIT (redundantní) |
| **`meta.keywords`** | site.yaml, řádek 68-71 | **NEPOUZITO** - nejsou v meta tagech | Přidat do SEO komponenty nebo ODSTRANIT |
| **`slogan`** | site.yaml | **NEPOUZITO** - duplicita s `hero_slogan` | ODSTRANIT |

### Detail: site.yaml.highlights (8 položek) - NIKDE NEZOBRAZENO

```yaml
highlights:
  - Kapacita až 20 osob
  - 6 ložnic + galerie
  - Sauna pro 5 osob
  - Výčep Dalešice 11° a 12°
  - Oplocený pozemek
  - VDSL internet
  - Vhodné pro děti
  - Mazlíčci vítáni
```

**Problém:** Nikde na webu se to nezobrazuje, ale `amenity_tags` (5 položek) ano! Duplicita funkcionality.

---

## 1.2 pricing.yaml - Nepoužitá pole

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **`payment.accepted_methods`** | pricing.yaml, řádek 143-146 | **NEPOUZITO** - nikde se nezobrazuje | PŘIDAT zobrazení nebo ODSTRANIT |
| **`payment.deposit_note`** | pricing.yaml, řádek 141 | **ČÁSTEČNĚ** - pouze hodnota `deposit_percent` se používá | Zvážit použití textu |
| **`payment.final_payment`** | pricing.yaml, řádek 142 | **NEPOUZITO** | PŘIDAT nebo ODSTRANIT |
| **`checkin_checkout.note`** | pricing.yaml | **NEPOUZITO** - "Jiné časy po domluvě s majitelem" | PŘIDAT zobrazení |
| **`fees[].mandatory`** | pricing.yaml | **NEPOUZITO** - boolean není využit | Implementovat filtr |
| **`cancellation[].fee`** | pricing.yaml | **NEPOUZITO** - fixní částka v Kč | Implementovat nebo ODSTRANIT |
| **`cancellation[].fee_percent`** | pricing.yaml | **NEPOUZITO** - procento | Implementovat nebo ODSTRANIT |

### Detail: payment.accepted_methods - NIKDE NEZOBRAZENO

```yaml
payment:
  accepted_methods:
    - Hotovost
    - Bankovní převod
```

**Problém:** Návštěvník neví, jak může platit! Důležitá informace chybí na webu.

---

## 1.3 about.yaml - Nepoužitá pole

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **`description`** | about.yaml, řádek 4-6 | **NEPOUZITO** - AboutSection používá `about_slides` | ODSTRANIT nebo přidat |
| **`history.title`** | about.yaml, řádek 27 | **NEPOUZITO** - "Historie a tradice" | ODSTRANIT nebo přidat sekci |
| **`history.content`** | about.yaml, řádek 28-31 | **NEPOUZITO** | ODSTRANIT nebo přidat sekci |
| **`highlights`** (Hlavní přednosti) | about.yaml, řádek 34-49 | **NEPOUZITO** - nejsou zobrazeny | PŘIDAT nebo ODSTRANIT |
| **`quotes`** | about.yaml, řádek 95-98 | **NEPOUZITO** | ODSTRANIT nebo přidat testimonial sekci |
| **`special_offers`** | about.yaml, řádek 100-106 | **NEPOUZITO** | ODSTRANIT nebo přidat nabídky |
| **`location.title`** | about.yaml, řádek 53 | **NEPOUZITO** - hardcoded "Lokalita a okolí" | POUŽÍT místo hardcoded |

### Detail: about.yaml.highlights (4 strukturované položky) - NEPOUZITO

```yaml
highlights:
  - title: "Prostorné podkroví"
    description: "Hlavní obytný prostor (~90 m²) s ložním polem a galerií speciálně pro děti"
    icon: "home"
  - title: "Ideální umístění"
    description: "V centru obce, 200 m do obchodu, 400 m do hospody"
    icon: "map-pin"
  # ... další 2 položky
```

**Problém:** Pěkně strukturované benefity, ale nikde se nezobrazují!

### Detail: about.yaml.special_offers - NEPOUZITO

```yaml
special_offers:
  - "Firemní setkání a semináře"
  - "Teambuildingové akce"
  - "Školení a workshopy"
  - "Rodinné oslavy"
  - "Možnost individuální cenové nabídky"
```

**Problém:** 5 nabídek pro firemní klientelu - připraveno, ale nikde nezobrazeno!

---

## 1.4 calendar.yaml - Nepoužitá pole

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **`google_calendar_embed`** | calendar.yaml, řádek 4 | **NEPOUZITO** - CalendarSection má statický placeholder | IMPLEMENTOVAT nebo ODSTRANIT |
| **`occupied_dates`** | calendar.yaml, řádek 9-22 | **NEPOUZITO** - CalendarSection nemá logiku pro zobrazení | IMPLEMENTOVAT nebo ODSTRANIT |
| **`notes`** | calendar.yaml, řádek 26-30 | **NEPOUZITO** | IMPLEMENTOVAT nebo ODSTRANIT |

**Status:** **CELÝ SOUBOR JE NEPOUZITÝ!**

---

## 1.5 rooms.yaml - Nepoužitá pole

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **CELÁ KOLEKCE `rooms`** | rooms.yaml | **NEPOUZITO** - žádná RoomsSection neexistuje | PŘIDAT sekci pokojů nebo ODSTRANIT z CMS |
| **`summary.total_rooms`** | rooms.yaml | Redundantní - duplicita s `site.yaml capacity.total_rooms` | ODSTRANIT |
| **`summary.plus_gallery`** | rooms.yaml | **NEPOUZITO** | ODSTRANIT |
| **`summary.note`** | rooms.yaml | **NEPOUZITO** | PŘIDAT nebo ODSTRANIT |

### Detail: rooms.yaml - CELÝ SOUBOR NEPOUZITÝ

```yaml
rooms:
  - id: 1
    name: "Pokoj I"
    capacity: 2
    type: "Dvoulůžkový pokoj"
    floor: "přízemí"
    description: "Útulný pokoj..."
  # ... celkem 6 pokojů
```

**Problém:** Detailní informace o 6 pokojích jsou připraveny, ale nikde se nezobrazují!

**Status:** **CELÝ SOUBOR JE NEPOUZITÝ!**

---

## 1.6 features.yaml - Částečně nepoužitá pole

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **`categories.*.items.*.available`** | features.yaml | **NEPOUZITO** - všechny položky se zobrazují stejně | Implementovat filtr nebo ODSTRANIT |
| **`services.*.available`** | features.yaml | **NEPOUZITO** - všechny služby se zobrazují stejně | Implementovat filtr nebo ODSTRANIT |

---

## 1.7 gallery.yaml - Nepoužitá data

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **CELÝ SOUBOR `gallery.yaml`** | gallery.yaml | **NEPOUZITO** - Gallery.astro čte přímo z filesystému `/public/images/large/` | PŘEPRACOVAT galerii nebo ODSTRANIT soubor |

**Status:** **CELÝ SOUBOR JE NEPOUZITÝ!**

---

## 1.8 Kolekce "gallery" v CMS

| Kolekce | Stav | Doporučení |
|---------|------|------------|
| **`collections.gallery`** (folder based) | Složka `src/content/gallery` obsahuje pouze `.gitkeep` - je prázdná a nepouzitá | ODSTRANIT z CMS nebo implementovat |

**Příčina problému "No entries":**
- CMS kolekce `gallery` je nastavena jako **folder-based** (Markdown soubory)
- Složka `src/content/gallery/` obsahuje pouze `.gitkeep` - **je prázdná**
- Komponenta `Gallery.astro` **ignoruje CMS** a čte přímo z `/public/images/large/`

**Aktuální flow:**
```
CMS Config → src/content/gallery/*.md (PRÁZDNÉ) ❌
Gallery.astro → /public/images/large/*.webp (POUŽITO) ✅
gallery.yaml → (IGNOROVÁNO) ❌
```

---

## 1.9 reviews.yaml - Částečně nepoužitá pole

| Pole | Umístění v CMS | Status na frontendu | Doporučení |
|------|----------------|---------------------|------------|
| **`reviews[].date`** | reviews.yaml | **NEPOUZITO** - informace o datu návštěvy | Přidat zobrazení |
| **`reviews[].group`** | reviews.yaml | **NEPOUZITO** - informace o typu skupiny | Přidat zobrazení |

---

# 2. CHYBĚJÍCÍ V CMS (zobrazují se na frontendu, ale NEJSOU v config.yml)

## 2.1 Hardcoded obsah v komponentách

| Komponenta | Hardcoded obsah | Kde | Doporučení |
|------------|-----------------|-----|------------|
| **ParallaxDivider.astro** | `quote = "Večer světlo kostela, ráno zpěv ptáků."` | Řádek 4 | PŘIDAT do site.yaml nebo about.yaml |
| **ParallaxDivider.astro** | `backgroundImage = '/images/large/...'` | Řádek 3 | PŘIDAT do CMS |
| **Header.astro** | `navItems` array | Řádek 8-14 | PŘIDAT navigaci do site.yaml |
| **Header.astro** | `"Chalupa na Fryšavě"` název | Řádek 33 | POUŽÍT `siteData.name` z site.yaml |
| **ContactForm.astro** | `formspreeEndpoint` | Řádek 10 | PŘIDAT do site.yaml |
| **ContactForm.astro** | "Reakční doba" text | Řádek 71-73 | PŘIDAT do CMS |
| **FAQSection.astro** | "Máte další otázky?" card text | Řádek 41-45 | Je statický, zvážit CMS |
| **CalendarSection.astro** | Názvy měsíců, dnů (Po, Út...) | Řádky 8-14 | Lokalizace - zvážit |
| **CalendarSection.astro** | "Zde bude umístěn rezervační kalendář ze systému Previo" | Řádek 122 | Placeholder - OK |
| **Gallery.astro** | Alt texty jsou generované dynamicky | - | OK, ale lepší by bylo z CMS |
| **ReviewsSection.astro** | "Vytvořte si vlastní vzpomínku" CTA text | Řádek 78 | PŘIDAT do CMS |
| **LocationSection.astro** | "Lokalita a okolí" nadpis | Řádek 29 | POUŽÍT `aboutData.location.title` |
| **LocationSection.astro** | "Co je v okolí" nadpis | Řádek 46 | PŘIDAT do about.yaml |
| **LocationSection.astro** | "Letní aktivity" nadpis | Řádek 73 | PŘIDAT do about.yaml |
| **LocationSection.astro** | "Zimní aktivity" nadpis | Řádek 95 | PŘIDAT do about.yaml |
| **BaseLayout.astro** | Default title a description | Řádky 13-15 | Bere z props, OK |

### Detail: Header.astro - Navigační menu (hardcoded)

```javascript
const navItems = [
  { label: 'O chalupě', href: '/#o-chalupe' },
  { label: 'Galerie', href: '/#galerie' },
  { label: 'Vybavení', href: '/#vybaveni' },
  { label: 'Ceník', href: '/cenik' },
  { label: 'Lokalita', href: '/#lokalita' },
];
```

**Doporučení:** Přesunout do site.yaml jako `navigation[]`

---

## 2.2 Chybějící datové struktury

| Co chybí | Popis | Doporučení |
|----------|-------|------------|
| **Navigace** | Menu položky jsou hardcoded v Header.astro | PŘIDAT `navigation` do site.yaml |
| **CTA texty** | Tlačítka typu "Poptat termín", "Rezervovat" jsou hardcoded | PŘIDAT `cta` sekci do site.yaml |
| **Formulář nastavení** | Formspree endpoint, popisky polí | PŘIDAT `contact_form` do site.yaml |

---

# 3. NESROVNALOSTI (existují v obou, ale mají problém)

## 3.1 Strukturální nesrovnalosti

| Problém | CMS | Frontend | Řešení |
|---------|-----|----------|--------|
| **Duplicitní `highlights`** | Existuje v `site.yaml` i `about.yaml` | Ani jedno není použito | Sloučit do jednoho místa |
| **Kategorie galerie** | CMS má 4 kategorie: exterior, interior, surroundings, activities | gallery.yaml má 9 kategorií | Sjednotit |
| **`services`** v features.yaml | Je editovatelné v CMS | Je zobrazeno v FeaturesSection.astro | OK - ale EquipmentSection.astro to nezobrazuje |
| **`location.title`** | about.yaml: "Okolí a aktivity" | LocationSection.astro: "Lokalita a okolí" | POUŽÍT z YAML |

---

# 4. DETAILNÍ ANALÝZA PO SOUBORECH

## 4.1 site.yaml

```
POUŽÍVÁ SE:
  ✅ name                           (v Hero.astro, SEO.astro)
  ✅ description                    (v Footer.astro, SEO.astro)
  ✅ hero_slogan                    (v Hero.astro)
  ✅ hero_images                    (v Hero.astro - path, alt)
  ✅ location.address               (v Footer.astro, ContactForm.astro, LocationSection.astro, SEO.astro)
  ✅ location.region                (v Footer.astro, ContactForm.astro, LocationSection.astro, SEO.astro)
  ✅ location.country               (v Footer.astro, SEO.astro)
  ✅ location.gps.lat               (v LocationSection.astro, SEO.astro)
  ✅ location.gps.lng               (v LocationSection.astro, SEO.astro)
  ✅ capacity.max_guests            (v USPSection.astro, EquipmentSection.astro)
  ✅ capacity.bedrooms              (v SEO.astro)
  ✅ capacity.total_rooms           (v USPSection.astro)
  ✅ contact.email                  (v Footer.astro, ContactForm.astro, SEO.astro)
  ✅ contact.phone                  (v Footer.astro, ContactForm.astro, BottomBar.astro, SEO.astro)
  ✅ rating.score                   (v Footer.astro, USPSection.astro, SEO.astro)
  ✅ rating.reviews_count           (v Footer.astro, SEO.astro)
  ✅ amenity_tags                   (v USPSection.astro)

NEPOUZÍVÁ SE:
  ❌ slogan                         (definováno, ale nikde nepouzito - hero používá hero_slogan)
  ❌ contact.whatsapp               (prázdné a nepouzito)
  ❌ meta.title                     (nepouzito - BaseLayout asi má vlastní logiku)
  ❌ meta.description               (nepouzito)
  ❌ meta.keywords                  (nepouzito)
  ❌ social.facebook                (prázdné a nepouzito)
  ❌ social.instagram               (prázdné a nepouzito)
  ❌ rating.overall_score           (nepouzito)
  ❌ rating.max                     (nepouzito)
  ❌ rating.max_overall             (nepouzito)
  ❌ highlights                     (pole 8 položek - NIKDE NEPOUZITO!)
```

---

## 4.2 pricing.yaml

```
POUŽÍVÁ SE:
  ✅ seasons[]                      (v PricingSection.astro, SEO.astro)
  ✅ fees[]                         (v PricingSection.astro)
  ✅ checkin_checkout.checkin_from  (v rezervace.astro)
  ✅ checkin_checkout.checkout_until (v rezervace.astro)
  ✅ cancellation[]                 (v PricingSection.astro)
  ✅ payment.deposit_percent        (v rezervace.astro)
  ✅ notes[]                        (v PricingSection.astro)

NEPOUZÍVÁ SE:
  ❌ checkin_checkout.note          (definováno "Jiné časy po domluvě s majitelem")
  ❌ payment.deposit_note           (definováno "Záloha 50% při rezervaci")
  ❌ payment.final_payment          (definováno "Doplatek při příjezdu")
  ❌ payment.accepted_methods[]     (pole: Hotovost, Bankovní převod)
  ❌ fees[].mandatory               (boolean - mělo by se zobrazovat)
  ❌ cancellation[].fee             (číslo - mělo by se používat)
  ❌ cancellation[].fee_percent     (číslo - mělo by se používat)
```

---

## 4.3 about.yaml

```
POUŽÍVÁ SE:
  ✅ about_slides[]                 (v AboutSection.astro)
  ✅ location.description           (v LocationSection.astro)
  ✅ location.distances[]           (v LocationSection.astro)
  ✅ location.activities.summer[]   (v LocationSection.astro)
  ✅ location.activities.winter[]   (v LocationSection.astro)

NEPOUZÍVÁ SE:
  ❌ description                    (hlavní popis - nahrazeno o about_slides)
  ❌ history.title                  ("Historie a tradice")
  ❌ history.content                (dlouhý text o historii)
  ❌ highlights[]                   (4 položky s title, description, icon)
  ❌ location.title                 ("Okolí a aktivity" - hardcoded v LocationSection)
  ❌ quotes[]                       (pole citátů)
  ❌ special_offers[]               (5 nabídek - firemní setkání, atd.)
```

---

## 4.4 features.yaml

```
POUŽÍVÁ SE:
  ✅ categories[]                   (v FeaturesSection.astro, EquipmentSection.astro)
  ✅ services[]                     (v FeaturesSection.astro)

NEPOUZÍVÁ SE:
  ❌ categories[].items[].available (boolean - vše je true, není zobrazeno)
  ❌ services[].available           (boolean - vše je true, není zobrazeno)
```

---

## 4.5 rooms.yaml

```
❌ KOMPLETNĚ NEPOUZÍVÁ SE!

Definovaná data:
  rooms[]                        (6 pokojů)
    - id
    - name                       ("Pokoj I", "Pokoj II", atd.)
    - capacity                   (2-8 osob)
    - type                       ("Dvoulůžkový pokoj", atd.)
    - floor                      ("přízemí", "patro", "podkroví")
    - description
    - highlight
  summary.total_rooms
  summary.plus_gallery
  summary.total_capacity
  summary.note
```

---

## 4.6 reviews.yaml

```
POUŽÍVÁ SE:
  ✅ reviews[]                      (v ReviewsSection.astro)
    ✅ author                       (v ReviewsSection.astro)
    ✅ text                         (v ReviewsSection.astro)
    ✅ rating                       (v ReviewsSection.astro)

NEPOUZÍVÁ SE:
  ❌ date                           (informace o tom, kdy host byl)
  ❌ group                          (informace o tom, s kým host byl)
```

---

## 4.7 faq.yaml

```
POUŽÍVÁ SE:
  ✅ items[]                        (v FAQSection.astro)
    ✅ question                     (v FAQSection.astro)
    ✅ answer                       (v FAQSection.astro)

Status: 100% VYUŽITO - žádné nepřidělené pole
```

---

## 4.8 calendar.yaml

```
❌ KOMPLETNĚ NEPOUZÍVÁ SE!

Definovaná data:
  google_calendar_embed          (prázdné)
  occupied_dates[]               (obsazené termíny)
    - from
    - to
    - status
    - note
  notes[]                        (poznámky ke kalendáři)
```

---

## 4.9 gallery.yaml

```
❌ KOMPLETNĚ NEPOUZÍVÁ SE!

Definovaná data:
  categories[]                   (9 kategorií: exterior, winter, rooms, atd.)
    - id
    - name
    - description
    - order
  images[]                       (mapování fotek na kategorie)
    - filename
    - category
    - alt
    - featured
```

---

# 5. SEKCE LOKALITA A OKOLÍ - DETAILNÍ ANALÝZA

## Komponenta: `LocationSection.astro`

### Použití YAML dat:

| Pole | YAML soubor | Kde v komponentě | Status |
|------|-------------|------------------|--------|
| `location.description` | about.yaml | řádek 31 | ✅ POUŽITO |
| `location.distances[]` | about.yaml | řádky 48-60 | ✅ POUŽITO |
| `location.activities.summer[]` | about.yaml | řádky 76-86 | ✅ POUŽITO |
| `location.activities.winter[]` | about.yaml | řádky 98-108 | ✅ POUŽITO |
| `location.gps.lat` | site.yaml | řádky 38, 123 | ✅ POUŽITO (mapa + GPS) |
| `location.gps.lng` | site.yaml | řádky 38, 123 | ✅ POUŽITO (mapa + GPS) |
| `location.address` | site.yaml | řádek 119 | ✅ POUŽITO |
| `location.region` | site.yaml | řádek 119 | ✅ POUŽITO |
| **`location.title`** | about.yaml | - | ❌ **NEPOUŽITO** |

### Hardcoded obsah:

| Hardcoded obsah | Kde | Aktuální hodnota | Doporučení |
|-----------------|-----|------------------|------------|
| **Hlavní nadpis** | řádek 29 | `"Lokalita a okolí"` | ✅ Existuje v about.yaml jako `location.title: "Okolí a aktivity"` - **POUŽÍT!** |
| **Podnadpis vzdáleností** | řádek 46 | `"Co je v okolí"` | Přidat do about.yaml jako `location.distances_title` |
| **Nadpis letních aktivit** | řádek 73 | `"Letní aktivity"` | Přidat do about.yaml jako `location.summer_title` |
| **Nadpis zimních aktivit** | řádek 95 | `"Zimní aktivity"` | Přidat do about.yaml jako `location.winter_title` |

### Kritický problém - Nesrovnalost:

```yaml
# about.yaml řádek 53
location:
  title: "Okolí a aktivity"    # ❌ NEPOUŽITO v CMS
```

```astro
<!-- LocationSection.astro řádek 29 -->
<h2>Lokalita a okolí</h2>      <!-- ✅ HARDCODED na frontendu -->
```

**Důsledek:** Pokud editor změní nadpis v CMS na "Okolí a aktivity", nic se nestane - není to propojené!

### Statistika použití sekce Lokalita:

| Kategorie | Počet |
|-----------|-------|
| **Použitých polí** | 10 |
| **Nepoužitých polí** | 1 (`location.title`) |
| **Hardcoded prvků** | 4 nadpisy |
| **Využití CMS** | **91%** |

**Celkové zhodnocení sekce Lokalita:** 🟢 **Velmi dobrý stav** (91% dat je z CMS)

---

# 6. DOPORUČENÍ

## 6.1 VYSOKÁ PRIORITA - Okamžité akce

### A) Odstranit nepožívané složité struktury z CMS:

1. **rooms.yaml** - celá kolekce (nebo přidat RoomsSection)
2. **gallery.yaml** - celý soubor (Gallery.astro čte z filesystému)
3. **calendar.yaml.occupied_dates** - CalendarSection to nepoužívá
4. **collections.gallery** (folder based) - prázdná kolekce

### B) Odstranit duplicitní/redundantní pole:

1. **site.yaml.highlights** (nebo ho použít místo amenity_tags)
2. **site.yaml.slogan** (duplicita s hero_slogan)
3. **site.yaml.rating.overall_score** a `max_overall`
4. **rooms.yaml.summary.total_rooms** (duplicita site.yaml)

### C) Přidat do CMS obsah který je hardcoded:

1. **Parallax quote** → site.yaml nebo about.yaml
2. **Navigační položky** → site.yaml.navigation
3. **CTA texty** → site.yaml.cta
4. **Formspree endpoint** → site.yaml.formspree_endpoint
5. **LocationSection nadpisy** → about.yaml (distances_title, summer_title, winter_title)

### D) Opravit ignorovaná pole:

1. **about.yaml.location.title** → použít v LocationSection.astro místo hardcoded "Lokalita a okolí"

---

## 6.2 STŘEDNÍ PRIORITA

### Implementovat nebo odstranit:

1. **Google Calendar embed** (calendar.yaml)
2. **Platební metody** (accepted_methods v pricing.yaml)
3. **Sociální sítě** (Facebook, Instagram v site.yaml)
4. **WhatsApp kontakt** (site.yaml)

### Sjednotit struktury:

1. **about.yaml `history`** - buď použít nebo odstranit
2. **about.yaml `quotes`** - buď použít nebo odstranit
3. **about.yaml `special_offers`** - buď použít nebo odstranit

---

## 6.3 NÍZKÁ PRIORITA

### Zvážit přidání:

1. **meta.keywords** do SEO komponenty
2. **features.categories.items.available** logiku (filtrování nedostupných položek)
3. **reviews.date** a `reviews.group` zobrazení

---

# 7. TŘI VARIANTY ŘEŠENÍ

## VARIANTA A: Minimalistický CMS ⚡ (DOPORUČENO)

**Cíl:** Odstranit vše nepožité, CMS = pouze to, co web skutečně ukazuje

**Akce:**

### Smazat z CMS:
- ✂️ `rooms.yaml` kolekce
- ✂️ `calendar.yaml` obsazené termíny
- ✂️ `gallery` folder kolekce
- ✂️ `gallery.yaml` soubor
- ✂️ `site.yaml.highlights`
- ✂️ `site.yaml.slogan`
- ✂️ `site.yaml.social.*`
- ✂️ `site.yaml.rating.overall_score`, `max_overall`
- ✂️ `about.yaml.history`, `quotes`, `special_offers`
- ✂️ `pricing.yaml.accepted_methods` (nebo zobrazit)

### Přidat do CMS:
- ➕ Navigační menu (`site.yaml.navigation`)
- ➕ Parallax citát (`site.yaml.parallax_quote`)
- ➕ Formspree endpoint (`site.yaml.formspree_endpoint`)

### Opravit:
- 🔧 `about.yaml.location.title` → použít v LocationSection.astro

### Vyřešit galerii:
- Odstranit folder-based kolekci z CMS
- Ponechat `Gallery.astro` jak je (čte z filesystému)

**Výsledek:** Čistý CMS bez mrtvého kódu, vše co vidíš = můžeš editovat

---

## VARIANTA B: Kompletní CMS 🏗️

**Cíl:** Implementovat všechny připravené struktury

**Akce:**

### Implementovat komponenty:
1. 🛠️ `RoomsSection.astro` pro `rooms.yaml`
2. 🛠️ Integrovat `calendar.yaml` do `CalendarSection.astro`
3. 🛠️ Přepracovat `Gallery.astro` pro použití `gallery.yaml`
4. 🛠️ Zobrazit `site.yaml.highlights` na homepage
5. 🛠️ Zobrazit `about.yaml.special_offers`
6. 🛠️ Zobrazit `about.yaml.highlights`
7. 🛠️ Zobrazit `about.yaml.history`
8. 🛠️ Zobrazit `pricing.yaml.accepted_methods`

### Přidat hardcoded obsah do CMS:
- Viz Varianta A

**Výsledek:** Web s více sekcemi, plně využívající CMS

---

## VARIANTA C: Hybrid 🔄 (Střední cesta)

**Cíl:** Implementovat jen užitečné části, zbytek odstranit

### PONECHAT a implementovat:
- ✅ `pricing.yaml.accepted_methods` → zobrazit v ceníku
- ✅ `rooms.yaml` → vytvořit jednoduchou RoomsSection
- ✅ `site.yaml.highlights` → nahradit `amenity_tags` nebo je sloučit

### ODSTRANIT:
- ❌ `calendar.yaml` (kalendář čte Google Calendar)
- ❌ `gallery.yaml` (galerie funguje z filesystému)
- ❌ `about.yaml.history`, `quotes`, `special_offers`

---

# 8. KONKRÉTNÍ ODPOVĚDI NA SPECIFICKÉ DOTAZY

## "highlights" (Rychlé benefity) v site.yaml

**Status:** NIKDE SE NEZOBRAZUJÍ

- Definováno v `/src/data/site.yaml` řádky 52-60
- Pole obsahuje: "Kapacita až 20 osob", "6 ložnic + galerie", "Sauna pro 5 osob"...
- **Frontend:** Žádná komponenta toto pole NEČTE a NEZOBRAZUJE
- **Doporučení:** Odstranit z CMS, protože `amenity_tags` plní podobnou funkci a ty se zobrazují

## "accepted_methods" (Akceptované platební metody) v pricing.yaml

**Status:** NIKDE SE NEZOBRAZUJÍ

- Definováno v `/src/data/pricing.yaml` řádky 59-62
- Obsahuje: "Hotovost", "Bankovní převod"
- **Frontend:** PricingSection.astro ani rezervace.astro toto pole NEČTOU
- **Doporučení:** Přidat zobrazení do ceníku/rezervace nebo odstranit z CMS

## Galerie "No entries"

**Příčina:**
- CMS kolekce `gallery` je nastavena jako **folder-based** (očekává Markdown soubory)
- Složka `src/content/gallery/` obsahuje pouze `.gitkeep` - je prázdná
- Komponenta `Gallery.astro` ignoruje CMS a čte přímo z `/public/images/large/*.webp`

**Řešení:**
1. **Varianta A:** Odstranit gallery kolekci z CMS, ponechat Gallery.astro jak je
2. **Varianta B:** Vytvořit .md soubory pro každý obrázek v src/content/gallery/
3. **Varianta C:** Přepracovat Gallery.astro pro použití gallery.yaml

---

# 9. PŘÍLOHY

## 9.1 Seznam komponent načítajících YAML data

1. `/src/components/Footer.astro` → site.yaml
2. `/src/components/Hero.astro` → site.yaml
3. `/src/components/SEO.astro` → site.yaml, pricing.yaml
4. `/src/components/FeaturesSection.astro` → features.yaml
5. `/src/components/ReviewsSection.astro` → reviews.yaml
6. `/src/components/LocationSection.astro` → about.yaml, site.yaml
7. `/src/components/PricingSection.astro` → pricing.yaml
8. `/src/components/FAQSection.astro` → faq.yaml
9. `/src/components/AboutSection.astro` → about.yaml
10. `/src/components/ContactForm.astro` → site.yaml
11. `/src/components/USPSection.astro` → site.yaml
12. `/src/components/EquipmentSection.astro` → features.yaml, site.yaml
13. `/src/components/BottomBar.astro` → site.yaml
14. `/src/pages/rezervace.astro` → pricing.yaml

## 9.2 Seznam YAML souborů

1. `src/data/site.yaml` - Základní informace o webu
2. `src/data/pricing.yaml` - Ceník a platební podmínky
3. `src/data/about.yaml` - O chalupě a lokalitě
4. `src/data/features.yaml` - Vybavení a služby
5. `src/data/rooms.yaml` - Pokoje (NEPOUZITO)
6. `src/data/reviews.yaml` - Recenze
7. `src/data/faq.yaml` - FAQ
8. `src/data/calendar.yaml` - Kalendář (NEPOUZITO)
9. `src/data/gallery.yaml` - Galerie (NEPOUZITO)

---

**Konec reportu**

*Vygenerováno: 2025-12-31*
