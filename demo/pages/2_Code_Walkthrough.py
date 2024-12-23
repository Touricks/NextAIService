import streamlit as st
from utils.utils import set_background
set_background("demo/asset/background_picture.png")

st.title("Code Walkthrough")
st.header("Backend Implementation")

# Recommendation Service
st.subheader("Twitch Service and Twitch API Client")
st.markdown("""
    Twitch service are developed to interact with the Twitch API client, with some filtering features.
    The Twitch API client is used to send requests to the Twitch API and retrieve data.""")

st.subheader("Favorite Service and Favorite Controller")
st.markdown("""
    FavoriteService class handles the core business logic including setting/unsetting favorites, checking for duplicates, and retrieving favorite items, while caching the results for better performance.
    FavoriteController class serves as the REST API layer, exposing endpoints for favoriting/unfavoriting videos and getting a user's favorite items.
    One of Cache libraries based on SpringBoot, Caffeine, is used to cache the favorite results, to improve the performance when user requests the same favorite items.""")

st.subheader("User Service and User Controller")
st.markdown("""
    UserService class handles the core business logic including user registration, login, and retrieval of user information
    UserDetailsManager are used to manage user account details and authentication, PasswordEncoder are used to securely hash user passwords before storage.
    UserController class serves as the RESTAPI layer, exposing endpoints for user registration, login, and retrieval of user information.""")

st.subheader("Recommendation Service and Recommendation Controller")
st.markdown("""
    Recommendation Service and Controller provide personalized content recommendations in a Twitch-like platform, using cached game IDs from user favorites or top games.
    Specifically, Recommendation Service processes and groups streams, clips, and videos while excluding previously viewed content, handling pagination and staying within game seed limit""")
