// Same JavaScript code I provided earlier
const form = document.createElement("form");
form.setAttribute("style", "border:1px solid black; padding:15px; width:350px;");

const heading = document.createElement("h3");
heading.innerText = "Employee Details";
form.appendChild(heading);

function createInput(labelText, type, name) {
    const label = document.createElement("label");
    label.innerText = labelText + ": ";
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    label.appendChild(input);
    const br = document.createElement("br");
    const br2 = document.createElement("br");
    form.appendChild(label);
    form.appendChild(br);
    form.appendChild(br2);
}

createInput("First name", "text", "firstName");
createInput("Last name", "text", "lastName");

const male = document.createElement("input");
male.type = "radio";
male.name = "gender";
male.value = "Male";
const female = document.createElement("input");
female.type = "radio";
female.name = "gender";
female.value = "Female";

form.appendChild(male);
form.appendChild(document.createTextNode(" Male "));
form.appendChild(female);
form.appendChild(document.createTextNode(" Female "));
form.appendChild(document.createElement("br"));
form.appendChild(document.createElement("br"));

createInput("Employee ID", "text", "empId");
createInput("Designation", "text", "designation");
createInput("Phone Number", "text", "phone");

const btn = document.createElement("button");
btn.type = "submit";
btn.innerText = "Submit";
form.appendChild(btn);

document.body.appendChild(form);
