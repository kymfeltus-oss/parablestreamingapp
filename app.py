import streamlit as st
import pandas as pd

# 1. PAGE SETUP: "Wide" layout uses the full PC screen but adjusts for phones
st.set_page_config(page_title="Nexus Platform", layout="wide")

# 2. MOBILE CSS: Makes the app look cleaner on small screens
st.markdown("""
<style>
    /* Make buttons full width on mobile for easier tapping */
    @media (max-width: 640px) {
        .stButton button {
            width: 100%;
        }
    }
</style>
""", unsafe_allow_html=True)

# 3. HEADER
st.title("Nexus Platform")
st.write("Welcome to your responsive dashboard.")

# 4. RESPONSIVE LAYOUT
# On PC: These will be 2 side-by-side columns
# On Phone: col1 will stack on top of col2 automatically
col1, col2 = st.columns(2)

with col1:
    st.header("📲 Input Data")
    user_input = st.text_input("Enter Project Name:")
    priority = st.selectbox("Priority Level", ["High", "Medium", "Low"])
    
    if st.button("Submit Record"):
        st.success(f"Saved {user_input} with {priority} priority.")

with col2:
    st.header("💻 Analytics")
    # Sample data to show how tables look
    data = {
        'Metric': ['Revenue', 'Users', 'Retention'],
        'Value': ['$50,000', '1,200', '85%']
    }
    df = pd.DataFrame(data)
    # use_container_width=True ensures the table fits phone screens perfectly
    st.dataframe(df, use_container_width=True)