import streamlit as st
from utils.utils import set_background
set_background("demo/asset/background_picture.png")

# Title Section
st.title("🤖 Intelligent Chat Interface System")
st.markdown("""
    A versatile chat application combining React and OpenAI API capabilities
""")

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
    st.markdown("### 💬 Intelligent Chat")
    st.markdown("""
        - Natural language processing
        - Context-aware responses
        - Real-time interaction
    """)

with col2:
    st.markdown("### 📄 File Processing")
    st.markdown("""
        - Multiple file format support
        - Document content analysis
        - Intelligent data extraction
    """)

with col3:
    st.markdown("### 🎤 Voice Recognition")
    st.markdown("""
        - Speech-to-text conversion
        - Hands-free operation
        - Multi-language support
    """)

# System Architecture
st.header("System Architecture")
st.image("demo/asset/System_Architecture.png", caption="System Architecture Diagram")

# Technology Stack
st.header("Technology Stack")

# Create three columns for tech stack
tech_col1, tech_col2, tech_col3 = st.columns(3)

with tech_col1:
    st.markdown("### Frontend")
    st.markdown("""
        - React
        - Ant Design
        - Tailwind CSS
    """)

with tech_col2:
    st.markdown("### Backend")
    st.markdown("""
        - Express.js
        - OpenAI API
        - WebSocket
    """)

with tech_col3:
    st.markdown("### Deployment")
    st.markdown("""
        - Docker
        - AWS
        - CI/CD Pipeline
    """)

# Demo Section
st.header("Live Demo")
st.markdown("""
    ### Try out these features:
    1. Ask a basic question about React
    2. Upload a travel itinerary document
    3. Use voice recognition for hands-free interaction
""")

# Additional Information
st.header("Project Status")
st.info("""
    🚀 Current Version: 1.0.0
    
    📅 Last Updated: December 2024
    
    ✨ Next Release: Coming Soon with Enhanced Features
""")

# Footer
st.markdown("---")
st.markdown("""
    *Built with ❤️ using Python, React, and OpenAI*
""")