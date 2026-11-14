'use client';

import React, { useMemo } from 'react';
import { CalendarDays, Flame, Snowflake } from 'lucide-react';
import { useLevelUp } from '@/context/LevelUpContext';

const WEEKS = 12;
const DAY = 86400000;
const WEEK_LABELS_ES = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const WEEK_LABELS_EN = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function isoOf(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Monday-first grid of the last `WEEKS` weeks, ending on today. */
function buildGrid(today: Date) {
  const end = new Date(today.getTime());
  // Shift so the last column is today and rows start on Monday.
  const weekday = (end.getUTCDay() + 6) % 7; // 0 = Monday
  const lastCell = new Date(end.getTime() + (6 - weekday) * DAY);
  const cells: { iso: string; date: Date; inRange: boolean }[] = [];
  const start = new Date(lastCell.getTime() - (WEEKS * 7 - 1) * DAY);

  for (let i = 0; i < WEEKS * 7; i += 1) {
    const date = new Date(start.getTime() + i * DAY);
    cells.push({ iso: isoOf(date), date, inRange: date.getTime() <= end.getTime() });
  }

  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function StreakCalendar() {
  const { t, locale, state } = useLevelUp();

  const { weeks, activeCount } = useMemo(() => {
    const grid = buildGrid(new Date());
    const active = new Set(state.activityDates);
    return {
      weeks: grid,
      activeCount: state.activityDates.length,
      active,
    };
  }, [state.activityDates]);

  const active = useMemo(() => new Set(state.activityDates), [state.activityDates]);
  const todayIso = isoOf(new Date());
  const labels = locale === 'es' ? WEEK_LABELS_ES : WEEK_LABELS_EN;

  const stats = [
    {
      label: t.calendar.currentStreak,
      value: `${state.streakDays}`,
      suffix: t.calendar.days,
      color: '#FF9600',
      lip: '#D97B00',
      Icon: Flame,
    },
    {
      label: t.calendar.longest,
      value: `${state.longestStreak}`,
      suffix: t.calendar.days,
      color: '#FFC800',
      lip: '#E5A800',
      Icon: CalendarDays,
    },
    {
      label: t.calendar.freezes,
      value: `${state.streakFreezes}`,
      suffix: '',
      color: '#1CB0F6',
      lip: '#1899D6',
      Icon: Snowflake,
    },
  ];

  return (
    <section>
      <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-wolf">
        {t.calendar.title}
      </h2>

      <div className="panel mt-3 p-4">
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map(({ label, value, suffix, color, lip, Icon }) => (
            <div
              key={label}
              className="overflow-hidden rounded-xl border-2"
              style={{ borderColor: color }}
            >
              <div
                className="flex items-center gap-1.5 px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-paper"
                style={{ backgroundColor: color }}
              >
                <Icon className="h-3 w-3" strokeWidth={3} />
                <span className="truncate">{label}</span>
              </div>
              <div className="flex items-baseline gap-1 px-2.5 py-2" style={{ backgroundColor: '#FFFFFF' }}>
                <span className="font-mono text-[20px] font-extrabold tabular-nums" style={{ color: lip }}>
                  {value}
                </span>
                {suffix && <span className="text-[10.5px] font-bold text-hare">{suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2">
          <div className="flex flex-col gap-[3px] pt-[15px]">
            {labels.map((label, i) => (
              <span key={i} className="h-[13px] text-[9px] font-bold leading-[13px] text-hare">
                {i % 2 === 1 ? label : ''}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell) => {
                    const on = active.has(cell.iso);
                    const isToday = cell.iso === todayIso;
                    return (
                      <span
                        key={cell.iso}
                        title={`${cell.iso}${on ? ' · ✓' : ''}`}
                        className="h-[13px] w-[13px] shrink-0 rounded-[4px] border-2"
                        style={{
                          backgroundColor: on
                            ? '#FF9600'
                            : cell.inRange
                              ? '#F2F2F2'
                              : '#FAFAFA',
                          borderColor: isToday ? '#042C60' : on ? '#D97B00' : '#E5E5E5',
                          opacity: cell.inRange ? 1 : 0.45,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t-2 border-polar pt-3">
          <p className="text-[11.5px] font-semibold leading-snug text-wolf">
            {t.calendar.subtitle}
          </p>
          <span className="rounded-lg bg-polar px-2 py-1 font-mono text-[10.5px] font-extrabold tabular-nums text-wolf">
            {activeCount} {t.calendar.activeDays}
          </span>
        </div>

        <p className="mt-2.5 flex items-start gap-2 rounded-xl border-2 border-macaw bg-macaw-wash px-3 py-2 text-[11.5px] font-semibold leading-snug text-navy">
          <Snowflake className="mt-0.5 h-3.5 w-3.5 shrink-0 text-macaw-dark" strokeWidth={3} />
          {t.calendar.freezesDesc}
        </p>
      </div>
    </section>
  );
}
