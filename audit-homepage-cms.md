# Audit CMS napojení - Homepage (index.astro)

**Datum auditu:** 2026-01-06
**Cíl:** Identifikovat veškerý obsah, který není napojen do CMS

---

## 📊 SOUHRNNÝ STAV

**Napojení do CMS:** ~55%
**Hardcoded obsah:** ~45%

---

## ✅ CO JE NAPOJENO DO CMS

### 1. Hero Section
**Zdroj:** `site.yaml`
- ✅ Název chalupy (`siteData.name`)
- ✅ Hero slogan (`siteData.hero_slogan`)
- ✅ Carousel obrázky (`hero_images[]`)

### 2. USP Section (Statistiky)
**Zdroj:** `site.yaml`
- ✅ Počet pokojů (`capacity.total_rooms`)
- ✅ Max. kapacita (`capacity.max_guests`)
- ✅ Hodnocení (`rating.score`)
- ✅ Amenity tagy (`amenity_tags[]`)

### 3. About Section
**Zdroj:** `about.yaml`
- ✅ Carousel slides - kompletní (text, obrázky, alt texty)

### 4. Equipment Section
**Zdroj:** `features.yaml`, `site.yaml`
- ✅ Všechny kategorie vybavení
- ✅ Všechny items v kategoriích
- ✅ Max. kapacita pro subtitle

### 5. Location Section
**Zdroj:** `about.yaml`, `site.yaml`
- ✅ Popis lokality
- ✅ GPS souřadnice
- ✅ Vzdálenosti (místa, hodnoty, ikony)
- ✅ Letní aktivity (list)
- ✅ Zimní aktivity (list)
- ✅ Adresa a region

### 6. Reviews Section
**Zdroj:** `reviews.yaml`
- ✅ Všechny recenze (author, text, rating, date, group)

### 7. FAQ Section
**Zdroj:** `faq.yaml`
- ✅ Všechny otázky a odpovědi

### 8. Contact Form
**Zdroj:** `site.yaml`
- ✅ Email
- ✅ Telefon
- ✅ Adresa
- ✅ Region

### 9. Footer
**Zdroj:** `site.yaml`
- ✅ Popis firmy (`description`)
- ✅ Rating (`rating.score`, `rating.reviews_count`)
- ✅ Email, telefon
- ✅ Adresa, region, země

---

## ❌ CO NENÍ NAPOJENO DO CMS

### 1. Hero Section (Hero.astro)

#### Hardcoded:
```yaml
cta_buttons:
  - text: "Poptat termín"          # ❌ HARDCODED (řádek 54)
    link: "#kontakt"               # ❌ HARDCODED
  - text: "Více informací"         # ❌ HARDCODED (řádek 59)
    link: "#o-chalupe"             # ❌ HARDCODED
```

**Poznámka:** CTA tlačítka jsou kompletně hardcoded

---

### 2. USP Section (USPSection.astro)

#### Hardcoded:
```yaml
stats_labels:
  rooms: "pokojů"        # ❌ HARDCODED (řádek 40)
  capacity: "osob"       # ❌ HARDCODED (řádek 55)
  rating: "hodnocení"    # ❌ HARDCODED (řádek 72)

amenity_icon_mapping:  # ❌ HARDCODED (řádky 12-18)
  - Všechny SVG ikony pro amenity jsou hardcoded v kódu
```

---

### 3. About Section (AboutSection.astro)

#### Hardcoded:
```yaml
heading: "O chalupě"                                                    # ❌ (řádek 15)
aria_labels:
  navigation: "Navigace příběhu"                                        # ❌
  slide_label: "Kapitola {X} z {totalSlides}"                          # ❌
  screen_reader: "Použijte šipky vlevo a vpravo pro navigaci..."       # ❌
```

---

### 4. Equipment Section (EquipmentSection.astro)

