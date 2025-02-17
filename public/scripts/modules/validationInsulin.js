
const inputs = document.querySelectorAll('input');
let isValid = true;

inputs.forEach( input => {
    input.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        const numberValue = Number(value);
    if (value === " " || isNaN(numberValue) ) {
        isValid = false;
        input.style.borderStyle = "solid";
        input.style.borderColor = "#AA0E2D";
        input.style.color = "red";
    }
    else {
        input.style.color = "black";
        input.style.border = "none";
        input.style.borderBottom = "solid 0.9px";
    }
});
});

//Daten senden
if (isValid) {
    ["breakfast", "lunch", "dinner", "night"].forEach( meal => {
    document.getElementById(`save-${meal}`).addEventListener('click', () => saveMeal(meal));
});

}

async function saveMeal(meal) {
    let isSendable = true; 
   

    const correctionFactorInput = document.getElementById(`correctionFactor-${meal}`);
    const targetBloodSugarInput = document.getElementById(`targetBloodSugar-${meal}`);
    const carbFactorInput = document.getElementById(`carbFactor-${meal}`);


    if (!correctionFactorInput || !targetBloodSugarInput || !carbFactorInput) {
        isSendable = false;
        return alert('Eingabefeld nicht gefunden');
        
    }

    const numberRegex = /^[0-9]+(\.[0-9]+)?$/;

    const correctionFactorValue = correctionFactorInput.value.trim();
    const targetBloodSugarValue = targetBloodSugarInput.value.trim();
    const carbFactorValue = carbFactorInput.value.trim();

    

    if (
        !numberRegex.test(correctionFactorValue) || 
        !numberRegex.test(targetBloodSugarValue) || 
        !numberRegex.test(carbFactorValue)
        ) 
        {
            isSendable = false;
            document.querySelector(`.error-box--${meal}`).textContent = "Bitte geb gültige Daten an";
            document.querySelector(`.error-box--${meal}`).style.display = "flex";
        }
    else {
        document.querySelector(`.error-box--${meal}`).style.display = "none";
    }
    
        const correctionFactor = parseFloat(correctionFactorValue);
        const targetBloodSugar = parseFloat(targetBloodSugarValue);
        const carbFactor = parseFloat(carbFactorValue);

   

    if(isSendable) {
        console.log('Daten wurden vom Frontend validiert und sind bereit fürs Senden');
        
        try { 
            
            const formData = {
            correctionFactor,
            targetBloodSugar,
            carbFactor
            };
            const response = await fetch(`/settings/measurements/${meal}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (response.ok) {
                console.log(result.message);
                document.querySelector(`.data-saved--${meal}`).textContent = result.message;
                document.querySelector(`.data-saved--${meal}`).style.display = "flex";
            }
            else if (result.errors) {
                console.error(result.errors);
                document.querySelector(`.error-box--${meal}`).textContent = result.errors;
                document.querySelector(`.error-box--${meal}`).style.display = "flex";
            }
            else {
                console.error(result.error);
                document.querySelector(`.error-box--${meal}`).textContent = result.error;
                document.querySelector(`.error-box--${meal}`).style.display = "flex";
            }
        }
        catch (err) {
            console.error(err);
            console.error('Fehler beim Speichern der Daten: ' + err);
            document.querySelector(`.error-box--${meal}`).textContent = err;
                document.querySelector(`.error-box--${meal}`).style.display = "flex";
        }
    }
}


