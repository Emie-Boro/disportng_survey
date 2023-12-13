let currentStep = 1;
const next_btn = document.getElementById('action_btn')
const back_btn = document.getElementById('back_btn')
const submit_btn = document.getElementById('submit_btn')

function showStep(step) {
    document.querySelectorAll('.form-step').forEach((element)=>{
        element.style.display = 'none'
    });

    document.getElementById(`step${currentStep}`).style.display = 'block';
}
if(currentStep == 1) {
    document.getElementById(`step1`).style.display = 'block';
    submit_btn.style.display = 'none'
    back_btn.style.display = 'none'
    next_btn.textContent = 'Start Survey'
}
function next() {
    if(currentStep < 4) {
        currentStep++;
        next_btn.textContent = 'Next';
        back_btn.style.display = 'block'
        showStep(currentStep)
    }
    if(currentStep == 4){
        next_btn.style.display = 'none'
        submit_btn.style.display = 'block'
    }
}

function back() {
    if(currentStep > 1) {
        currentStep--;
        next_btn.style.display = 'block'
        submit_btn.style.display = 'none'
        showStep(currentStep)
    }
    if(currentStep == 1){
        next_btn.textContent = 'Start Survey'
        back_btn.style.display = 'none'
    }
}

