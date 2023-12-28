import './globals.css'

export const metadata = {
  title: 'Sreality dashboard',
  description: 'Info about parcels in czechia using sreality.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
