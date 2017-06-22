let name = {
    template: ` <div class="section">
					<div class='name-wrap'>
						<div class="food-name" v-for="(lists,index) in listl" v-on:click="Bought(index)" :class='{default: lists.isBought,bought: !lists.isBought }' >
							{{lists.name}}
						</div>
				</div>
				</div>`,
    data: function() {
        return {};
    },
    props: ['listl'],
    methods: {
        Bought: function(index) {
            this.$emit('iss', index);
        }
    }
}
let food = {
    template: `<div class="section"><div class="group-wrap">
					<div class="food-group" v-for='(item,i) in arrl' v-on:click="food(i)" :class='{default1: item.isBought,bought1: !item.isBought }'>
						{{item.food }}
					</div>
			   </div>
			   </div>`,
    props: ['arrl'],
    methods: {
        food: function(i) {
            this.$emit('food', i);
        }
    }
}
let cart = {
    template: `<div class="section"> <div class="cart-wrap">
						<div class="shopping-cart" v-for='(items,j) in  cart1 '  >
							<span class="food ">{{items.food}}</span> <span class="food ">{{items.price | monny}}</span> <span class="food iconfont"  v-on:click='cart(j)'>&#xe600;</span>
						</div>
				</div>
				</div>`,
    props: ['cart1'],
    methods: {
        cart: function(j) {
            this.$emit('cart', j)
        }
    }
}
let title = {
    template: `<div class="title">
				<h2><span class="iconfont name-title" >&#xe735; 菜单</span>  </h2>
				<h2><span class="iconfont food-title">&#xe624;  食材  </span></h2>
				<h2><span class="iconfont cart-title">&#xe689;  购物车</span> </h2>
			  </div>`
}
let delAll = {
    template: `<div class="allprice">
				<span class="total-price">总价</span><span class="total-price">{{result1 |monny}}</span>
				<span class="total-price"><input class="total-price btn" type="button" value="清空" v-on:click='del()'/></span>
			</div>`,
    methods: {
        del: function() {
            this.$emit('del')
        }
    },
    props: ['result1']
}
Vue.filter('monny', function(value) {
    return value + '￥'
})
Vue.component('nameWrap', name)
Vue.component('foodWrap', food)
Vue.component('shoppingCart', cart)
Vue.component('clear', delAll)
Vue.component('tit', title)
let app = new Vue({
    el: '#app',
    data: {
        list: [{
            name: '',
            ellipsis: [{
                food: '',
                price: '',
                isBought: ''
            }],
            isBought: ''
        }],
        arr: [],
        cart: []
    },
    mounted() {
        this.getName()
    },
    methods: {
        getName: function() {
            let that = this
            axios.get('../cooke.json').then(function(data) {
                that.list = data.data.list
            })
        },
        clickName: function(index) {
            var a = this.list[index].isBought
            this.list.forEach(function(j) {
                j.isBought = true
            })
            var ell = this.list[index].ellipsis
            this.list[index].isBought = a
            if (this.list[index].isBought) {
                this.arr = ell
                this.list[index].isBought = !this.list[index].isBought
            } else {
                this.arr = []
                this.list[index].isBought = !this.list[index].isBought
            }
        },
        clickFood: function(i, j) {
            if (this.cart.indexOf(this.arr[i]) === -1) {
                this.arr[i].isBought = j || false
                this.arr[i].id = i
                this.cart.push(this.arr[i])
                $('.total-price').css({
                    display: 'inline-block'
                })
            } else {
                this.arr[i].isBought = j || false
            }
        },
        delFood: function(j) {
            var id = this.cart[j].id
            this.clickFood(id, true)
            this.cart.splice(j, 1)
            if (this.cart.length == 0) {
                $('.total-price').css({
                    display: 'none'
                });
            }
        },
        delAll: function() {
            this.cart = [];
            $('.total-price').css({
                display: 'none'
            });
            this.arr.forEach(function(i) {
                i.isBought = true
            })
        }
    },
    computed: {
        result: function() {
            var res = 0
            this.cart.forEach(function(i) {
                res -= (-i.price)
                res = res.toFixed(2)
            })
            return res
        }
    }

})
