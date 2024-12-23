import streamlit as st
from utils.utils import set_background
st.set_page_config(
    page_title="AI Chat Interface",
    page_icon="🤖",
    layout="wide"
)

st.title("NextAI Service: Intelligent Chat Interface System")
set_background("demo/asset/background_picture.png")
# Demo Video
st.subheader("Demo video")
st.video("https://www.youtube.com/watch?v=dYkPg-vg9Mk")