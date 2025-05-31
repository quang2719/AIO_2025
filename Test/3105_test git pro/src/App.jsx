import { useState } from 'react'
import './App.css'

function App() {
  const [section, setSection] = useState('about')

  return (
    <div className="container">
      <header className="header">
        <h1 className="site-title">Trang Cá Nhân Chuyên Nghiệp</h1>
        <nav className="nav">
          <button className={section === 'about' ? 'active' : ''} onClick={() => setSection('about')}>Giới thiệu</button>
          <button className={section === 'blog' ? 'active' : ''} onClick={() => setSection('blog')}>Blog</button>
          <button className={section === 'contact' ? 'active' : ''} onClick={() => setSection('contact')}>Contact</button>
        </nav>
      </header>
      <main className="main-content">
        {section === 'about' && (
          <section>
            <h2>Giới thiệu</h2>
            <p>Xin chào! Tôi là Quang, đây là trang web cá nhân của tôi. Tôi là một lập trình viên đam mê công nghệ và chia sẻ kiến thức.</p>
          </section>
        )}
        {section === 'blog' && (
          <section>
            <h2>Blog</h2>
            <ul className="blog-list">
              <li><strong>Blog 1:</strong> Hướng dẫn tạo web cá nhân với React & Vite</li>
              <li><strong>Blog 2:</strong> Kinh nghiệm học lập trình hiệu quả</li>
              <li><strong>Blog 3:</strong> Tại sao nên dùng GitHub Pages?</li>
            </ul>
          </section>
        )}
        {section === 'contact' && (
          <section>
            <h2>Contact</h2>
            <p>Email: your.email@example.com</p>
            <p>LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">linkedin.com/yourprofile</a></p>
          </section>
        )}
      </main>
      <footer className="footer">&copy; {new Date().getFullYear()} Trang cá nhân của bạn</footer>
    </div>
  )
}

export default App
