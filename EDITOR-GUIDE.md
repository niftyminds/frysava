# Průvodce editací obsahu - Chalupa na Fryšavě

Tento dokument vysvětluje, jak snadno upravovat obsah webu bez znalosti programování.

## 🎨 Přístup k editoru (Netlify CMS)

Po nasazení webu na Netlify budete moci upravovat obsah přímo v prohlížeči:

1. Přejděte na: **https://vase-domena.netlify.app/admin**
2. Přihlaste se pomocí Netlify Identity
3. Otevře se grafický editor, kde můžete jednoduše měnit texty, ceny a další obsah

## 📁 Alternativa: Ruční editace YAML souborů

Pokud preferujete editaci souborů přímo, všechen obsah je v těchto souborech:

### Umístění souborů
```
src/data/
├── site.yaml       # Základní informace, kontakty
├── pricing.yaml    # Ceník, poplatky, stornopodmínky
├── features.yaml   # Vybavení chalupy
├── rooms.yaml      # Pokoje a kapacity
├── gallery.yaml    # Kategorizace fotografií
├── calendar.yaml   # Kalendář obsazenosti
└── about.yaml      # Popis, historie, lokalita
```

---

## 📝 Jak editovat jednotlivé sekce

### 1. Základní informace (`site.yaml`)

**Co zde upravíte:**
- Název chalupy
- Slogan
- Kontaktní email a telefon
- Rychlé benefity (ikonky na homepage)

**Příklad úpravy:**
```yaml
contact:
  email: "info@chalupa-frysava.cz"  # Změňte na váš email
  phone: "+420 777 123 456"          # Změňte na vaše číslo
```

---

### 2. Ceník (`pricing.yaml`)

**Co zde upravíte:**
- Ceny za sezóny
- Dodatečné poplatky
- Check-in/check-out časy
- Stornopodmínky

**Příklad úpravy ceny:**
```yaml
seasons:
  - name: "Letní sezóna"
    period: "15.6 - 15.10"
    price_per_person: 750    # Změňte číslo
    currency: "Kč"
```

**Příklad přidání poplatku:**
```yaml
fees:
  - name: "Nový poplatek"
    price: 500
    unit: "jednorázově"
    mandatory: false
```

---

### 3. Kalendář obsazenosti (`calendar.yaml`)

**Co zde upravíte:**
- Obsazené termíny
- Rezervace
- Google Calendar link (pokud ho máte)

**Přidání obsazeného termínu:**
```yaml
occupied_dates:
  - from: "2026-07-01"
    to: "2026-07-15"
    status: "obsazeno"           # nebo "rezervace" nebo "volno"
    note: "Letní dovolená"
```

**Napojení Google kalendáře:**
```yaml
google_calendar_embed: "https://calendar.google.com/calendar/embed?src=..."
```

---

### 4. Vybavení (`features.yaml`)

**Co zde upravíte:**
- Seznam vybavení chalupy
- Přidání nových položek

**Příklad přidání položky:**
```yaml
categories:
  - name: "Kuchyně"
    icon: "🍳"
    items:
      - name: "Nová položka"  # Přidejte sem
        available: true
        highlight: false      # true = zvýrazněno
```

---

### 5. O chalupě (`about.yaml`)

**Co zde upravíte:**
- Hlavní popis
- Historii
- Speciální nabídky

**Příklad:**
```yaml
description: |
  Zde můžete napsat delší popis chalupy.
  Můžete použít více řádků.

special_offers:
  - "Nová nabídka"  # Přidejte řádek
```

---

## 🖼️ Jak přidat nové fotografie

### Přes Netlify CMS (doporučeno):
1. Přejděte do `/admin`
2. V sekci "Media" nahrajte nové fotky
3. Fotky se automaticky optimalizují

### Manuálně:
1. Nahrajte originální fotky do `public/images/original/`
2. Spusťte optimalizační script:
   ```bash
   node scripts/optimize-images.js
   ```
3. Fotky budou automaticky zpracovány do 3 velikostí (thumbnail, medium, large)

---

## 🚀 Publikování změn

### Přes Netlify CMS:
- Klikněte na "Publish" v editoru
- Změny se automaticky nahrají a web se aktualizuje

### Manuálně (pokud editujete soubory):
1. Uložte změny v souborech
2. Git commit:
   ```bash
   git add .
   git commit -m "Aktualizace ceníku"
   git push
   ```
3. Netlify automaticky nasadí novou verzi

---

## ⚙️ Nastavení Formspree (kontaktní formulář)

1. Zaregistrujte se na [Formspree.io](https://formspree.io/)
2. Vytvořte nový formulář
3. Zkopírujte "Form Endpoint" (např. `https://formspree.io/f/abc123`)
4. Upravte `src/components/ContactForm.astro`, řádek 9:
   ```javascript
   const formspreeEndpoint = "https://formspree.io/f/VASE_ID"; // Nahraďte
   ```

---

## 🆘 Časté problémy

### Web se nenačte po změně
- Zkontrolujte syntaxi YAML (odsazení, dvojtečky)
- Použijte YAML validator: https://www.yamllint.com/

### Fotky jsou rozmazané
- Nahrajte vyšší kvalitu originálních fotek
- Minimální doporučené rozlišení: 1920x1080px

### Kalendář nezobrazuje termíny
- Zkontrolujte formát data: `YYYY-MM-DD` (např. `2026-07-15`)
- Ověřte, že `from` je dříve než `to`

---

## 📞 Potřebujete pomoc?

Pro technickou podporu kontaktujte:
- GitHub Issues: [Vytvořit issue](https://github.com/...)
- Email: support@... (TODO: doplnit)

---

## 📚 Další zdroje

- [YAML Syntax Guide](https://yaml.org/spec/1.2/spec.html)
- [Netlify CMS Dokumentace](https://www.netlifycms.org/docs/)
- [Formspree Dokumentace](https://help.formspree.io/)
