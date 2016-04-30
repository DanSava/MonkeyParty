Template.registerHelper("MainText", function() {
    if (Session.equals('language', 'eng')) {
      return "Let us know you are going to join the party by loging in and picking a seat at a table. You can also invite other guests to our wedding"
    }
    else if (Session.equals('language', 'sp')) {
      return "Déjenos saber que va a unirse a la fiesta por logicas y elegir un asiento en una mesa . También puede invitar a otros invitados a nuestra boda"
    }
    else if (Session.equals('language', 'ro')) {
      return "Confiram prezenta la petrecere logandu-te si alegand un loc la masa. De asemeanea poti invita alte persoane la petrecerea noastra"
    }
    else if (Session.equals('language', 'nl')) {
      return "Laat ons weten dat je gaat naar de partij aan te sluiten door loging in en het kiezen van een stoel aan een tafel. U kunt ook uitnodigen andere gasten op onze bruiloft"
    }

    return "Let us know you are going to join the party by loging in and picking a seat at a table. You can also invite  other guests to our wedding"
});


Template.registerHelper("BigPartyMainText", function() {
     if (Session.equals('language', 'eng')) {
       return "It is true that we are not going to find a wizzard, climb a mountain slay a dragon and steal it's gold, but non the less. It will be one of the bigest undertakings of our lives. So we will need all the help we can get from our friends and family. But what is this big adventure I am talking about? Well, it is just a big party, that we will organize in your honour. See you there."
     }
     else if (Session.equals('language', 'sp')) {
       return "Es cierto que no vamos a encontrar un Wizzard , escalar una montaña matar a un dragón y robar es oro, pero no menos. Será una de las empresas mas grandes de nuestra vida . Así que vamos a necesitar toda la ayuda que podemos obtener de nuestros amigos y familiares. Pero, ¿qué es esta gran aventura que estoy hablando ? Bueno , es sólo una gran fiesta , que vamos a organizar en su honor. Te veo allí."
     }
     else if (Session.equals('language', 'ro')) {
       return "Este adevarat ca nu o sa gasim un magician, nu o sa escaladam un munte, nu o sa ne luptam cu un dragon, si nu o sa ii furam aurul. Dar totusi o sa fie unul dintre cele mai importante evenimente din viata noastra. De aceea vom avea nevoie de tot ajutorul pe care prietenii si familia pot sa nil ofere. Dar despre ce fel de eveniment vorbesc, ei bine este vorba doar de o petrecere organizata in cinstea voastra. Asa ca sper sa ne vedem acolo. "
     }
     else if (Session.equals('language', 'nl')) {
       return "Het is waar dat we niet gaan om een wizzard vinden , een berg beklimmen doden een draak en stelen het goud , maar niet de minder . Het zal een van de bigest ondernemingen van ons leven . Dus zullen we alle hulp die we kunnen krijgen van onze vrienden en familie nodig hebben. Maar wat is dit grote avontuur heb ik het over ? Nou , het is gewoon een groot feest , dat we zullen organiseren in je eer . Zie je daar."
     }

     return "It is true that we are not going to find a wizzard, climb a mountain slay a dragon and steal it's gold, but non the less. It will be one of the bigest undertakings of our lives. So we will need all the help we can get from our friends and family. But what is this big adventure I am talking about? Well, it is just a big party, that we will organize in your honour. See you there."
});

Template.registerHelper("BigPartyTitleText", function() {
     if (Session.equals('language', 'eng')) {
       return "The Big Adventure"
     }
     else if (Session.equals('language', 'sp')) {
       return "La gran aventura"
     }
     else if (Session.equals('language', 'ro')) {
       return "Marea Aventura"
     }
     else if (Session.equals('language', 'nl')) {
       return "The Big Adventure"
     }

     return "The Big Adventure"
});
Template.registerHelper("GuesteListTitle", function() {
     if (Session.equals('language', 'eng')) {
       return "Guest List"
     }
     else if (Session.equals('language', 'sp')) {
       return "Lista de invitados"
     }
     else if (Session.equals('language', 'ro')) {
       return "Lista de invitati"
     }
     else if (Session.equals('language', 'nl')) {
       return "Gastenlijst"
     }

     return "Guest List"
});
Template.registerHelper("PartyFundsText", function() {
     if (Session.equals('language', 'eng')) {
       return "Help us make the party not only unforgetable for us."
     }
     else if (Session.equals('language', 'sp')) {
       return "Ayúdanos a hacer la fiesta inolvidable no sólo para nosotros"
     }
     else if (Session.equals('language', 'ro')) {
       return "Ajutati-ne sa facem petrecerea de neuitat nu doar pentru noi"
     }
     else if (Session.equals('language', 'nl')) {
       return "Ons te helpen met de partij niet alleen onvergetelijk voor ons"
     }

     return "Help us make the party not only unforgetable for us."
});
Template.registerHelper("ConfirmedGuests", function() {
     if (Session.equals('language', 'eng')) {
       return "Guests Confirmed"
     }
     else if (Session.equals('language', 'sp')) {
       return "Invitados Confirmados"
     }
     else if (Session.equals('language', 'ro')) {
       return "Invitati confirmati"
     }
     else if (Session.equals('language', 'nl')) {
       return "Gasten Bevestigd"
     }

     return "Guests Confirmed"
});

Template.registerHelper("DateText", function() {
     if (Session.equals('language', 'eng')) {
       return "Date"
     }
     else if (Session.equals('language', 'sp')) {
       return "Fecha"
     }
     else if (Session.equals('language', 'ro')) {
       return "Data"
     }
     else if (Session.equals('language', 'nl')) {
       return "Datum"
     }
     return "Date"
});

Template.registerHelper("LocationText", function() {
     if (Session.equals('language', 'eng')) {
       return "Location"
     }
     else if (Session.equals('language', 'sp')) {
       return "Ubicación"
     }
     else if (Session.equals('language', 'ro')) {
       return "Locatie"
     }
     else if (Session.equals('language', 'nl')) {
       return "Locatie"
     }

     return "Location"
});
Template.registerHelper("SorryText", function() {
     if (Session.equals('language', 'eng')) {
       return "Only our friends and family can attend the wedding reception. If you are part of our friends and family please provide the password from the invitation letter"
     }
     else if (Session.equals('language', 'sp')) {
       return "Sólo nuestros amigos y familiares pueden asistir a la recepción de la boda . Si usted es parte de nuestros amigos y familia, por favor proporcionar la contraseña de la carta de invitación"
     }
     else if (Session.equals('language', 'ro')) {
       return "Doar familia si prietenii sunt invitati la aceasta nunta. Daca faci parte dintre familie sau prietenii nostrii te rog sa introduci parola de pe invitatie."
     }
     else if (Session.equals('language', 'nl')) {
       return "Alleen onze vrienden en familie kunnen de huwelijksreceptie te wonen. Als u deel uitmaakt van onze vrienden en familie kunt u het wachtwoord van de uitnodigingsbrief"
     }

     return "Only our friends and family can attend the wedding reception. If you are part of our friends and family please provide the password from the invitation letter"
});
Template.registerHelper("PasswordPlacehoderText", function() {
     if (Session.equals('language', 'eng')) {
       return "Password from the invitation letter"
     }
     else if (Session.equals('language', 'sp')) {
       return "Contraseña de la carta de invitación"
     }
     else if (Session.equals('language', 'ro')) {
       return "Parola de pe invitatie"
     }
     else if (Session.equals('language', 'nl')) {
       return "Wachtwoord van de uitnodigingsbrief"
     }

     return "Password from the invitation letter"
});
