
class gravarDadosDB{
  constructor(){
    
    let id = localStorage.getItem('id')
    if ( id === null )

    localStorage.setItem('id', 0)

  }
    

    getProximoId() {

   let proximoId = localStorage.getItem('id')

   return (parseInt(proximoId) + 1)

    }


   gravarDespesa(dados){

    let id = this.getProximoId()

    localStorage.setItem(id, JSON.stringify(dados))
    localStorage.setItem('id', id)

    
    //return console.log(dadinhos)
  }

  recuperarTodosRegistros(){

      let despesas = []

     let id = localStorage.getItem('id')

     for(let i = 1 ; i <= id; i++){
      let  despesa = JSON.parse(localStorage.getItem(i))
      let despesa_id = i
      
      if(despesa == null){

        //console.log('Existe null')
        continue //Avança para interação seguinte e desconsidera a sequência
      }
      else{
        
        despesa.id = despesa_id
        despesas.push(despesa)

        console.log(despesas)
        }
     }

    // console.log(despesas)
     return despesas
  }

  pesquisar(despesa){ //Nesta parte recupero o a despesa que esta sendo criada no momento que sera realizada a pesquisa
      
    let despesasFiltradas = []

    despesasFiltradas = this.recuperarTodosRegistros() // dados que ja temos criados e instanciados

    console.log(despesa)
    console.log(despesasFiltradas)
    
    if(despesa.ano != ''){
      console.log('Filtro de ano aplicado')
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
    }

    if(despesa.mes != ''){
      console.log('Filtro de mes aplicado')
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
    }

    if(despesa.dia != ''){
      console.log('Filtro de dia aplicado')
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
    }

    if(despesa.type != ''){
      console.log('Filtro de tipo aplicado')
      despesasFiltradas = despesasFiltradas.filter(d => d.type == despesa.type)
    }

    if(despesa.desc != ''){
      console.log('Filtro de descrição aplicado')
      despesasFiltradas = despesasFiltradas.filter(d => d.desc == despesa.desc)
    }

    if(despesa.valor != ''){
      console.log('Filtro de valor aplicsado')
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
    }

    //console.log(despesasFiltradas)

    return despesasFiltradas
  } 

  removerDados(id){

    localStorage.removeItem(id)

  }


}

class NovaDespesa{
    
  //ano = 15
  constructor(ano,mes,dia,type,desc,valor){
   
   //parseInt(this.ano)
   //parseInt(ano)
   //this.ano = parseInt(this.ano) + parseInt(ano) //Math.round(this.ano + ano)
   this.ano = ano
   this.mes = mes
   this.dia = dia
   this.type = type
   this.desc = desc
   this.valor = valor

  }
    verificarDados(){

      for(let i in this){
        if(this[i] == undefined || this[i] == '' || this[i] == null){

          //console.log(this[i])
          return false    
        }
      }
     return true
    }

}

var db = new gravarDadosDB()

