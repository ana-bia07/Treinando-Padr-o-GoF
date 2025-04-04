//FACTORY METHOD / ABSTRACT METHOD

class IServicoFactory{
    criarLanche(){};
}

class Pizzaria extends IServicoFactory{
    criarLanche(){
        return new Pizza();
    }
}

class Hamburgueria extends IServicoFactory{
    criarLanche(){
        return new Hamburguer();
    }
}

// PROTOTYPE / BUILDER

class Pizza{
    constructor(nome, ingrediente=[]){
        this.nome  = nome;
        this.ingrediente = ingrediente;
    }

    clone(){
        return new Pizza(this.nome,[...this.ingrediente])
    }

    addAdicional(adicional){
        this.ingrediente.push(adicional);
    }
}

class Hamburguer{
    constructor(nome, carne, adicionaisH=[]){
        this.nome = nome;
        this.carne = carne;
        this.adicionaisH = adicionaisH;
    }

    clone(){
        return new Hamburguer(this.nome, this.carne,[...this.adicionaisH])
    }

    addAdicionalH(adicional){
        this.adicionaisH.push(adicional);
    }
}

// SINGLETON

class Pedido{
    constructor(){
        if(!Pedido.instance){
            this.itens = [];
            Pedido.instance = this;
        }
        return Pedido.instance;
    }

    adicionarItem(item){
        this.itens.push(item);
    }

    verPedido(){
        return this.itens;
    }
}

// CRIANDO PROTUDOS HAMBURGUERIA
const HamburguerLegal = new Hamburgueria();
const hamburguer = HamburguerLegal.criarLanche();

const xBurguer = new Hamburguer("X-Burguer", "Hamburgue", ["Queijo"]);

const xEgg = xBurguer.clone();
xEgg.nome = "xEgg";
xEgg.carne = "Ovo";
xEgg.addAdicionalH("Salada");

const XSalada = xBurguer.clone();
XSalada.nome = "xSalada";
XSalada.addAdicionalH("Salada", "Tomate");

// CRIANDO PROTUDOS PIZZARIA

const PizzariaMaisLegal = new Pizzaria();
const pizza = PizzariaMaisLegal.criarLanche();

const queijo =  new Pizza("Pizza de Queijo", ["Queijo"]);

const calabresa = queijo.clone();
calabresa.nome = "Calabresa"
calabresa.addAdicional("Calabresa");

const portuguesa = queijo.clone();
portuguesa.nome = "Portuguesa";
portuguesa.addAdicional("Bacon", "Palmito");

//PEDIDO BURGUER

const pedidoBurguer = new Pedido();
pedidoBurguer.adicionarItem(XSalada);
pedidoBurguer.adicionarItem(xBurguer);

console.log("Confira o pedido: ", pedidoBurguer.verPedido());

//PEDIDO PIZZA
const pedidoPizza = new Pedido();
pedidoPizza.adicionarItem(queijo);
pedidoPizza.adicionarItem(calabresa);

console.log("Confira o pedido: ", pedidoPizza.verPedido());

 
