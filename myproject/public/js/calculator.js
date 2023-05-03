const la = document.getElementById("loan-amount");
const lt = document.getElementById("loan-term");
const ir = document.getElementById("interestRate1");
const inputHandler = function(e) {
  calculateLoan()
}

la.addEventListener('input', inputHandler);
lt.addEventListener('input', inputHandler);
ir.addEventListener('input', inputHandler);

function calculateLoan() {
  // get input values
  var loanAmount = document.getElementById("loan-amount").value;
 // document.getElementById("loan-amount-current").innerText = loanAmount;
  var interestRate1 = document.getElementById('interestRate1').value;
  //var interestRate2 = document.getElementById('interestRate2').value;

  var loanTerm = document.getElementById("loan-term").value;
  //document.getElementById("loan-term-current").innerText = loanTerm;

  // calculate monthly payment for 
  var monthlyInterestRate = interestRate1 / 100 / 12;
  var monthlyPayment = loanAmount * monthlyInterestRate / (1 - (Math.pow(1 / (1 + monthlyInterestRate), loanTerm)));

 // var interest = loanAmount * anualrate / 100;
  // calculate monthly payment for 9.9
  //var monthlyInterestRate2 = interestRate2 / 100 / 12;
  //var monthlyPayment2 = loanAmount * monthlyInterestRate2 / (1 - (Math.pow(1 / (1 + monthlyInterestRate2), loanTerm)));

  // round to 2 decimal places
  monthlyPayment = monthlyPayment.toFixed(2);
 // monthlyPayment2 = monthlyPayment2.toFixed(2);

  // display monthly payment
  document.getElementById("amount1").innerHTML = monthlyPayment;

  //document.getElementById("amount2").innerHTML = monthlyPayment2;
}

// attach function to form submit button
var form = document.getElementById("loan-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  calculateLoan();
});