# Lumio Agency – lumioagency.pl

Strona Lumio Agency. Na razie: tryb „strona w budowie”.

## Co tu jest

| Plik | Po co |
|---|---|
| `index.html` | Strona „w budowie” – logo 1A z Figmy (węzeł 1:2) + wąż (węzeł 10:2), bez zewnętrznych fontów i skryptów |
| `assets/lumio-white.svg` | Wordmark „lumio” w wersji pełnej – zapas na małe rozmiary (< 240 px) |
| `assets/favicon.svg` | Favicon |
| `.htaccess` | Kod 503 + `Retry-After` dla wszystkich adresów, HTTPS, przekierowanie z www, `noindex` |
| `robots.txt` | Blokada indeksowania na czas budowy |
| `.github/workflows/deploy.yml` | Automatyczny deploy na cyber_Folks przez FTPS po pushu na `main` |

Brand: [Figma – Lumio, poprawki wordmarku](https://www.figma.com/design/dyOjRZTNNOV2nCWVQk7ivS/Lumio-%E2%80%93-poprawki-wordmarku)
Kolory: czerń `#000` / `#040404`, zieleń `#36E092`, ciemny `#1D1D1B`.

## Wdrożenie na cyber_Folks

### Ręcznie (raz)
1. Panel cyber_Folks → **Menedżer plików** → `domains/lumioagency.pl/public_html/`.
2. Usuń lub przenieś domyślny `index.html`/`index.php` od hostingu.
3. Wgraj `index.html`, `.htaccess`, `robots.txt` i folder `assets/`.

### Automatycznie z GitHuba
1. Panel cyber_Folks → **Konta FTP** → utwórz konto z dostępem do `domains/lumioagency.pl/public_html`.
2. GitHub → repo → **Settings → Secrets and variables → Actions** → dodaj:
   `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
3. Każdy push na `main` sam wrzuca pliki. Ręcznie: zakładka **Actions → Deploy → Run workflow**.

> Jeśli ścieżka na serwerze jest inna, popraw `server-dir` w `deploy.yml`.
> Gdy FTP-login ma od razu katalog `public_html` jako główny, ustaw `server-dir: ./`.

## Wyłączenie trybu „w budowie”
Usuń reguły 503 z `.htaccess`, nagłówek `X-Robots-Tag`, plik `robots.txt` i `<meta name="robots">` z `index.html`.
