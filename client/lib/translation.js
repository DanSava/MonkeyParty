Template.registerHelper("MainText", function() {
    if (Session.equals('language', 'eng')) {
      return "Let us know you are going to join the party by logging in and picking seats at a table.";
    }
    else if (Session.equals('language', 'sp')) {
      return "Déjanos saber si vas a venir a la fiesta registrándote y eligiendo un lugar en la mesa.";
    }
    else if (Session.equals('language', 'ro')) {
      return "Confirma prezenta la petrecere logandu-te si alegand un loc la masa";
    }
    else if (Session.equals('language', 'nl')) {
      return "Laat ons weten of je bij het feest zult zijn door in te loggen en stoelen aan een tafel te selecteren.";
    }

    return "Let us know you are going to join the party by logging in and picking seats at a table.";
});


Template.registerHelper("BigPartyMainText", function() {
     if (Session.equals('language', 'eng')) {
       return "It is true we are not going to find a wizzard, climb a mountain slay a dragon and steal its gold, Nonetheless, it will be one of the bigest undertakings of our lives. So we will need all the help we can get from our friends and family. But what is this big adventure we are talking about? Well, it is just a big party, that we will organize in your honour. See you there!";
     }
     else if (Session.equals('language', 'sp')) {
       return "Es cierto que no vamos ni a encontrar un mago, ni a escalar una montaña, ni a matar a un dragón ni a robar oro. Será uno de los mayores retos de nuestra vida. Necesitaremos toda la ayuda que podamos tener de nuestros amigos y familiares. Pero ¿qué es esa gran aventura de la que estoy hablando? Bueno, es solamente una gran fiesta que organizaremos en vuestro honor. ¡Nos vemos allí!";
     }
     else if (Session.equals('language', 'ro')) {
       return "Este adevarat ca nu o sa gasim un vrajitor, nu o sa escaladam un munte, nu o sa ne luptam cu un dragon, si nu o sa ii furam aurul. Totusi o sa fie unul dintre cele mai importante evenimente din viata noastra. De aceea vom avea nevoie de tot ajutorul pe care prietenii si familia pot sa ni-l ofere. Despre ce fel de eveniment vorbesc? Ei bine este vorba doar de o petrecere organizata in cinstea voastra. Asa ca sper sa ne vedem acolo! ";
     }
     else if (Session.equals('language', 'nl')) {
       return "Het is waar dat we geen tovenaar gaan vinden, een berg zullen beklimmen, een draak gaan overwinnen en zijn goud stelen. Maar het wordt een van de grootste ondernemingen van ons leven. Dus hebben we alle hulp nodig die we kunnen krijgen, van onze vrienden en onze familie. Maar wat is dit grote avontuur waar ik het over heb? Nou, het is gewoon een groot feest dat we organiseren ter ere van jou. Tot dan!";
     }

     return "It is true we are not going to find a wizzard, climb a mountain slay a dragon and steal its gold, Nonetheless, it will be one of the bigest undertakings of our lives. So we will need all the help we can get from our friends and family. But what is this big adventure we are talking about? Well, it is just a big party, that we will organize in your honour. See you there!";
});

Template.registerHelper("BigPartyTitleText", function() {
     if (Session.equals('language', 'eng')) {
       return "The Big Adventure";
     }
     else if (Session.equals('language', 'sp')) {
       return "La gran aventura";
     }
     else if (Session.equals('language', 'ro')) {
       return "Marea Aventura";
     }
     else if (Session.equals('language', 'nl')) {
       return "The Big Adventure";
     }

     return "The Big Adventure";
});
Template.registerHelper("GuesteListTitle", function() {
     if (Session.equals('language', 'eng')) {
       return "Guest List";
     }
     else if (Session.equals('language', 'sp')) {
       return "Lista de invitados";
     }
     else if (Session.equals('language', 'ro')) {
       return "Lista de invitati";
     }
     else if (Session.equals('language', 'nl')) {
       return "Gastenlijst";
     }

     return "Guest List";
});
Template.registerHelper("PartyFundsText", function() {
     if (Session.equals('language', 'eng')) {
       return "Help us make the party unforgetable for everyone";
     }
     else if (Session.equals('language', 'sp')) {
       return "Ayúdanos a hacer una fiesta inolvidable para todos";
     }
     else if (Session.equals('language', 'ro')) {
       return "Ajutati-ne sa facem petrecerea de neuitat nu doar pentru noi";
     }
     else if (Session.equals('language', 'nl')) {
       return "Help ons om het een onvergetelijk feest te maken voor iedereen";
     }

     return "Help us make the party unforgetable for everyone.";
});
Template.registerHelper("ConfirmedGuests", function() {
     if (Session.equals('language', 'eng')) {
       return "Guests Confirmed";
     }
     else if (Session.equals('language', 'sp')) {
       return "Invitados Confirmados";
     }
     else if (Session.equals('language', 'ro')) {
       return "Invitati confirmati";
     }
     else if (Session.equals('language', 'nl')) {
       return "Gasten Bevestigd";
     }

     return "Guests Confirmed";
});

Template.registerHelper("DateText", function() {
     if (Session.equals('language', 'eng')) {
       return "Date";
     }
     else if (Session.equals('language', 'sp')) {
       return "Fecha";
     }
     else if (Session.equals('language', 'ro')) {
       return "Data";
     }
     else if (Session.equals('language', 'nl')) {
       return "Datum";
     }
     return "Date";
});

