<?php
// Kontaktformular-Verarbeitung – sendet direkt an das Praxis-Postfach.
// Kein Fremd-Dienstleister: Daten laufen nur über den eigenen (Strato-)Server.

header('Content-Type: application/json; charset=utf-8');

// Nur POST zulassen
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Methode nicht erlaubt.']);
    exit;
}

// Eingaben
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['msg']     ?? '');
$consent = isset($_POST['consent']);
$honey   = trim($_POST['website'] ?? ''); // Honeypot: muss leer sein

// Spam-Schutz: gefüllter Honeypot => Bot. So tun, als ob ok, aber nichts senden.
if ($honey !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

// Validierung
$errors = [];
if ($name === '')                                   $errors[] = 'Bitte gib deinen Namen an.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))     $errors[] = 'Bitte gib eine gültige E-Mail-Adresse an.';
if ($message === '')                                $errors[] = 'Bitte schreib eine kurze Nachricht.';
if (mb_strlen($message) > 5000)                     $errors[] = 'Die Nachricht ist zu lang.';
if (!$consent)                                      $errors[] = 'Bitte bestätige die Einwilligung.';

// Header-Injection verhindern (keine Zeilenumbrüche in Name/E-Mail)
if (preg_match('/[\r\n]/', $name . $email))         $errors[] = 'Ungültige Eingabe.';

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// Mail zusammenstellen
$to      = 'mail@physio-martinkrebber.de';
$from    = 'mail@physio-martinkrebber.de'; // Absender = Domain-Adresse (bessere Zustellung)
$subject = 'Neue Nachricht über die Website';

$bodyLines = [
    'Neue Nachricht über das Kontaktformular auf physio-martinkrebber.de:',
    '',
    'Name:   ' . $name,
    'E-Mail: ' . $email,
    '',
    'Nachricht:',
    $message,
    '',
    '--',
    'Gesendet: ' . date('d.m.Y H:i'),
];
$body = implode("\r\n", $bodyLines);

$headers = [
    'From: Website Physiotherapie Krebber <' . $from . '>',
    'Reply-To: ' . $email, // Antwort geht direkt an die absendende Person
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
];

// Betreff UTF-8-kodieren
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail($to, $encodedSubject, $body, implode("\r\n", $headers));

if ($sent) {
    // Eingangsbestätigung (Autoresponder) an die absendende Person
    $confSubject = 'Wir haben deine Nachricht erhalten – Physiotherapie Martin Krebber';
    $confLines = [
        'Hallo ' . $name . ',',
        '',
        'vielen Dank für deine Nachricht – sie ist bei mir angekommen. Ich melde mich so schnell wie möglich bei dir zurück.',
        '',
        'Deine Nachricht:',
        $message,
        '',
        'Falls es dringend ist, erreichst du mich auch telefonisch oder per WhatsApp unter 0171 2395857. Auf diese E-Mail kannst du gern antworten.',
        '',
        'Herzliche Grüße',
        'Martin Krebber',
        'Physiotherapie Martin Krebber – Privatpraxis',
        'Deckerstraße 39, 70372 Stuttgart-Bad Cannstatt',
        'https://physio-martinkrebber.de',
    ];
    $confBody = implode("\r\n", $confLines);
    $confHeaders = [
        'From: Physiotherapie Martin Krebber <' . $from . '>',
        'Reply-To: ' . $from,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'MIME-Version: 1.0',
    ];
    @mail($email, '=?UTF-8?B?' . base64_encode($confSubject) . '?=', $confBody, implode("\r\n", $confHeaders));

    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Der Versand hat nicht geklappt. Bitte schreib direkt an mail@physio-martinkrebber.de oder ruf an.']);
}
