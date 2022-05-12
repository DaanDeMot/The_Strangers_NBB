function showUserInput_1(){
    let Ondernemingsnummer_1 = document.getElementById("Ondernemingsnummer_1").value;
    return Ondernemingsnummer_1;
}
function showUserInput_2(){
    let Ondernemingsnummer_1 = document.getElementById("Ondernemingsnummer_2").value;
    return Ondernemingsnummer_1;
}

VergelijkButton.onclick = function(){
    if(document.getElementById("Ondernemingsnummer_1").value.length != 10 || document.getElementById("Ondernemingsnummer_2").value.length != 10 )
        {
            alert(" Ongeldig ondernemingsnummer! Controleer je invoer: \n Bestaat het ondernemingsnummer uit exact 10 cijfers")
        }
    
    else
    {
        showUserInput_1();
        showUserInput_2();
        
      if(showUserInput_1 && showUserInput_2 ){
        let url = 'http://localhost:3000/bedrijfOutput/' + showUserInput_1() + '/' + showUserInput_2() + '';
        console.log(url);
        location.href = url;
      }else if(showUserInput_1 && !showUserInput_2 ){
          console.log('enkel den eerste');
      }

    }
}

