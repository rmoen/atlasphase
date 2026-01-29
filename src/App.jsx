import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Button from './components/Button.jsx'
import { Card, CardContent } from './components/Card.jsx'
import apLogo from './assets/ap-logo-badge.png'

function encodeMailto({ to, subject, body }) {
  const s = encodeURIComponent(subject || '')
  const b = encodeURIComponent(body || '')
  return `mailto:${to}?subject=${s}&body=${b}`
}

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', details: '' })
  const [error, setError] = useState('')

  const mailto = useMemo(() => {
    return encodeMailto({
      to: 'hello@atlasphase.com',
      subject: 'Quote Request from Website',
      body: `Name: ${form.name}\nEmail: ${form.email}\nDetails: ${form.details}`,
    })
  }, [form])

  function onChange(e) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.details) {
      setError('Please fill out all fields before sending.')
      return
    }
    setError('')
    window.location.href = mailto
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="fixed w-full z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={apLogo} alt="Atlas Phase logo" className="w-10 h-10 rounded-xl" />
            <div>
              <div className="font-semibold leading-tight">Atlas Phase</div>
              <div className="text-xs text-slate-500">Residential General Contractor</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#projects">Projects</a>
            <a className="hover:underline" href="#about">About</a>
            <a className="hover:underline" href="#contact">Contact</a>
            <Button asChild>
              <a href="mailto:hello@atlasphase.com?subject=Quote%20Request%20from%20Website">Get a Quote</a>
            </Button>
          </nav>
        </div>
      </header>

      <main className="pt-24">
        <section className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Every Phase. One Team. From Dirt to Done.
            </motion.h1>

            <p className="mt-4 text-slate-600 max-w-xl">
              Atlas Phase is a full-service residential general contractor serving the Portland metro area.
              We handle every phase of construction — from excavation and foundations to finish carpentry
              and final walkthrough. In-house crews and a trusted network of subcontractors mean one
              team, one call, no runaround.
            </p>

            <div className="mt-6 flex gap-4">
              <Button asChild><a href="#contact">Request Estimate</a></Button>
              <a href="#projects" className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 hover:bg-white">
                See Projects
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm">
              <Card><CardContent><div className="text-sm font-semibold">Full Service</div><div className="text-xs text-slate-500">Every phase covered</div></CardContent></Card>
              <Card><CardContent><div className="text-sm font-semibold">Local</div><div className="text-xs text-slate-500">Portland metro area</div></CardContent></Card>
              <Card><CardContent><div className="text-sm font-semibold">Licensed</div><div className="text-xs text-slate-500">Oregon CCB</div></CardContent></Card>
            </div>
          </div>

          <div className="order-first md:order-last">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-200 to-white h-80 md:h-96 flex items-center justify-center">
              <div className="text-slate-400">[Hero image / project carousel]</div>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-slate-200 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold">All-Phase Services</h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              From dirt to done — we handle every phase of residential construction. In-house expertise
              and a trusted subcontractor network means one team manages your entire project.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:grid-cols-3">
              {[
                { title: 'New Construction', desc: 'Ground-up residential builds — foundations, framing, and everything in between.' },
                { title: 'Remodels & Additions', desc: 'Kitchens, baths, whole-home renovations, and second-story additions.' },
                { title: 'Excavation & Foundations', desc: 'Site prep, grading, concrete foundations, and structural groundwork.' },
                { title: 'Framing & Structural', desc: 'Structural framing, load-bearing modifications, and engineered solutions.' },
                { title: 'Finish Work', desc: 'Cabinetry, trim, doors, windows, flooring, painting, and final details.' },
                { title: 'Exterior & Hardscape', desc: 'Siding, decks, driveways, sidewalks, and hardscaping.' },
                { title: 'Permitting Services', desc: 'We pull permits and manage inspections so you don\'t have to.' },
                { title: 'Project Management', desc: 'Scheduling, budgeting, trade coordination, and transparent communication.' },
                { title: 'Mechanical Coordination', desc: 'Plumbing, electrical, and HVAC through our licensed sub network.' },
              ].map((s) => (
                <div key={s.title} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="font-semibold">{s.title}</div>
                  <div className="mt-2 text-slate-500 text-sm">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold">Recent projects</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow hover:scale-[1.01] transition bg-white border border-slate-100">
                  <div className="h-48 bg-slate-200 flex items-center justify-center">Image {i + 1}</div>
                  <div className="p-4">
                    <div className="font-semibold">Project Title {i + 1}</div>
                    <div className="text-xs text-slate-500 mt-1">Small description of the project and scope.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-slate-200 py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold">About Atlas Phase</h2>
              <p className="mt-4 text-slate-600">
                Atlas Phase means "All Phase" — because we believe your project shouldn't require
                a dozen phone calls to a dozen contractors. We manage every phase of residential construction
                under one roof, with clear communication, fair pricing, and quality workmanship at every step.
                Based in Oregon City, we serve the greater Portland metro area.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc pl-5">
                <li>Oregon CCB Licensed & Insured</li>
                <li>Transparent budgeting & cost tracking</li>
                <li>Trusted local subcontractor network</li>
                <li>Residential remodel & new construction</li>
                <li>Serving Portland metro & surrounding areas</li>
              </ul>
            </div>

            <div id="contact">
              <div className="rounded-2xl overflow-hidden bg-white p-6 shadow-sm border border-slate-100">
                <div className="font-semibold">Request a quote</div>
                <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                  <input name="name" value={form.name} onChange={onChange} className="border border-slate-300 rounded-lg p-2" placeholder="Name" />
                  <input name="email" value={form.email} onChange={onChange} className="border border-slate-300 rounded-lg p-2" placeholder="Email" />
                  <textarea name="details" value={form.details} onChange={onChange} className="border border-slate-300 rounded-lg p-2 min-h-[120px]" placeholder="Project details (brief)" />
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <div className="flex gap-2">
                    <Button type="submit">Send</Button>
                    <a className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50" href={mailto}>
                      Open Email
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">Sending opens your default email app with the details pre-filled.</div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 py-10 bg-white">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="font-semibold">Atlas Phase</div>
              <div className="text-sm text-slate-500">Oregon City, OR</div>
              <div className="mt-4 text-sm">Phone: (503) 308-1036</div>
              <div className="text-sm">Email: info@atlasphase.com</div>
            </div>
            <div className="text-sm text-slate-500">© {new Date().getFullYear()} Atlas Phase — Built with care.</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
