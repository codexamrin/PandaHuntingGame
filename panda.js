        document.addEventListener("DOMContentLoaded", function (){
        var counter = 60;
        var score = 0;
        var countdownDisplay=document.getElementById("countdown");
        var counterHandler;
        var scoreDisplay = document.getElementById("scoreValue");
        var checkboxs=document.querySelectorAll('input[type="checkbox"]');
        var panda=document.querySelectorAll('.panda');
        var bombs = document.querySelectorAll('.bomb-element');
        var gameActive=true;
        
        function startGame() {
         clearInterval(counterHandler);
          counter = 60;  
          counterHandler = setInterval(changeCounter, 1000);  
        gameActive=true;
         
          panda.forEach(function(panda,index){
            panda.style.left='-50px';
          panda.style.animationPlayState='running';
        });

        bombs.forEach(function(bomb,index){
          bomb.style.left='-50px';
          bomb.style.animationPlayState='running';
        });

      checkboxs.forEach(function(checkbox){
         checkbox.checked=false;
      });
          
          showRestartButton(true);
    }
    function showCongratulations(){
      clearInterval(counterHandler);
      document.body.style.backgroundColor="black";
      var congratsModal=document.getElementById("congratulations");
      var congratsScore=document.getElementById("finalScore");
      congratsScore.textContent=score;
      congratsModal.style.display="block";
    
    document.getElementById("restartCongratulationsButton").addEventListener("click",function(){
      restartGame();
      hideCongratulations();
      counterHandler=setInterval(changeCounter,1000);
      
    });
  }
    function hideCongratulations(){
      var congratsModal=document.getElementById("congratulations");
      congratsModal.style.display="none";
    }
    function restartGame() {
      gameActive = true;
      score = 0;
      scoreDisplay.textContent = "0";
      document.body.style.backgroundColor="";
  
      clearInterval(counterHandler);
      counter = 60;
      countdownDisplay.textContent="Time:"+counter;
    
      panda.forEach(function (panda) {
        panda.style.left = '-100px';
        panda.style.top = '0px';
        panda.style.animationPlayState = 'running';
      });
    
      bombs.forEach(function (bomb) {
        bomb.style.left = '-100px';
        bomb.style.top = '0px';    
        bomb.style.animationPlayState = 'running';
      });
    
      checkboxs.forEach(function(checkbox){
        checkbox.checked = false;
      });
      var gameOverModal=document.getElementById("gameOverModal");
      var timeOverModal=document.getElementById("timeOverModal");
      gameOverModal.style.display="none";
      timeOverModal.style.display="none";
    
      showRestartButton(false);
      counterHandler=setInterval(changeCounter,1000);

      var congratsModal=document.getElementById("congratulations");
      congratsModal.style.display="none";
    }

        function changeCounter() {
          countdownDisplay.textContent="Time:"+counter;
          counter--;
          
          if (counter < 0) {
            clearInterval(counterHandler);
            panda.forEach(function(panda){
            panda.style.animationPlayState='paused';
            });

            bombs.forEach(function(bomb){
            bomb.style.animationPlayState='paused';
            });

            if(gameActive){
              showtimeOverModal(score);
              showRestartButton(true);
              }
           }
          
        }
       let btnBack=document.getElementById('quitButton');
       btnBack.addEventListener('click',()=>{
        window.history.back();
       });
     let btnBack1=document.getElementById('quitTimeOverButton');
     btnBack1.addEventListener('click',()=>{
      window.history.back();
     })
     let btnBack12=document.getElementById('quitCongratulationsButton');
     btnBack12.addEventListener('click',()=>{
      window.history.back();
     })
        function showRestartButton(show){
          if(show){
            document.getElementById("restartGameOverButton").style.display="block";
            document.getElementById("restartTimeOverButton").style.display="block";
          }else{
            document.getElementById("restartGameOverButton").style.display="none";
          document.getElementById("restartTimeOverButton").style.display="none"; 
           }
        }  
        
        document.getElementById("restartGameOverButton").addEventListener("click",function(){
          restartGame();
        });

        document.getElementById("restartTimeOverButton").addEventListener("click",function(){
          restartGame();
        });
          checkboxs.forEach(function(checkbox){
          checkbox.addEventListener("change",function(){   
            if(gameActive){
              var scoreIncrement=parseInt(checkbox.getAttribute("data-score-increment"),10);
            if(checkbox.checked){
              if(checkbox.id.startsWith("panda")){
            score++;
            scoreDisplay.textContent="Score: "+score;
            var gunSound=document.getElementById("sound");
            gunSound.play();
            if(score==20){
              showCongratulations();
            }
            } else if(checkbox.id.startsWith("bomb")){
              gameActive=false;
              showGameOverModal(score);
              showRestartButton(true);
            }
          }
        }
      });
    });
        startGame();
});

function showGameOverModal(score){
  var modal=document.getElementById("gameOverModal");
  var modalScore=document.getElementById("gameOverScore");
  modalScore.textContent = score;
  modal.style.display="block";
}


function showtimeOverModal(score) {
var modal = document.getElementById("timeOverModal");
var modalScore = document.getElementById("timeOverScore");
modalScore.textContent = score;
modal.style.display = "block";
}
