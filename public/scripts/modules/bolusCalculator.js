window.onload = () => {
    document.querySelectorAll("input").forEach(input => input.value = "");
};

 //Daten übernehmen aus der Form
        const keInput = document.getElementById('ke');
        const blutzuckerInput = document.getElementById('blutzuckerwert');


 function calculate() {
        const numberRegex = /^[0-9]+(\.[0-9]+)?$/;
         //Daten aus der Datenbank erhalten
        const zielblutzucker = parseFloat(document.getElementById('zielblutzucker').textContent);
        const keFaktor = parseFloat(document.getElementById('ke-faktor').textContent);
        const korrektufaktor = parseFloat(document.getElementById('korrekturfaktor').textContent);
        const ergebnis =   parseFloat(document.getElementById('showing-result-bolusrechner').textContent);
         const ke = parseFloat(keInput.value);
         const blutzucker = parseFloat(blutzuckerInput.value);
         const insulinbedarf = ke * keFaktor + ((blutzucker - zielblutzucker) / korrektufaktor);
 
         if (isNaN(insulinbedarf) || !numberRegex.test(ke) || !numberRegex.test(blutzucker)) {
            document.getElementById('showing-result-bolusrechner').textContent = 0;
         }
         else {
            document.getElementById('showing-result-bolusrechner')
            .textContent = insulinbedarf.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
         }
     }
    
     //Bei Eingabe der Inputfelder wird automatisch die Funktion aufgerufen
 [keInput, blutzuckerInput].forEach(input => {
     input.addEventListener("input", calculate);
 });
