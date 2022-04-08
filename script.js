/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function restartQuiz(event){

    for(let i in userAnswer)
    {
        delete userAnswer[i];
    }

    for (let i = 0; i<checkbox_list.length; i++){

        let img = checkbox_list[i].querySelector('.checkbox');
        if(img.src="./images/checked.png")
        {   
            checkbox_list[i].style.backgroundColor="#f4f4f4";
            img.src = "./images/unchecked.png";
        }

        checkbox_list[i].classList.remove("unselected");
        

        checkbox_list[i].addEventListener("click", CheckAnswer);
    }

    let button = event.currentTarget;
    button.removeEventListener("click", restartQuiz);

    let tmp = document.querySelector('.result');
    tmp.classList.add("hidden");

}

function displayResult(){

    let choiceId = userAnswer['one'];

    if(userAnswer['two']==userAnswer['three'])
    {
        choiceId = userAnswer['two'];
    }

    console.log(choiceId);
    let result_title = document.querySelector('.result h1');
    let result_content = document.querySelector('.result p');
    result_title.textContent = RESULTS_MAP[choiceId].title;
    result_content.textContent = RESULTS_MAP[choiceId].contents;

    let result = document.querySelector('.result');
    result.classList.remove("hidden");

    let button = document.querySelector('.result button');
    button.addEventListener("click", restartQuiz);
}

function dontChanceAnswer(){
    let k=0;
    for(i in userAnswer)
    {
        k++;
    }

    if (k==3)
    {
        for (let i = 0; i<checkbox_list.length; i++){

            checkbox_list[i].removeEventListener("click", CheckAnswer);
            
        }

        displayResult();
                
    }

    
    
}


function rst_question(par){
    let list = document.querySelectorAll('.choice-grid div')
    for(let k=0; k<list.length; k++)
    {
        if(par.dataset.questionId==list[k].dataset.questionId)
        {
            list[k].classList.remove("unselected");
                if(list[k].querySelector('.checkbox').src="./images/checked.png")
                {
                    list[k].style.backgroundColor="#f4f4f4";
                    list[k].querySelector('.checkbox').src="./images/unchecked.png"
                }
        }
        
    }
}


function CheckAnswer(event){
   
    
    console.log("cliccato");

    
    let div = event.currentTarget;
    let choiceId = div.dataset.choiceId;
    let questionId = div.dataset.questionId;
    userAnswer[questionId] = choiceId;

    rst_question(div);

    
    let checkbox = div.querySelector('.checkbox');
    checkbox.src="./images/checked.png";
    
    div.style.backgroundColor="#cfe3ff";
    
    for (let i = 0; i<checkbox_list.length; i++)
    {
        if(checkbox_list[i]!=div && div.dataset.questionId==checkbox_list[i].dataset.questionId){
            checkbox_list[i].classList.add("unselected");
        }      
    }

    dontChanceAnswer()

}

let userAnswer = {};

let checkbox_list = document.querySelectorAll('.choice-grid div');


for (let i = 0; i<checkbox_list.length; i++){

    checkbox_list[i].addEventListener("click", CheckAnswer);
    
}

