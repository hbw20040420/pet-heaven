import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, PawPrint, Menu, X, Sun, Moon, MapPin, Search, ShieldCheck, HandHeart, Stethoscope, Mail, Phone, CheckCircle2, Star, Dog, Cat, ChevronDown, Quote, Send, Play } from 'lucide-react';

const animals = [
    { id: 1, name: 'Milo', type: 'Dog', breed: 'Golden Retriever', age: '2 years', gender: 'Male', place: 'Central Shelter', tag: 'Good with kids', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85', about: 'A sunny, affectionate boy who loves long walks, gentle games and meeting new friends. Milo is house-trained and knows basic commands.' },
    { id: 2, name: 'Luna', type: 'Cat', breed: 'Domestic Shorthair', age: '1 year', gender: 'Female', place: 'North Shelter', tag: 'Indoor companion', img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85', about: 'Curious and calm, Luna enjoys sunny windowsills, feather toys and quiet company. She would make a lovely indoor companion.' },
    { id: 3, name: 'Coco', type: 'Dog', breed: 'Corgi Mix', age: '3 years', gender: 'Female', place: 'Central Shelter', tag: 'Playful', img: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=900&q=85', about: 'Coco is a cheerful little explorer with a big personality. She enjoys short adventures, puzzle toys and curling up after playtime.' },
    { id: 4, name: 'Oliver', type: 'Cat', breed: 'Tabby', age: '8 months', gender: 'Male', place: 'East Shelter', tag: 'Gentle soul', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85', about: 'Oliver is a soft-hearted kitten who warms up quickly with a little patience. He loves chasing toy mice and afternoon naps.' },
    { id: 5, name: 'Bailey', type: 'Dog', breed: 'Beagle', age: '4 years', gender: 'Male', place: 'West Shelter', tag: 'Walk buddy', img: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=900&q=85', about: 'Bailey has a wonderful nose and an even better heart. He is happiest exploring parks and spending time with his people.' },
    { id: 6, name: 'Nala', type: 'Cat', breed: 'Calico', age: '2 years', gender: 'Female', place: 'North Shelter', tag: 'Loves cuddles', img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=85', about: 'Nala is affectionate and confident. She likes gentle brushing, cozy blankets and being close to her favourite humans.' }
];

// Image fallback helper (hides broken images instead of showing a broken icon)
const imgFallback = (e) => { e.currentTarget.style.visibility = 'hidden'; };

const Ctx = createContext(null);
const useApp = () => useContext(Ctx);

function App() {
    const [dark, setDark] = useState(false);
    const [saved, setSaved] = useState([]);
    const [user, setUser] = useState(null);
    const [toast, setToast] = useState('');
    const notify = (s) => { setToast(s); window.setTimeout(() => setToast(''), 2800) };

    // Keep the mobile browser chrome colour in sync with the theme
    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', dark ? '#17231d' : '#f7f6f1');
    }, [dark]);

    return <Ctx.Provider value={{ dark, setDark, saved, setSaved, user, setUser, notify }}>
        <div className={dark ? 'app dark' : 'app'}><Header /><main><AnimatePresence mode="wait"><Routes>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/pets" element={<Page><Pets /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/mission" element={<Page><Mission /></Page>} />
            <Route path="/care" element={<Page><Care /></Page>} />
            <Route path="/community" element={<Page><Community /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="/adopt" element={<Page><Application kind="Adoption" /></Page>} />
            <Route path="/release" element={<Page><Application kind="Pet release" /></Page>} />
            <Route path="/login" element={<Page><Auth mode="Login" /></Page>} />
            <Route path="/signup" element={<Page><Auth mode="Sign up" /></Page>} />
            <Route path="*" element={<Page><div className="page shell"><h1>Page not found</h1><Link className="btn primary" to="/">Back home</Link></div></Page>} />
        </Routes></AnimatePresence></main><Footer />{toast && <div className="toast"><CheckCircle2 size={17} />{toast}</div>}</div>
    </Ctx.Provider>
}

function Page({ children }) {
    const loc = useLocation();
    return <motion.div key={loc.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>{children}</motion.div>
}

function Header() {
    const { dark, setDark, user } = useApp();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Close the mobile navigation whenever the route changes.
    useEffect(() => { setOpen(false); }, [location.pathname]);

    // Allow ESC to close the mobile menu.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const links = [
        ['Home', '/'],
        ['Meet the pets', '/pets'],
        ['Our story', '/about'],
        ['Mission', '/mission'],
        ['Pet care', '/care'],
        ['Community', '/community'],
        ['Contact', '/contact']
    ];
    return <header className="header"><div className="nav shell">
        <Link to="/" className="brand"><span className="brand-icon"><PawPrint /></span><span>pet<span>heaven</span><small>RESCUE · ADOPT · LOVE</small></span></Link>
        <nav className={open ? 'navlinks show' : 'navlinks'}>{links.map(([n, p]) => <NavLink end={p === '/'} key={p} to={p} onClick={() => setOpen(false)}>{n}</NavLink>)}
            <div className="mobile-links">
                <Link className="btn outline" to="/login" onClick={() => setOpen(false)}>Member login</Link>
                <Link className="btn primary" to="/adopt" onClick={() => setOpen(false)}>Adopt a pet</Link>
            </div>
        </nav>
        <div className="navright"><button className="iconbtn" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun /> : <Moon />}</button><Link to="/login" className="login">{user?.name || 'Log in'}</Link><Link className="btn primary navcta" to="/pets">Find a friend <ArrowRight size={16} /></Link><button className="iconbtn menubtn" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button></div>
    </div></header>
}

function Home() {
    return <>
        <section className="hero shell">
            <div className="hero-copy"><div className="eyebrow"><i /> A LITTLE LOVE CHANGES EVERYTHING</div><h1>Find your <em>forever</em><br />kind of love.</h1><p className="lead">A second chance, a new best friend, a home full of joy. Meet the wonderful pets waiting for someone just like you.</p>
                <div className="actions"><Link className="btn primary large" to="/pets">Meet your new best friend <ArrowRight /></Link><Link className="textlink" to="/about">Discover our story <ArrowRight size={16} /></Link></div>
                <div className="proof"><span>🐶</span><span>🐱</span><span>🐾</span><div><b>1,200+ happy endings</b><small>And every story starts with you.</small></div></div>
            </div>
            <div className="hero-visual"><img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=90" alt="Happy golden retriever" onError={imgFallback} /><div className="floatnote topnote"><Heart fill="currentColor" /><div><b>Love lives here</b><small>Every paw has a story</small></div></div><div className="floatnote bottomnote"><span>🐾</span><div><b>Meet your new best friend</b><small>Your next adventure awaits</small></div></div><span className="sparkle">✳</span></div>
        </section>
        <section className="stats"><div className="shell statrow">{[['1,200+', 'Pets rehomed'], ['98%', 'Happy families'], ['12', 'Years of caring'], ['100%', 'Love, always']].map(x => <div className="stat" key={x[1]}><b>{x[0]}</b><span>{x[1]}</span></div>)}</div></section>
        <section className="section shell"><SectionTitle eyebrow="A FRIEND IS WAITING" title="Little faces, big personalities." text="Every pet has a story. Maybe the next chapter is with you." link="/pets" label="View all pets" /><div className="petgrid">{animals.slice(0, 3).map(p => <PetCard key={p.id} pet={p} />)}</div></section>
        <section className="mission shell"><img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=85" alt="Dog enjoying the outdoors" loading="lazy" onError={imgFallback} /><div><div className="eyebrow">MORE THAN A SHELTER</div><h2>Every paw deserves<br />a place to belong.</h2><p>We rescue, protect and rehome animals with compassion. From the first safe night to the forever-home cuddle, we are here for every step.</p><Link className="btn darkbtn" to="/about">Our mission <ArrowRight size={16} /></Link></div></section>
        <section className="section shell"><SectionTitle eyebrow="CARE THAT GOES HOME" title="A happier life starts with good care." text="Friendly guidance for every stage of your pet-parent journey." link="/care" label="Explore pet care" /><div className="threecards"><Mini icon={<Stethoscope />} title="Healthy beginnings" text="Vet visits, vaccinations and preventive care." /><Mini icon={<Dog />} title="Everyday wellbeing" text="Nutrition, exercise and enrichment made simple." /><Mini icon={<Heart />} title="A gentle transition" text="Help your new friend settle in with confidence." /></div></section>
        <section className="cta shell"><div><div className="eyebrow light">YOUR NEXT CHAPTER STARTS HERE</div><h2>Ready to make a little<br />room for a lot of love?</h2></div><Link className="btn whitebtn large" to="/pets">Find your forever friend <ArrowRight /></Link></section>
    </>
}

function SectionTitle({ eyebrow, title, text, link, label }) { return <div className="sectiontitle"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><p>{text}</p></div>{link && <Link className="textlink" to={link}>{label} <ArrowRight size={16} /></Link>}</div> }
function Mini({ icon, title, text }) { return <div className="minicard"><span>{icon}</span><h3>{title}</h3><p>{text}</p></div> }

function PetCard({ pet }) {
    const { saved, setSaved } = useApp();
    const [detail, setDetail] = useState(false);
    const yes = saved.includes(pet.id);
    return <>
        <motion.article className="petcard" whileHover={{ y: -5 }}>
            <div className="petphoto"><img src={pet.img} alt={pet.name} loading="lazy" onError={imgFallback} /><span className="available">Available</span><button className={yes ? 'save saved' : 'save'} onClick={() => setSaved(yes ? saved.filter(x => x !== pet.id) : [...saved, pet.id])} aria-label="Save pet"><Heart fill={yes ? 'currentColor' : 'none'} /></button></div>
            <div className="petbody"><div className="petname"><h3>{pet.name}</h3><span>{pet.age}</span></div><p>{pet.breed} · {pet.gender}</p><div className="petfoot"><span><MapPin size={13} /> {pet.place}</span><button onClick={() => setDetail(true)}>Meet {pet.name} <ArrowRight size={14} /></button></div></div>
        </motion.article>
        {detail && <Modal close={() => setDetail(false)}><div className="petdetail"><img src={pet.img} alt={pet.name} onError={imgFallback} /><div><div className="eyebrow">SAY HELLO TO</div><h2>{pet.name}</h2><p className="muted">{pet.breed} · {pet.age} · {pet.gender}</p><p>{pet.about}</p><span className="tag">{pet.tag}</span><Link className="btn primary" to="/adopt" onClick={() => setDetail(false)}>Apply to adopt <ArrowRight size={16} /></Link></div></div></Modal>}
    </>
}

function Modal({ children, close }) {
    // ESC closes the modal
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') close(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [close]);

    return <div className="backdrop" onMouseDown={close}><motion.div className="modal" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} onMouseDown={e => e.stopPropagation()}><button className="modalx" onClick={close} aria-label="Close"><X /></button>{children}</motion.div></div>
}

function Pets() {
    const [type, setType] = useState('All'), [query, setQuery] = useState(''), [age, setAge] = useState('Any age');
    const list = useMemo(() => animals.filter(p => (type === 'All' || p.type === type) && (age === 'Any age' || (age === 'Young' && parseInt(p.age) < 2) || (age === 'Adult' && parseInt(p.age) >= 2)) && `${p.name} ${p.breed}`.toLowerCase().includes(query.toLowerCase())), [type, query, age]);
    return <div className="page shell"><PageIntro eyebrow="MEET THE FAMILY" title="Your new best friend is here." text="Get to know the lovely dogs and cats waiting for a place to call home." /><div className="toolbar"><div className="tabs">{['All', 'Dog', 'Cat'].map(t => <button className={type === t ? 'active' : ''} onClick={() => setType(t)} key={t}>{t === 'Dog' ? <Dog size={16} /> : t === 'Cat' ? <Cat size={16} /> : <Heart size={16} />} {t === 'All' ? 'All pets' : t + 's'}</button>)}</div><div className="searchbox"><Search /><input placeholder="Search name or breed..." value={query} onChange={e => setQuery(e.target.value)} /></div><select value={age} onChange={e => setAge(e.target.value)}><option>Any age</option><option>Young</option><option>Adult</option></select></div><p className="resultcount">{list.length} lovely {list.length === 1 ? 'pet' : 'pets'} to meet</p>{list.length ? <div className="petgrid">{list.map(p => <PetCard key={p.id} pet={p} />)}</div> : <div className="empty"><PawPrint /><h3>No pets found just yet</h3><p>Try another search or filter.</p><button className="btn primary" onClick={() => { setType('All'); setQuery(''); setAge('Any age') }}>Clear filters</button></div>}<div className="softcallout"><HandHeart /><div><b>Can't find your perfect match?</b><p>Tell us what you're looking for. Our team would love to help.</p></div><Link to="/contact" className="textlink">Talk to us <ArrowRight size={15} /></Link></div></div>
}

function PageIntro({ eyebrow, title, text }) { return <div className="pageintro"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></div> }

function About() {
    return <div className="page shell"><PageIntro eyebrow="OUR STORY" title="A safe place. A fresh start. A forever home." text="We believe every animal deserves kindness, safety and the chance to be loved." /><div className="aboutphoto"><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=85" alt="Two happy dogs together" loading="lazy" onError={imgFallback} /><div><Quote /><p>We don't just find homes for pets. We help families find each other.</p></div></div><div className="aboutcols"><div><div className="eyebrow">WHY WE EXIST</div><h2>Compassion is our starting point.</h2></div><div><p>Pet Heaven is a community-led animal rescue and adoption initiative built around one simple belief: every pet deserves a safe, caring home. We provide temporary shelter, basic care and thoughtful adoption matching so each animal can begin again.</p><p>Our team works with adopters and pet guardians with patience, honesty and respect. We are here to make responsible pet ownership easier and keep the human-animal bond strong.</p></div></div><div className="threecards values"><Mini icon={<Heart />} title="Our mission" text="Rescue vulnerable pets and connect them with loving, responsible families." /><Mini icon={<ShieldCheck />} title="Our purpose" text="Promote animal welfare, responsible ownership and a kinder community." /><Mini icon={<HandHeart />} title="Our promise" text="Treat every animal and person with dignity, care and compassion." /></div><section className="cta"><div><div className="eyebrow light">BE PART OF THE CHANGE</div><h2>Small acts of kindness<br />make big differences.</h2></div><Link className="btn whitebtn" to="/adopt">Start your adoption journey <ArrowRight /></Link></section></div>
}

function Mission() {
    return <div className="page shell">
        <PageIntro eyebrow="OUR MISSION & PURPOSE" title="Why Pet Heaven exists." text="We rescue vulnerable pets and connect them with loving, responsible families — while building a kinder community for animals and people alike." />
        <div className="threecards values">
            <Mini icon={<Heart />} title="Our mission" text="Rescue vulnerable pets and connect them with loving, responsible families." />
            <Mini icon={<ShieldCheck />} title="Our purpose" text="Promote animal welfare, responsible ownership and a kinder community." />
            <Mini icon={<HandHeart />} title="Our promise" text="Treat every animal and person with dignity, care and compassion." />
        </div>
        <div className="aboutcols">
            <div><div className="eyebrow">WHAT DRIVES US</div><h2>Every paw deserves a safe next chapter.</h2></div>
            <div>
                <p>Our mission is simple: give rescued animals a safe place to heal and a thoughtful path to a forever home. We match pets with families based on lifestyle, space and experience — not speed.</p>
                <p>Our purpose goes beyond adoption. We educate pet guardians, support responsible ownership and work with the community to reduce abandonment and neglect.</p>
            </div>
        </div>
        <section className="cta"><div><div className="eyebrow light">JOIN THE MISSION</div><h2>Help us write more<br />happy endings.</h2></div><Link className="btn whitebtn" to="/adopt">Start your adoption journey <ArrowRight /></Link></section>
    </div>
}

function Care() {
    const [expanded, setExpanded] = useState(0);
    const tips = [['The first few days at home', 'Give your new pet a quiet, comfortable space. Keep routines predictable, introduce family members slowly and let them explore at their own pace. Patience builds trust.'], ['Food, water and nutrition', 'Choose age-appropriate food, keep fresh water available and make diet changes gradually. Ask a veterinarian about suitable portions and dietary needs.'], ['Preventive health care', 'Schedule a health check with a veterinarian. Discuss vaccinations, parasite prevention, dental care, microchipping and a suitable sterilisation plan.'], ['Exercise and enrichment', 'Daily movement and play support physical and mental wellbeing. Use walks, puzzle feeders, scratching posts and short training sessions suited to your pet.'], ['Grooming and hygiene', 'Brush regularly, keep bedding clean and check ears, eyes, paws and coat. Introduce grooming gently and reward calm behaviour.']];
    return <div className="page shell"><PageIntro eyebrow="THE GOOD PET-PARENT GUIDE" title="Care makes a house feel like home." text="A little knowledge goes a long way. Explore our practical, beginner-friendly pet care guide." /><div className="carehero"><img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1100&q=85" alt="Happy dog outdoors" loading="lazy" onError={imgFallback} /><div><div className="eyebrow">START WITH THE BASICS</div><h2>Love is important.<br />Good care is love in action.</h2><p>Bringing a pet home is a joyful commitment. Make time for health, safety, training, play and plenty of affection.</p><Link to="/contact" className="textlink">Ask our team a question <ArrowRight size={16} /></Link></div></div><div className="caregrid"><div><div className="eyebrow">QUICK LEARNING</div><h2>Five essentials for a happy pet.</h2><p className="muted">Select a topic to reveal helpful tips.</p><div className="accordion">{tips.map(([t, b], i) => <div className="accitem" key={t}><button onClick={() => setExpanded(expanded === i ? -1 : i)}><span><b>0{i + 1}</b>{t}</span><ChevronDown /></button>{expanded === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{b}</motion.p>}</div>)}</div></div><aside className="careaside"><Stethoscope /><h3>When in doubt, ask a vet.</h3><p>Online tips are a starting point, not a substitute for professional veterinary advice. If your pet seems unwell, contact a qualified veterinarian.</p><small><CheckCircle2 /> Save your vet's contact details before you need them.</small></aside></div><div className="videosection"><div><div className="eyebrow">LEARN & GROW TOGETHER</div><h2>Helpful videos for new pet parents.</h2><p className="muted">Explore beginner-friendly learning resources.</p></div><div className="videocards"><a href="https://www.youtube.com/results?search_query=how+to+prepare+for+a+new+dog" target="_blank" rel="noreferrer"><Play fill="currentColor" /><b>Preparing for a new dog</b><small>Find learning videos on YouTube ↗</small></a><a href="https://www.youtube.com/results?search_query=cat+care+for+beginners" target="_blank" rel="noreferrer"><Play fill="currentColor" /><b>Cat care for beginners</b><small>Find learning videos on YouTube ↗</small></a></div></div></div>
}

function Community() {
    const { notify } = useApp();
    const [reviews, setReviews] = useState([{ name: 'Alicia T.', pet: 'Adopted Bella', text: 'The team made the whole process feel thoughtful and personal. Bella has settled in beautifully and our home feels brighter already.' }, { name: 'Marcus L.', pet: 'Adopted Toby', text: 'We appreciated the honest advice and follow-up tips. Toby is now our favourite walking partner. Thank you, Pet Heaven!' }, { name: 'Priya R.', pet: 'Adopted Mochi', text: 'From the first visit to bringing Mochi home, everyone was kind and patient. I felt supported at every step.' }]);
    const [f, setF] = useState({ name: '', pet: '', text: '' });
    function submit(e) { e.preventDefault(); setReviews([{ ...f, pet: f.pet || 'Pet Heaven community member' }, ...reviews]); setF({ name: '', pet: '', text: '' }); notify('Thank you for sharing your story!') }
    return <div className="page shell"><PageIntro eyebrow="HAPPY TAILS" title="Love stories worth sharing." text="Every adoption is the beginning of a beautiful new chapter. Here are a few from our community." /><div className="reviewsummary"><strong>5.0</strong><span>★★★★★</span><p>Community stories from people who opened their homes and hearts to a rescue pet.</p></div><div className="reviewgrid">{reviews.map((r, i) => <article className="review" key={i}><Quote /><div className="stars">★★★★★</div><p>“{r.text}”</p><div className="reviewperson"><i>{r.name.charAt(0)}</i><div><b>{r.name}</b><small>{r.pet}</small></div></div></article>)}</div><div className="feedback"><div><div className="eyebrow">YOUR VOICE MATTERS</div><h2>Have a happy tail to tell?</h2><p>Share your experience and inspire another family to adopt.</p></div><form className="form" onSubmit={submit}><label>Your name<input required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="e.g. Jamie" /></label><label>Pet's name (optional)<input value={f.pet} onChange={e => setF({ ...f, pet: e.target.value })} placeholder="e.g. Bella" /></label><label>Your story<textarea required rows="3" value={f.text} onChange={e => setF({ ...f, text: e.target.value })} placeholder="Tell us about your experience..." /></label><button className="btn primary">Share your story <Send size={15} /></button></form></div></div>
}

function Contact() {
    const { notify } = useApp();
    const [sent, setSent] = useState(false);
    return <div className="page shell"><PageIntro eyebrow="WE'D LOVE TO HEAR FROM YOU" title="A question, a kind thought, or a paw to help?" text="Our team is here to help with adoption enquiries, pet release questions and ways to get involved." /><div className="contactgrid"><div className="contactinfo"><div><Mail /><span><b>Email us</b><small>hello@petheaven.example</small></span></div><div><Phone /><span><b>Call our team</b><small>+65 6123 4567</small></span></div><div><MapPin /><span><b>Visit by appointment</b><small>Community Animal Care Centre, Singapore</small></span></div><p className="notice">Demo notice: contact details are placeholders. Replace them with your institution's actual details.</p></div><form className="form panel" onSubmit={e => { e.preventDefault(); setSent(true); notify('Your message has been recorded in this demo.') }}><h2>Send us a message</h2>{sent ? <div className="success"><CheckCircle2 /><h3>Message received!</h3><p>This is a frontend demo confirmation.</p><button type="button" className="btn outline" onClick={() => setSent(false)}>Send another</button></div> : <><div className="formrow"><label>Full name<input required placeholder="Your name" /></label><label>Email address<input type="email" required placeholder="you@example.com" /></label></div><label>I'm enquiring about<select><option>General enquiry</option><option>Adoption</option><option>Pet release</option><option>Volunteering</option></select></label><label>Message<textarea rows="5" required placeholder="How can we help?" /></label><button className="btn primary">Send message <ArrowRight size={16} /></button></>}</form></div></div>
}

function Application({ kind }) {
    const { notify } = useApp();
    const adopt = kind === 'Adoption';
    const [done, setDone] = useState(false);
    const [formKey, setFormKey] = useState(0); // bump to reset the form cleanly

    return <div className="page shell"><PageIntro eyebrow={adopt ? 'TAKE THE FIRST STEP' : 'HELP A PET FIND A NEW START'} title={adopt ? 'A new best friend could be closer than you think.' : 'Let us help your pet find a loving home.'} text={adopt ? 'Tell us a little about yourself so our team can help find the right match.' : 'If you need to rehome a pet, we are here to listen and discuss responsible next steps.'} /><div className="application"><aside><PawPrint /><h3>{adopt ? 'Adoption is a lifelong promise.' : 'Every pet deserves a safe next chapter.'}</h3><p>{adopt ? 'We want every match to be happy and lasting. Please consider the time, care and commitment a pet needs.' : 'Please provide honest information about your pet, their health and their needs. Our team will review your request.'}</p><ul><li><CheckCircle2 /> Compassionate matching</li><li><CheckCircle2 /> Guidance from our team</li><li><CheckCircle2 /> Pet wellbeing comes first</li></ul><small>Demo notice: submissions are stored only in this page state and are not sent to a server.</small></aside><form key={formKey} className="form panel" onSubmit={e => { e.preventDefault(); setDone(true); notify(kind + ' form submitted in demo mode.') }}><div className="formhead"><div><div className="eyebrow">APPLICATION FORM</div><h2>{kind} enquiry</h2></div><span>01 / 01</span></div>{done ? <div className="success"><CheckCircle2 /><h3>Thank you!</h3><p>Your {kind.toLowerCase()} form has been accepted in this demo. In a real system, the team would contact you about next steps.</p><button type="button" className="btn outline" onClick={() => { setDone(false); setFormKey(k => k + 1); }}>Submit another form</button></div> : <><h4>Your details</h4><div className="formrow"><label>Full name *<input required placeholder="Your full name" /></label><label>Email address *<input required type="email" placeholder="you@example.com" /></label></div><div className="formrow"><label>Phone number *<input required type="tel" pattern="[0-9+() -]{8,}" placeholder="+65 8123 4567" /></label><label>Preferred contact<select><option>Email</option><option>Phone</option></select></label></div><h4>{adopt ? 'Your home & lifestyle' : 'About your pet'}</h4>{adopt ? <><div className="formrow"><label>Pet you're interested in<select required defaultValue=""><option value="" disabled>Select a pet</option>{animals.map(p => <option key={p.id}>{p.name} — {p.breed}</option>)}</select></label><label>Home type<select><option>HDB flat</option><option>Condominium</option><option>Landed property</option><option>Other</option></select></label></div><div className="formrow"><label>Pet experience<select><option>First-time owner</option><option>Some experience</option><option>Experienced owner</option></select></label><label>Household members<input placeholder="e.g. 2 adults, 1 child" /></label></div><label>Why would you like to adopt? *<textarea required rows="4" placeholder="Tell us about your home and why you feel ready..." /></label></> : <><div className="formrow"><label>Pet's name *<input required placeholder="Pet's name" /></label><label>Animal type<select required><option>Dog</option><option>Cat</option><option>Other</option></select></label></div><div className="formrow"><label>Breed / mix<input placeholder="If known" /></label><label>Pet's age<input placeholder="e.g. 3 years" /></label></div><label>Reason for rehoming *<textarea required rows="3" placeholder="Please share the circumstances..." /></label><label>Health, behaviour and care needs<textarea rows="3" placeholder="Include any relevant details..." /></label></>}<label className="check"><input type="checkbox" required /> I confirm that the information provided is accurate and understand this is a demo form.</label><button className="btn primary">Submit {kind} enquiry <ArrowRight size={16} /></button></>}</form></div></div>
}

function Auth({ mode }) {
    const { setUser, notify } = useApp();
    const [done, setDone] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const signup = mode === 'Sign up';

    function submit(e) {
        e.preventDefault();
        const displayName = signup ? form.name : (form.email.split('@')[0] || 'Pet Heaven Member');
        setUser({ name: displayName });
        setDone(true);
        notify(signup ? 'Demo account created.' : 'Demo login successful.');
    }

    return <div className="authpage"><form className="form panel authform" onSubmit={submit}><div className="authicon"><PawPrint /></div><div className="eyebrow">WELCOME TO THE FAMILY</div><h1>{done ? 'Welcome to Pet Heaven!' : signup ? 'Create your member account' : 'Welcome back.'}</h1><p className="muted">{done ? 'You are signed in locally for this demo.' : 'Join a community that believes every paw deserves a home.'}</p>{!done && <>{signup && <label>Full name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>}<label>Email address<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Password<input type="password" required minLength="6" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" /></label><button className="btn primary full">{signup ? 'Create account' : 'Log in'} <ArrowRight size={16} /></button><p className="fineprint">Demo only: authentication is simulated in the browser. No password is stored or sent.</p><p className="switchauth">{signup ? 'Already a member?' : 'New to Pet Heaven?'} <Link to={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Sign up'}</Link></p></>}{done && <Link className="btn primary full" to="/pets">Explore the pets <ArrowRight /></Link>}</form></div>
}

function Footer() {
    return <footer className="footer"><div className="shell footergrid"><div><Link to="/" className="brand footerbrand"><span className="brand-icon"><PawPrint /></span><span>pet<span>heaven</span><small>RESCUE · ADOPT · LOVE</small></span></Link><p>Making room for more love, one paw at a time.</p></div><div><b>Explore</b><Link to="/pets">Meet the pets</Link><Link to="/about">Our story</Link><Link to="/mission">Mission & purpose</Link><Link to="/care">Pet care guide</Link></div><div><b>Get involved</b><Link to="/adopt">Adopt a pet</Link><Link to="/release">Pet release enquiry</Link><Link to="/community">Happy tails</Link></div><div><b>Say hello</b><Link to="/contact">Contact us</Link><span>hello@petheaven.example</span><span>Singapore</span></div></div><div className="shell copyright"><span>© 2026 Pet Heaven. Coursework demonstration project.</span><span>Made with <Heart size={13} fill="currentColor" /> for every paw.</span></div></footer>
}

export default App;