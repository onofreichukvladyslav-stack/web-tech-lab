const modal = document.getElementById('authModal');
const closeModalBtn = document.getElementById('closeModal');
const buttonSignIn = document.getElementById('btnSignIn');

const regModal = document.getElementById('regModal');
const buttonSignUp = document.getElementById('btnSignUp');
const closeRegModalBtn = document.getElementById('closeRegModal');

const buttonmusic = document.getElementById('ts');

buttonSignIn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () =>{
    modal.classList.add('hidden');
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    modal.classList.add('hidden');
});

buttonSignUp.addEventListener('click', () => {
    regModal.classList.remove('hidden');
});

closeRegModalBtn.addEventListener('click', () => {
    regModal.classList.add('hidden');
});

document.getElementById('regForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('regEmail').value;
    const emailConfirm = document.getElementById('regEmailConfirm').value;

    const emailError = document.getElementById('emailError');
    emailError.textContent = "";

    if (email !== emailConfirm){
        emailError.textContent = "Email doesn't match!";
        return;
    }


    alert('Registered successful!');
    regModal.classList.add('hidden');
    document.getElementById('regForm').reset();
});

window.addEventListener('click', () => {
    if (event.target === modal) modal.classList.add('hidden');
    if (event.target === regModal) regModal.classList.add('hidden');
});

document.getElementById('regEmailConfirm').addEventListener('input', () => {
    document.getElementById('emailError').textContent = "";
})

document.getElementById('ts').onclick = function(){
    location.href = "ts.html";
};