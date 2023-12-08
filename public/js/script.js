import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'


async function postData(userdata){
    try {
        const response = await axios.post('/',userdata);
        console.log(response.data);
        console.log(userdata);
        addExpense(response.data);        
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(id){
    try {
        const response = await axios.get('/deleteExpense'+`/${id}`);
        console.log(response);        
    } catch (error) {
        console.log(error);
    }
}

async function updateData(id){
    try {
        const expense = await axios.get('/editExpense'+`/${id}`);
        await axios.get('/deleteExpense'+`/${id}`);        
    } catch (error) {
        console.log(error);
    }
}

const form = document.getElementById('expensetracker');
const expenseamount = document.getElementById('expenseamount');
const discription = document.getElementById('discription');
const category = document.getElementById('category');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let expenseamountValue = expenseamount.value;
    let discriptionValue = discription.value;
    let categoryVal = category.value;

    const userData = {
        expenseamountValue: expenseamountValue,
        discriptionValue: discriptionValue,
        categoryVal:categoryVal,
    }
               
    postData(userData);
    form.reset();
})


function addExpense(userData){

    const ulList = document.getElementById('newexpense');

    const li = document.createElement('li');
    li.className = "expenseList";
    li.setAttribute('data-user-data', JSON.stringify(userData));

    const text = document.createTextNode("Expenseamount: "+userData.expenseamount+" Discription: "+userData.description+" Category: "+userData.category);

    const deleteButton = document.createElement('button');
    deleteButton.classList = "delete";

    const editButton = document.createElement('button');
    editButton.classList = "edit";

    li.appendChild(text);
    deleteButton.appendChild(document.createTextNode('delete'));
    editButton.appendChild(document.createTextNode('edit'));

    li.appendChild(deleteButton);
    li.appendChild(editButton);

    ulList.appendChild(li);
}


const ulList = document.getElementById("newexpense");
ulList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        const li = e.target.parentElement;                        
        const userData = JSON.parse(li.getAttribute('data-user-data'))
        
        deleteData(userData.id);
        li.remove();
    }
    if(e.target.classList.contains('edit')){
        const liEdit = e.target.parentElement;
        const userEditData = JSON.parse(liEdit.getAttribute('data-user-data'));

        let expenseamount = document.getElementById('expenseamount');
        let discription = document.getElementById("discription");
        let category = document.getElementById("category");

        expenseamount.value = userEditData.expenseamount;
        discription.value = userEditData.description;
        category.value = userEditData.category;

        updateData(userEditData.id);
        liEdit.remove();         
    }
})
    
async function displayExpense(){    
    try {
        const response = await axios.get('/expenses');
        const length = Object.keys(response.data).length;
        for(let i=0;i<length;i++){
            const data = response.data[i];
            addExpense(data);
        }        

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load',()=>{
    displayExpense();
})