function PegarDados() {

    var valorAno = document.querySelector('div select#ano').value
    var valorMes = document.querySelector('div select#mes').value
    var valorDia = document.querySelector('div input#dia').value
    var valorType = document.querySelector('div select#tipo').value
    var valorDesc = document.querySelector('div input#descricao').value
    var valorValor = document.querySelector('div input#valor').value

    //var valorAno = document.getElementById('ano')
    //console.log(valorAno)
    //console.log(valorMes)
    //console.log(valorDia)
    console.log(valorAno,valorMes, valorDia, valorType,valorDesc,valorValor)
    //window.alert('teste')
   // var btn1 = document.querySelector('body btn#btnInit')

    //console.log(btn1)
    
    criarDespesa = new NovaDespesa(valorAno, valorMes, valorDia, valorDesc, valorType, valorValor)

    //console.log(criarDespesa.verificarDados())

    if (criarDespesa.verificarDados()){

       criarDespesa = new NovaDespesa(valorAno, valorMes, valorDia, valorDesc, valorType, valorValor)

      //console.log(criarDespesa)

      
    
      db.gravarDespesa(criarDespesa)
      
      var paiH5 = document.querySelector('div#paiH5')
      document.querySelector('div h5#exampleModalLabel').innerHTML = 'Sucesso na gravação'
      var ElementH5 = document.querySelector('div h5#exampleModalLabel')
      ElementH5.setAttribute('class', 'modal-header text-success')
      element1 = document.querySelector('div#element1')
      //element1.setAttribute('style')
      element1.style.backgroundColor = '#90EE90'
      document.querySelector('div#element1').innerHTML = 'Gravação Realizada com Sucesso!!!'
      footerElement = document.querySelector('button#BtnfooterElement')
      footerElement.setAttribute('class', 'btn btn-success')

      // Existem 2 formas de modificar valores dos elements:
      // 1 - forma
      // footerElement = document.querySelector('button#BtnfooterElement')
      // footerElement.setAttribute('class', 'btn btn-success')
      // 2 - forma
      // footerElement = document.querySelector('button#BtnfooterElement').className = 'btn btn-success'


     
     //var RefModelH5 = document.querySelector('div h5#exampleModalLabel')
     

      //RefModelH5.value = 'Teste'
      //console.log(RefModelH5.value)
      //var TextNode = document.createTextNode('Sucesso na Gravação')
      //var newElement = document.createElement('h5')
      //paiH5.appendChild(newElement)
      //newElement.appendChild(TextNode)
      //console.log(RefModelH5)


      //RefModelH5.value = 'Sucesso na Gravação' 


    //console.log(criarDespesa)

    $('#sucessoGravacao').modal('show')

     document.querySelector('div select#ano').value = ''
     document.querySelector('div select#mes').value = ''
     document.querySelector('div input#dia').value = ''
     document.querySelector('div select#tipo').value = ''
     document.querySelector('div input#descricao').value = ''
     document.querySelector('div input#valor').value = ''
      
    }
    else{

      //window.alert('Por favor ajustar cadastro')
      var paiH5 = document.querySelector('div#paiH5')
      document.querySelector('div h5#exampleModalLabel').innerHTML = 'Erro na gravação'
      var ElementH5 = document.querySelector('div h5#exampleModalLabel')
      ElementH5.setAttribute('class', 'modal-header text-danger')
      element1 = document.querySelector('div#element1')
     //element1.setAttribute('style')
     element1.style.backgroundColor = '#800000'
     document.querySelector('div#element1').innerHTML = 'Ocorreu um erro ao realizar a transação'
     footerElement = document.querySelector('button#BtnfooterElement')
     footerElement.setAttribute('class', 'btn btn-danger')

     
      //RefModelH5.removeChild(RefModelH5.value)
      //console.log(RefModelH5.value,RefModelH5)
     // paiH5.removeChild(RefModelH5)
      //var TextNode = document.createTextNode('Erro na Gravação')
      //var newElement = document.createElement('h5')
      //paiH5.appendChild(newElement)
      //newElement.appendChild(TextNode)
      //RefModelH5.value = 'Erro na gravação'
      
      $('#sucessoGravacao').modal('show')




      }
  }

    function carregaListaDespesas(despesas = [], filter = false){

      //let despesas = []

      if(despesas.length == 0 &&  filter == false ) {

        despesas = db.recuperarTodosRegistros()

      }
      

      let listaDespesas = document.getElementById('tDespesas')
      listaDespesas.innerHTML = ''
      //console.log('teste',despesas)
      //console.log(listaDespesas)
      // innerHTML é o conteudo interno de uma TAG
      despesas.forEach(function (d) {
        // Criar a linha (TR)
        let linha = listaDespesas.insertRow()
        // Criar as colunas (TD) - Cells = Columns
        linha.insertCell(0).innerHTML =  `${d.dia}/${d.mes}/${d.ano}`         //d.dia + '/' + d.mes + '/' + d.ano
        
        switch(d.desc){
            case '1' : d.desc = 'Alimentação'
                  break
            case '2' : d.desc = 'Educação'
                  break
             case '3' : d.desc = 'Lazer'
                  break
              case '4' : d.desc = 'Saúde'
                  break
              case '5' : d.desc = 'Transporte'
                  break
        }

        linha.insertCell(1).innerHTML = d.desc
        

        linha.insertCell(2).innerHTML =  d.type
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class= "fas fa-times" </i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){ 
            let id = this.id.replace('id_despesa_', '')

            db.removerDados(id)

            window.location.reload()

          /*alert(this.id)*/ } //remover despesa
        linha.insertCell(4).append(btn)

      })

    }

    //console.log(criarDespesa.verificarDados)
    function pesquisarDespesa(){

        //console.log('Hello')

        let ano = document.querySelector('div select#ano').value
        let mes = document.querySelector('div select#mes').value
        let dia = document.querySelector('div input#dia').value
        let type = document.querySelector('div select#tipo').value
        let desc = document.querySelector('div input#descricao').value
        let valor = document.querySelector('div input#valor').value
      
      let despesa = new NovaDespesa(ano,mes,dia,type, desc, valor)

    let despesas =  db.pesquisar(despesa)

    carregaListaDespesas(despesas, true)

    // let listaDespesas = document.getElementById('tDespesas')

    // listaDespesas.innerHTML = ''
    // //console.log('teste',despesas)
    // //console.log(listaDespesas)
    // // innerHTML é o conteudo interno de uma TAG
    //   despesas.forEach(function (d) {
    //   // Criar a linha (TR)
    //   let linha = listaDespesas.insertRow()
    //   // Criar as colunas (TD) - Cells = Columns
    //   linha.insertCell(0).innerHTML =  `${d.dia}/${d.mes}/${d.ano}`         //d.dia + '/' + d.mes + '/' + d.ano
      
    //   switch(d.desc){
    //       case '1' : d.desc = 'Alimentação'
    //             break
    //       case '2' : d.desc = 'Educação'
    //             break
    //        case '3' : d.desc = 'Lazer'
    //             break
    //         case '4' : d.desc = 'Saúde'
    //             break
    //         case '5' : d.desc = 'Transporte'
    //             break
    //   }

    //   linha.insertCell(1).innerHTML = d.desc
      

    //   linha.insertCell(2).innerHTML =  d.type
    //   linha.insertCell(3).innerHTML = d.valor

    // })



                                   }
    








//btn1.onclick = PegarDados()

