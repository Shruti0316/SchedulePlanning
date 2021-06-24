var date= new Date();

var month=date.getMonth();
var year=date.getFullYear();

//array of months
m=['JANUARY','FEBURARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

//shows current time
function currentTime(){
    var date= new Date();
    var hour=date.getHours();
var min=date.getMinutes();
var sec=date.getSeconds();
    document.getElementById('clock').innerHTML=pad(hour)+':'+pad(min)+':'+pad(sec);
    var t= setTimeout(function(){
        currentTime()
    },1000);
}

//coverting into two digits
function pad(val){
    var valstr=val+"";
    if(val<10){
        return 0+valstr;
    }
    else{
        return valstr;
    }
}

currentTime();
loadCalender(month,year);

//load previous month
function previous(){
    document.getElementById('dates').innerHTML="";    
    year=(month===0)?year-1: year;
    month=(month===0)? 11 : month-1;
    document.getElementById('mname').textContent=m[month]+' '+year;
    loadCalender(month,year);
}

//load next month
function next(){
    document.getElementById('dates').innerHTML="";
    year = (month==11)? year=year+1 : year;
    month = (month + 1) % 12;
    document.getElementById('mname').textContent=m[month]+' '+year;
    loadCalender(month,year);
    
}

//to find no of days in a month
function daysInMonth(m,y){
    return 32 - new Date(y,m,32).getDate();
}

//to find first day of a month
function firstDay(m,y){
    return new Date(y,m,1).getDay();
}

//load calender
function loadCalender(m,y){

        var num = daysInMonth(m, y);
        var firstday = firstDay(m,y);       // find where to start calendar day of week
        console.log(firstday);
       
         // create day without date
        for(var i = 0; i < firstday; i++)
        {
            var d = document.createElement("div");
            d.classList.add("date");
            d.classList.add("blank");
            document.getElementById("dates").appendChild(d);
        }

        //other days
        for(var i = 0; i < num; i++)
        {
            var tdate= new Date().getDate();
            var tmp = i + 1;
            var d = document.createElement("div");
        
            d.className = "date";
            d.innerHTML = tmp;
            document.getElementById("dates").appendChild(d);   
        }
}
//mark today date
var da=new Date().getDate();
const d=document.getElementsByClassName('date');
Array.from(d).forEach(function(e){
    if(e.innerHTML==da){
        e.style.backgroundColor='purple';
        e.style.color='white';
    }
});

//selecting Date
addEventListener('click',function(e){
    if(e.target.className==='date'){
        e.target.style.backgroundColor='teal';
        e.target.style.color='white';
    }
})

//open to-do list
var list=document.getElementById('todo');

function todo(){
    console.log("tlist");
    document.getElementById('overlay').style.display='block';
    list.style.display= 'block';
}

//closes t-do list
function shut(){
    console.log("clicked");
    document.getElementById('overlay').style.display='none';
    list.style.display='none';
}

//adding tasks in to-do list
const addTask=document.forms['addtask'];

addTask.addEventListener('submit',function(e){
    e.preventDefault();
    const val=addTask.querySelector('input[type="text"]').value;
    const tdate=addTask.querySelector('input[type="date"]').value;
    if(val===''){
        alert('add some event');
    }
    else if(tdate===' '){
        alert('Add Date');
    }
    else if(val==='' && tdate===''){
        alert('Add Event and Date');
    }
    else{
        const list=document.querySelector("#list");
        const li=document.createElement("li");
        const taskdate=document.createElement("span");
        const taskName=document.createElement("span");
        const del=document.createElement("span");
        const space=document.createElement("span");
        const chk=document.createElement("span")

        del.textContent='Delete';
        taskdate.textContent=tdate;
        space.textContent=' ';
        taskName.textContent=val;
        chk.textContent='Done';

        taskName.classList.add('name');
        del.classList.add('delete');
        del.onclick=remove;
        chk.classList.add('complete');
        chk.onclick=done;

        li.appendChild(taskdate);
        li.appendChild(space);
        li.appendChild(taskName);
        li.appendChild(del);
        li.appendChild(chk);
        list.appendChild(li);
    

        localStorage.setItem(val,tdate);

        addTask.querySelector('input[type="text"]').value="";
        addTask.querySelector('input[type="date"]').value="";
    }
});

//removing tasks from to-do list
function remove(){
    addEventListener('click',function(e){
        if(e.target.className==='delete'){
            const li= e.target.parentElement;

        li.parentNode.removeChild(li);
        }
    });
}

//Task Completed
function done(){
    addEventListener('click',function(e){
        console.log(e.target.className);
        if(e.target.className==='complete'){
            const li= e.target.parentElement;
            li.style.textDecoration= 'line-through';
            li.style.backgroundColor='lavenderblush';
        }
    });
}