<template>
  <!-- <div class="comment-section">
    <div class="comment_block">
      <div class="create_new_comment">
      <div class="user_avatar">
        <img src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg">
      </div><div class="input_comment">
        <input type="text" placeholder="Ime..">
        <input type="text" placeholder="Vas komentar..">
      </div>

      </div>
      <div class="new_comment">
        <ul class="user_comment">
          <div class="user_avatar">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg">
          </div><div class="comment_body">
            <p>Gastropub cardigan jean shorts, kogi Godard PBR&B lo-fi locavore. Organic chillwave vinyl Neutra. Bushwick Helvetica cred freegan, crucifix Godard craft beer deep v mixtape cornhole Truffaut master cleanse pour-over Odd Future beard. Portland polaroid iPhone.</p>
          </div>
          <div class="comment_toolbar">
            <div class="comment_details">
              <ul>
                <li><i class="fa fa-clock-o"></i> 13:94</li>
                <li><i class="fa fa-calendar"></i> 04/01/2015</li>
                <li><i class="fa fa-pencil"></i> <span class="user">John Smith</span></li>
              </ul>
              </div>
          </div>
        </ul>
      </div>
    </div>
  </div> -->
  <div class="comment-section">
    <div class="comment_block">
      <div class="create_new_comment">
      <div class="user_avatar">
        <img src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg">
      </div><div class="input_comment">
        <input type="text" v-model="fullname" placeholder="Ime i prezime (nadimak)...">
        <input type="text" v-model="title" placeholder="Naslov...">
        <input type="text" v-model="description" placeholder="Vas komentar...">
        <button @click="createComment" class="button">Dodaj komentar</button>
      </div>

      </div>
      <div class="new_comment">
        <ul class="user_comment" v-for="comm in comments" :key="comm.id + Math.random()">
          <div class="user_avatar">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg">
          </div><div class="comment_body">
            <p><b>{{comm.title}}</b></p>
            <p>{{comm.description}}</p>
          </div>
          <div class="comment_toolbar">
            <div class="comment_details">
              <ul>
                <li><i class="fa fa-clock-o"></i>{{getDate(comm.date)}}</li>
                <li><i class="fa fa-calendar"></i>{{getTime(comm.date)}}</li>
                <li><i class="fa fa-pencil"></i> <span class="user">{{comm.fullname}}</span></li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Comment',
  data () {
    return {
      comments: [],
      fullname: '',
      title: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      getUser: 'user/getUser'
    }),
    getUserId () {
      if (this.isLoggedIn) {
        return this.getUser.id
      } else {
        return 0
      }
    }
  },
  async mounted () {
    await this.getComments()
  },
  methods: {
    async getComments () {
      this.comments = await this.$store.dispatch('comment/search', { id: this.$route.params.id }, { root: true })
    },
    async createComment () {
      let comment = await this.$store.dispatch('comment/create',
        {
          fullname: this.fullname,
          title: this.title,
          description: this.description,
          date: new Date(),
          carrierId: this.$route.params.id,
          userId: this.getUserId }, { root: true })

      this.comments.push(comment)
      this.fullname = ''
      this.title = ''
      this.description = ''
    },
    getDate (value) {
      let date = new Date(value)
      return date.toLocaleDateString('en-US')
    },
    getTime (value) {
      let date = new Date(value)
      return date.getTime()
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
*, *:before, *:after {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  transition: all 0.2s ease;
}
body, html {
  height: 100%;
  width: 100%;
}
body {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #333;
  background-color: #f4f4f4;
}
.user_avatar {
  width: 65px;
  height: 65px;
  display: inline-block;
  vertical-align: middle;
}
.user_avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.comment_block {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.comment_block .create_new_comment {
  width: 100%;
  padding: 20px 0;
}
.comment_block .create_new_comment .input_comment {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  width: calc(100% - 75px);
}
.comment_block .create_new_comment .input_comment input[type="text"] {
  width: 100%;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 1.3rem;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #f2f2f2;
}
.comment_block .create_new_comment .input_comment input[type="text"]:focus {
  outline: none;
  border-bottom: 2px solid #e6e6e6;
}
.comment_block .new_comment {
  width: 100%;
  height: auto;
  padding: 20px 0;
  border-top: 1px solid #e6e6e6;
}
.comment_block .new_comment .user_comment {
  list-style-type: none;
}
.comment_block .new_comment .comment_body {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 75px);
  min-height: 65px;
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 0.9rem;
  color: #555;
  background-color: #fff;
  border-bottom: 2px solid #f2f2f2;
}
.comment_block .new_comment .comment_body .replied_to {
  margin: 5px 0px;
  background-color: #fafafa;
  border-bottom: 2px solid #f2f2f2;
  border-radius: 5px;
}
.comment_block .new_comment .comment_body .replied_to p {
  padding: 5px;
}
.comment_block .new_comment .comment_body .replied_to span {
  color: #6495ed;
  margin-right: 2px;
}
.comment_block .new_comment .comment_toolbar {
  width: 100%;
}
.comment_block .new_comment .comment_toolbar ul {
  list-style-type: none;
  padding-left: 75px;
  font-size: 0;
}
.comment_block .new_comment .comment_toolbar ul li {
  display: inline-block;
  padding: 5px;
  font-size: 0.7rem;
  color: #d9d9d9;
}
.comment_block .new_comment .comment_toolbar ul li:hover {
  cursor: pointer;
}
.comment_block .new_comment .comment_toolbar .comment_details {
  display: inline-block;
  vertical-align: middle;
  width: 70%;
  text-align: left;
}
.comment_block .new_comment .comment_toolbar .comment_tools {
  display: inline-block;
  vertical-align: middle;
  width: 30%;
  text-align: right;
}
.comment_block .new_comment .comment_toolbar .comment_tools li:hover {
  color: #ccc;
}
.comment_block .new_comment .user:hover {
  color: #6495ed;
  text-decoration: underline;
}
.comment_block .new_comment .love:hover {
  color: #ff6347;
}
.button {
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;
  color: red;
  padding: 5px;
  margin: 5px;
  float: right;
  border: 1px solid rgb(51, 51, 51);
  border-radius: 10%;
}
.button:hover {
  background-color: red;
  color: black;
}
</style>