#### Hardcoded:
```yaml
heading: "Vybavení chalupy"                                            # ❌ (řádek 16)
subtitle_template: "Vše pro pohodlný pobyt až {capacity} hostů"        # ❌ (řádek 17)

custom_category:                                                        # ❌ HARDCODED KATEGORIE
  name: "Nadstandardní výbava"
  items:
    - "Sauna pro 5 osob"
    - "Výčepní zařízení"
    - "3 koupelny"

item_count_label: "položek"                                            # ❌
icon_mapping: # Všechna mapování SVG ikon                              # ❌
```

**Problém:** Kategorie "Nadstandardní výbava" je kompletně hardcoded a není v features.yaml!

---

### 5. Gallery (Gallery.astro)

#### Hardcoded:
```yaml
heading: "Galerie"                                                      # ❌
subtitle: "Prohlédněte si fotografie chalupy"                          # ❌
button_text: "Více fotografií"                                         # ❌
alt_text_pattern: "Fotografie chalupy na Fryšavě - obrázek {X}"       # ❌

lightbox_labels:
  close: "Zavřít galerii"                                              # ❌
  previous: "Předchozí fotografie"                                     # ❌
  next: "Další fotografie"                                             # ❌
```

**Poznámka:** Galerie načítá obrázky z filesystemu, ne z YAML!

---

### 6. Location Section (LocationSection.astro)

#### Hardcoded:
```yaml
heading: "Lokalita a okolí"                                            # ❌
subheadings:
  nearby: "Co je v okolí"                                              # ❌
  summer: "Letní aktivity"                                             # ❌
  winter: "Zimní aktivity"                                             # ❌

directions_box:
  heading: "Jak se k nám dostanete"                                    # ❌
  address_label: "Adresa:"                                             # ❌
  gps_label: "GPS:"                                                    # ❌

icon_mapping: # Všechna SVG mapování pro ikony                         # ❌
```

---

### 7. Reviews Section (ReviewsSection.astro)

#### Hardcoded:
```yaml
heading: "Co říkají naši hosté"                                        # ❌

carousel_labels:
  role: "carousel"                                                      # ❌
  aria_label: "Recenze hostů"                                          # ❌
  slide_label: "Recenze {X} z {total}"                                 # ❌
  star_rating: "Hodnocení {rating} z 5"                                # ❌

cta:
  text: "Vytvořte si vlastní vzpomínku"                                # ❌
  link: "#kontakt"                                                      # ❌
```

---

### 8. FAQ Section (FAQSection.astro)

#### Hardcoded:
```yaml
heading: "Často kladené dotazy"                                        # ❌
subtitle: "Odpovědi na nejčastější dotazy našich hostů"                # ❌

cta_box:
  heading: "Máte další otázky?"                                        # ❌
  text: "Neváhejte nás kontaktovat, rádi vám pomůžeme!"                # ❌
  button_text: "Kontaktovat nás"                                       # ❌
  button_link: "#kontakt"                                              # ❌
```

---

### 9. Contact Form (ContactForm.astro)

#### Hardcoded - KOMPLETNĚ:
```yaml
heading: "Kontakt a poptávka"                                          # ❌
subtitle: "Vyplňte formulář nebo nás kontaktujte přímo"                # ❌

contact_section:
  heading: "Kontaktní údaje"                                           # ❌
  labels:
    email: "Email"                                                      # ❌
    phone: "Telefon"                                                    # ❌
    address: "Adresa"                                                   # ❌

reaction_time:
  heading: "Reakční doba"                                              # ❌
  text: "Na vaše dotazy odpovídáme obvykle do 24 hodin..."             # ❌

form_labels:
  name: "Jméno a příjmení *"                                           # ❌
  email: "Email *"                                                      # ❌
  phone: "Telefon"                                                      # ❌
  arrival: "Příjezd"                                                    # ❌
  departure: "Odjezd"                                                   # ❌
  adults: "Počet dospělých"                                            # ❌
  children: "Počet dětí"                                               # ❌
  pet: "Berete si mazlíčka?"                                           # ❌
  message: "Zpráva"                                                     # ❌
  gdpr: "Souhlasím se zpracováním osobních údajů..."                   # ❌
  required: "* Povinné pole"                                           # ❌

pet_options:
  - "Ne"                                                                # ❌
  - "Ano (jeden)"                                                       # ❌
  - "Ano (více)"                                                        # ❌

button_text: "Odeslat poptávku"                                        # ❌

messages:
  success: "✓ Děkujeme! Vaše poptávka byla úspěšně odeslána..."        # ❌
  error: "✗ Omlouváme se, při odesílání formuláře došlo k chybě..."    # ❌
```

