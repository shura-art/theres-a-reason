import { useState, type ReactNode } from 'react';
import { useApp } from '../context/AppContext';
import { Droplet } from './Droplet';

export function Onboarding() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [avatar, setAvatar] = useState('happy');
  const [agree, setAgree] = useState(false);

  const next = () => setStep((s) => s + 1);
  const finish = () =>
    completeOnboarding({
      id: 'me',
      name: name || 'Friend',
      nickname,
      birthday,
      avatar,
      joinedAt: Date.now(),
    });

  return (
    <main className="onboarding">
      {step === 0 && (
        <div className="welcome">
          <div className="brand-lock">
            <Droplet size={48} />
            <span>
              Есть повод<small>THERE'S A REASON</small>
            </span>
          </div>
          <div className="hero-droplet">
            <Droplet mood="party" size={190} color="var(--blue)" />
          </div>
          <p className="eyebrow">FOR YOUR PEOPLE</p>
          <h1>There's always a reason to meet.</h1>
          <p>A tiny private place for the people you actually want to see.</p>
          <button className="primary" onClick={next}>
            Let's get you in
          </button>
          <small>Private group, invite only.</small>
        </div>
      )}

      {step === 1 && (
        <Step
          title="What should we call you?"
          sub="First name is enough. Nicknames are welcome too."
          onNext={next}
          stepNum={1}
        >
          <label>
            FIRST NAME
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex"
              autoFocus
              aria-label="First name"
            />
          </label>
          <label>
            NICKNAME (OPTIONAL)
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="alexx"
              aria-label="Nickname"
            />
          </label>
        </Step>
      )}

      {step === 2 && (
        <Step
          title="When do we celebrate you?"
          sub="Birthdays are a big deal here. Nobody forgets yours."
          onNext={next}
          disabled={!birthday}
          stepNum={2}
        >
          <label>
            BIRTHDAY
            <input
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="14 March"
              autoFocus
              aria-label="Birthday"
            />
          </label>
          <small>Only day and month are shown to friends.</small>
        </Step>
      )}

      {step === 3 && (
        <Step
          title="Pick a little you."
          sub="Choose a droplet now, or change it whenever you like."
          onNext={finish}
          disabled={!agree}
          stepNum={3}
        >
          <div className="avatar-picks">
            {(['happy', 'party', 'wow', 'cool', 'sad'] as const).map((a) => (
              <button
                key={a}
                className={avatar === a ? 'picked' : ''}
                onClick={() => setAvatar(a)}
                aria-label={`Select ${a} avatar`}
                aria-pressed={avatar === a}
              >
                <Droplet mood={a} size={58} color="var(--blue)" />
              </button>
            ))}
          </div>
          <label className="check">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            I'm joining a private group of friends. I'm happy for my name, birthday and avatar to be visible to them.
          </label>
        </Step>
      )}

      {step === 4 && (
        <div className="success">
          <Droplet mood="party" size={170} color="var(--blue)" />
          <p className="eyebrow">YOU'RE IN</p>
          <h1>Let's make a memory.</h1>
          <p>Welcome, {name || 'friend'}. Your private little world is ready.</p>
          <button className="primary" onClick={() => window.location.reload()}>
            Open my reasons
          </button>
        </div>
      )}
    </main>
  );
}

function Step({
  title,
  sub,
  onNext,
  disabled,
  stepNum,
  children,
}: {
  title: string;
  sub: string;
  onNext: () => void;
  disabled?: boolean;
  stepNum: number;
  children: ReactNode;
}) {
  return (
    <div className="step">
      <div className="brand-lock">
        <Droplet size={40} />
        <span>
          Есть повод<small>THERE'S A REASON</small>
        </span>
      </div>
      <div className="progress">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} className={i < stepNum ? 'on' : ''} />
        ))}
      </div>
      <p className="eyebrow">A LITTLE ABOUT YOU</p>
      <h1>{title}</h1>
      <p>{sub}</p>
      <div className="step-form">{children}</div>
      <button className="primary" onClick={onNext} disabled={disabled}>
        Next
      </button>
    </div>
  );
}
