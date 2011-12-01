Question = {
  submitAnswer: function(question) {
    app.request("PUT",question.url,function(data){
        log(data);
        if (typeof question.onComplete === "function")
          question.onComplete();
    }, {answer:question.answer}); 
  },
  begin: function(question, onComplete) {
    if (question.wheels)
      machine.setWheels(question.wheels);
    question.onComplete = onComplete;
    if (typeof question.process === "function") {
      question.process();
    } else {
      if (question.decode) {
        question.answer = machine.decode(question.code);          
      } else {
        question.answer = machine.encode(question.code);    
      }
    }    
    log("answer = "+question.answer);
    this.submitAnswer(question);  
  } 
}





var currentQuestion = 0;

nextQuestion = function() {
  Question.begin(questions[currentQuestion], nextQuestion)
  currentQuestion++;
}