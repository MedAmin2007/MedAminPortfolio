# Mohamed Amin — Engineering Portfolio (plain HTML, CSS, JavaScript)

No framework and no build step. Open `index.html` in a browser, or copy the folder into XAMPP's `htdocs`.

## Information architecture

Home → About (knowledge map) → Education (years + semester modules) → Cybersecurity → Networks →
Embedded/IoT → Projects → Skills → Roadmap → Cyber lab → Achievements → Future goals → Contact.
The visitor reads it as: who I am → what I study → what I am learning → what I build → what I want to become.

## Design system

- Colours: charcoal/navy background, white text, cyan accent; green only for terminal details.
- Type: Inter Tight (text) and JetBrains Mono (labels, terminal).
- Mobile first: horizontally scrollable nav and tab rows, vertical flow diagrams, 44px touch targets.
- Motion: scroll reveal, terminal typing, animated topology links. All disabled with `prefers-reduced-motion`.

## Files

```
index.html       semantic structure, SEO and Open Graph tags
css/styles.css   tokens, layout, components
js/data.js       ALL content: profile, modules, projects, skills, roadmap
js/main.js       rendering (text only, no innerHTML), tabs, filter, topology, form validation
```

## Make it yours

1. `js/data.js` → `profile`: replace the **[PLACEHOLDER]** email, GitHub and LinkedIn.
2. `js/data.js` → `projects`: replace the entries marked `example: true` with real projects.
3. `js/data.js` → `skills`: raise a level only when you have evidence (a project, a certificate).
4. Add an Open Graph image: put `og.png` here and add `<meta property="og:image" content="og.png">`.

## Contact form

There is no server. After validation the form opens the visitor's email app (`mailto:`) with the message.
Until you set a real email in `data.js`, the form runs in demo mode and sends nothing.

## Notes

- The brief lists six semesters but four academic years (2026–2030). Both are shown as given; adjust `years` and `semesters` if needed.
- Nothing is claimed beyond evidence: skill levels are conservative, projects are labelled, achievements say "Coming soon".
