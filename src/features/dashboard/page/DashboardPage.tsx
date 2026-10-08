import Header from "@/components/common/Header/Header"
import {
    Activity,
    BadgeCheck,
    CalendarCheck,
    ChevronRight,
    ClipboardList,
    Clock,
    CreditCard,
    FlaskConical,
    MapPin,
    Pause,
    Pill,
    RefreshCw,
    ShieldCheck,
    Stethoscope,
    UserCheck,
    Users,
    Zap,
} from "lucide-react"

// ─── Dummy Data ─────────────────────────────────────────────
const clinicData = {
    department: "CARDIOLOGY OPD",
    node: "NODE #04",
    date: "Today • 24 Oct 2026",
    doctorName: "Dr. Jenkins",
    session: "Morning Clinical Session",
    suite: "Diagnostic Suite & Room 2",
    active: 2,
    queue: 3,
    waitTime: "12 mins",
    triageLevel: "Normal",
}

const stats = [
    {
        label: "TODAY'S APPOINTMENTS",
        icon: CalendarCheck,
        value: "18",
        sub: "Booked",
        badge: "+4 vs yest.",
        badgeColor: "text-emerald-600 bg-emerald-50",
        footer: "Morning: 11 slots  Afternoon: 7 slots",
        accent: "#2D6CDF",
    },
    {
        label: "ACTIVE QUEUE",
        icon: Users,
        value: "03",
        unit: "tn",
        sub: "Lobby",
        badge2: "Avg wait: 12 min",
        badge2Color: "bg-blue-100 text-blue-700",
        footer: "1 In Pre-vitals   Max wait: 18 min",
        footerStatus: "On Schedule",
        statusColor: "text-emerald-600",
        accent: "#10b981",
    },
    {
        label: "CONSULTATIONS DONE",
        icon: ClipboardList,
        value: "07",
        sub: "/18 Completed",
        progressPct: 39,
        footer: "Avg consult: 14m",
        footerStatus: "On Schedule",
        statusColor: "text-emerald-600",
        accent: "#8b5cf6",
    },
    {
        label: "BILLING COLLECTED",
        icon: CreditCard,
        value: "₹2,480",
        badge: "+18%",
        badgeColor: "text-emerald-600 bg-emerald-50",
        sub: "Today",
        footer: "Pending: ₹380    Claims: ₹1,200",
        accent: "#f59e0b",
    },
]

const currentPatient = {
    token: "#08",
    room: "Room 2",
    checkedIn: "18 mins ago",
    name: "Priya Shah",
    id: "HD-8921",
    age: 42,
    gender: "Female",
    insurance: "Verified • BlueCross PPO",
    lastVisit: "3 mo ago",
    complaint: "Hypertension Follow-up & Post-Exercise Palpitations",
    vitalTime: "10:15 AM",
    vitals: {
        bp: "138/88", bpLabel: "mmHg", bpStatus: "Stage 1 High", bpStatusColor: "text-red-500",
        pulse: "74", pulseLabel: "bpm", pulseStatus: "Normal Sinus", pulseStatusColor: "text-emerald-600",
        oxygen: "98", oxygenSub: "Ambient Air",
        temp: "98.6", tempLabel: "°F", tempSub: "Afebrile",
        bmi: "26.2", bmiLabel: "84kg", bmiStatus: "Overweight", bmiStatusColor: "text-orange-500",
    },
}

const rapidActions = [
    { label: "Quick Rx", icon: Pill },
    { label: "Order Lab", icon: FlaskConical },
    { label: "Refer", icon: UserCheck },
    { label: "Sick Note", icon: ClipboardList },
]

// ─── Sub-components ─────────────────────────────────────────

const ClinicTopBanner = () => (
    <div className="flex flex-wrap items-start justify-between gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm">
        <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1 tracking-widest uppercase">
                <MapPin className="w-3.5 h-3.5" />
                {clinicData.department} • {clinicData.node}
                <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">| {clinicData.date}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Good morning, {clinicData.doctorName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
                {clinicData.session} • <span className="text-gray-600">{clinicData.suite}</span>
            </p>
            <span className="inline-flex items-center gap-1 mt-2 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {clinicData.active} Active
            </span>
        </div>
        <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="font-semibold text-gray-800">Clinic Live</span>
                    <span className="text-emerald-600 font-bold">{clinicData.queue} in Queue</span>
                </div>
                <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-gray-400">Est. wait: {clinicData.waitTime} • Triage {clinicData.triageLevel}</p>
            <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-sm font-medium border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <Pause className="w-3.5 h-3.5" /> Pause Intake
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold bg-gray-900 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" /> Shift Handover
                </button>
            </div>
        </div>
    </div>
)

const StatCard = ({ stat }: { stat: (typeof stats)[0] }) => {
    const Icon = stat.icon
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-widest">
                <span>{stat.label}</span>
                <Icon className="w-4 h-4" style={{ color: stat.accent }} />
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-gray-800">{stat.value}</span>
                {stat.badge && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${stat.badgeColor}`}>
                        {stat.badge}
                    </span>
                )}
                {stat.badge2 && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${stat.badge2Color}`}>
                        {stat.badge2}
                    </span>
                )}
            </div>
            <div className="text-sm text-gray-500">{stat.sub}</div>
            {stat.progressPct !== undefined && (
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: `${stat.progressPct}%`, backgroundColor: stat.accent }}
                    />
                </div>
            )}
            <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
                <span>{stat.footer}</span>
                {stat.footerStatus && (
                    <span className={`font-semibold ${stat.statusColor}`}>{stat.footerStatus}</span>
                )}
            </div>
        </div>
    )
}

