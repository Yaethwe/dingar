auth.onAuthStateChanged(user => {
	if(user){
        location.href=`pages/dashboard.html`;
    }
});
let emailI = document.querySelector('#emailI');
let passwordI = document.querySelector('#passwordI');
function login(){
    signin(emailI.value,passwordI.value);
}