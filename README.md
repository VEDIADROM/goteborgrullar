# #Göteborgrullar

En mycket lean, statisk landningssida för en månadslång organisk kampanj i och runt Göteborg.

#Göteborgrullar är ett oberoende initiativ. Det här är inte officiell kommunikation från Volvo Cars eller AB Volvo. Hashtagen #Göteborgrullar används som öppet diskussionsspår.

Kärnbudskap: "Bakom varje rubrik finns människor som får saker att fungera."

Hashtag: `#Göteborgrullar`

## Stack

- Vite
- React
- Tailwind CSS
- Statisk JSON för kuraterade inlägg
- Ingen backend, databas eller plattforms-API krävs

## Kör lokalt

Installera beroenden:

```bash
npm install
```

Starta dev-servern:

```bash
npm run dev
```

Vite visar lokal URL i terminalen, vanligtvis `http://localhost:5173`.

Bygg produktion:

```bash
npm run build
```

Kör release-kontroller:

```bash
npm run verify:release
```

Förhandsgranska byggd version:

```bash
npm run preview
```

## Redigera copy

All redigerbar kampanjtext ligger i:

```text
src/content.js
```

Ändra rubriker, brödtext, exempelposter, CTA-texter och footer där. Komponenterna ska i normalfallet inte behöva ändras för copyjusteringar.

SEO och delningsmetadata ligger i:

```text
index.html
```

## Lägg till inlägg i Live Feed

Live Feed läser från:

```text
data/posts.json
```

Lägg nyaste inlägg högst upp i listan:

```json
{
  "platform": "linkedin",
  "author": "Example Name",
  "role": "Software / diagnostics",
  "text": "Jag rullar för Volvo genom att omprogrammera styrenheter i helgen.",
  "image": "/images/example-1.jpg",
  "avatar": "/images/example-profile.jpg",
  "url": "https://example.com"
}
```

Fält:

| Fält | Obligatoriskt | Beskrivning |
| --- | --- | --- |
| `platform` | Ja | `linkedin`, `instagram`, `x` eller `twitter` |
| `author` | Ja | Namnet som ska visas på kortet |
| `role` | Nej | Roll, plats eller sammanhang |
| `text` | Ja | Kort utdrag från inlägget |
| `image` | Nej | Sökväg till bild i `public/images/`, till exempel `/images/example-1.jpg` |
| `avatar` | Nej | Profilbild från personens sociala media, sparad eller länkad med godkännande |
| `url` | Ja | Länk till originalinlägget |

Om `data/posts.json` är en tom lista (`[]`) visas ett tomt feed-läge med uppmaning att posta med `#Göteborgrullar`.

## Lägg till bilder

Lägg feed-bilder i:

```text
public/images/
```

Referera dem i `data/posts.json` som:

```text
/images/filnamn.jpg
```

Tips:

- Använd egna eller godkända bilder från verkliga personer och miljöer.
- Profilbilder bör bara användas när personen själv har postat offentligt eller gett okej till att kurateras.
- Undvik stockkänsla, logotyper och officiella varumärkeselement.
- Komprimera gärna bilder till cirka 1200 px breda JPG eller WebP.

Open Graph-bilden ligger som placeholder här:

```text
public/images/og-placeholder.jpg
```

Byt ut den mot en egen 1200 x 630-bild inför publicering.

Toppbannerns bakgrundsbild ligger här:

```text
public/images/context-background.jpg
```

Den är hämtad från Pexels som en fri bild från Göteborg: "Industrial Architecture at Twilight in Gothenburg" av Pasi Mämmelä. Attribution krävs inte enligt Pexels licens, men källan är dokumenterad här för spårbarhet.

Slut-CTA:ns bakgrundsbild ligger här:

```text
public/images/final-cta-background.jpg
```

Den är hämtad från Unsplash: "a group of people walking through a city" i Haga, Göteborg av Hans Ott. Bilden är fri att använda under Unsplash License. Attribution krävs inte, men källan är dokumenterad här för spårbarhet.

## Deploy till Vercel

1. Pusha repot till GitHub.
2. Importera projektet i Vercel.
3. Använd standardinställningar för Vite.
4. Build command: `npm run build`
5. Output directory: `dist`

## Deploy till Netlify

1. Pusha repot till GitHub.
2. Skapa en ny site från repot.
3. Build command: `npm run build`
4. Publish directory: `dist`

## Inför GitHub

- Commita inte `node_modules/`, `dist/`, `.env*` eller lokala Playwright-screenshots.
- Kör `npm run verify:release` och `npm run build` innan du pushar större ändringar.
- `data/posts.json` importeras vid build. När du lägger till eller ändrar poster behöver sidan byggas och deployas igen.
- Byt demo-länkar i `data/posts.json` mot riktiga inläggslänkar innan lansering.
- Kontrollera samtycke för riktiga bilder och profilbilder innan de publiceras.

## Sociala medier och API:er

MVP-lösningen är manuell kuratering via `data/posts.json`. Det är medvetet valt för att sidan ska vara enkel, billig, snabb och förenlig med plattformarnas villkor.

Möjliga framtida integrationer:

- Instagram Graph API kan vara möjligt för Business/Creator-konton med appgranskning och godkända behörigheter.
- LinkedIn erbjuder normalt inte ett öppet hashtag-flöde för tredjepartssidor, så manuell kuratering är den praktiska vägen.
- X/Twitter API kan vara möjligt, men är ofta betalt och begränsat.

Använd inte obehörig scraping av LinkedIn, Instagram eller X/Twitter. Det kan bryta mot deras användarvillkor och riskerar både konton och kampanjens trovärdighet.

## Filstruktur

```text
.
├── data/
│   └── posts.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
├── src/
│   ├── App.jsx
│   ├── content.js
│   ├── index.css
│   ├── main.jsx
│   └── components/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Produktionscheck

- Byt exempelposter mot kuraterade riktiga inlägg.
- Byt placeholderbilder mot godkända kampanjbilder.
- Byt deltagar-exempelbilderna i `public/images/participation-*.jpg` mot riktiga bilder: selfie, kvinna i produktion och händer som kodar på dator.
- Uppdatera `public/images/og-placeholder.jpg` inför skarp delning.
- Kör `npm run build` innan deploy.
