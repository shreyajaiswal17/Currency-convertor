const baseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")



// for (code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
            
        }
        select.append(newOption);
        
        // after this we can remove our select options
    }

    select.addEventListener("change",(evt)=>{
        updateFlags(evt.target);  /*jab humne change kia to kha par change aaya that is target and woh hum fx ko pass krenge evt=obj*/
    })
}


const updateFlags=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let atmVal=amount.value;
    if(atmVal===""||atmVal<1){
        atmVal=1;
        amount.value="1"
    }

    const URL=`${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response=await fetch(URL);
    // console.log(response);
    let data=await response.json();
    console.log(data);
    let rate=data[toCurr.value.toLowerCase()];

    let finalAmount=atmVal*rate;
    msg.innerText  =`${atmVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}` 


})

