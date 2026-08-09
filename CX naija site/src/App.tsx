import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import logo from './imports/Frame_4-1.svg'
import footerLogo from './imports/white.png'
import navLogo from './imports/original.png'

type Page = 'home' | 'resources' | 'events' | 'why' | 'directory' | 'join'

const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4'

const resources = [
  ['Career & Growth', 'The remote CS job search playbook', 'A practical starting point for finding roles that fit.', '8 min read'],
  ['Tools & Templates', 'Your customer support toolkit', 'The platforms, templates and workflows to know.', 'Toolkit'],
  ['CX Knowledge', 'Turn your CV into a story', 'A simple framework for showing the impact behind your work.', '6 min read'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    let frame = 0
    const duration = 1200
    const startedAt = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [value, reduceMotion])

  return <span>{display.toLocaleString()}{suffix}</span>
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [member, setMember] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 70, disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches })
  }, [])

  useEffect(() => {
    AOS.refreshHard()
  }, [page])

  const go = (to: Page) => { setPage(to); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const notify = (text: string) => { setToast(text); window.setTimeout(() => setToast(''), 3000) }
  const showFooter = page === 'home'

  const renderPage = () => {
    if (page === 'resources') return <Resources go={go} />
    if (page === 'events') return <Events notify={notify} />
    if (page === 'why') return <Why go={go} />
    if (page === 'directory') return <Directory member={member} go={go} setMember={setMember} />
    if (page === 'join') return <Join notify={notify} />
    return <Home go={go} notify={notify} />
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <button className="brand" onClick={() => go('home')} aria-label="Customer Experience Naija home">
        <img src={navLogo} alt="Customer Experience Naija" />
      </button>
      <nav className="desktop-nav" aria-label="Main navigation">
        <button className={page === 'why' ? 'active' : ''} onClick={() => go('why')}>About</button>
        <button className={page === 'resources' ? 'active' : ''} onClick={() => go('resources')}>Resources</button>
        <button className={page === 'events' ? 'active' : ''} onClick={() => go('events')}>Events</button>
        <button onClick={() => go('directory')}>Community</button>
        <button onClick={() => go('resources')}>Blog</button>
        <button onClick={() => go('join')}>Partner With Us</button>
      </nav>
      <div className="nav-actions">
        <button className="directory-link" onClick={() => go('directory')}><span>✦</span> Directory</button>
        <button className="button button-small" onClick={() => go('join')}>Join the community <Arrow /></button>
      </div>
      <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        <button onClick={() => go('home')}>Home</button><button onClick={() => go('resources')}>Resource Hub</button><button onClick={() => go('events')}>Events</button><button onClick={() => go('why')}>Why CX Naija?</button><button onClick={() => go('directory')}>Member Directory</button><button className="button" onClick={() => go('join')}>Join the community <Arrow /></button>
      </nav>}
    </header>
    <main id="main">{renderPage()}</main>
    {showFooter && <Footer go={go} />}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>
}

