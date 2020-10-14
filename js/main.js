Vue.component('cabecera', { 

    data() {

		return{
            
        }
    },

    props: ['colorJugar'],

    methods: {

    },

    template: `
            <div id="header">

		        <h1>The Great <br>
			    <span id="colorDisplay">rgb({{colorJugar.r}}, {{colorJugar.g}}, {{colorJugar.b}})</span>
			    <br>
                Guessing Game
                </h1>

	        </div> `
})

Vue.component('cuadrado', { 

    data() {

		return{

            backgroundColor: `rgb(${this.color.r},${this.color.g},${this.color.b})`

        };

    },
    props: ['color','index','conocerGanador'],

    methods: {

        verColor(){

            colorclickeado= this.color;
            this.conocerGanador(colorclickeado, this.index);

        },

    },
    template: `
            <div id="container">

                <div class="square" :style="{'background-color': backgroundColor}" @click="verColor"></div>

            </div>`
})

Vue.component('navegador', { 

    data() {

		return{

            isHard:true,
            colorCount:6

        }

    },
    props: ['colorJugar','colors', 'mensaje'],

    created(){

        this.restart()
    },

    methods: {

        restart(){

            this.colors.splice(0, this.colors.length, ...this.createNewColors(this.colorCount));
            let pickedColor = this.colors[this.pickColor()];
            this.colorJugar.r = pickedColor.r;
            this.colorJugar.g = pickedColor.g;
            this.colorJugar.b = pickedColor.b;

        },

        createRandomStringColor(){

            return {

                r: this.randomInt(),
                g: this.randomInt(), 
                b: this.randomInt()

            };

        },

        createNewColors(numbers){

            let arr = [];

            for (var i = 0; i < numbers; i++) {

                arr.push(this.createRandomStringColor());

            }

            return arr;

        }, 

        pickColor(){

            let quantity = 3;

            if (this.isHard) {

                quantity = 6;

            }

            return Math.floor(Math.random() * quantity );
        },

        facil(){

            if (this.isHard) {

                this.isHard = false;
                this.colorCount = 3;
                this.restart();

            }

        },

        dificil(){

            if (!this.isHard) {

                this.isHard = true;
                this.colorCount = 6;
                this.restart();

            }

        },

        randomInt(){

            return Math.floor(Math.random() * 256);

        }        
},
    
    template: `
        <div id="navigator">

            <button id="reset" @click="restart">New colors</button>
            <span id="message"> {{ mensaje }} </span>
            <button id="easy" :class="{ selected: !isHard }" @click="facil">easy</button>
            <button id="hard" :class="{ selected: isHard }" @click="dificil">hard</button>
    
        </div>`
})



var app = new Vue({
    el: '#app',

    data: {
       colorJugar: {
           r: 0,
           g: 0,
           b: 0
       },
       colors: [],
       mensaje:'',
       colorclickeado:'',
    },

    methods: {
        conocerGanador(colorcuadrado, cuadradoIndex){

            if(JSON.stringify(colorcuadrado) === JSON.stringify(this.colorJugar)){

                this.mensaje="Felicidades, ganaste!";

                for (let index = 0; index < this.colors.length; index++) {

                    Object.assign(this.colors[index], colorcuadrado);
                    
                  }

            }else{

                this.mensaje="Volver a intentar";
                this.colors[cuadradoIndex].r = 35;
                this.colors[cuadradoIndex].g = 35;
                this.colors[cuadradoIndex].b = 35;

            }
        },

        myKey(color){

            const randomNumber = Math.random() * 100000;
            return '' + randomNumber + color.r +color.g +color.b;

        }
    },
})