Template.registerHelper("LocationText", function() {
     if (Session.equals('language', 'eng')) {
       return "Location";
     }
     else if (Session.equals('language', 'sp')) {
       return "Ubicación";
     }
     else if (Session.equals('language', 'ro')) {
       return "Locatie";
     }
     else if (Session.equals('language', 'nl')) {
       return "Locatie";
     }

     return "Location";
});
Template.registerHelper("SorryText", function() {
     if (Session.equals('language', 'eng')) {
         var txtEng = {'one':"The wedding party is private!",
                    'two':"Only our friends and family can attend the wedding reception. Please provide the password from the invitation letter."};
       return txtEng;
     }
     else if (Session.equals('language', 'sp')) {
         var txtSp = {'one': "La fiesta de boda es privada!",
                      'two': "Solo nuestros amigos y familiares pueden asistir a la boda. Por favor, introduce la contraseña que aparece en la invitación de boda"};
       return txtSp;
     }
     else if (Session.equals('language', 'ro')) {
         var txtRo= {'one': "Evenimentul este privat!",
                     'two': "Doar prietenii si familia pot sa participe la petercer. Va rugam introduceti parola de pe cartea de invitatie"};
       return txtRo;
     }
     else if (Session.equals('language', 'nl')) {
         var txtNl = {'one': "Het huwelijksfeest is prive!",
                      'two': "Alleen onze vrienden en familie kunnen aanwezig zijn tijdens de receptie. Vul het wachtwoord uit de uitnodiging in."};
       return txtNl;
     }
     return  {'one':"The wedding party is private!",
              'two':"Only our friends and family can attend the wedding reception. Please provide the password from the invitation letter."};
});
Template.registerHelper("HiCurrenUserTxt", function() {
    var txtEng = {'one':"Hello ",
                 'two':"your seat is at table "};
     if (Session.equals('language', 'eng')) {
       return txtEng;
     }
     else if (Session.equals('language', 'sp')) {
         var txtSp = {'one': "¡Hola ",
                      'two': "su asiento está en la mesa "};
       return txtSp;
     }
     else if (Session.equals('language', 'ro')) {
         var txtRo= {'one': "Buna",
                     'two': "locul tau este la masa "};
       return txtRo;
     }
     else if (Session.equals('language', 'nl')) {
         var txtNl = {'one': "Hallo",
                      'two': "uw stoel aan tafel "};
       return txtNl;
     }
     return  txtEng;
});

Template.registerHelper("SelectionBtnTxt", function() {
    var txtEng = {'confirm':"Confirm Selection",
                 'cancel':"Cancel Selection"};
     if (Session.equals('language', 'eng')) {
       return txtEng;
     }
     else if (Session.equals('language', 'sp')) {
         var txtSp = {'confirm': "Confirmar la selección",
                      'cancel': "Cancelar la selección"};
       return txtSp;
     }
     else if (Session.equals('language', 'ro')) {
         var txtRo= {'confirm': "Confirma Selectia",
                     'cancel': "Analueaza Selectia"};
       return txtRo;
     }
     else if (Session.equals('language', 'nl')) {
         var txtNl = {'confirm': "Bevestig selectie",
                      'cancel': "Annuleren selectie"};
       return txtNl;
     }
     return  txtEng;
});
Template.registerHelper("PasswordPlacehoderText", function() {
     if (Session.equals('language', 'eng')) {
       return "Password from the invitation letter";
     }
     else if (Session.equals('language', 'sp')) {
       return "Contraseña de la carta de invitación";
     }
     else if (Session.equals('language', 'ro')) {
       return "Parola de pe cartea de invitatie";
     }
     else if (Session.equals('language', 'nl')) {
       return "Wachtwoord van de uitnodigingsbrief";
     }
     return "Password from the invitation letter";
});
Template.registerHelper("GuestNames", function() {
     if (Session.equals('language', 'eng')) {
       return "Add name for guest sitting at table";
     }
     else if (Session.equals('language', 'sp')) {
       return "Añade un nombre para el invitado sentado en la mesa";
     }
     else if (Session.equals('language', 'ro')) {
       return "Adauga nume pentru invitatul de la masa";
     }
     else if (Session.equals('language', 'nl')) {
       return "Geef de naam van de gast aan tafel";
     }
     return "Add name for guest sitting at table";
});

Template.registerHelper("ConfirmSelectionTxt", function() {
     if (Session.equals('language', 'eng')) {
       return "Please confirm the selection";
     }
     else if (Session.equals('language', 'sp')) {
       return "Por favor confirmar la selección";
     }
     else if (Session.equals('language', 'ro')) {
       return "Va rugam sa confirmati selectia";
     }
     else if (Session.equals('language', 'nl')) {
       return "Gelieve te bevestigen de selectie";
     }
     return "Please confirm the selection";
});
Template.registerHelper("FirstLastName", function() {
     if (Session.equals('language', 'eng')) {
       return "First Name & Last Name";
     }
     else if (Session.equals('language', 'sp')) {
       return "Nombre y apellidos";
     }
     else if (Session.equals('language', 'ro')) {
       return "Prenume & Nume";
     }
     else if (Session.equals('language', 'nl')) {
       return "Voornaam & achternaam";
     }
     return "First Name & Last Name";
});
Template.registerHelper("ChangeSeats", function() {
     if (Session.equals('language', 'eng')) {
       return "Please select one of your confirmed seats";
     }
     else if (Session.equals('language', 'sp')) {
       return "Por favor, selecciona uno de tus asientos confirmados";
     }
     else if (Session.equals('language', 'ro')) {
       return "Selectati unul din locurile dumneavoastra confirmate";
     }
     else if (Session.equals('language', 'nl')) {
       return "Selecteer een van de voor jou gereserveerde stoelen";
     }
     return "Please select one of your confirmed seats";
});
