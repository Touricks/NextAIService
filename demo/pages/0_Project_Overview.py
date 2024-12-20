import streamlit as st
from utils.utils import set_background
set_background("demo/asset/background_picture.png")

st.title("🎮 Twitch Content Recommendation System")
st.header("About the Project")
st.markdown("""
    This recommendation system helps users discover Twitch content based on their preferences.\n
    The system analyzes user behavior and provides personalized recommendations for game videos.""")
st.header("Key Features")
st.markdown("""
    - Personalized game recommendations
    - User preference tracking
    - Real-time Twitch data integration
    """)

st.header("Backend Architecture")
st.image("demo/asset/System_Architecture.png", caption="System Architecture Diagram")

st.header("Technology Stack")
col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("**Frontend**\n- React")

with col2:
    st.markdown("**Backend**\n- Spring Boot\n- MySQL\n- Caffeine\n- Mockito")

with col3:
    st.markdown("**Deployment**\n - Docker\n- AWS RDS\n - AWS AppRunner" )