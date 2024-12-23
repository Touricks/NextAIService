import streamlit as st
from utils.utils import set_background
set_background("demo/asset/background_picture.png")

st.title("System Demo")
st.header("Key Features in Action")

# User Interface
st.subheader("User Interface")
st.image("demo/asset/1_0.png")

st.subheader("Register & Login & Logout")
st.image("demo/asset/1_1.png")

st.subheader("Favorite/ Unfavorite Game Videos")
st.image("demo/asset/1_2.png")

st.subheader("Get Recommendations based on User Preferences")
st.image("demo/asset/1_3.png", caption = "Application provide recommendations based on user preferences")
# Recommendation System
st.header("Want to Try?")
st.markdown("[Click here to have a try!](https://hsnim2dpva.us-east-1.awsapprunner.com )")

