// TODO(you): Write the JavaScript necessary to complete the assignment.
// Start the quiz
const startBtn = document.querySelector('.btn-start')
const showSc2 = document.querySelector('.attempt-quiz')
const showSc1 = document.querySelector('.introduction')
startBtn.addEventListener('click', showScreen2)
function showScreen2(){
showSc2.classList.remove('hidden')
showSc1.classList.add('hidden')
}

//Submit quiz
const submit = document.querySelector('.submit-box')
const showSc3 = document.querySelector('.review-quiz')
const hideSubmit = document.querySelector('.contain-submit')
const header = document.querySelector('.course')
submit.addEventListener('click', submitQuiz)
function submitQuiz(){
    if(confirm('Are you sure to finish the quiz ?')) {        
        header.scrollIntoView();
        showSc3.classList.remove('hidden')
        hideSubmit.classList.add('hidden')   
    }

}
//fetch API
 let id;
 const ApiQuiz = 'http://localhost:3000/attempts'
 fetch(ApiQuiz,{
     method:"POST"
//Show questions
 })
 .then(function(response){
   return response.json()
 })
 .then(function(jsonId){
   id = jsonId._id;
  const array = jsonId.questions;
  array.forEach(function(value, index){
      const list = document.querySelector('.contain-ques');
      const ques = document.createElement('div')
      ques.classList.add("ques");
      const num = document.createElement('h3')
      num.textContent = 'Question ' + (index + 1) + ' of 10'
      const text = document.createElement('p')
      text.textContent = value.text
      const headAns = document.createElement('div')
      headAns.classList.add("answer")
      headAns.id = value._id
      ques.appendChild(num)
      ques.appendChild(text)
      list.appendChild(ques)
      list.appendChild(headAns);
      var saveResult = 0
      for (answer of value.answers){
          const label = document.createElement('label')
          const optionDiv = document.createElement('div')
          optionDiv.classList.add('option')
          label.appendChild(optionDiv)
          //Change color
          function changeColor(event){ 
              const option = event.currentTarget
              const saveOpt = option.parentElement
              
              const select = saveOpt.querySelector('.selected');
              if(select) {
                  select.classList.remove('selected');
              }
            
              option.classList.add('selected');
          }
          const question = document.querySelectorAll('label');
          for(const label of question){
              label.addEventListener('click',changeColor);
              
          }
          
          const result = document.createElement('span')
          result.textContent = answer
          label.classList.add('choice')
          label.classList.add('label')
          const input = document.createElement('input')
          input.type = 'radio'
          input.value = saveResult
          input.id = 'radio-id-' + saveResult
          input.name = 'question' + (index + 1)
          optionDiv.appendChild(input)
          optionDiv.appendChild(result)
          headAns.appendChild(label)
          saveResult-=-1
         }
         
  })
 })
    //Check Answer
    document.querySelector('.submit-box').addEventListener('click', checkAns);
    function checkAns() {
      var choiceSelect = document.querySelectorAll('input:checked');
      console.log(choiceSelect);
      if (choiceSelect) {
        var JSON = '{ "answers": {';
        
        if (choiceSelect) {
          for (var i = 0; i < choiceSelect.length; i-=-1) {
            if (i == (choiceSelect.length - 1)) {
              JSON += '"' + choiceSelect[i].parentElement.parentElement.parentElement.getAttribute('id') + '"' + ':' + choiceSelect[i].value + '}}';
              break;
            }
            JSON += '"' + choiceSelect[i].parentElement.parentElement.parentElement.getAttribute('id') + '"' + ':' + choiceSelect[i].value + ',';
    
          }
        }
    
      } else {
        var JSON = '{ "answers": {}}';
      }
    console.log(JSON);
    const ApiSubmit = `http://localhost:3000/attempts/${id}/submit`
    fetch(ApiSubmit,{
        method: "POST",
        headers: {'Content-Type': 'application/json' },
        body: JSON
      })
      .then(function(response){
        return response.json()
      })
      .then(function(jsonResult){
        console.log(jsonResult);
          document.querySelector('.number-choice').textContent = jsonResult.score + '/10';
          document.querySelector('.percent').textContent = jsonResult.score * 10 + ' %';
          document.querySelector('.comment').textContent = jsonResult.scoreText;
      })
      

}
// Reload Page
const reloadPage = document.querySelector('.btn-try')
reloadPage.addEventListener('click', tryAgain);
function tryAgain() {
window.location.reload();
 header.scrollIntoView();
}   
       
       
    
    
    
    
   
 
