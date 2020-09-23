<template>
  <div>
    <v-row>
      <v-col cols="8" md="8">
        <v-card class="mx-7 my-7" :elevation="10">
          <v-row class="mx-8 my-8">
            <v-col div v-for="item in product" :key="item.id">
              <v-card class="d-inline-block mx-auto" :elevation="10">
                <v-img :src="item.image" height="200px"></v-img>

                <v-card-title>
                  {{ item.name }}
                </v-card-title>

                <v-card-subtitle> {{ item.price }} &#3647; </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    rounded
                    color="red"
                    @click="pay(item.name, item.price, item.in_stock)"
                    style=""
                  >
                    Buy
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="4" md="4">
        <v-row>
          <v-col>
            <v-card
              class="mx-7 my-5"
              width="85%"
              height="200px"
              :elevation="10"
            >
              <v-row>
                <v-card-title class="coins">
                  <v-row>
                    <v-col lg="12">
                      <span class="mx-8"
                        >เหรียญที่รับมา : {{ coin }}</span
                      ></v-col
                    ></v-row
                  >
                  <v-row>
                    <v-col lg="12">
                      <h4>
                        <span class="mx-8">รวม : {{ totalCoin }}&#3647;</span>
                      </h4></v-col
                    ></v-row
                  >
                  <v-row>
                    <v-col lg="12">
                      <h4>
                        <span class="mx-8"
                          >เหรียญที่เหลือ : {{ changeCoin }}</span
                        >
                      </h4></v-col
                    ></v-row
                  >
                  <v-row>
                    <v-col lg="12">
                      <h4>
                        <span class="mx-8"
                          >สินค้าที่เลือก : {{ productName }}</span
                        >
                      </h4></v-col
                    ></v-row
                  >
                </v-card-title>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="mx-7 my-5 coins_number" width="85%" :elevation="10">
              <v-row class="text-center">
                <v-col>
                  <v-btn
                    pill
                    @click="insertCoin(10)"
                    class="font-weight-black"
                    fab
                    dark
                    x-large
                    >10</v-btn
                  >
                </v-col>
                <v-col>
                  <v-btn
                    pill
                    @click="insertCoin(5)"
                    class="font-weight-black"
                    fab
                    dark
                    x-large
                    >5</v-btn
                  >
                </v-col>
              </v-row>
              <v-row class="text-center">
                <v-col>
                  <v-btn
                    pill
                    @click="insertCoin(2)"
                    class="font-weight-black"
                    fab
                    dark
                    x-large
                    >2</v-btn
                  >
                </v-col>
                <v-col>
                  <v-btn
                    pill
                    @click="insertCoin(1)"
                    class="font-weight-black"
                    fab
                    dark
                    x-large
                    >1</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-btn pill varrant="outline-primary" @click="refund()">clear</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coin: [],
      changeCoin: [],
      in_stock: Boolean,
      product: [],
      productName: "",
      remain: 0,
      totalCoin: 0,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.product = [];
      this.axios
        .get("v2/5c77c5b330000051009d64c9")
        .then((response) => {
          this.product = response.data.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    insertCoin(res) {
      this.coin.push(res);
      this.totalCoin = res + this.totalCoin;
    },
    pay(name, price, in_stock) {
      // check stock
      //set changeCoin=0
      this.changeCoin = [];
      if (in_stock == true) {
        // check totalCoin > price
        if (this.totalCoin >= price) {
          this.totalCoin = this.totalCoin - price;
          this.remain = this.totalCoin;
          this.productName = name;
          //เงินทอน
          while (this.remain > 0) {
            if (this.remain >= 10) {
              this.changeCoin.push(10);
              this.remain = this.remain - 10;
              this.totalCoin = 0;
              this.coin = [];
            } else if (this.remain >= 5) {
              this.changeCoin.push(5);
              this.remain = this.remain - 5;
              this.totalCoin = 0;
              this.coin = [];
            } else if (this.remain >= 2) {
              this.changeCoin.push(2);
              this.remain = this.remain - 2;
              this.totalCoin = 0;
              this.coin = [];
            } else if (this.remain >= 1) {
              this.changeCoin.push(1);
              this.remain = this.remain - 1;
              this.totalCoin = 0;
              this.coin = [];
            } else {
              this.remain = 0;
            }
          }
        } else {
          this.productName = "not enough money";
        }
      } else {
        this.productName = "out of stock";
      }
    },
    refund() {
      this.changeCoin = this.coin;
      this.totalCoin = 0;
      this.productName = this.name;
      this.coin = [];
    },
  },
};
</script>

<style>
  .v-btn__content{
    align-items: center;
    color: darkmagenta;
    display: flex;
    flex: 1 0 auto;
    justify-content:darkmagenta ;
    line-height: normal;
    position: relative;
    font-size: 20px;
  }
</style>
