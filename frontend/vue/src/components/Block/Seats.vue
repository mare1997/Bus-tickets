<template>
  <div>
    <div class="cockpit">
      <h6>Please select a seat number if you want</h6>
    </div>
    <ul class="bus">
      <li class="bus-seats"  v-for="(row, index) of tick" :key="index">
        <ul class="bus-rows">
          <li class="bus-row seat" v-for="(ticket) of row" :key="ticket.id">
            <input type="checkbox" :id="ticket.seats.number" :disabled="ticket.order" :checked="ticket.order" @click="click(ticket)" />
            <label :for="ticket.seats.number">{{ ticket.seats.number }}</label>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <table>
      <tr v-for="(row, index) of tick" :key="index">
        <td class="seat" v-for="(ticket) of row" :key="ticket.id">
          <input type="checkbox" :id="ticket.seats.number" :disabled="ticket.order" />
          <label :for="ticket.seats.number">{{ ticket.seats.number }}</label>
        </td>
      </tr>
    </table> -->
  </div>
</template>

<script>
export default {
  name: 'Seats',
  props: {
    travelingId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tickets: [],
      value: '',
      ticketForBuy: []
    }
  },
  computed: {
    tick () {
      let ticketsWithRowOrder = []
      let row = []
      this.tickets.forEach((ticket, index) => {
        if (index % 4 === 0) {
          ticketsWithRowOrder.push(row)
          row = []
          row.push(ticket)
          return
        }
        row.push(ticket)
      })
      return ticketsWithRowOrder.filter(a => a.length > 0)
    }
  },
  mounted () {
    this.getTickets()
  },
  methods: {
    async getTickets () {
      this.tickets = await this.$store.dispatch('ticket/getTickets', { id: this.travelingId })
    },
    click (ticket) {
      const isChecked = this.ticketForBuy.find(t => t.id === ticket.id)
      if (!isChecked) {
        this.ticketForBuy.push(ticket)
      } else {
        this.ticketForBuy = this.ticketForBuy.filter(t => t.id !== ticket.id)
      }
      this.$emit('set-tickets', this.ticketForBuy)
    }
  }
}
</script>

<style scoped>
tr {
  vertical-align: inherit !important;
}
.bus {
  display: flex;
  flex-direction: column;
}

.bus-rows {
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.seat {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
  padding-right: 10px;
  min-width: 70px;
}
[type="checkbox"]:not(:checked),
  [type="checkbox"]:checked {
    position: absolute;
    left: 0;
    opacity: 0.01;
  }
  [type="checkbox"]:not(:checked) + label,
  [type="checkbox"]:checked + label {
    position: relative;
    padding-left: 2.3em;
    font-size: 1.05em;
    line-height: 1.7;
    cursor: pointer;
  }

  /* checkbox aspect */
  [type="checkbox"]:not(:checked) + label:before,
  [type="checkbox"]:checked + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1.4em;
    height: 1.4em;
    border: 1px solid #aaa;
    background: #FFF;
    border-radius: .2em;
    box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 rgba(203, 34, 237, .2);
    -webkit-transition: all .275s;
        transition: all .275s;
  }

  /* checked mark aspect */
  [type="checkbox"]:not(:checked) + label:after,
  [type="checkbox"]:checked + label:after {
    content: '✕';
    position: absolute;
    top: .525em;
    left: .18em;
    font-size: 1.375em;
    color: #CB22ED;
    line-height: 0;
    -webkit-transition: all .2s;
        transition: all .2s;
  }

  /* checked mark aspect changes */
  [type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0) rotate(45deg);
        transform: scale(0) rotate(45deg);
  }

  [type="checkbox"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1) rotate(0);
        transform: scale(1) rotate(0);
  }

  /* Disabled checkbox */
  [type="checkbox"]:disabled:not(:checked) + label:before,
  [type="checkbox"]:disabled:checked + label:before {
    box-shadow: none;
    border-color: #bbb;
    background-color: #e9e9e9;
  }

  [type="checkbox"]:disabled:checked + label:after {
    color: #777;
  }

  [type="checkbox"]:disabled + label {
    color: #aaa;
  }

  /* Accessibility */
  [type="checkbox"]:checked:focus + label:before,
  [type="checkbox"]:not(:checked):focus + label:before {
    box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 6px rgba(203, 34, 237, .2);
  }
  ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

</style>