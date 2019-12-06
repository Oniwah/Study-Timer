var rngQuote = Math.round(Math.random() * 10);


        db.collection("motivation").doc(rngQuote).onSnapshot(function(snap){
        document.getElementById("quote").innerHTML = snap.data().message;
    });
