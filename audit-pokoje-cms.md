# Audit CMS napojení - stránka /pokoje

**Datum auditu:** 2026-01-06
**Soubor:** `src/pages/pokoje.astro`
**Cíl:** Identifikovat veškerý obsah, který není napojen do CMS

---

## 📊 SOUHRNNÝ STAV

**Napojení do CMS:** ~40%
**Hardcoded obsah:** ~60%

---

## ✅ CO JE NAPOJENO DO CMS

### 1. Seznam pokojů (RoomCard komponenta)
- ✅ **Zdroj:** `rooms.yaml` → `rooms[]`
- **Obsah:**
  - Název pokoje
  - Typ pokoje
  - Kapacita
  - Patro
  - Popis
  - Galerie obrázků
  - Highlight flag

### 2. Statistiky kapacity
- ✅ **Zdroj:** `rooms.yaml` → `summary`
- **Obsah:**
  - `summary.total_rooms` - celkový počet pokojů
  - `summary.total_capacity` - celková kapacita
  - `summary.note` - poznámka o přistýlkách

### 3. Featured sekce (Galerie - Ráj pro děti)
- ✅ **Zdroj:** `rooms.yaml` → `featured_section`
- **Obsah:**
  - Badge text
  - Nadpis
  - Popis
  - Seznam vlastností (features)
  - Obrázek
  - Alt text obrázku

---

## ❌ CO NENÍ NAPOJENO DO CMS

### 1. Hero sekce (řádky 33-54)

#### Hardcoded obsah:
```yaml
hero:
  image: /images/large/exterier-chalupy-c9c9-570474.webp  # ❌
  image_alt: "Pokoje v chalupě na Fryšavě"                # ❌
  title: "Pokoje a ubytování"                             # ❌
  description_template: "{X} pokojů v 6 ložnicích..."     # ❌ (částečně)
```

**Problém:** Hero obrázek, alt text a nadpis jsou pevně zakódované.

---

### 2. Statistická sekce (řádky 57-122)

#### Hardcoded obsah:
```yaml
statistics:
  - label: "pokojů"        # ❌ HARDCODED (řádek 75)
  - label: "osob"          # ❌ HARDCODED (řádek 90)
  - label: "patra"         # ❌ HARDCODED (řádek 105)
    value: 3               # ❌ HARDCODED (řádek 103)
  - label: "přistýlek"     # ❌ HARDCODED (řádek 116)
    value: "+6"            # ❌ HARDCODED (řádek 115)
```

**Problém:**
- Všechny labely statistik jsou hardcoded
- Počet pater ("3") je hardcoded - měl by být dynamický nebo v CMS
- Počet přistýlek ("+6") je hardcoded - měl by být v `summary`

---

### 3. Filter tabs (řádky 137-169)

#### Hardcoded obsah:
```yaml
filter_labels:
  all: "Všechny"        # ❌ HARDCODED (řádek 144)
  ground: "Přízemí"     # ❌ HARDCODED (řádek 152)
  floor: "Patro"        # ❌ HARDCODED (řádek 160)
  attic: "Podkroví"     # ❌ HARDCODED (řádek 168)
```

**Problém:** Názvy filtrů jsou pevně zakódované v HTML.

---

### 4. Info Note sekce (řádky 234-254)

#### Hardcoded obsah:
```yaml
info_note:
  title: "Flexibilní kapacita"  # ❌ HARDCODED (řádek 245)
  # Poznámka: text je z summary.note ✅
```

**Problém:** Nadpis "Flexibilní kapacita" je hardcoded.

---

### 5. CTA sekce (řádky 257-274)

#### Hardcoded obsah:
```yaml
cta_section:
  title: "Máte zájem o ubytování?"                                      # ❌ HARDCODED (259-260)
  description: "Kontaktujte nás a domluvíme termín, který vám vyhovuje." # ❌ HARDCODED (262-263)
  buttons:
    - text: "Poptat termín"        # ❌ HARDCODED (266)
      link: "/#kontakt"            # ❌ HARDCODED (266)
    - text: "Zobrazit ceník"       # ❌ HARDCODED (270)
      link: "/cenik"               # ❌ HARDCODED (270)
```

**Problém:** Celá CTA sekce je kompletně hardcoded.

---

## 🔧 DOPORUČENÍ K NÁPRAVĚ

### Priorita 1: Kritický hardcoded obsah

