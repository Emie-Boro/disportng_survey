let currentStep = 1;
function showStep(step) {
    document.getElementById(`step${step}`).classList.remove('form-step')
}

function next() {
    if(currentStep < 4) {
        currentStep++;
        showStep(currentStep)
    }
}