import streamlit as st
from utils.utils import set_background
st.set_page_config(
    page_title="NextAI system",
    page_icon="🎮",
    layout="wide"
)

st.title("Next AI")
set_background("demo/asset/background_picture.png")
# Demo Video
st.subheader("Demo video")
st.video("https://www.youtube.com/watch?v=3yu9uoNDX6E")