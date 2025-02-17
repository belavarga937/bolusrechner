const userAgent = navigator.userAgent.toLowerCase();

if (/mobile/i.test(userAgent) && !/tablet/i.test(userAgent)) {
    console.log("Mobilgerät erkannt");
} else {
    console.log("Kein Mobilgerät erkannt");
    // Hier kannst du deine Wartungsseite oder andere Logik für Desktops einfügen
    window.location.href = "/../../view/maintenance.html"; // Beispiel: Weiterleitung auf Wartungsseite
}