let currentQuestion = 0;
let score = 0;

fetch('../../../Frontend/Static/json/questions.json')
  .then(response => response.json())
  .then(data => {

    function loadQuestion() {
      const question = data[currentQuestion];

      document.getElementById('question').innerText = question.question;

      let optionsHtml = '';
      question.options.forEach(option => {
        optionsHtml += `
          <input type="radio" name="option" value="${option}"> ${option} <br>
        `
      });

      document.getElementById('options').innerHTML = optionsHtml;
    }
    
    loadQuestion();

    document.getElementById('next').addEventListener('click', () => {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if(selectedOption) { 
        const answer = selectedOption.value;
        if(answer === data[currentQuestion].options[data[currentQuestion].correctIndex]) {
          score++;
        }
      }
      
      currentQuestion++;
      if(currentQuestion < data.length) {
        loadQuestion();
      }
      else {
        alert('Quiz finished! Your score is ' + score);
      }
    });

    document.getElementById('skip').addEventListener('click', () => {
      currentQuestion++;
      if(currentQuestion < data.length) {
        loadQuestion();
      }
      else {
        alert('Quiz finished! Your score is ' + score);
      }
    });

    document.getElementById('previous').addEventListener('click', () => {
      currentQuestion--;
      if(currentQuestion >= 0) {
        loadQuestion();
      }
    });

    document.getElementById('finish').addEventListener('click', () => {
      // Redirect to assignments.html
      window.location.href = '/assignments';
    });

  });