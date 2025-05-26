import React from "react";

function Idade(){

let   calcularIdade=()=>{
            let anoNasc = prompt("Digite que ano você nasceu: ");
                
            while (anoNasc >= 2025 || !anoNasc) {
                alert("Por favor, informe sua idade corretamente");
                anoNasc = prompt("Digite que ano você nasceu:");
            }

           
            let anoAtual = prompt("Em que ano estamos?");
            let idade = anoAtual - anoNasc;
            alert("Sua idade é: " + idade);
            console.log("Sua idade é: " + idade);
    }
            return(
            <div>
                <button onClick={calcularIdade}>Calculo de Idade</button>
            </div>
        )

        };




export default Idade;