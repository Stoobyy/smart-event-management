import { useState } from "react";
import api from "../api";

export default function LoginModal({ open, onClose, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!open) return null;

    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            onLogin?.(data.user);
            onClose();
        } catch (err) {
            alert(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={backdropStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginTop: 0, color: "var(--primary)" }}>Login</h3>
                <form onSubmit={submit}>
                    <div style={{ marginBottom: 12 }}>
                        <label>Email</label><br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="alice@mail.com"
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <label>Password</label><br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password123"
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button type="button" className="modal-btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal-btn-login">
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

const backdropStyle = {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 2000
};
const modalStyle = {
    width: 360, background: "white", color: "#111827", borderRadius: 10,
    padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
};
const inputStyle = {
    width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb",
    outline: "none"
};