type VitalBadgeProps = {
    label: string
    value: string
    unit?: string
    sub?: string
    statusText?: string
    statusColor?: string
}

const VitalBadge = ({ label, value, unit, sub, statusText, statusColor }: VitalBadgeProps) => (
    <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-0.5 min-w-[90px]">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-extrabold text-gray-800">{value}</span>
            {unit && <span className="text-xs text-gray-500">{unit}</span>}
        </div>
        {sub && <span className="text-[10px] text-gray-400">{sub}</span>}
        {statusText && <span className={`text-[10px] font-semibold ${statusColor}`}>{statusText}</span>}
    </div>
)

const CurrentPatientCard = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between bg-gray-900 text-white px-5 py-3 text-xs font-semibold">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    NOW IN QUEUE • NEXT CALL
                </span>
                <span className="text-gray-300">Token {currentPatient.token} • {currentPatient.room}</span>
            </div>
            <span className="flex items-center gap-1.5 text-gray-300">
                <Clock className="w-3.5 h-3.5" /> Checked in {currentPatient.checkedIn}
            </span>
        </div>

        <div className="p-5 grid grid-cols-1 gap-5">
            <div className="flex flex-wrap items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow">
                    MV
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-800">{currentPatient.name}</h2>
                        <span className="text-xs text-gray-400 font-mono">#{currentPatient.id}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                        <span>{currentPatient.age}y • {currentPatient.gender}</span>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                            <BadgeCheck className="w-3.5 h-3.5" /> {currentPatient.insurance}
                        </span>
                        <span className="text-gray-400">Last visit: {currentPatient.lastVisit}</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-xs font-semibold text-gray-500">Chief Complaint:</span>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{currentPatient.complaint}</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Triage Telemetry & Vitals (Recorded {currentPatient.vitalTime})
                    </span>
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                        <Zap className="w-3 h-3" /> Live Sensor Sync
                    </span>
                </div>
                <div className="flex flex-wrap gap-3">
                    <VitalBadge label="Blood Pressure" value={currentPatient.vitals.bp} unit={currentPatient.vitals.bpLabel} statusText={currentPatient.vitals.bpStatus} statusColor={currentPatient.vitals.bpStatusColor} />
                    <VitalBadge label="Pulse Rate" value={currentPatient.vitals.pulse} unit={currentPatient.vitals.pulseLabel} statusText={currentPatient.vitals.pulseStatus} statusColor={currentPatient.vitals.pulseStatusColor} />
                    <VitalBadge label="Oxygen (SpO2)" value={currentPatient.vitals.oxygen} unit="%" sub={currentPatient.vitals.oxygenSub} />
                    <VitalBadge label="Temp" value={currentPatient.vitals.temp} unit={currentPatient.vitals.tempLabel} sub={currentPatient.vitals.tempSub} />
                    <VitalBadge label="BMI & Wt" value={currentPatient.vitals.bmi} unit={currentPatient.vitals.bmiLabel} statusText={currentPatient.vitals.bmiStatus} statusColor={currentPatient.vitals.bmiStatusColor} />
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
                    <Stethoscope className="w-4 h-4" /> Start Consultation
                </button>
            </div>
        </div>
    </div>
)

const RightPanel = () => (
    <div className="flex flex-col gap-5">


        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-blue-200" />
                <span className="font-bold text-sm">Today's Clinical Roster</span>
            </div>
            <div className="space-y-2.5">
                {[
                    { name: "Priya Mehta", time: "11:00 AM", status: "Waiting" },
                    { name: "James Koh", time: "11:30 AM", status: "Pre-Vitals" },
                    { name: "Nora Lane", time: "12:00 PM", status: "Upcoming" },
                ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{p.name}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-200 text-xs">{p.time}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status === "Waiting" ? "bg-yellow-400/20 text-yellow-200" : p.status === "Pre-Vitals" ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/70"}`}>
                                {p.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-4 w-full text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors rounded-lg py-2 flex items-center justify-center gap-1">
                View Full Roster <ChevronRight className="w-3.5 h-3.5" />
            </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-gray-800 text-sm">Rapid Clinical Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {rapidActions.map((action, i) => {
                    const Icon = action.icon
                    return (
                        <button key={i} className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl py-4 hover:bg-blue-50 hover:border-blue-200 transition-colors group">
                            <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                            <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700 transition-colors">{action.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>

    </div>
)

// ─── Main Dashboard Page ────────────────────────────────────
const DashboardPage = () => {
    return (
        <>
            <Header
                currentPage=""
                mainPage="Dashboard"
                mainPageLink="/dashboard"
                showHome={true}
                middlePages={[]}
            />
            <div className="p-5 space-y-5 bg-gray-50 min-h-screen">
                <ClinicTopBanner />

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <StatCard key={i} stat={s} />
                    ))}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5 items-start">
                    <CurrentPatientCard />
                    <RightPanel />
                </div>
            </div>
        </>
    )
}

export default DashboardPage