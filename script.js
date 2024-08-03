
const microphone = document.querySelector(".wave-area");
const words = document.querySelector(".words");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

microphone.addEventListener("click", function() {
   this.classList.toggle("active");

   if ( this.classList.contains("active") ) {
      recognition.interimResults = true;
      recognition.addEventListener("result", function( { results } ) {
         const transcript = Array.from( results )
            .map( function( result ) {
               return result[ 0 ];
            })
            .map( function( result ) {
               return result.transcript;
            }).join("");

         words.innerHTML = transcript;
      });

      recognition.start();
      recognition.addEventListener("end", recognition.start );
      return true;
   } else {
      if ( recognition.interimResults === true ) {
         words.innerHTML = "";
         recognition.interimResults = false;
         recognition.stop();
         recognition.removeEventListener("end", recognition.start );
         return false;
      }
   }



});


