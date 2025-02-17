//Wir programmieren in diesem Abschnitt die Logik des Bolusrechners

//Daten aus der Datenbank bekommen
async function fetchData(meal) {

        document.querySelectorAll("input").forEach(input => input.value = "");
    
    const targetBloodSugar = document.getElementById('zielblutzucker');
    const carbFactor = document.getElementById('ke-faktor');
    const correctionFactor = document.getElementById('korrekturfaktor');
    const mealTime = document.getElementById('selcting-time');

    try {
        const response = await fetch('/settings/data', {
            method: "GET"
        });
        const result = await response.json();

        if (response.ok) {
            console.log(result.message);
            targetBloodSugar.textContent = result.meals?.[meal]?.targetBloodSugar ?? 'Keine Daten';
            carbFactor.textContent = result.meals?.[meal]?.carbFactor ?? 'Keine Daten';
            correctionFactor.textContent = result.meals?.[meal]?.correctionFactor ?? 'Keine Daten';

            switch (meal) {
                case "breakfast":
                    mealTime.textContent = "Frühstück";
                    break;
                case "lunch":
                    mealTime.textContent = "Mittagessen";
                    break;
                case "dinner": 
                    mealTime.textContent = "Abendessen";
                    break;
                case "night":
                    mealTime.textContent = "Nachts";
                    break;
            }

            zielBlutzuckerSave =  result.meals?.[meal]?.targetBloodSugar ?? 'Keine Daten';
            keFaktorSave =  result.meals?.[meal]?.targetBloodSugar ?? 'Keine Daten';
            korrekturFaktorSave = result.meals?.[meal]?.correctionFactor ?? 'Keine Daten';

            document.querySelector('.error_no_login').style.display = "none";

        }
        else {
            console.error('Fehler beim Abrufen der Daten ' + result.error);
            

            document.querySelector('.error_no_login').style.display = "flex";
            document.querySelector('.error_no_login').textContent = result.error;
        }
    }
    catch (err) {
        console.error("Serverfehler beim Abrufen der Daten: " + err);

        document.querySelector('.error_no_login').style.display = "flex";
        document.querySelector('.error_no_login').textContent = result.error;
    }

};


//gefetchte Daten anzeigen lassen
["breakfast", "lunch", "dinner", "night"].forEach( meal => {
   const mealButtons = document.querySelectorAll(`.button-${meal}`);
   mealButtons.forEach(button => {
    button.addEventListener("click", () => {
        fetchData(meal)});
});
});

