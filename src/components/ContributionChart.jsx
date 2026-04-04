import { useMemo } from 'react'

export default function ContributionChart({ events }) {
  const getContributionGrid = (eventsList) => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 30)
    const recentEvents = eventsList.filter(e => new Date(e.created_at) >= cutoff)

    const today = new Date()
    const startGrid = new Date(today)
    startGrid.setDate(startGrid.getDate() - 364)
    startGrid.setDate(startGrid.getDate() - startGrid.getDay())
    const endGrid = new Date(today)
    endGrid.setDate(endGrid.getDate() + (6 - endGrid.getDay()))

    const weekCount = Math.round((endGrid - startGrid) / (7 * 24 * 60 * 60 * 1000))
    const weeks = []

    for (let i = 0; i < weekCount; i++) {
      const daysInWeek = []
      for (let j = 0; j < 7; j++) {
        const date = new Date(today)
        const daysToSubtract = (weekCount - 1 - i) * 7 + (today.getDay() - j)
        date.setDate(today.getDate() - daysToSubtract)

        const dayEvents = recentEvents.filter(e => {
          const eDate = new Date(e.created_at)
          return eDate.getDate() === date.getDate() &&
            eDate.getMonth() === date.getMonth() &&
            eDate.getFullYear() === date.getFullYear()
        })

        daysInWeek.push({
          date,
          count: dayEvents.length,
          inRange: date >= cutoff && date <= today
        })
      }
      weeks.push(daysInWeek)
    }
    return { weeks, recentEvents: recentEvents.length }
  }

  const { weeks, recentEvents } = useMemo(() => getContributionGrid(events), [events])

  const getIntensityClass = (count, inRange) => {
    if (!inRange) return 'bg-gray-50'
    if (count === 0) return 'bg-gray-100'
    if (count === 1) return 'bg-green-200'
    if (count === 2) return 'bg-green-400'
    if (count >= 3 && count < 5) return 'bg-green-600'
    return 'bg-green-800'
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const startMonthIdx = weeks[0][0].date.getMonth()
  const endMonthIdx = new Date().getMonth()

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {recentEvents} contributions in the last 30 days
        </h2>
      </div>

      <div className="rounded-xl border border-gray-100 p-4">
        <div className="flex gap-1 ml-1 text-xs mb-2 text-gray-500 pl-9">
          {weeks.map((week, index) => {
            const m = months[week[0].date.getMonth()]
            const prevM = index > 0 ? months[weeks[index - 1][0].date.getMonth()] : null
            const showMonth = m !== prevM
            return (
              <div key={index} className="w-3 shrink-0">
                {showMonth && <span className="whitespace-nowrap relative -left-1">{m}</span>}
              </div>
            )
          })}
        </div>

        <div className="flex gap-1 ml-1">
          <div className="flex flex-col gap-1 text-xs pt-1 mt-1 text-gray-400 w-8">
            <span className="h-3"></span>
            <span className="h-3 leading-none">Mon</span>
            <span className="h-3"></span>
            <span className="h-3 leading-none">Wed</span>
            <span className="h-3"></span>
            <span className="h-3 leading-none">Fri</span>
            <span className="h-3"></span>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-2">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    title={`${day.count} contributions on ${day.date.toDateString()}`}
                    className={`h-3 w-3 rounded-sm ring-1 ring-inset ring-black/5 ${getIntensityClass(day.count, day.inRange)} transition-all hover:scale-110`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Learn how we count contributions
          </span>
          <div className="flex items-center gap-1 text-gray-500">
            <span>Less</span>
            <div className="h-3 w-3 rounded-sm ring-1 ring-inset ring-black/5 bg-gray-100" />
            <div className="h-3 w-3 rounded-sm ring-1 ring-inset ring-black/5 bg-green-200" />
            <div className="h-3 w-3 rounded-sm ring-1 ring-inset ring-black/5 bg-green-400" />
            <div className="h-3 w-3 rounded-sm ring-1 ring-inset ring-black/5 bg-green-600" />
            <div className="h-3 w-3 rounded-sm ring-1 ring-inset ring-black/5 bg-green-800" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
