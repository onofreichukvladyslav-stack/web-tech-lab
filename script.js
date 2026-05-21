let buttonsignin = document.getElementById('btnSignIn');
let buttonmusic = document.getElementById('ts');
let div = document.createElement('div');

// if (button.click){
//     <div>
//         <search>login</search>
        
//     </div>
// }

function addLogin(){
    let headerlogin = document.getElementById('signin');
    let inputlogin = document.createElement('input');
    div.appendChild(inputlogin);
    headerlogin.appendChild(div);
}

function addPassword(){
    let headerpass = document.getElementById('signin');
    let inputpass = document.createElement('input');
    let br = document.createElement("br");
    div.appendChild(br);
    div.appendChild(inputpass);
    headerpass.appendChild(div);
}


buttonsignin.addEventListener('click', () => {
    addLogin();
    addPassword();
})

document.getElementById('btnSignUp').onclick = function() {
    location.href = "form.html";
};

document.getElementById('ts').onclick = function(){
    location.href = "ts.html";
};