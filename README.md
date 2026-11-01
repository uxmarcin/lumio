# Lumio Agency – lumioagency.pl

Strona Lumio Agency: kampanie Google Ads i Meta Ads prowadzone osobiście przez Annę.

| Gałąź | Co jest |
|---|---|
| `main` | Strona „w budowie” (to, co jest teraz na serwerze) |
| `nowa-strona` | Nowa strona sprzedażowa – **do uzupełnienia przed publikacją** |

## Struktura (gałąź `nowa-strona`)

| Plik | Po co |
|---|---|
| `index.html` | Strona główna (one-page) |
| `assets/css/style.css` | Design system: rytm WaysConf + brand Lumio (zieleń `#36E092`, wąż z Figmy węzeł 10:2) |
| `assets/js/main.js` | Delikatne efekty: wejście sekcji, wąż rysowany przy scrollu, poświata kart, menu mobilne, wysyłka formularza |
| `assets/fonts/Geist-Variable.woff2` | Font Geist (licencja OFL), hostowany lokalnie – bez Google Fonts, bezpiecznie pod RODO |
| `audyt.php` | Obsługa formularza „Bezpłatny audyt” – wysyła e-mail na anna@lumioagency.pl |
| `polityka-prywatnosci.html` | Szablon polityki prywatności (do uzupełnienia) |
| `w-budowie.html` | Stara strona tymczasowa |
| `.htaccess`, `robots.txt`, `sitemap.xml` | Wersja produkcyjna: HTTPS, bez www, cache, indeksowanie włączone |

## Do uzupełnienia przed publikacją

Szukaj w `index.html` tekstów w `[nawiasach]` i komentarzy `<!-- Wstaw … -->`.

1. **Logo marek** – pliki do `assets/logos/`, w sekcji „Marki, z którymi pracowałam” zamień `<div class="logo-slot">Logo marki</div>` na `<div class="logo-slot"><img src="assets/logos/marka.svg" alt="Marka"></div>` (w obu zestawach).
2. **Wyniki** – 3 case studies: liczba, co mierzy, budżet, okres, kanał, 1–2 zdania. Tylko prawdziwe dane.
3. **Opinie** – prawdziwe, z imieniem i firmą. Nie publikuj wymyślonych.
4. **O mnie** – zdjęcie (`assets/anna.jpg`) i 2–3 zdania o doświadczeniu; certyfikaty Google Ads / Meta Blueprint.
5. **Cennik** – kwoty to propozycja oparta na researchu rynku PL (XI 2026). Dopasuj.
6. **Stopka** – telefon, NIP, linki do LinkedIn/Instagram.
7. **Polityka prywatności** – dane firmy.
8. **Formularz** – załóż w panelu cyber_Folks skrzynkę `formularz@lumioagency.pl` (nadawca maili z formularza) i wyślij testowe zgłoszenie.

## Publikacja

Scal `nowa-strona` do `main` (Pull request na GitHubie). Jeśli ustawione są sekrety FTP, deploy pójdzie sam;
inaczej wgraj pliki ręcznie do `domains/lumioagency.pl/public_html/` (razem z `.htaccess`).

Brand: [Figma – Lumio, poprawki wordmarku](https://www.figma.com/design/dyOjRZTNNOV2nCWVQk7ivS/Lumio-%E2%80%93-poprawki-wordmarku)
