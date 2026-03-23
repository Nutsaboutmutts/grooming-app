import { useState, useEffect } from "react";

// ── DEFAULTS ───────────────────────────────────────────────────────────────
const DEFAULT_GROOMERS = ["Cindy","Carly","Rita","Suzanne","Angela","Kathy","Arianna"];
const DEFAULT_BATHERS  = ["Tara","Vanessa","Scott"];

const DEFAULT_MESSAGES = [
  { id:"checkin",      label:"Checked In",         icon:"🐾", color:"#2A9D8F", text:"Hi {owner}! Welcome to our salon! 🐾 We're SO excited to have {pet} with us today. You're in great hands — we'll keep you updated every step of the way!" },
  { id:"consultation", label:"Consultation",        icon:"📋", color:"#457AB2", text:"Hi {owner}! We just finished {pet}'s consultation and we love them already! 😍 We're about to start their pampering journey. Stay tuned!" },
  { id:"bath",         label:"Bath Time",           icon:"🛁", color:"#6A5ACD", text:"Splish splash! 🛁 {pet} is in the bath right now getting all soaped up and squeaky clean. They're doing amazing!" },
  { id:"drying",       label:"Drying",              icon:"💨", color:"#D4623A", text:"{pet} is all clean and now getting fluffed up in the dryer! 💨 Looking fabulous already. Almost to the fun part!" },
  { id:"haircut",      label:"Haircut",             icon:"✂️", color:"#C8860A", text:"Snip snip! ✂️ {pet} is on the styling table getting their haircut right now. Our groomer is working their magic — your pup will be stunning!" },
  { id:"finishing",    label:"Finishing Touches",   icon:"✨", color:"#A0429F", text:"Almost ready! ✨ We're putting the finishing touches on {pet} — bow, bandana, spritz of cologne... looking like a 10/10! 🌟" },
  { id:"ready",        label:"Ready for Pickup!",   icon:"🎉", color:"#2E9E4F", text:"🎉 {pet} is READY! Come pick up your gorgeous pup within {pickup}. We can't wait for you to see them — they look AMAZING! 💕" },
];

const PICKUP_OPTIONS = [
  { label:"30 minutes", value:1800  },
  { label:"1 hour",     value:3600  },
  { label:"2 hours",    value:7200  },
  { label:"3 hours",    value:10800 },
  { label:"End of day", value:28800 },
  { label:"No timer",   value:null  },
];

// fill in {pet}, {owner}, {pickup} tokens
function fillMessage(text, pet, owner, pickup) {
  return text
    .replace(/{pet}/g,    pet)
    .replace(/{owner}/g,  owner)
    .replace(/{pickup}/g, pickup?.value ? pickup.label : "whenever you're ready");
}

