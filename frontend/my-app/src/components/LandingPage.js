import { useAuth0 } from "@auth0/auth0-react";
import "./landingpage.css";

function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing-page">
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          AI Financial Assistant
        </div>

        <button
          className="nav-btn"
          onClick={() => loginWithRedirect()}
        >
          Login / Signup
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Smarter Finance Management <br />
            Powered by AI
          </h1>

          <p>
            Analyze your spending, track expenses, get AI-powered
            financial insights, and manage your money smarter with
            the power of Generative AI.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => loginWithRedirect()}
            >
              Get Started
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Finance Illustration"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Features</h2>

        <div className="features-container">

          <div className="feature-card">
            <h3>AI Expense Tracking</h3>
            <p>
              Automatically categorize and analyze your daily expenses
              using AI.
            </p>
          </div>

          <div className="feature-card">
            <h3>Smart Financial Insights</h3>
            <p>
              Receive personalized suggestions to improve your
              spending habits and savings.
            </p>
          </div>

          <div className="feature-card">
            <h3>Interactive Dashboard</h3>
            <p>
              Visualize your expenses with beautiful charts and
              real-time analytics.
            </p>
          </div>

          <div className="feature-card">
            <h3>AI Chat Assistant</h3>
            <p>
              Ask questions like “Where did I spend most this month?”
              and get instant answers.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps-container">

          <div className="step-card">
            <span>1</span>
            <h3>Login Securely</h3>
            <p>
              Sign up securely using Auth0 authentication.
            </p>
          </div>

          <div className="step-card">
            <span>2</span>
            <h3>Upload Transactions</h3>
            <p>
              Upload bank statements or transaction files.
            </p>
          </div>

          <div className="step-card">
            <span>3</span>
            <h3>Get AI Insights</h3>
            <p>
              Receive intelligent financial analysis and budgeting
              recommendations.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Take Control of Your Finances Today</h2>

        <p>
          Join AI Financial Assistant and experience the future of
          smart personal finance management.
        </p>

        <button
          className="cta-btn"
          onClick={() => loginWithRedirect()}
        >
          Start Now
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © 2026 AI Financial Assistant. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default LandingPage;