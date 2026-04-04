export default function StatsCard({ icon: Icon, label, value }) {
  const formatted = value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString()
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
        <Icon className="text-xl text-blue-600" />
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-gray-900">{formatted}</p>
        <p className="mt-0.5 text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}
