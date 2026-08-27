import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";
import "./homepage.css";

function HomePage() {
  const { user, logout } = useAuth0();

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      console.log(response.data);

      setAnalysis(response.data.analysis || "");
      setTransactions(response.data.transactions || []);

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Something went wrong while analyzing your statement."
      );
    } finally {
      setLoading(false);
    }
  };

  const scrollToUpload = () => {
    document
      .getElementById("upload-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage">

      {/* Navbar */}
      <nav className="home-navbar">

        <div className="home-logo">
          AI Financial Assistant
        </div>

        <div className="profile-section">

          <div className="profile-info">
            <img
              src={user?.picture}
              alt="profile"
              className="profile-img"
            />

            <span>{user?.name}</span>
          </div>

          <button
            className="logout-btn"
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
          >
            Logout
          </button>

        </div>

      </nav>


      {/* Hero */}
      <section className="dashboard-hero">

        <div className="welcome-section">

          <div className="status-badge">
            <span></span>
            AI Financial Assistant
          </div>

          <h1>
            Your money,
            <br />
            <span>understood by AI.</span>
          </h1>

          <p>
            Upload your bank statement and get a simple,
            AI-powered understanding of your spending,
            expenses, savings and financial habits.
          </p>

          <button
            className="explore-btn"
            onClick={scrollToUpload}
          >
            Analyze My Statement
            <span>→</span>
          </button>

        </div>


        <div className="hero-card">

          <div className="hero-card-header">
            <span>Financial Overview</span>
            <span className="live-dot"></span>
          </div>

          <div className="hero-chart">

            <div className="chart-bars">
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
              <div className="bar bar-4"></div>
              <div className="bar bar-5"></div>
              <div className="bar bar-6"></div>
              <div className="bar bar-7"></div>
            </div>

          </div>

          <div className="hero-card-bottom">

            <div>
              <small>Transactions</small>
              <strong>
                {transactions.length || "--"}
              </strong>
            </div>

            <div>
              <small>AI Status</small>
              <strong className="active-status">
                {analysis ? "Analyzed" : "Ready"}
              </strong>
            </div>

          </div>

        </div>

      </section>


      {/* Quick Stats */}
      <section className="stats-section">

        <div className="stat-card">
          <div className="stat-icon">₹</div>

          <div>
            <span>Financial Analysis</span>
            <h3>
              {analysis ? "Completed" : "Not Available"}
            </h3>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">#</div>

          <div>
            <span>Transactions</span>
            <h3>{transactions.length}</h3>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">AI</div>

          <div>
            <span>AI Insights</span>
            <h3>
              {analysis ? "Available" : "Waiting"}
            </h3>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <span>Statement</span>
            <h3>
              {file ? "Uploaded" : "Not Uploaded"}
            </h3>
          </div>
        </div>

      </section>


      {/* Upload Section */}
      <section
        className="upload-section"
        id="upload-section"
      >

        <div className="section-heading">

          <div className="section-label">
            STEP 01
          </div>

          <h2>
            Upload Your Bank Statement
          </h2>

          <p>
            Upload your CSV statement and let AI understand
            your financial activity.
          </p>

        </div>


        <div className="upload-container">

          <div className="upload-box">

            <div className="upload-icon">
              ↑
            </div>

            <h3>
              {file
                ? file.name
                : "Upload your CSV file"}
            </h3>

            <p>
              {file
                ? "File selected and ready for analysis"
                : "Drag & drop your bank statement or choose a file"}
            </p>

            <label className="choose-file-btn">
              Choose CSV File

              <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setError("");
                }}
              />
            </label>


            {file && (
              <div className="selected-file">
                <span>✓</span>
                {file.name}
              </div>
            )}


            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Statement
                  <span>→</span>
                </>
              )}

            </button>


            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <small className="upload-note">
              Supported format: CSV
            </small>

          </div>

        </div>

      </section>


      {/* AI Analysis */}
      {analysis && (

        <section className="analysis-section">

          <div className="section-heading">

            <div className="section-label">
              STEP 02
            </div>

            <h2>
              AI Financial Analysis
            </h2>

            <p>
              Your transaction data has been analyzed by
              the AI Financial Assistant.
            </p>

          </div>


          <div className="analysis-container">

            <div className="analysis-header">

              <div className="ai-title">

                <div className="ai-avatar">
                  AI
                </div>

                <div>
                  <h3>Financial Insights</h3>
                  <span>Generated by Gemini</span>
                </div>

              </div>

              <div className="analysis-status">
                Analysis Complete
              </div>

            </div>


            <div className="analysis-content">

              {analysis
                .split("\n")
                .map((line, index) => {

                  if (!line.trim()) {
                    return (
                      <div
                        key={index}
                        className="analysis-space"
                      />
                    );
                  }

                  return (
                    <p key={index}>
                      {line}
                    </p>
                  );

                })}

            </div>

          </div>

        </section>

      )}


      {/* Transactions */}
      {transactions.length > 0 && (

        <section className="transactions-section">

          <div className="section-heading">

            <div className="section-label">
              TRANSACTIONS
            </div>

            <h2>
              Recent Transactions
            </h2>

            <p>
              Transactions extracted from your uploaded statement.
            </p>

          </div>


          <div className="transactions-container">

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    {Object.keys(transactions[0])
                      .slice(0, 4)
                      .map((key) => (
                        <th key={key}>
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>


                <tbody>

                  {transactions
                    .slice(0, 10)
                    .map((transaction, index) => (

                      <tr key={index}>

                        {Object.values(transaction)
                          .slice(0, 4)
                          .map((value, i) => (

                            <td key={i}>
                              {value}
                            </td>

                          ))}

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>


            {transactions.length > 10 && (
              <div className="transaction-footer">
                Showing 10 of {transactions.length} transactions
              </div>
            )}

          </div>

        </section>

      )}


      {/* Features */}
      <section className="features-section">

        <div className="section-heading">

          <div className="section-label">
            FEATURES
          </div>

          <h2>
            Understand Your Finances
          </h2>

          <p>
            Simple tools to help you make better financial decisions.
          </p>

        </div>


        <div className="features-container">

          <div className="feature-card">

            <div className="feature-number">
              01
            </div>

            <h3>
              Spending Analysis
            </h3>

            <p>
              Understand where your money is going
              and identify major spending patterns.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              02
            </div>

            <h3>
              Expense Insights
            </h3>

            <p>
              Find your biggest expenses and
              understand your financial habits.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              03
            </div>

            <h3>
              Saving Suggestions
            </h3>

            <p>
              Receive practical AI-generated
              suggestions to improve your savings.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              04
            </div>

            <h3>
              AI Assistant
            </h3>

            <p>
              Ask questions about your transactions
              and get personalized financial answers.
            </p>

          </div>

        </div>

      </section>


      {/* Chatbot */}
      <section className="chatbot-section">

        <div className="section-heading">

          <div className="section-label">
            AI ASSISTANT
          </div>

          <h2>
            Ask Your Financial Assistant
          </h2>

          <p>
            Ask questions about your spending and financial activity.
          </p>

        </div>


        <div className="chat-container">

          <div className="chat-header">

            <div className="chat-profile">

              <div className="chat-avatar">
                AI
              </div>

              <div>
                <strong>
                  AI Financial Assistant
                </strong>

                <span>
                  {analysis
                    ? "Ready to answer questions"
                    : "Upload a statement first"}
                </span>
              </div>

            </div>

            <div className="online-dot"></div>

          </div>


          <div className="chat-messages">

            <div className="chat-message ai">

              <div className="message-avatar">
                AI
              </div>

              <div className="message-content">

                <p>
                  Hello! I'm your AI Financial Assistant.
                </p>

                <p>
                  Upload your bank statement and I can
                  help you understand your spending,
                  expenses and savings.
                </p>

              </div>

            </div>

          </div>


          <div className="chat-input-section">

            <input
              type="text"
              placeholder={
                analysis
                  ? "Ask something about your finances..."
                  : "Upload a statement to start chatting"
              }
              disabled={!analysis}
            />

            <button disabled={!analysis}>
              Send
            </button>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="home-footer">

        <h3>
          AI Financial Assistant
        </h3>

        <p>
          Understand your money. Make better decisions.
        </p>

        <span>
          AI-powered personal finance analysis
        </span>

      </footer>

    </div>
  );
}

export default HomePage;