1. **Hero sekce**
   - Přidat do `rooms.yaml`:
     ```yaml
     hero:
       title: "Pokoje a ubytování"
       image: /images/large/exterier-chalupy-c9c9-570474.webp
       image_alt: "Pokoje v chalupě na Fryšavě"
     ```

2. **CTA sekce**
   - Přidat do `rooms.yaml`:
     ```yaml
     cta:
       title: "Máte zájem o ubytování?"
       description: "Kontaktujte nás a domluvíme termín, který vám vyhovuje."
       buttons:
         - text: "Poptat termín"
           link: "/#kontakt"
         - text: "Zobrazit ceník"
           link: "/cenik"
     ```

### Priorita 2: Statistiky a labely

3. **Statistická sekce**
   - Přidat do `rooms.yaml` → `summary`:
     ```yaml
     summary:
       total_rooms: 6
       total_capacity: 20
       total_floors: 3              # PŘIDAT
       extra_beds: 6                # PŘIDAT
       note: "Možnost přistýlek..."
       labels:                      # PŘIDAT
         rooms: "pokojů"
         capacity: "osob"
         floors: "patra"
         extra_beds: "přistýlek"
     ```

4. **Filter labels**
   - Přidat do `rooms.yaml`:
     ```yaml
     filter_labels:
       all: "Všechny"
       ground_floor: "Přízemí"
       first_floor: "Patro"
       attic: "Podkroví"
     ```

### Priorita 3: Ostatní

5. **Info Note nadpis**
   - Přidat do `rooms.yaml` → `summary`:
     ```yaml
     summary:
       note_title: "Flexibilní kapacita"  # PŘIDAT
       note: "Možnost přistýlek..."
     ```

---

## 📝 IMPLEMENTAČNÍ PLÁN

### Krok 1: Rozšíření CMS konfigurace
Upravit `public/admin/config.yml` - sekce "Pokoje":

```yaml
- label: "Hero sekce"
  name: "hero"
  widget: "object"
  fields:
    - { label: "Nadpis", name: "title", widget: "string" }
    - { label: "Obrázek", name: "image", widget: "string" }
    - { label: "Alt text", name: "image_alt", widget: "string" }

- label: "Statistiky - labely"
  name: "stats_labels"
  widget: "object"
  fields:
    - { label: "Label: Pokoje", name: "rooms", widget: "string" }
    - { label: "Label: Kapacita", name: "capacity", widget: "string" }
    - { label: "Label: Patra", name: "floors", widget: "string" }
    - { label: "Label: Přistýlky", name: "extra_beds", widget: "string" }

- label: "Filter - labely"
  name: "filter_labels"
  widget: "object"
  fields:
    - { label: "Všechny", name: "all", widget: "string" }
    - { label: "Přízemí", name: "ground_floor", widget: "string" }
    - { label: "Patro", name: "first_floor", widget: "string" }
    - { label: "Podkroví", name: "attic", widget: "string" }

- label: "CTA sekce"
  name: "cta"
  widget: "object"
  fields:
    - { label: "Nadpis", name: "title", widget: "string" }
    - { label: "Popis", name: "description", widget: "text" }
    - label: "Tlačítka"
      name: "buttons"
      widget: "list"
      fields:
        - { label: "Text", name: "text", widget: "string" }
        - { label: "Link", name: "link", widget: "string" }
```

### Krok 2: Aktualizace rooms.yaml
Přidat všechna nová pole s aktuálními daty.

### Krok 3: Refaktoring pokoje.astro
Nahradit všechny hardcoded stringy proměnnými z YAML.

---

## 📈 VÝSLEDEK PO IMPLEMENTACI

Po dokončení všech kroků:
- **Napojení do CMS:** 100% ✅
- **Hardcoded obsah:** 0% ✅
- **Editovatelnost:** Veškerý text, obrázky a odkazy budou editovatelné přes CMS admin

---

## 🎯 ZÁVĚR

Stránka /pokoje má aktuálně **~60% hardcoded obsahu**, který brání plné editovatelnosti přes CMS.

**Hlavní problémy:**
1. Hero sekce - kompletně hardcoded
2. CTA sekce - kompletně hardcoded
3. Všechny UI labely a texty - hardcoded
4. Statistiky - částečně hardcoded

**Doporučení:** Implementovat všechny změny z Priority 1 a 2 pro dosažení 100% CMS coverage.
