document.getElementById("vergelijk_btn");

function showBedrijfOutput(){
    document.getElementById("bedrijfOutput").classList.remove('invisible');
}



VergelijkButton.onclick = function(){
    if(document.getElementById("Ondernemingsnummer").value.length != 10 )
        {
            alert(" Ongeldig ondernemingsnummer! Controleer je invoer: \n Bestaat het ondernemingsnummer uit exact 10 cijfers")
        }
    
    else
    {
        showBedrijfOutput()
    }
}

