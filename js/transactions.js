let $transactionBox = document.querySelector('#transactionBox');

function removeAllChild(){
    while ($transactionBox.firstChild) {
		$transactionBox.removeChild($transactionBox.lastChild);
	}
}
let $transactionData,$transactions,$transactionCount;

let currentDate = new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate();
function updateTransactions(){
    removeAllChild()
    db.child('transactions').child(currentDate).get().then(ss=>{
        if(ss.exists()){
            $transactionData = ss.val()
            let i = $transactionData;
            for (item in $transactionData){
                if(i[item]){
                    let $div = document.createElement('div');

                    $div.style=`
                    width: 90vw;
                    color:white;
                    background: gray;
                    border-radius:5px;
                    padding:5px;
                    margin:5px;
                    `;
                    $div.innerHTML=`
                    <p>from: ${i[item].from} to: ${i[item].to}</p>
                    <p>ammount: <span style="background-color: gold; color:white; border-radius:20px;padding:5px;">$ ${i[item].ammount}</span> date: ${i[item].time}</p>
                    `;
                    $transactionBox.appendChild($div);
                }else{
                    continue;
                }
                
            }
        }
    })
}

auth.onAuthStateChanged(user => {
	if(user){
        UID = user.uid;
        updateTransactions();
    }else{
        location.href=`../index.html`;
    }
});


db.child('transactions').on("child_changed", ()=>{
    updateTransactions()
})