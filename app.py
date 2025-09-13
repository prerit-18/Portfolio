import streamlit as st
import streamlit.components.v1 as components
from streamlit_option_menu import option_menu
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import base64
from pathlib import Path

# Page configuration
st.set_page_config(
    page_title="Prerit's Portfolio",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
def load_css():
    with open("assets/css/style.css", "r") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Load custom CSS
load_css()

# Sidebar
with st.sidebar:
    st.image("assets/images/my-avatar.png", width=200)
    st.title("PRERIT")
    st.subheader("AI Enthusiast")
    st.subheader("Web Developer")
    
    st.markdown("---")
    
    # Contact Information
    st.markdown("### Contact Info")
    st.markdown("📧 preritmehta77@gmail.com")
    st.markdown("📱 +91 8571077345")
    st.markdown("📍 Delhi, India")
    
    st.markdown("---")
    
    # Social Links
    st.markdown("### Social")
    st.markdown("[Instagram](https://instagram.com)")

# Main content
def main():
    # Navigation
    selected = option_menu(
        menu_title=None,
        options=["About", "Resume", "Portfolio", "Contact"],
        icons=["person", "file-earmark-text", "folder", "envelope"],
        menu_icon="cast",
        default_index=0,
        orientation="horizontal",
        styles={
            "container": {"padding": "0!important", "background-color": "#fafafa"},
            "icon": {"color": "orange", "font-size": "25px"},
            "nav-link": {
                "font-size": "16px",
                "text-align": "left",
                "margin": "0px",
                "--hover-color": "#eee",
            },
            "nav-link-selected": {"background-color": "#02ab21"},
        }
    )
    
    if selected == "About":
        about_section()
    elif selected == "Resume":
        resume_section()
    elif selected == "Portfolio":
        portfolio_section()
    elif selected == "Contact":
        contact_section()

def about_section():
    st.header("About Me")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("""
        I'm a Machine Learning Enthusiast and Web Developer, passionate about building intelligent solutions and
        seamless digital experiences. I enjoy turning data-driven insights into smart applications and transforming
        complex problems into functional, user-friendly designs.
        
        My expertise lies in creating websites that are not only visually appealing but also technically robust and
        optimized for performance. Alongside web development, I work with machine learning techniques to design
        predictive models, analyze patterns, and solve real-world challenges.
        """)
    
    with col2:
        st.image("assets/images/my-avatar.png", width=300)
    
    st.markdown("---")
    
    # Services
    st.subheader("What I'm Doing")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        ### 🌐 Web Development
        High-quality development of sites at the professional level.
        """)
    
    with col2:
        st.markdown("""
        ### 🤖 Machine Learning
        Building intelligent models to solve real-world problems with data.
        """)
    
    with col3:
        st.markdown("""
        ### 📊 Data Structures & Algorithms
        Solving complex problems using efficient algorithms and data structures.
        """)

def resume_section():
    st.header("Resume")
    
    # Education
    st.subheader("🎓 Education")
    
    with st.container():
        st.markdown("""
        **Bachelor of Technology**  
        Computer Science and Engineering (with Artificial Intelligence and Machine Learning)  
        Guru Gobind Singh Indraprastha University, Delhi  
        *2023 — 2027*
        """)
    
    st.markdown("---")
    
    # Skills
    st.subheader("💻 My Skills")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        **Programming Languages & Frameworks:**
        - Python
        - React
        - HTML/CSS
        - JavaScript
        - Flask
        """)
    
    with col2:
        st.markdown("""
        **Data Science & ML:**
        - NumPy
        - Pandas
        - Matplotlib
        - Scikit-learn
        - Seaborn
        """)
    
    st.markdown("""
    **Other Skills:**
    - MySQL
    - OOP
    - DBMS
    - Data Structures
    - Algorithms
    """)
    
    st.markdown("---")
    
    # Tools
    st.subheader("🛠️ Tools")
    st.markdown("VS Code • GitHub • Jupyter • Matlab")

def portfolio_section():
    st.header("Portfolio")
    
    # Filter options
    filter_options = ["All", "Web Development", "Machine Learning", "Data Science", "Algorithms", "Python"]
    selected_filter = st.selectbox("Filter by category:", filter_options)
    
    # Projects data
    projects = [
        {
            "title": "Cabs Cancellation Prediction Model",
            "category": "Machine Learning",
            "description": "Machine learning model to predict cab cancellations",
            "image": "assets/images/project-1.jpg",
            "link": "https://github.com/prerit-18/Cab-Cancellation-Prediction-Model"
        },
        {
            "title": "AI Virtual Painter using OpenCV",
            "category": "Python",
            "description": "AI-powered virtual painting application using computer vision",
            "image": "assets/images/project-2.png",
            "link": "https://github.com/prerit-18/AI-Virtual-Painter-using-OpenCV"
        },
        {
            "title": "Amazon Homepage Clone",
            "category": "Web Development",
            "description": "Responsive clone of Amazon's homepage using HTML/CSS",
            "image": "assets/images/project-3.jpg",
            "link": "https://github.com/prerit-18/Amazon-Homepage-Clone"
        },
        {
            "title": "Churn Prediction using Random Forest",
            "category": "Machine Learning",
            "description": "Customer churn prediction model using Random Forest algorithm",
            "image": "assets/images/project-4.png",
            "link": "https://github.com/prerit-18/Churn-Prediction-using-Random-Forest"
        },
        {
            "title": "USA Housing Price Prediction using Linear Regression",
            "category": "Machine Learning",
            "description": "Housing price prediction model using Linear Regression",
            "image": "assets/images/project-5.png",
            "link": "https://github.com/prerit-18/USA-Housing-Price-Prediction-using-Linear-Regression"
        },
        {
            "title": "Logistic Regression on Chronic Kidney Disease Dataset",
            "category": "Machine Learning",
            "description": "Medical diagnosis prediction using Logistic Regression",
            "image": "assets/images/project-6.png",
            "link": "https://github.com/prerit-18/Logistic-Regression-on-Chronic-Kidney-Disease-Dataset"
        }
    ]
    
    # Filter projects
    if selected_filter != "All":
        filtered_projects = [p for p in projects if p["category"] == selected_filter]
    else:
        filtered_projects = projects
    
    # Display projects in grid
    cols = st.columns(2)
    for i, project in enumerate(filtered_projects):
        with cols[i % 2]:
            with st.container():
                st.image(project["image"], width=300)
                st.subheader(project["title"])
                st.markdown(f"**Category:** {project['category']}")
                st.markdown(project["description"])
                st.markdown(f"[View on GitHub]({project['link']})")
                st.markdown("---")

def contact_section():
    st.header("Contact")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.subheader("Get in Touch")
        st.markdown("""
        📧 **Email:** preritmehta77@gmail.com  
        📱 **Phone:** +91 8571077345  
        📍 **Location:** Delhi, India
        """)
        
        # Map
        st.subheader("Location")
        st.map({"lat": [28.6139], "lon": [77.2090]})
    
    with col2:
        st.subheader("Send Message")
        
        # Contact form
        with st.form("contact_form"):
            name = st.text_input("Full Name", placeholder="Your full name")
            email = st.text_input("Email Address", placeholder="your.email@example.com")
            message = st.text_area("Message", placeholder="Your message here", height=150)
            
            submitted = st.form_submit_button("Send Message", type="primary")
            
            if submitted:
                if name and email and message:
                    # Here you would integrate with your email service
                    st.success("Thank you! Your message has been sent successfully. I'll get back to you soon.")
                    st.balloons()
                else:
                    st.error("Please fill in all fields.")

if __name__ == "__main__":
    main()