function Home({ go, notify }: { go: (p: Page) => void, notify: (s: string) => void }) {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 96])
  const heroOpacity = useTransform(scrollY, [0, 650], [1, reduceMotion ? 1 : 0.42])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const impact = [[1250,'+','Members'],[24,'','Events hosted'],[85,'+','Opportunities shared'],[60,'+','Resources available']]
  const values = [
    ['01','Community','Find your people. customer experience can sometimes feel like you’re figuring things out on your own. Here, you don’t have to. Different paths. One community.'],['02','Connection','Build relationships that go beyond the room. Meet customer experience professionals across roles, industries and experience levels—people who understand the work.'],['03','Knowledge','Learn from the people doing the work. Access practical resources, conversations, events, training and experiences that make customer experience knowledge useful.'],['04','Participation','Don’t just be part of the community. Help shape it. Attend, share an idea, mentor someone, ask a question or collaborate on something new.']]
  const photos = ['https://images.unsplash.com/photo-1720700126957-769e2f2fc0fc?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1778877035189-60f41e9d18bf?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1742163195807-9fcf?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1562910859-be83f1df7b56?auto=format&fit=crop&w=900&q=80']
  const faqs = [['Can anyone join?','Yes. CX Nigeria welcomes people interested in Customer Experience, Customer Success, Customer Support, Service Design and customer-centric work.'],['Do I need experience?','No. Whether you are exploring the field or leading a team, there is a place for you here.'],['How much does membership cost?','Community membership is currently free. Some special programs may have separate details.'],['How do I attend events?','Explore the Events page, choose a session and register. We will send the details to your inbox.'],['How do companies partner?','Use the Partner With Us CTA to start a conversation with the partnerships team.']]
  return <>
    <section data-aos="fade-up" className="prd-hero">
      <motion.video className="hero-video" autoPlay muted loop playsInline aria-hidden="true" style={{ y: videoY, scale: reduceMotion ? 1 : 1.045 }}><source src={heroVideo} type="video/mp4" /></motion.video>
      <div className="video-wash" aria-hidden="true" /><div className="film-grain" aria-hidden="true" />
      <div className="prd-hero-image" style={{backgroundImage:`url(${photos[0]})`}}></div>
      <motion.div className="prd-hero-content" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }} style={{ opacity: heroOpacity }}><p className="eyebrow light"><span></span> THE CX NAIJA COMMUNITY</p><h1>Where CX professionals <em>connect, learn, and grow together.</em></h1><p>Customer Experience Naija is a community for people working in, learning about, and shaping customer experience in Nigeria. A place for CX professionals to access useful resources, relevant opportunities, meaningful conversations, learning experiences and one another,while giving members room to share and support each other.</p><div className="hero-actions"><button className="button button-gold" onClick={()=>go('join')}>Join the Community <Arrow /></button></div></motion.div>
      <div className="hero-credential"><b>WELCOME<br/>TO THE<br/>COMMUNITY</b><span>↓</span></div>
    </section>
    <section data-aos="fade-up" className="impact-bar">{impact.map(([number,suffix,label])=><div key={label}><strong><Counter value={number} suffix={suffix} /></strong><span>{label}</span></div>)}</section>
    <section data-aos="fade-up" className="section-pad"><div className="section-intro"><p className="eyebrow"><span></span> Why CX Naija Community</p><h2>A community designed to help you <em>go further.</em></h2></div><div className="value-grid eight">{values.map(([icon,title,description])=><article className="value-card cream compact" key={title}><div className="card-icon">{icon}</div><h3>{title}</h3><p>{description}</p><button onClick={()=>go('join')}>Learn more <Arrow /></button></article>)}</div></section>
    <section data-aos="fade-up" className="stories section-pad"><div className="split-head"><div><p className="eyebrow"><span></span> Member success stories</p><h2>Every career story can <em>open a door.</em></h2></div><button className="text-button" onClick={()=>go('directory')}>Meet the community <span>→</span></button></div><article className="success-story"><img src={photos[1]} alt="Audience seated at a community presentation"/><div className="success-path"><p className="eyebrow"><span></span> Member journey</p><h3>From Customer Support Representative to <em>Customer Success Lead.</em></h3><div className="journey-steps"><span>Joined CX Nigeria</span><b>↓</b><span>Attended workshops</span><b>↓</b><span>Connected with mentors</span><b>↓</b><span>Spoke at a meetup</span><b>↓</b><strong>Promoted</strong></div><p className="member-byline">Member story · Soon to be updated with a verified community profile.</p></div></article></section>
    <section data-aos="fade-up" className="section-pad upcoming"><div className="split-head"><div><p className="eyebrow"><span></span> Upcoming events</p><h2>Come into the room.</h2></div><button className="text-button" onClick={()=>go('events')}>View all events <span>→</span></button></div><div className="event-grid">{[['23','OCT','How to land your first remote CS role','Online · 6:00 PM WAT','Career Clinic'],['12','NOV','Voice of the Customer: turning feedback into action','Virtual · 6:00 PM WAT','Expert Session'],['04','DEC','CX Connect: end-of-year community meetup','Lagos · 4:00 PM WAT','In person']].map((e,i)=><article className="event-tile" key={e[2]}><div className={`event-image event-${i}`} style={{backgroundImage:`url(${photos[i%photos.length]})`}}><span>{e[4]}</span></div><div className="event-detail"><div className="tile-date"><b>{e[0]}</b><small>{e[1]}</small></div><div><p>{e[3]}</p><h3>{e[2]}</h3><button onClick={()=>notify("You're registered. Check your inbox for the event details.")}>RSVP now <Arrow /></button></div></div></article>)}</div></section>
    <section data-aos="fade-up" className="resource-spotlight section-pad"><div className="split-head"><div><p className="eyebrow light"><span></span> Resource spotlight</p><h2>Knowledge you can use<br/><em>on Monday morning.</em></h2></div><button className="outline-light" onClick={()=>go('resources')}>Explore resources <Arrow /></button></div><div className="resource-grid">{resources.map(([tag,title,desc,meta],i)=><article className="resource-card" key={title}><div className={'resource-art art-'+i}><b>{i===0?'01':i===1?'↗':'CV'}</b></div><div className="resource-body"><p className="resource-meta">{tag} <span>•</span> {meta}</p><h3>{title}</h3><p>{desc}</p><button onClick={()=>go('resources')}>Read or download <Arrow /></button></div></article>)}</div></section>
    <section data-aos="fade-up" className="spotlight-section section-pad"><div className="spotlight-profile"><img src={photos[2]} alt="Community members in conversation"/><div><p className="eyebrow"><span></span> Member spotlight</p><h2>“The best CX lesson? <em>Listen for what isn’t being said.”</em></h2><p>Each month, we make room for one member’s journey, their work, and the ideas they are carrying into the profession.</p><button className="text-button" onClick={()=>go('directory')}>Read member stories <span>→</span></button></div></div><div className="wins"><p className="eyebrow"><span></span> Community wins</p><h3>Good news travels here.</h3><ul><li>🎉 Ada spoke at a global conference.</li><li>🎉 A member earned their CCXP certification.</li><li>🎉 A community member stepped into a new leadership role.</li><li>🎉 A customer experience practitioner published their first industry article.</li></ul></div></section>
    <section data-aos="fade-up" className="gallery section-pad"><div className="split-head"><div><p className="eyebrow"><span></span> In the room</p><h2>Moments that make a <em>community.</em></h2></div><p>Authentic community photography is ready to be replaced with customer experience naija event moments.</p></div><div className="gallery-grid">{photos.concat([photos[0]]).map((src,i)=><button className={`gallery-item gallery-${i}`} key={i} style={{backgroundImage:`url(${src})`}} aria-label={`Open community gallery image ${i+1}`} onClick={()=>notify('Gallery lightbox will open with the event media library.')}></button>)}</div></section>
    <section data-aos="fade-up" className="newsletter-band"><div><p className="eyebrow light"><span></span> Stay in the loop</p><h2>Never miss what’s happening in <em>Customer Experience.</em></h2><p>Weekly insights, community news, new resources, job alerts and event invitations, thoughtfully sent.</p></div><form onSubmit={e=>{e.preventDefault();notify('You’re subscribed. Expect useful things, not noise.')}}><label className="sr-only" htmlFor="home-email">Email address</label><input id="home-email" type="email" required placeholder="Email address"/><button className="button button-gold" type="submit">Subscribe <Arrow /></button></form></section>
    <section data-aos="fade-up" className="faq section-pad"><div><p className="eyebrow"><span></span> FAQs</p><h2>Helpful answers,<br/><em>no gatekeeping.</em></h2></div><div className="faq-list">{faqs.map(([question,answer],i)=><article key={question}><button aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)}><span>{question}</span><b>{openFaq===i?'−':'+'}</b></button>{openFaq===i&&<p>{answer}</p>}</article>)}</div></section>
    <section data-aos="fade-up" className="final-cta"><h2><em>You don’t have to navigate your CX career alone.</em></h2><p>Whether you’re new to the field, deepening your expertise, leading teams or simply looking for people who understand the work, there’s a place for you in the Customer Experience Naija community.</p><div><button className="button button-cream" onClick={()=>go('join')}>Join the community <Arrow /></button></div></section>
  </>
}
function Resources({ go }: { go: (p: Page) => void }) { const [filter,setFilter]=useState('All'); return <section data-aos="fade-up" className="inner-page section-pad"><p className="eyebrow"><span></span> Resource Hub</p><h1>Resources for better CX work and <em>career.</em></h1><p className="page-lead">A growing collection of practical guides, tools, templates, insights, and career resources curated by CX Naija to help CX professionals learn, work smarter, and keep growing.</p><div className="filter-bar"><input aria-label="Search resources" placeholder="Search the resource hub" /><div>{['All','CX Knowledge','Tools & Templates','Career & Growth','Insights'].map(x=><button className={filter===x?'selected':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div></div><div className="resource-grid full">{resources.concat([['CX Knowledge','The empathy-to-impact framework','Turn customer conversations into business value.','Guide'],['Insights','Working well from anywhere','Simple habits for sustainable remote support work.','5 min read']]).filter(x=>filter==='All'||x[0]===filter).map(([tag,title,desc,meta],i)=><article className="resource-card" key={title}><div className={'resource-art art-'+(i%3)}><b>{i+1}</b></div><div className="resource-body"><p className="resource-meta">{tag} <span>•</span> {meta}</p><h3>{title}</h3><p>{desc}</p><button>Open resource <Arrow /></button></div></article>)}</div><div className="page-cta"><h2>Looking for your next move?</h2><button className="button" onClick={()=>go('join')}>Join the community <Arrow /></button></div></section> }

function Events({ notify }: { notify: (s:string)=>void }) { return <section data-aos="fade-up" className="inner-page section-pad"><p className="eyebrow"><span></span> Events</p><h1>Where the community <em>comes together.</em></h1><p className="page-lead">Gatherings, conversations, learning experiences, and practical sessions that bring CX professionals together to connect, share, learn, and grow.</p><article className="featured-event"><div className="event-date large"><span>23</span><small>OCT<br />2026</small></div><div><p className="eyebrow"><span></span> Online event</p><h2>How to land your first remote CS role</h2><p>Join a career-led conversation about presenting your experience, searching strategically, and showing up prepared for the remote job market.</p><p className="event-info">Thursday · 6:00 PM WAT · Live on Zoom</p><button className="button" onClick={()=>notify('Registration confirmed — we’ll share the link shortly.')}>Register for free <Arrow /></button></div></article><h2 className="mini-title">Coming soon</h2><div className="events-list">{[['12','NOV','Your CV, but make it compelling'],['04','DEC','A practical CX tools walkthrough'],['15','JAN','Career conversations: support to success']].map(e=><article key={e[2]}><div className="small-date"><b>{e[0]}</b><span>{e[1]}</span></div><div><p>ONLINE SESSION · 6:00 PM WAT</p><h3>{e[2]}</h3></div><button aria-label={`Register for ${e[2]}`} onClick={()=>notify('Thanks! We’ll let you know when registration opens.')}>↗</button></article>)}</div></section> }

function Why({go}:{go:(p:Page)=>void}) { return <section data-aos="fade-up" className="inner-page why-page section-pad"><p className="eyebrow"><span></span> Why CX Naija?</p><h1>Careers grow better<br />in <em>good company.</em></h1><p className="page-lead">CX Naija exists because access to clear career guidance, useful resources and relevant community should not be luck.</p><div className="story-grid"><article><b>01</b><h3>Join with where you are.</h3><p>You don’t need to have it all figured out. Come with your experience, questions and ambition.</p></article><article><b>02</b><h3>Learn what helps.</h3><p>Access practical tools and conversations made specifically for the CX work you want to do.</p></article><article><b>03</b><h3>Move toward more.</h3><p>Meet opportunities with stronger skills, clearer stories and people in your corner.</p></article></div><div className="page-cta teal-cta"><h2>A supportive beginning can change the whole journey.</h2><button className="button button-cream" onClick={()=>go('join')}>Find your place here <Arrow /></button></div></section> }

function Directory({member,go,setMember}:{member:boolean,go:(p:Page)=>void,setMember:(v:boolean)=>void}) { const [q,setQ]=useState(''); const people=[['AR','Amara','Customer Support Specialist','Lagos','Zendesk · CX Writing'],['TO','Tobi','Customer Experience Associate','Abuja','Intercom · Onboarding'],['KE','Kelechi','Support Operations','Port Harcourt','Processes · QA'],['MO','Morenike','Customer Success Coordinator','Ibadan','Retention · Research']]; if(!member) return <section data-aos="fade-up" className="gate"><p className="eyebrow"><span></span> Members only</p><h1>Find your people.<br />Build your <em>community.</em></h1><p>Connect with CX professionals across roles, industries, and experience levels. Discover shared interests and expertise, join conversations, exchange knowledge, find opportunities, and take part in what we’re building together.</p><button className="button" onClick={()=>go('join')}>Become a member <Arrow /></button><div className="member-voices"><div className="voices-track"><article><p>“CX Naija has given me access to people, conversations and opportunities that I wouldn’t have found on my own.”</p><b>Community member</b><span>CX Professional · Lagos</span></article><article><p>“I love that I can come into the community with a question and leave with perspectives from people who actually understand the work.”</p><b>Community member</b><span>Customer Success Manager · Abuja</span></article><article><p>“It is a genuinely useful space to learn, share and feel connected to the bigger picture of CX.”</p><b>Community member</b><span>Customer Support Lead · Ibadan</span></article><article aria-hidden="true"><p>“CX Naija has given me access to people, conversations and opportunities that I wouldn’t have found on my own.”</p><b>Community member</b><span>CX Professional · Lagos</span></article><article aria-hidden="true"><p>“I love that I can come into the community with a question and leave with perspectives from people who actually understand the work.”</p><b>Community member</b><span>Customer Success Manager · Abuja</span></article><article aria-hidden="true"><p>“It is a genuinely useful space to learn, share and feel connected to the bigger picture of CX.”</p><b>Community member</b><span>Customer Support Lead · Ibadan</span></article></div></div></section>; return <section data-aos="fade-up" className="inner-page section-pad"><p className="eyebrow"><span></span> Community Directory</p><h1>Explore the people in our <em>community.</em></h1><div className="directory-tools"><input placeholder="Search members" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search members" /><button>All locations⌄</button><button>All focuses⌄</button></div><div className="people-grid">{people.filter(p=>p.join(' ').toLowerCase().includes(q.toLowerCase())).map(p=><article key={p[1]}><div className="person-avatar">{p[0]}</div><p className="online">● Available to connect</p><h3>{p[1]}</h3><h4>{p[2]}</h4><p>{p[3]}</p><div className="tags">{p[4].split(' · ').map(t=><span key={t}>{t}</span>)}</div></article>)}</div></section> }

function Join({notify}:{notify:(s:string)=>void}) { const [sent,setSent]=useState(false); return <section data-aos="fade-up" className="join-page"><div><p className="eyebrow"><span></span> You’re invited</p><h1>Come build<br />what’s <em>next.</em></h1><p>CX Naija is for people who care about the work — and want a career that carries them further.</p><div className="join-art"><span>YOU BELONG<br />IN THE ROOM.</span></div></div><form onSubmit={e=>{e.preventDefault();setSent(true);notify('Welcome to CX Naija. We’ll be in touch soon!')}}>{sent?<div className="form-success"><div>✦</div><h2>You’re on your way.</h2><p>Thanks for raising your hand. We’ll share the next step in your inbox shortly.</p></div>:<><h2>Join the community</h2><p>Tell us a little about you — it only takes a moment.</p><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Where are you in your CX career?<select required defaultValue=""><option value="" disabled>Select one</option><option>Exploring customer service</option><option>Early career in CX</option><option>Growing in my CX career</option><option>Hiring / partnering</option></select></label><label>What support are you looking for?<textarea placeholder="A few words is perfect" /></label><label className="check"><input type="checkbox" required/> <span>I’m happy to receive thoughtful CX Naija updates.</span></label><button className="button" type="submit">Request to join <Arrow /></button></>}</form></section> }

function Footer({go}:{go:(p:Page)=>void}) { return <footer><div className="footer-top"><div><img src={footerLogo} alt="Customer Experience Naija" /><p>Building a stronger  customer experience community together.</p></div><div><h4>Explore</h4><button onClick={()=>go('resources')}>Resource Hub</button><button onClick={()=>go('events')}>Events</button><button onClick={()=>go('directory')}>Community</button><button onClick={()=>go('resources')}>Blog</button><button onClick={()=>go('join')}>Partner With Us</button></div><div><h4>Stay in the loop</h4><p>A small note when there’s something useful to share.</p><div className="newsletter"><input aria-label="Email address" placeholder="Email address"/><button aria-label="Subscribe">→</button></div></div></div><div className="footer-bottom"><span>© 2026 Customer Experience Naija</span><span>Built for careers with care.</span></div></footer> }
