<?php
/**
 * Lumio Agency — obsługa formularza "Bezpłatny audyt".
 * Działa na hostingu cyber_Folks (PHP mail()). Zwraca JSON.
 * Adres odbiorcy zmienisz w $TO.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

$TO   = 'anna@lumioagency.pl';
$FROM = 'formularz@lumioagency.pl'; // skrzynka w domenie = lepsza dostarczalność

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot – boty wypełniają ukryte pole
if (!empty($_POST['company_site'] ?? '')) {
    echo json_encode(['ok' => true]);
    exit;
}

// Prosty limit: 1 zgłoszenie / 30 s z jednego IP
session_start();
if (isset($_SESSION['last']) && time() - $_SESSION['last'] < 30) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Za szybko, spróbuj za chwilę.']);
    exit;
}

$clean = static fn(string $k, int $max = 500): string =>
    trim(mb_substr(str_replace(["\r", "\n"], ' ', strip_tags((string)($_POST[$k] ?? ''))), 0, $max));

$name     = $clean('name', 120);
$email    = filter_var($clean('email', 160), FILTER_VALIDATE_EMAIL) ?: '';
$website  = $clean('website', 200);
$budget   = $clean('budget', 60);
$message  = trim(mb_substr(strip_tags((string)($_POST['message'] ?? '')), 0, 3000));
$channels = array_map(static fn($v) => mb_substr(strip_tags((string)$v), 0, 40), (array)($_POST['channels'] ?? []));

if ($name === '' || $email === '' || $website === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Uzupełnij imię, e-mail i adres strony.']);
    exit;
}

$subject = '=?UTF-8?B?' . base64_encode("Nowe zgłoszenie na audyt: $website") . '?=';
$body = "Nowe zgłoszenie z lumioagency.pl\n\n"
      . "Imię: $name\nE-mail: $email\nStrona: $website\n"
      . "Kanały: " . (implode(', ', $channels) ?: '—') . "\n"
      . "Miesięczny budżet reklamowy: " . ($budget ?: '—') . "\n\n"
      . "Wiadomość:\n" . ($message ?: '—') . "\n\n"
      . "---\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? '') . "\nData: " . date('Y-m-d H:i');

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Lumio Agency <' . $FROM . '>',
    'Reply-To: ' . $email,
];

$sent = mail($TO, $subject, $body, implode("\r\n", $headers), '-f' . $FROM);
$_SESSION['last'] = time();

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Serwer nie wysłał wiadomości.']);
    exit;
}
echo json_encode(['ok' => true]);
