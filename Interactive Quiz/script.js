$(document).ready(function() {
    var currentQuestion = 0;
    var score = 0;
    var countdownTimer;
    var timeLeft = 10;

    var quizQuestions = [
        {
            type: "multiple-choice",
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            answer: "Paris"
        }
    ];
    function showCountdown(){
      clearInterval(countdownTimer);
      $("#timer").html("Time left: "+timeLeft+"s");};   
        // Display initial question and start timer
    displayNextQuestion();
    countdownTimer = setInterval(showCountdown, 1000);
    
    $("#start_btn").click(function () {
    });
});
