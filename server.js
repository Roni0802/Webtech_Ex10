
const express = require("express");
const path = require("path");

const app = express();
const PORT = 6001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
    const { name, age, mobile, email, gender, state } = req.body;

    res.send(`
        <html>
        <head>
            <title>Registration Successful</title>
            <style>
                body {
                    font-family: Arial;
                    background: #eaf0f8;
                    text-align: center;
                    padding: 50px;
                }
                .box {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 450px;
                    margin: auto;
                }
                h2 { color: green; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2>Registration Successful!</h2>
                <p>Welcome, ${escapeHtml(name)}!</p>
                <p>Age: ${escapeHtml(age)}</p>
                <p>Mobile: ${escapeHtml(mobile)}</p>
                <p>Email: ${escapeHtml(email)}</p>
                <p>Gender: ${escapeHtml(gender)}</p>
                <p>State: ${escapeHtml(state)}</p>
                <p>Your form has been submitted successfully.</p>
                <a href="/">Back to Registration</a>
            </div>
        </body>
        </html>
    `);
});

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
