let user=document.getElementById("user_form");
const retrieve=()=>{
    let entries=localStorage.getItem("entries");
    if(!entries){
        entries=[];
    }
    else{
        entries=JSON.parse(entries);
    }
    return entries;
};
let user_data=retrieve();
const display=()=>{
    const entries=retrieve();
    const tableEntries=entries.map((entry)=>{
        const namecell=`<td>${entry.name}</td>`;
        const emailcell=`<td>${entry.email}</td>`;
        const passwordcell=`<td>${entry.password}</td>`;
        const dobcell=`<td>${entry.dob}</td>`;
        const acceptcell=`<td>${entry.accept}</td>`;
        const row=`<tr>${namecell}${emailcell}${passwordcell}${dobcell}${acceptcell}</tr>`;
        return row;
    }).join("\n");

    const table=`<table><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted Terms</th>

    </tr>${tableEntries}</table>`;
    
let details=document.getElementById("user-entries");
details.innerHTML=table;
};
let entries=retrieve();
const saveForm=(event)=>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const accept=document.getElementById("accept").checked;
    const dobInput = document.getElementById("dob");
    const dobValue = dobInput.value;
    
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 35); 
    const maxDate = new Date(currentDate);
    maxDate.setFullYear(currentDate.getFullYear() - 18); 

    const dobDate = new Date(dobValue);

    if (dobDate < minDate || dobDate >= maxDate) {
        alert("Please enter a valid date of birth between 18 and 35 years old.");
        return;
    }

    const entry={
        name,email,password,dob,accept
    };
    entries.push(entry);
    localStorage.setItem("entries",JSON.stringify(entries));
    display();
}


user.addEventListener("submit",saveForm);
display();

const clearEntries = () => {
    entries = []; 
    localStorage.removeItem("entries");
    display();
};

document.getElementById("clearButton").addEventListener("click", clearEntries);
