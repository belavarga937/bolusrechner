//breakfast
const targetBloodSugarBreakfast = document.getElementById('targetBloodSugar-breakfast');
const carbFactorBreakfast = document.getElementById('carbFactor-breakfast');
const correctionFactorBreakfast = document.getElementById('correctionFactor-breakfast');

//lunch
const targetBloodSugarLunch = document.getElementById('targetBloodSugar-lunch');
const carbFactorLunch = document.getElementById('carbFactor-lunch');
const correctionFactorLunch = document.getElementById('correctionFactor-lunch');

//dinner
const targetBloodSugarDinner = document.getElementById('targetBloodSugar-dinner');
const carbFactorDinner = document.getElementById('carbFactor-dinner');
const correctionFactorDinner = document.getElementById('correctionFactor-dinner');

//night
const targetBloodSugarNight = document.getElementById('targetBloodSugar-night');
const carbFactorNight = document.getElementById('carbFactor-night');
const correctionFactorNight = document.getElementById('correctionFactor-night');

async function showingData() {
    try {
        const response = await fetch('/settings/data', {
            method: "GET"
        });

        const result = await response.json();

        if(response.ok) {
            console.log(result.message);
            targetBloodSugarBreakfast.value = result.meals?.breakfast?.targetBloodSugar ?? 'Keine Daten';
            carbFactorBreakfast.value = result.meals?.breakfast?.carbFactor ?? 'Keine Daten';
            correctionFactorBreakfast.value = result.meals?.breakfast?.correctionFactor ?? 'Keine Daten';

            targetBloodSugarLunch.value = result.meals?.lunch?.targetBloodSugar ?? 'Keine Daten';
            carbFactorLunch.value = result.meals?.lunch?.carbFactor ?? 'Keine Daten';
            correctionFactorLunch.value = result.meals?.lunch?.correctionFactor ?? 'Keine Daten';

            targetBloodSugarDinner.value = result.meals?.dinner?.targetBloodSugar ?? 'Keine Daten';
            carbFactorDinner.value = result.meals?.dinner?.carbFactor ?? 'Keine Daten';
            correctionFactorDinner.value = result.meals?.dinner?.correctionFactor ?? 'Keine Daten';

            targetBloodSugarNight.value = result.meals?.night?.targetBloodSugar ?? 'Keine Daten';
            carbFactorNight.value = result.meals?.night?.carbFactor ?? 'Keine Daten';
            correctionFactorNight.value = result.meals?.night?.correctionFactor ?? 'Keine Daten';
        }

        else {
            console.log('Fehler beim Abrufen der Daten: ' + result.error);
        }
    }

    catch (err) {
        console.error('Serverfehler beim Abrufen der Daten: ' + err);
    }
}

window.onload = showingData;