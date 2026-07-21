<?php
// Kontaktformular – Versand authentifiziert über den Strato-Mailserver (SMTP).
// Zuverlässige Zustellung (auch an web.de/GMX/Gmail), kein Fremd-Dienstleister.

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

// --- SMTP-Konfiguration (Passwort liegt separat in mail-config.php, nicht im Code) ---
$cfg       = @include __DIR__ . '/mail-config.php';
$SMTP_HOST = 'smtp.strato.de';
$SMTP_PORT = 465; // SSL
$SMTP_USER = 'mail@physio-martinkrebber.de'; // Postfach = Absenderadresse
$SMTP_PASS = (is_array($cfg) && isset($cfg['smtp_pass'])) ? $cfg['smtp_pass'] : '';
$TO        = 'mail@physio-martinkrebber.de'; // Anfragen landen hier

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
$honey   = trim($_POST['website'] ?? ''); // Honeypot

// Spam-Schutz
if ($honey !== '') { echo json_encode(['ok' => true]); exit; }

// Validierung
$errors = [];
if ($name === '')                               $errors[] = 'Bitte gib deinen Namen an.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Bitte gib eine gültige E-Mail-Adresse an.';
if ($message === '')                            $errors[] = 'Bitte schreib eine kurze Nachricht.';
if (mb_strlen($message) > 5000)                 $errors[] = 'Die Nachricht ist zu lang.';
if (!$consent)                                  $errors[] = 'Bitte bestätige die Einwilligung.';
if (preg_match('/[\r\n]/', $name . $email))     $errors[] = 'Ungültige Eingabe.';
if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]);
    exit;
}

if ($SMTP_PASS === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Server nicht konfiguriert. Bitte schreib direkt an mail@physio-martinkrebber.de oder ruf an.']);
    exit;
}

function krebberMailer($host, $port, $user, $pass) {
    $m = new PHPMailer(true);
    $m->isSMTP();
    $m->Host       = $host;
    $m->SMTPAuth   = true;
    $m->Username   = $user;
    $m->Password   = $pass;
    $m->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Port 465
    $m->Port       = $port;
    $m->CharSet    = 'UTF-8';
    return $m;
}

try {
    // 1) Anfrage an die Praxis
    $m = krebberMailer($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS);
    $m->setFrom($SMTP_USER, 'Website Physiotherapie Krebber');
    $m->addAddress($TO);
    $m->addReplyTo($email, $name);
    $m->Subject = 'Neue Nachricht über die Website';
    $m->Body    = "Neue Nachricht über das Kontaktformular auf physio-martinkrebber.de:\n\n"
                . "Name:   $name\n"
                . "E-Mail: $email\n\n"
                . "Nachricht:\n$message\n\n"
                . "--\nGesendet: " . date('d.m.Y H:i');
    $m->send();

    // 2) Eingangsbestätigung an die absendende Person (optional – Anfrage ist schon raus)
    try {
        $c = krebberMailer($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS);
        $c->setFrom($SMTP_USER, 'Physiotherapie Martin Krebber');
        $c->addAddress($email, $name);
        $c->addReplyTo($SMTP_USER, 'Physiotherapie Martin Krebber');
        $c->Subject = 'Wir haben deine Nachricht erhalten – Physiotherapie Martin Krebber';
        $c->Body    = "Hallo $name,\n\n"
                    . "vielen Dank für deine Nachricht – sie ist bei mir angekommen. Ich melde mich so schnell wie möglich bei dir zurück.\n\n"
                    . "Deine Nachricht:\n$message\n\n"
                    . "Falls es dringend ist, erreichst du mich auch telefonisch oder per WhatsApp unter 0171 2395857. Auf diese E-Mail kannst du gern antworten.\n\n"
                    . "Herzliche Grüße\nMartin Krebber\nPhysiotherapie Martin Krebber – Privatpraxis\nDeckerstraße 39, 70372 Stuttgart-Bad Cannstatt\nhttps://physio-martinkrebber.de";
        $c->send();
    } catch (Exception $e) {
        // Bestätigung optional – ignorieren, wenn sie mal nicht rausgeht
    }

    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Der Versand hat nicht geklappt. Bitte schreib direkt an mail@physio-martinkrebber.de oder ruf an.']);
}
