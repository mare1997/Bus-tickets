<template>
  <div>
    <MainSearchNavBar :activeNav="'activeP'" />
    <div  class="parent">
      <div class="h2"><h2>Ime Prevoznika</h2></div>
      <section id="info">
        <div class="row">
          <div class="card">
            <h2>Prevoznik: 818181818</h2>
            <p>Telefon: 818181818</p>
            <p>Email: gadga@gdaga.rs</p>
            <p>Web: www.some.vs</p>
          </div>
        </div>
      </section>
      <Raiting />
      <div class="comment-section">
        <!-- comments container -->
        <div class="comment_block">
          <div class="create_new_comment">
          <div class="user_avatar">
            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg">
          </div><!-- the input field --><div class="input_comment">
            <input type="text" placeholder="Ime..">
            <input type="text" placeholder="Vas komentar..">
          </div>

          </div>
          <div class="new_comment">
            <!-- build comment -->
            <ul class="user_comment">
              <!-- current #{user} avatar -->
              <div class="user_avatar">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg">
              </div><!-- the comment body --><div class="comment_body">
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
      </div>
    </div>
  </div>
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Raiting from '@/components/Raiting.vue'
export default {
  name: 'CarrierPage',
  components: {
    MainSearchNavBar,
    Raiting
  }
}
</script>

<style scoped>
.parent {
  display: block;
  margin-left: 10%;
  margin-right: 10%;
}
.h2 {
  margin-top: 2%;
  text-align: center;
}
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
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
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
@import url("https://fonts.googleapis.com/css?family=Marvel:400,700");

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Marvel', sans-serif;
}

#info {
	padding: 3rem 0;
}

.row {
	width: 100%;
	max-width: 45rem;
	margin: 0 auto;
	padding: 1.5rem;
}

.card {
	display: inline-block;
	width: 100%;
	padding: 4rem 1rem 7rem 1rem;
	background-color: teal;
	position: relative;
}

.card:after {
	content: "";
	display: block;
	width: 0px;
	height: 0px;
	background-color: skyblue;
	top: 0px;
	right: 0px;
	border-bottom: 20px solid #006667;
	border-left: 20px solid #006667;
	border-right: 20px solid beige;
	border-top: 20px solid beige;
	position: absolute;
	filter: drop-shadow(-5px 5px 3px rgba(0, 0, 0, 0.5));
}

.card:before {
	content: "";
	display: block;
	width: 0px;
	height: 0px;
	border-top: 40px solid #006667;
	border-right: 40px solid #006667;
	border-left: 40px solid beige;
	border-bottom: 40px solid beige;
	bottom: 0px;
	left: 0px;
	position: absolute;
	filter: drop-shadow(7px -7px 5px rgba(0, 0, 0, 0.5));
}

.card:nth-of-type(1) {
	margin-right: 9%;
}

.card h2 {
	color: snow;
	margin-bottom: 1rem;
	font-weight: 400;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.card p {
	color: snow;
	font-size: 1.1rem;
	line-height: 140%;
}
</style>