**Problém:** ContactForm je kompletně hardcoded - žádné UI texty nejsou v CMS!

---

### 10. Footer (Footer.astro)

#### Hardcoded:
```yaml
heading: "Chalupa na Fryšavě"                                          # ❌

quick_links:
  section_heading: "Rychlé odkazy"                                      # ❌
  links:
    - text: "O chalupě"                                                # ❌
      href: "#o-chalupe"                                               # ❌
    - text: "Galerie"                                                  # ❌
      href: "#galerie"                                                 # ❌
    - text: "Vybavení"                                                 # ❌
      href: "#vybaveni"                                                # ❌
    - text: "Ceník"                                                    # ❌
      href: "/cenik"                                                   # ❌
    - text: "Lokalita"                                                 # ❌
      href: "#lokalita"                                                # ❌
    - text: "Kontakt"                                                  # ❌
      href: "#kontakt"                                                 # ❌

contact_section:
  heading: "Kontakt"                                                    # ❌

copyright: "© {currentYear} Chalupa na Fryšavě. Všechna práva..."      # ❌
```

---

### 11. Parallax Divider (ParallaxDivider.astro)

#### Hardcoded:
```yaml
background_image: "/images/large/chalupa-frysava-pod-zakovou-horou..."  # ❌
quote: "Večer světlo kostela, ráno zpěv ptáků."                         # ❌
```

---

## 🔧 DOPORUČENÍ K NÁPRAVĚ

### Priorita 1: KRITICKÉ (UI Labels & Texty)

Vytvořit nové CMS sekce pro UI texty:

#### 1. `ui_labels.yaml` - Globální UI texty
```yaml
hero:
  cta_primary: "Poptat termín"
  cta_secondary: "Více informací"

stats_labels:
  rooms: "pokojů"
  capacity: "osob"
  rating: "hodnocení"

sections:
  about: "O chalupě"
  equipment: "Vybavení chalupy"
  gallery: "Galerie"
  location: "Lokalita a okolí"
  reviews: "Co říkají naši hosté"
  faq: "Často kladené dotazy"
  contact: "Kontakt a poptávka"

buttons:
  contact: "Kontaktovat nás"
  send_inquiry: "Odeslat poptávku"
  more_photos: "Více fotografií"
  create_memory: "Vytvořte si vlastní vzpomínku"
```

#### 2. Rozšíření `features.yaml`
Přidat hardcoded kategorii "Nadstandardní výbava" do CMS:
```yaml
categories:
  - name: "Nadstandardní výbava"
    icon: "star"
    items:
      - name: "Sauna pro 5 osob"
        available: true
        highlight: true
      - name: "Výčepní zařízení"
        available: true
        highlight: true
      - name: "3 koupelny"
        available: true
```

