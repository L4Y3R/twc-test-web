import "./globals.css";
import { ContactContextProvider } from "./context/ContactContext";
import { AuthContextProvider } from "./context/AuthContext";

export const metadata = {
  title: "Contact Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <ContactContextProvider>
          <body>{children}</body>
        </ContactContextProvider>
      </AuthContextProvider>
    </html>
  );
}
