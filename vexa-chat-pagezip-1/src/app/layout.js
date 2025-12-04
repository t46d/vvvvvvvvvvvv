import './globals.css'

export const metadata = {
  title: 'VeXa - Dating & Matching Platform',
  description: 'Meet your perfect match with VeXa',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
