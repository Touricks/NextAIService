import streamlit as st
from utils.utils import set_background
set_background("demo/asset/background_picture.png")

# Title Section
st.title("🤖 Intelligent Chat Interface System")

# About Section
st.header("About the Project")
st.markdown("""
    This modern chat interface application integrates multiple input methods and file processing capabilities.
    The system leverages OpenAI's API to provide intelligent conversation abilities, supporting document
    analysis and voice recognition for a seamless human-computer interaction experience.
""")

# Key Features Section
st.header("Key Features")

# Create three columns for features
col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("#### 💬 Intelligent Chat")
    st.markdown("""
        - Context-aware responses
        - Real-time interaction
    """)

with col2:
    st.markdown("#### 📄 File Processing")
    st.markdown("""
        - Document content analysis
        - Intelligent data extraction
    """)

with col3:
    st.markdown("#### 🎤 Voice Recognition")
    st.markdown("""
        - Speech-to-text conversion
        - Hands-free operation
    """)

# Technology Stack
st.header("Technology Stack")

# Create three columns for tech stack
tech_col1, tech_col2= st.columns(2)

with tech_col1:
    st.markdown("### Frontend")
    st.markdown("""
        - React
        - Ant Design
    """)

with tech_col2:
    st.markdown("### Backend")
    st.markdown("""
        - Express.js
        - OpenAI API
    """)