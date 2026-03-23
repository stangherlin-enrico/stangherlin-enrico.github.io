import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Portfolio } from './pages/Portfolio'
import { ProjectDetail } from './pages/ProjectDetail'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { CV } from './pages/CV'
import { About } from './pages/About'

// Layout for Home: header + footer, no max-width container
function HomeLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

// Layout wrapper for all other pages
function PageLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<PageLayout />}>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
