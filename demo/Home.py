import streamlit as st
from utils.utils import set_background
st.set_page_config(
    page_title="AI Chat Interface",
    page_icon="🤖",
    layout="wide"
)

st.title("NextAI Service: Intelligent Chat Interface System")
set_background("demo/asset/background_picture.png")

st.markdown("""
    ### Try out these features:
    1. Ask a basic question about React
    2. Upload a travel itinerary document
    3. Use voice recognition for hands-free interaction
""")
st.markdown("""
    ### Notice
    - For security reason, the OpenAi API key has been removed from the folder in Github. 
    - You need to build .env in folder "server" and put API key inside.
    - For implementation, see "API KEY" and scan the picture inside to get the API key.
""")
# Demo Video
st.subheader("Demo video")
st.video("https://www.youtube.com/watch?v=dYkPg-vg9Mk")