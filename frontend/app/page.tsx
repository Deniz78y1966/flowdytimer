'use client';

import { useState, useEffect } from 'react';
import Starfield from './components/Starfield';

type Task = { id: number; text: string; done: boolean };

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [targetSeconds, setTargetSeconds] = useState<number | null>(null); // null = count up
  const [pickerOpen, setPickerOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: '', done: false },
    { id: 2, text: '', done: false },
    { id: 3, text: '', done: false },
    { id: 4, text: '', done: false },
    { id: 5, text: '', done: false },
    { id: 6, text: '', done: false },
  ]);

  useEffect(() => {
    if (!running) return;
    const intervalId = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(intervalId);
  }, [running]);

  useEffect(() => {
    if (targetSeconds !== null && seconds >= targetSeconds) {
      setRunning(false);
    }
  }, [seconds, targetSeconds]);


  const finished = targetSeconds !== null && seconds >= targetSeconds;
  const displaySeconds = 
    targetSeconds === null ? seconds : Math.max(targetSeconds - seconds, 0);
  const mm = String(Math.floor(displaySeconds / 60)).padStart(2, '0');
  const ss = String(displaySeconds % 60).padStart(2, '0');

  const chooseMode = (minutes: number | null) => {
    setRunning(false);
    setSeconds(0);
    setTargetSeconds(minutes === null ? null : minutes * 60);
    setPickerOpen(false);
    setCustomMinutes('');
  };
  
  const togglePlay = () => {
    if (finished) setSeconds(0); // pressing play after finishing restarts it
    setRunning((r) => !r || finished);
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const mobileDoneCount = tasks.slice(0, 3).filter((task) => task.done).length;

  return (
    <main className="min-h-screen text-[#eef2f0] flex justify-center relative">
      <Starfield />

      <div className="w-full max-w-[380px] md:max-w-3xl flex flex-col min-h-screen relative overflow-hidden">

        {/* header */}
        <div className="h-12 shrink-0 relative z-10">
          <div className="fixed left-5 top-5 z-20 flex items-center gap-2.5 text-base md:left-12 md:text-xl font-bold tracking-wide">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#9FE3AE]" />
            flowdy timer
          </div>
        </div>

        {/* world (background) + timer + controls (foreground) */}
        <div className="relative flex-1 flex flex-col items-center justify-center py-10">

          {/* spinning world, sits behind everything */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full opacity-60 blur-[4px] shadow-[0_0_80px_rgba(159,227,174,0.15)]">
              <video
                src="/build-the-earth.mp4"
                autoPlay
                loop
                muted
                playsInline
                ref={(el) => {
                  if (el) el.playbackRate = 0.28;
                }}
                className="w-full h-full object-cover scale-[1.06]"
                style={{
                  imageRendering: 'pixelated',
                  clipPath: 'circle(48% at 50% 50%)',
                }}
              />
            </div>
          </div>

          {/* everything on top of the world */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <button
              onClick={() => !running && setPickerOpen((o) => !o)}
              title={running ? 'Pause to change the timer' : 'Click to change the timer'}
              className="text-[64px] md:text-[84px] font-bold tracking-wide [text-shadow:0_2px_24px_rgba(0,0,0,0.85)] cursor-pointer"
            >
              {mm}:{ss}
            </button>

            {pickerOpen && (
              <div className="flex flex-wrap justify-center gap-2 max-w-[300px]">
                <button
                  onClick={() => chooseMode(null)}
                  className="px-3 py-2 text-sm bg-black/50 backdrop-blur-sm border-2 border-white/20 hover:border-[#9FE3AE]"
                >
                  ∞ Libre
                </button>
                {[30].map((m) => (
                  <button
                    key={m}
                    onClick={() => chooseMode(m)}
                    className="px-3 py-2 text-sm bg-black/50 backdrop-blur-sm border-2 border-white/20 hover:border-[#9FE3AE]"
                  >
                    {m} min
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  onKeyDown={(e) => {
                    const n = parseInt(customMinutes, 10);
                    if (e.key === 'Enter' && n > 0) chooseMode(n);
                  }}
                  placeholder="otro + Enter"
                  className="w-[120px] px-3 py-2 text-sm bg-black/50 border-2 border-white/20 outline-none placeholder:text-white/30"
                />
              </div>
            )}

            <div className="text-sm text-white/70 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]">
              {finished
                ? '¡Tiempo!'
                : targetSeconds === null
                ? 'Listo cuando tú lo estés'
                : `Cuenta regresiva · ${targetSeconds / 60} min`}
            </div>

            <div className="flex items-center justify-center gap-5 mt-6">
              <button
                onClick={() => setSeconds(0)}
                className="w-14 h-14 bg-black/40 backdrop-blur-sm border-4 border-white/15 active:translate-y-[2px] active:border-b-0"
              >
                ↺
              </button>
              <button
                onClick={togglePlay}
                className="w-[76px] h-[76px] bg-[#9FE3AE] text-[#0c1116] border-4 border-b-[6px] border-[#0c1116]/30 active:translate-y-[2px] active:border-b-4 font-bold text-xl"
              >
                {running ? '❚❚' : '▶'}
              </button>
              <button className="w-14 h-14 bg-black/40 backdrop-blur-sm border-4 border-white/15 active:translate-y-[2px] active:border-b-0">
                〰
              </button>
            </div>
          </div>
        </div>

        {/* to-do list */}
        <div className="bg-[#12181f]/25 rounded-2xl border-t-4 border-white/10 px-5 pt-6 pb-8 md:px-12 md:pt-8 relative z-10">
          <div className="flex justify-between mb-4 font-bold md:max-w-2xl md:mx-auto">
            <span>To-Do</span>
            <span className="text-white/40 font-normal">
              <span className="md:hidden">{mobileDoneCount}/3</span>
              <span className="hidden md:inline">{doneCount}/{tasks.length}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 md:max-w-2xl md:mx-auto">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`${index >= 3 ? 'hidden md:flex' : 'flex'} items-center gap-3 rounded-md bg-white/[.03] border-2 border-white/10 px-4 py-3`}
              >
                <button
                  onClick={() =>
                    setTasks((ts) =>
                      ts.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
                    )
                  }
                  className={`w-5 h-5 border-2 flex-shrink-0 ${
                    task.done ? 'bg-[#9FE3AE] border-[#9FE3AE]' : 'border-white/30'
                  }`}
                />
                <input
                  value={task.text}
                  onChange={(e) =>
                    setTasks((ts) =>
                      ts.map((t) => (t.id === task.id ? { ...t, text: e.target.value } : t))
                    )
                  }
                  placeholder="Describe a task"
                  className="bg-transparent outline-none flex-1 text-sm placeholder:text-white/30"
                />
              </div>
            ))}
          </div>
        </div>

        {/* attribution */}
        <div
          className="text-center text-[10px] text-white/25 pb-4 px-5 relative z-10"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Earth animation © 2023 BuildTheEarth — used under MIT License
        </div>
      </div>
    </main>
  );
}