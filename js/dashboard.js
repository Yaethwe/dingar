auth.onAuthStateChanged(user => {
	if(user){
        UID = user.uid;
        firebase.database().ref().child('users').child(user.uid).get().then(snapshot => {
            if (snapshot.exists()){
                main(snapshot.val());
            }else{
                alert("no data");
            }
        }).catch(error => {
            console.error(error);
        });
    }else{
        location.href=`../index.html`;
    }
});
var ddbb;
function updateCurrent(){
    firebase.database().ref().child('users').child(UID).get().then(snapshot => {
        if (snapshot.exists()){
            main(snapshot.val());
        }else{
            alert("no data");
        }
    }).catch(error => {
        console.error(error);
    });
}

var dashboardDiv = document.querySelector('#dashboardDiv');
var $myAddress = document.createElement('label');
var $myAddressLabel = document.createElement('label');
dashboardDiv.appendChild($myAddressLabel);
$myAddressLabel.textContent="My Address:";
$myAddress.style=`
background-color: white;
color: black;
padding:5px;
margin:5px;
border-radius:5px;
min-width:50vw;
border:1px solid blue;
`;
dashboardDiv.appendChild($myAddress);
var $copyAddressBtn = document.createElement('button');
$copyAddressBtn.textContent="copy"
$copyAddressBtn.className="btn btn-dark"
$copyAddressBtn.onclick=()=>{
    navigator.clipboard.writeText(UID);
}
dashboardDiv.appendChild($copyAddressBtn);
var $label = document.createElement('label');
updateBal();
$label.style=`
background-color: orange;
color: white;
padding:5px;
margin:5px;
border-radius:5px;
min-width:50vw;
`;
dashboardDiv.appendChild($label);
var $reload = document.createElement('button');
$reload.textContent="reload";
$reload.style=`
background-color:blue;
color:white;
border:0px;
border-radius:5px;
`;
$reload.onclick=()=>{
    updateCurrent();
}
dashboardDiv.appendChild($reload);
var $sentBtn = document.createElement('button');
$sentBtn.style=`
background-color: blue;
color: white;
padding:5px;
margin:5px;
border-radius:5px;
min-width:50vw;
border:0px;
`;
$sentBtn.textContent="Send Money";
var $sentMoney = 0;
var $address = "";
$sentBtn.onclick=()=>{
    $address = prompt("Enter your address:");
    firebase.database().ref().child("users").child($address).get().then(e=>{
        if(e.exists()){
            sendSection(e.val());
        }
    })
};

function sendSection(d){
    let currentMoney;
    if(d.wallet){
        currentMoney=d.wallet.bal;
    }else{
        currentMoney=0;
    }
    $sentMoney = prompt('Enter your ammount:');
    if($sentMoney>data.wallet.bal){
        alert('Fail: You need to check you balance.');
    }else if($sentMoney<0){
        alert('Fail: Send money can\'t be less then \'0\'.');
    }else{
        db.child("users").child($address).update({
            wallet:{
                bal:parseFloat(currentMoney) + parseFloat($sentMoney),
            },
        }).then(()=>{
            db.child("users").child(UID).update({
                wallet:{
                    bal:parseFloat(data.wallet.bal) - parseFloat($sentMoney),
                },
            })
        })

        db.child('transactions').get().then(ss=>{
            let d = ss.val();
            db.child('transactions').update({
                count:d.count+1,
            }).then(()=>{
                db.child('transactions').child('data').child(d.count+1).set({
                    from:UID,
                    to:$address,
                    time:(new Date().getMonth()+1)+"/"+new Date().getDate()+"/"+new Date().getFullYear(),
                    ammount:$sentMoney,
                })
            })
        })
    }
}
dashboardDiv.appendChild($sentBtn);

function updateBal(){
    $label.textContent='$ '+data.wallet.bal;
}

function main(d){
    data.user.name=d.name;
    data.user.email=d.email;
    data.user.profilePicture=d.profilePicture;
    data.user.birthYear=d.birthYear;
    data.user.bio=d.bio;
    $myAddress.textContent=UID;
    if(d.wallet.bal){
        data.wallet.bal=d.wallet.bal;
        updateBal();
    }else{
        firebase.database().ref().child('users').child(UID).update(
            {
                wallet:{
                    bal:0,
                },
            }
        ).then(e=()=>{
            updateBal();
        })
    }
    ddbb= firebase.database().ref().child('users').child(UID);
    ddbb.on('child_changed', (snapshot) => {
        updateCurrent()
    });
}