// ── SETTINGS SCREEN ────────────────────────────────────────────────────────
function SettingsScreen({ groomers, bathers, messages, defaultPickup, salonName, onSave, onBack }) {
  const [tab,            setTab]            = useState("staff");
  const [editGroomers,   setEditGroomers]   = useState([...groomers]);
  const [editBathers,    setEditBathers]    = useState([...bathers]);
  const [editMessages,   setEditMessages]   = useState(messages.map(m=>({...m})));
  const [editPickup,     setEditPickup]     = useState(defaultPickup);
  const [editSalonName,  setEditSalonName]  = useState(salonName);
  const [newGroomer,     setNewGroomer]     = useState("");
  const [newBather,      setNewBather]      = useState("");
  const [saved,          setSaved]          = useState(false);

  const handleSave = () => {
    onSave({
      groomers:     editGroomers.filter(Boolean),
      bathers:      editBathers.filter(Boolean),
      messages:     editMessages,
      defaultPickup:editPickup,
      salonName:    editSalonName,
    });
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  const tabStyle = (active) => ({
    flex:1, padding:"10px 4px", background: active ? "#2A9D8F" : "#F0EDE8",
    border:"none", borderRadius:10, cursor:"pointer", fontSize:13,
    fontWeight:700, color: active ? "#fff" : "#666", transition:"all 0.15s",
  });

  return (
    <div style={S.screen}>
      {saved && (
        <div style={{position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:"#F0FAF4", border:"1.5px solid #2E9E4F", borderRadius:14, padding:"12px 24px", zIndex:999, boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}>
          <p style={{color:"#2E9E4F", fontWeight:700, fontSize:14, margin:0}}>✅ Settings saved!</p>
        </div>
      )}

      <div style={S.topBar}>
        <button style={{...S.backBtn, color:"#2A9D8F"}} onClick={onBack}>← Back</button>
        <span style={{fontFamily:"serif", fontSize:17, fontWeight:700}}>⚙️ Settings</span>
        <button style={{background:"#2A9D8F", border:"none", borderRadius:10, padding:"8px 16px", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer"}} onClick={handleSave}>
          Save
        </button>
      </div>

      {/* Salon name */}
      <div style={S.card}>
        <label style={S.label}>🏠 Salon Name</label>
        <input style={S.input} value={editSalonName} onChange={e=>setEditSalonName(e.target.value)} placeholder="Your salon name" />
      </div>

      {/* Tabs */}
      <div style={{display:"flex", gap:8, marginBottom:14}}>
        {[["staff","👥 Staff"],["messages","💬 Messages"],["pickup","⏱ Pickup"]].map(([id,lbl])=>(
          <button key={id} style={tabStyle(tab===id)} onClick={()=>setTab(id)}>{lbl}</button>
        ))}
      </div>

      {/* ── STAFF TAB ── */}
      {tab === "staff" && (
        <>
          <div style={S.card}>
            <p style={{...S.label, color:"#2A9D8F"}}>✂️ Groomers</p>
            {editGroomers.map((name,i) => (
              <div key={i} style={{display:"flex", gap:8, marginBottom:8, alignItems:"center"}}>
                <input style={{...S.input, marginBottom:0, flex:1}} value={name}
                  onChange={e=>{ const a=[...editGroomers]; a[i]=e.target.value; setEditGroomers(a); }}
                  placeholder="Groomer name" />
                <button onClick={()=>setEditGroomers(editGroomers.filter((_,j)=>j!==i))}
                  style={{background:"#FEE2E2", border:"none", borderRadius:8, padding:"10px 12px", cursor:"pointer", color:"#EF4444", fontWeight:700, fontSize:14}}>✕</button>
              </div>
            ))}
            <div style={{display:"flex", gap:8, marginTop:4}}>
              <input style={{...S.input, marginBottom:0, flex:1}} value={newGroomer}
                onChange={e=>setNewGroomer(e.target.value)}
                placeholder="Add new groomer..."
                onKeyDown={e=>{ if(e.key==="Enter"&&newGroomer.trim()){ setEditGroomers([...editGroomers,newGroomer.trim()]); setNewGroomer(""); }}} />
              <button onClick={()=>{ if(newGroomer.trim()){ setEditGroomers([...editGroomers,newGroomer.trim()]); setNewGroomer(""); }}}
                style={{background:"#2A9D8F", border:"none", borderRadius:8, padding:"10px 16px", cursor:"pointer", color:"#fff", fontWeight:700, fontSize:18}}>+</button>
            </div>
          </div>

          <div style={S.card}>
            <p style={{...S.label, color:"#457AB2"}}>🛁 Bathers</p>
            {editBathers.map((name,i) => (
              <div key={i} style={{display:"flex", gap:8, marginBottom:8, alignItems:"center"}}>
                <input style={{...S.input, marginBottom:0, flex:1}} value={name}
                  onChange={e=>{ const a=[...editBathers]; a[i]=e.target.value; setEditBathers(a); }}
                  placeholder="Bather name" />
                <button onClick={()=>setEditBathers(editBathers.filter((_,j)=>j!==i))}
                  style={{background:"#FEE2E2", border:"none", borderRadius:8, padding:"10px 12px", cursor:"pointer", color:"#EF4444", fontWeight:700, fontSize:14}}>✕</button>
              </div>
            ))}
            <div style={{display:"flex", gap:8, marginTop:4}}>
              <input style={{...S.input, marginBottom:0, flex:1}} value={newBather}
                onChange={e=>setNewBather(e.target.value)}
                placeholder="Add new bather..."
                onKeyDown={e=>{ if(e.key==="Enter"&&newBather.trim()){ setEditBathers([...editBathers,newBather.trim()]); setNewBather(""); }}} />
              <button onClick={()=>{ if(newBather.trim()){ setEditBathers([...editBathers,newBather.trim()]); setNewBather(""); }}}
                style={{background:"#457AB2", border:"none", borderRadius:8, padding:"10px 16px", cursor:"pointer", color:"#fff", fontWeight:700, fontSize:18}}>+</button>
            </div>
          </div>
        </>
      )}

      {/* ── MESSAGES TAB ── */}
      {tab === "messages" && (
        <div style={S.card}>
          <p style={{fontSize:12, color:"#aaa", margin:"0 0 16px", lineHeight:1.6}}>
            💡 Use <strong style={{color:"#2A9D8F"}}>{"{pet}"}</strong> for the pet's name, <strong style={{color:"#2A9D8F"}}>{"{owner}"}</strong> for the owner's name, and <strong style={{color:"#2A9D8F"}}>{"{pickup}"}</strong> for the pickup time (on the ready message).
          </p>
          {editMessages.map((msg,i) => (
            <div key={msg.id} style={{marginBottom:18, paddingBottom:18, borderBottom: i<editMessages.length-1?"1px solid #EAE6E0":"none"}}>
              <p style={{fontSize:13, fontWeight:700, color:msg.color, margin:"0 0 8px"}}>{msg.icon} {msg.label}</p>
              <textarea
                style={{...S.input, resize:"vertical", minHeight:88, fontSize:13, lineHeight:1.6}}
                value={msg.text}
                onChange={e=>{ const a=[...editMessages]; a[i]={...a[i],text:e.target.value}; setEditMessages(a); }}
              />
              <p style={{fontSize:11, color:"#bbb", margin:"4px 0 0"}}>
                Preview: {fillMessage(msg.text,"Bella","Sarah",{label:"30 minutes",value:1800}).slice(0,80)}...
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── PICKUP TAB ── */}
      {tab === "pickup" && (
        <div style={S.card}>
          <p style={{...S.label, color:"#2A9D8F"}}>⏱ Default Pickup Window</p>
          <p style={{fontSize:12, color:"#aaa", margin:"0 0 14px", lineHeight:1.6}}>
            This sets the default for all new check-ins. Staff can still change it per pet at check-in.
          </p>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            {PICKUP_OPTIONS.map(opt => {
              const active = editPickup.label === opt.label;
              return (
                <button key={opt.label} onClick={()=>setEditPickup(opt)} style={{
                  background: active ? "#2A9D8F" : "#FAF7F2",
                  border:`2px solid ${active ? "#2A9D8F" : "#DDD8D0"}`,
                  borderRadius:12, padding:"14px 10px", cursor:"pointer",
                  color: active ? "#fff" : "#555", fontSize:14,
                  fontWeight: active ? 700 : 500, transition:"all 0.15s",
                }}>
                  {opt.label}
                  {active && <div style={{fontSize:11, marginTop:4, opacity:0.85}}>✓ Default</div>}
                </button>
              );
            })}
          </div>
          <div style={{background:"#F0FAF8", borderRadius:12, padding:"12px 16px", marginTop:16, border:"1px solid #B7E4C7"}}>
            <p style={{fontSize:13, color:"#2E9E4F", fontWeight:700, margin:"0 0 4px"}}>Current default: {editPickup.label}</p>
            <p style={{fontSize:12, color:"#555", margin:0}}>
              {editPickup.value ? `Timer will count down ${editPickup.label} from when a pet is marked ready.` : "No timer will be shown — owners pick up at their convenience."}
            </p>
          </div>
        </div>
      )}

      <button style={{...S.primaryBtn, marginTop:8}} onClick={handleSave}>
        ✅ Save All Settings
      </button>
    </div>
  );
}

// ── STAFF SELECT ───────────────────────────────────────────────────────────
function StaffSelect({ groomers, bathers, salonName, onSelect, onSettings }) {
  return (
    <div style={S.screen}>
      <div style={S.logoArea}>
        <div style={{fontSize:44, marginBottom:6}}>🐾</div>
        <h1 style={S.appTitle}>{salonName || "PawProgress"}</h1>
        <p style={S.appSubtitle}>Grooming Status System</p>
      </div>

      <div style={S.card}>
        <h2 style={S.cardTitle}>✂️ Groomers</h2>
        <p style={S.cardSubtitle}>Tap your name to get started</p>
        <div style={S.grid}>
          {groomers.map(name => (
            <button key={name} style={S.staffBtn} onClick={()=>onSelect(name,"groomer")}
              onMouseOver={e=>{e.currentTarget.style.background="#2A9D8F";e.currentTarget.style.color="#fff";}}
              onMouseOut={e=>{e.currentTarget.style.background="#F0EDE8";e.currentTarget.style.color="#333";}}>
              <span style={S.initial}>{name[0]}</span>
              <span style={S.staffName}>{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={S.card}>
        <h2 style={S.cardTitle}>🛁 Bathers</h2>
        <p style={S.cardSubtitle}>Tap your name to get started</p>
        <div style={S.grid}>
          {bathers.map(name => (
            <button key={name} style={{...S.staffBtn, background:"#EDF4FB"}} onClick={()=>onSelect(name,"bather")}
              onMouseOver={e=>{e.currentTarget.style.background="#457AB2";e.currentTarget.style.color="#fff";}}
              onMouseOut={e=>{e.currentTarget.style.background="#EDF4FB";e.currentTarget.style.color="#333";}}>
              <span style={{...S.initial, background:"#CCDFF0", color:"#457AB2", border:"1.5px solid #A8C8E8"}}>{name[0]}</span>
              <span style={S.staffName}>{name}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={onSettings} style={{...S.primaryBtn, background:"#F0EDE8", color:"#666", border:"1px solid #DDD8D0", marginTop:4}}>
        ⚙️ Salon Settings
      </button>
    </div>
  );
}

// ── CHECK IN FORM ──────────────────────────────────────────────────────────
function CheckInForm({ staffName, role, defaultPickup, onCheckIn, onBack }) {
  const [petName,    setPetName]    = useState("");
  const [ownerName,  setOwnerName]  = useState("");
  const [phone,      setPhone]      = useState("");
  const [breed,      setBreed]      = useState("");
  const [pickupTime, setPickupTime] = useState(defaultPickup);

  const accent = role === "bather" ? "#457AB2" : "#2A9D8F";
  const valid  = petName.trim() && ownerName.trim() && phone.trim();

  return (
    <div style={S.screen}>
      <div style={S.topBar}>
        <button style={{...S.backBtn, color:accent}} onClick={onBack}>← Back</button>
        <span style={S.badge}>{role==="bather"?"🛁":"✂️"} {staffName}</span>
      </div>
      <div style={S.card}>
        <div style={{textAlign:"center", marginBottom:18}}>
          <span style={{fontSize:34}}>🐾</span>
          <h2 style={S.cardTitle}>New Client Check-In</h2>
          <p style={S.cardSubtitle}>Enter pet & owner details</p>
        </div>
        {[
          {label:"Pet's Name *",    val:petName,   set:setPetName,   ph:"e.g. Bella"},
          {label:"Owner's Name *",  val:ownerName, set:setOwnerName, ph:"e.g. Sarah"},
          {label:"Owner's Phone *", val:phone,     set:setPhone,     ph:"e.g. 555-867-5309", type:"tel"},
          {label:"Breed (optional)",val:breed,     set:setBreed,     ph:"e.g. Golden Retriever"},
        ].map(f => (
          <div key={f.label} style={{marginBottom:12}}>
            <label style={{...S.label, color:accent}}>{f.label}</label>
            <input style={S.input} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} type={f.type||"text"} />
          </div>
        ))}

        <div style={{marginBottom:12}}>
          <label style={{...S.label, color:accent}}>⏱ Pickup Window</label>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:6}}>
            {PICKUP_OPTIONS.map(opt => {
              const active = pickupTime.label === opt.label;
              return (
                <button key={opt.label} onClick={()=>setPickupTime(opt)} style={{
                  background: active ? accent : "#FAF7F2",
                  border:`2px solid ${active ? accent : "#DDD8D0"}`,
                  borderRadius:10, padding:"10px 6px", cursor:"pointer",
                  color: active ? "#fff" : "#555", fontSize:12,
                  fontWeight: active ? 700 : 500, transition:"all 0.15s",
                }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <button style={{...S.primaryBtn, background:accent, opacity:valid?1:0.4, marginTop:6}} disabled={!valid}
          onClick={()=>onCheckIn({petName:petName.trim(), ownerName:ownerName.trim(), phone:phone.trim(), breed:breed.trim(), staffName, role, pickupTime})}>
          Check In & Start Journey 🚀
        </button>
      </div>
    </div>
  );
}

// ── SESSION SCREEN ─────────────────────────────────────────────────────────
function SessionScreen({ session, messages, onComplete, onBack }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [sentMessages, setSentMessages] = useState([]);
  const [showSMS,      setShowSMS]      = useState(null);
  const [timerActive,  setTimerActive]  = useState(false);
  const [timeLeft,     setTimeLeft]     = useState(session.pickupTime?.value || 1800);
  const [done,         setDone]         = useState(false);

  const accent = session.role === "bather" ? "#457AB2" : "#2A9D8F";
  const stage  = messages[currentStage];

  useEffect(() => { sendMessage(0); }, []);

  useEffect(() => {
    if (!timerActive || !session.pickupTime?.value) return;
    const id = setInterval(() => {
      setTimeLeft(t => { if(t<=1){clearInterval(id);return 0;} return t-1; });
    }, 1000);
    return () => clearInterval(id);
  }, [timerActive]);

  const sendMessage = (idx) => {
    const s   = messages[idx];
    const msg = fillMessage(s.text, session.petName, session.ownerName, session.pickupTime);
    const entry = { stage:s.label, icon:s.icon, color:s.color, msg, time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) };
    setSentMessages(prev=>[...prev,entry]);
    setShowSMS(entry);
    setTimeout(()=>setShowSMS(null), 3500);
  };

  const advanceStage = () => {
    const next = currentStage + 1;
    if (next >= messages.length) return;
    setCurrentStage(next);
    sendMessage(next);
    if (messages[next].id === "ready") {
      if (session.pickupTime?.value) { setTimeLeft(session.pickupTime.value); setTimerActive(true); }
      setTimeout(()=>setDone(true), 4000);
    }
  };

  const fmt = s => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  const warning = session.pickupTime?.value && timeLeft < session.pickupTime.value * 0.15;

  if (done) return (
    <div style={{...S.screen, justifyContent:"center", alignItems:"center"}}>
      <div style={S.doneCard}>
        <div style={{fontSize:72}}>🎉</div>
        <h2 style={{color:accent, fontFamily:"serif", fontSize:28, margin:"12px 0 8px"}}>All Done!</h2>
        <p style={{color:"#666", marginBottom:8}}>{session.petName} has been picked up!</p>
        <p style={{color:"#999", fontSize:13, marginBottom:24}}>Great work, {session.staffName}! 🐾</p>
        <button style={{...S.primaryBtn, background:accent}} onClick={onComplete}>Start New Client</button>
      </div>
    </div>
  );

  return (
    <div style={S.screen}>
      {showSMS && (
        <div style={S.toast}>
          <div style={S.toastHeader}>
            <span>📱 SMS Sent to {session.ownerName}</span>
            <span style={{opacity:0.6, fontSize:11}}>{showSMS.time}</span>
          </div>
          <p style={S.toastMsg}>{showSMS.msg}</p>
        </div>
      )}

      <div style={S.topBar}>
        <button style={{...S.backBtn, color:accent}} onClick={onBack}>← Back</button>
        <span style={S.badge}>{session.role==="bather"?"🛁":"✂️"} {session.staffName}</span>
      </div>

      <div style={{...S.card, display:"flex", gap:14, alignItems:"center", borderLeft:`4px solid ${accent}`}}>
        <div style={{fontSize:42}}>{session.breed?"🐕":"🐾"}</div>
        <div>
          <h2 style={{fontFamily:"serif", fontSize:20, margin:"0 0 3px", color:"#222"}}>{session.petName}</h2>
          <p style={{fontSize:13, color:accent, fontWeight:700, margin:"0 0 2px"}}>Owner: {session.ownerName}</p>
          {session.breed && <p style={{fontSize:12, color:"#999", margin:"0 0 2px"}}>{session.breed}</p>}
          <p style={{fontSize:12, color:"#bbb", margin:"0 0 2px"}}>📱 {session.phone}</p>
          <p style={{fontSize:11, color:"#ccc", margin:0}}>⏱ {session.pickupTime?.label}</p>
        </div>
      </div>

      {/* Progress */}
      <div style={S.card}>
        <p style={{fontSize:10, color:"#C4956A", letterSpacing:2, textTransform:"uppercase", margin:"0 0 12px", fontWeight:700}}>🐾 Journey Progress</p>
        <div style={{display:"flex", alignItems:"center"}}>
          {messages.map((s,i) => (
            <div key={s.id} style={{display:"flex", alignItems:"center", flex:i<messages.length-1?1:0}}>
              <div style={{
                width:28, height:28, borderRadius:"50%", flexShrink:0,
                background: i<currentStage?accent:i===currentStage?"#fff":"#F0EDE8",
                border:`2px solid ${i<=currentStage?accent:"#DDD8D0"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:12, color:i<currentStage?"#fff":i===currentStage?"#000":"#aaa",
                boxShadow:i===currentStage?`0 0 0 3px ${accent}22`:"none",
                transition:"all 0.3s",
              }}>
                {i<currentStage?"✓":s.icon}
              </div>
              {i<messages.length-1&&<div style={{flex:1, height:2, background:i<currentStage?accent:"#EAE6E0", transition:"background 0.3s"}}/>}
            </div>
          ))}
        </div>
        <p style={{fontSize:12, color:"#aaa", textAlign:"center", margin:"10px 0 0"}}>
          Step {currentStage+1} of {messages.length} — <strong style={{color:accent}}>{stage.label}</strong>
        </p>
      </div>

      {/* Stage card */}
      <div style={{...S.card, textAlign:"center", border:`2px solid ${stage.color}`, boxShadow:`0 0 18px ${stage.color}18`}}>
        <div style={{fontSize:48, marginBottom:8}}>{stage.icon}</div>
        <h3 style={{fontFamily:"serif", fontSize:20, color:stage.color, margin:"0 0 10px"}}>{stage.label}</h3>
        <p style={{fontSize:13, color:"#999", fontStyle:"italic", lineHeight:1.7, margin:"0 0 10px"}}>
          "{fillMessage(stage.text, session.petName, session.ownerName, session.pickupTime).slice(0,100)}..."
        </p>
        <p style={{color:accent, fontSize:12, margin:0, fontWeight:600}}>✅ SMS sent to client</p>
      </div>

      {/* Timer */}
      {currentStage === messages.length - 1 && (
        <div style={{...S.card, textAlign:"center", border:`2px solid ${warning?"#E05252":accent}`}}>
          <p style={{fontSize:10, color:"#C4956A", letterSpacing:2, textTransform:"uppercase", margin:"0 0 6px", fontWeight:700}}>⏱ Pickup Window — {session.pickupTime?.label}</p>
          {session.pickupTime?.value ? (
            <>
              <p style={{fontSize:44, fontFamily:"monospace", fontWeight:700, margin:"0 0 4px", color:warning?"#E05252":accent}}>{fmt(timeLeft)}</p>
              {warning && <p style={{color:"#E05252", fontSize:12, margin:0, fontWeight:700}}>⚠️ Almost up! Please call the owner.</p>}
              {!warning && <p style={{fontSize:12, color:"#aaa", margin:0}}>Time remaining for pickup</p>}
            </>
          ) : (
            <p style={{fontSize:15, color:"#888", margin:0}}>📋 No time limit — owner picks up at their convenience</p>
          )}
        </div>
      )}

      {currentStage < messages.length - 1 && (
        <button style={{...S.primaryBtn, background:messages[currentStage+1].color, marginTop:4}} onClick={advanceStage}>
          Next: {messages[currentStage+1].icon} {messages[currentStage+1].label} →
        </button>
      )}

      <div style={{marginTop:8}}>
        <h4 style={{fontSize:10, color:"#C4956A", letterSpacing:2, textTransform:"uppercase", marginBottom:10, fontWeight:700}}>📨 Messages Sent</h4>
        {sentMessages.map((m,i) => (
          <div key={i} style={{...S.card, borderLeft:`3px solid ${m.color}`, padding:"12px 14px", marginBottom:8}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
              <span style={{fontSize:13, fontWeight:700, color:"#333"}}>{m.icon} {m.stage}</span>
              <span style={{fontSize:11, color:"#bbb"}}>{m.time}</span>
            </div>
            <p style={{fontSize:12, color:"#888", margin:0, lineHeight:1.5}}>{m.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── STYLES ─────────────────────────────────────────────────────────────────
const S = {
  screen:     { minHeight:"100vh", background:"#FAF7F2", color:"#222", fontFamily:"'Helvetica Neue',Arial,sans-serif", padding:"20px 16px 60px", display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto" },
  logoArea:   { textAlign:"center", padding:"24px 0 14px" },
  appTitle:   { fontFamily:"serif", fontSize:30, fontWeight:700, color:"#2A9D8F", margin:"6px 0 4px" },
  appSubtitle:{ color:"#aaa", fontSize:11, margin:0, letterSpacing:3, textTransform:"uppercase" },
  card:       { background:"#fff", borderRadius:18, padding:"18px 16px", border:"1px solid #EAE6E0", marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" },
  cardTitle:  { fontFamily:"serif", fontSize:20, margin:"0 0 4px", color:"#222" },
  cardSubtitle:{ color:"#aaa", fontSize:13, margin:0 },
  grid:       { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:14 },
  staffBtn:   { background:"#F0EDE8", border:"1px solid #DDD8D0", borderRadius:12, padding:"13px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, color:"#333", transition:"background 0.2s, color 0.2s", textAlign:"left" },
  initial:    { width:34, height:34, borderRadius:"50%", background:"#D4EEE9", color:"#2A9D8F", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:15, flexShrink:0, border:"1.5px solid #A8D8D2" },
  staffName:  { fontSize:14, fontWeight:600 },
  topBar:     { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, paddingBottom:12, borderBottom:"1px solid #EAE6E0" },
  backBtn:    { background:"none", border:"none", cursor:"pointer", fontSize:14, fontWeight:700, padding:0 },
  badge:      { background:"#F0EDE8", borderRadius:20, padding:"4px 14px", fontSize:12, color:"#666" },
  label:      { display:"block", fontSize:11, letterSpacing:2, textTransform:"uppercase", marginBottom:6, fontWeight:700, color:"#2A9D8F" },
  input:      { width:"100%", background:"#FAF7F2", border:"1.5px solid #DDD8D0", borderRadius:10, padding:"12px 14px", color:"#222", fontSize:14, outline:"none", boxSizing:"border-box" },
  primaryBtn: { width:"100%", background:"#2A9D8F", border:"none", borderRadius:14, padding:"16px", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", letterSpacing:0.3 },
  toast:      { position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:"#F0FAF4", border:"1.5px solid #2E9E4F", borderRadius:16, padding:"14px 18px", zIndex:999, width:"calc(100% - 40px)", maxWidth:440, boxShadow:"0 8px 32px rgba(0,0,0,0.12)" },
  toastHeader:{ display:"flex", justifyContent:"space-between", color:"#2E9E4F", fontSize:13, fontWeight:700, marginBottom:6 },
  toastMsg:   { color:"#555", fontSize:12, margin:0, lineHeight:1.5 },
  doneCard:   { background:"#fff", borderRadius:24, padding:40, textAlign:"center", border:"1px solid #EAE6E0", width:"100%", maxWidth:340, boxShadow:"0 4px 24px rgba(0,0,0,0.08)" },
};

// ── APP ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen,    setScreen]    = useState("staff");
  const [staffName, setStaffName] = useState(null);
  const [role,      setRole]      = useState(null);
  const [session,   setSession]   = useState(null);
  const [groomers,  setGroomers]  = useState(DEFAULT_GROOMERS);
  const [bathers,   setBathers]   = useState(DEFAULT_BATHERS);
  const [messages,  setMessages]  = useState(DEFAULT_MESSAGES);
  const [defPickup, setDefPickup] = useState(PICKUP_OPTIONS[0]);
  const [salonName, setSalonName] = useState("We're Nuts About Mutts");

  const handleSettingsSave = ({groomers:g, bathers:b, messages:m, defaultPickup:p, salonName:n}) => {
    setGroomers(g); setBathers(b); setMessages(m); setDefPickup(p); setSalonName(n);
    setScreen("staff");
  };

  if (screen==="settings") return (
    <SettingsScreen groomers={groomers} bathers={bathers} messages={messages} defaultPickup={defPickup} salonName={salonName}
      onSave={handleSettingsSave} onBack={()=>setScreen("staff")} />
  );
  if (screen==="staff")   return <StaffSelect groomers={groomers} bathers={bathers} salonName={salonName} onSelect={(n,r)=>{setStaffName(n);setRole(r);setScreen("checkin");}} onSettings={()=>setScreen("settings")} />;
  if (screen==="checkin") return <CheckInForm staffName={staffName} role={role} defaultPickup={defPickup} onCheckIn={s=>{setSession(s);setScreen("session");}} onBack={()=>setScreen("staff")} />;
  if (screen==="session") return <SessionScreen session={session} messages={messages} onComplete={()=>{setSession(null);setScreen("checkin");}} onBack={()=>{setSession(null);setScreen("staff");}} />;
}