#### 3. Nový soubor `contact_form.yaml`
```yaml
heading: "Kontakt a poptávka"
subtitle: "Vyplňte formulář nebo nás kontaktujte přímo"

sections:
  contact_info:
    heading: "Kontaktní údaje"
    labels:
      email: "Email"
      phone: "Telefon"
      address: "Adresa"

  reaction_time:
    heading: "Reakční doba"
    text: "Na vaše dotazy odpovídáme obvykle do 24 hodin..."

form_fields:
  name:
    label: "Jméno a příjmení"
    required: true
  email:
    label: "Email"
    required: true
  phone:
    label: "Telefon"
    required: false
  arrival:
    label: "Příjezd"
    required: false
  departure:
    label: "Odjezd"
    required: false
  adults:
    label: "Počet dospělých"
    required: false
  children:
    label: "Počet dětí"
    required: false
  pet:
    label: "Berete si mazlíčka?"
    required: false
    options:
      - "Ne"
      - "Ano (jeden)"
      - "Ano (více)"
  message:
    label: "Zpráva"
    required: false
  gdpr:
    text: "Souhlasím se zpracováním osobních údajů pro účely této poptávky."
    required: true

button_text: "Odeslat poptávku"
required_note: "* Povinné pole"

messages:
  success: "✓ Děkujeme! Vaše poptávka byla úspěšně odeslána. Budeme vás kontaktovat co nejdříve."
  error: "✗ Omlouváme se, při odesílání formuláře došlo k chybě. Prosím kontaktujte nás přímo emailem nebo telefonicky."
```

#### 4. Rozšíření `site.yaml`
```yaml
footer:
  quick_links_heading: "Rychlé odkazy"
  contact_heading: "Kontakt"
  copyright_template: "© {year} Chalupa na Fryšavě. Všechna práva vyhrazena."

parallax_divider:
  image: "/images/large/chalupa-frysava-pod-zakovou-horou-8dac-570472.webp"
  quote: "Večer světlo kostela, ráno zpěv ptáků."
```

### Priorita 2: Gallery Management

Přidat do CMS konfiguraci galerie místo filesystemu:

```yaml
# gallery.yaml
images:
  - path: "/images/large/..."
    alt: "Venkovní pohled na chalupu"
    category: "exterior"
    order: 1
  - path: "/images/large/..."
    alt: "Obývací pokoj s krbem"
    category: "interior"
    order: 2

settings:
  heading: "Galerie"
  subtitle: "Prohlédněte si fotografie chalupy"
  button_text: "Více fotografií"
  lightbox_labels:
    close: "Zavřít galerii"
    previous: "Předchozí fotografie"
    next: "Další fotografie"
```

---

## 📝 IMPLEMENTAČNÍ PLÁN

### Fáze 1: UI Labels (Priorita 1)
1. Vytvořit `ui_labels.yaml` s globálními texty
2. Aktualizovat všechny komponenty aby používaly texty z YAML
3. Přidat do CMS konfigurace nový file widget pro ui_labels

### Fáze 2: Contact Form (Priorita 1)
1. Vytvořit `contact_form.yaml`
2. Refaktorovat ContactForm.astro
3. Přidat do CMS konfigurace

### Fáze 3: Equipment Enhancement
1. Přidat "Nadstandardní výbava" do features.yaml
2. Aktualizovat EquipmentSection.astro

### Fáze 4: Gallery Management (Priorita 2)
1. Vytvořit gallery.yaml
2. Refaktorovat Gallery.astro
3. Přidat do CMS konfigurace

### Fáze 5: Footer & Parallax
1. Přidat footer a parallax data do site.yaml
2. Refaktorovat Footer.astro a ParallaxDivider.astro

---

## 📈 VÝSLEDEK PO IMPLEMENTACI

**PŘED:** 55% CMS coverage
**PO:** 95%+ CMS coverage ✅

Zbyde pouze:
- Strukturální HTML/CSS
- JavaScript logika
- Aria-labels (což je OK - ty lze nechat hardcoded pro konzistenci)
- SVG ikony (lze zvážit přesun do assets)

---

## 🎯 ZÁVĚR

Homepage má **~45% hardcoded obsahu**, což brání plné editovatelnosti.

**Hlavní problémy:**
1. **ContactForm** - 100% hardcoded (všechny labely, messages, GDPR text)
2. **Footer** - Quick links jsou hardcoded
3. **Všechny UI nadpisy** - hardcoded v každé komponentě
4. **Gallery** - načítá z filesystemu, ne z CMS
5. **Equipment** - jedna kategorie hardcoded

**Doporučení:** Implementovat změny z Priority 1 pro dosažení 95%+ CMS coverage.
