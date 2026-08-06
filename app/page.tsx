import { MatrixControls, MatrixRain } from "./matrix-rain";

const experience = [
  {
    company: "Oracle",
    role: "Senior Member of Technical Staff",
    period: "Jun 2025 - Present",
    summary:
      "Building Merino, a React and Java CI/CD platform orchestrated with Temporal across OCI.",
    bullets: [
      "Implemented lock and unlock stage controls across the React UI, Java backend, and Temporal workflows.",
      "Automated control-plane and data-plane provisioning across all 51 OCI regions, reducing regional setup from days to about two hours.",
      "Built retry-safe, queue-driven execution and AI-assisted pull-request, log-checking, and security-ticket automation.",
      "Delivered zero-downtime ADB password rotation with OCI Functions, Queues, Vault, and auditable telemetry.",
    ],
  },
  {
    company: "Consult Veda",
    role: "Software Developer",
    period: "Feb 2025 - May 2025",
    summary:
      "Created a Java, Spring Boot, and Kafka observability proof of concept with ingestion and query APIs.",
    bullets: [
      "Routed telemetry through a reliable event-driven pipeline and integrated it with dashboards and third-party systems.",
    ],
  },
  {
    company: "JPMorgan Chase",
    role: "Software Developer 3",
    period: "May 2023 - Dec 2024",
    summary:
      "Owned delivery of a Splunk Universal Forwarder Generator spanning Angular, Spring Boot, and Camunda.",
    bullets: [
      "Reduced setup time by 30% and built an EAC access workflow in Go that cut request processing time by 50%.",
    ],
  },
  {
    company: "Walmart",
    role: "Software Developer",
    period: "Oct 2022 - Apr 2023",
    summary:
      "Built Looper CI/CD automation and backend APIs for an internal observability dashboard.",
    bullets: [
      "Reduced release turnaround by about 30% and dashboard/query latency by about 20%.",
    ],
  },
  {
    company: "Globant - Citi Bank",
    role: "Software Developer",
    period: "Apr 2021 - Sep 2022",
    summary:
      "Built scalable API and mobile QA automation plus a Brokerage Account Opening framework.",
    bullets: [
      "Reduced regression time by 30% and end-to-end onboarding time by 50%.",
    ],
  },
];

const stackGroups = [
  {
    label: "frontend",
    items: ["React", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    label: "backend",
    items: ["Java", "Spring Boot", "J2EE", "REST APIs", "Go", "Kafka"],
  },
  {
    label: "workflow_cloud",
    items: ["Temporal", "Camunda", "OCI", "Terraform", "Functions", "Queues", "Vault", "ADB", "CI/CD"],
  },
  {
    label: "observability_ai",
    items: ["Splunk", "Datadog", "LLM tools", "Hugging Face", "pandas", "U-Net", "Appium", "BDD"],
  },
];

const publications = [
  {
    title: "Building Reliable Async Processing Pipelines Using Temporal",
    detail: "Durable retries, compensation, recovery, and async orchestration.",
    href: "https://dzone.com/articles/building-async-pipelines-using-temporal",
  },
  {
    title: "A Low-Latency Routing Pattern for Multiple Small Language Models",
    detail: "Cache-aware routing for low-latency multi-SLM serving.",
    href: "https://dzone.com/articles/low-latency-llm-routing",
  },
  {
    title: "A Practical Guide to Temporal Workflow Design Patterns",
    detail: "Sagas, polling, parallelism, signals, and workflow versioning.",
    href: "https://dzone.com/articles/temporal-workflow-design-patterns",
  },
  {
    title: "Orchestrating Zero-Downtime Deployments With Temporal",
    detail: "Canary deployments with approvals, retries, and rollback.",
    href: "https://dzone.com/articles/orchestrating-zero-downtime-deployments-temporal",
  },
  {
    title: "Combine Temporal and Kafka for Resilient Distributed Systems",
    detail: "Event streaming with durable workflow state and recovery.",
    href: "https://dzone.com/articles/temporal-kafka-resilient-distributed-systems",
  },
  {
    title: "Multi-Scale Feature Learning in CNN and U-Net Architectures",
    detail: "Multi-resolution feature fusion for segmentation systems.",
    href: "https://dzone.com/articles/multi-scale-cnn-unet-feature-learning",
  },
];

function Window({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="terminal-window" id={id} open>
      <summary className="window-bar">
        <span>{index} - {title.toLowerCase()}</span>
        <span className="window-actions" aria-hidden="true">
          <i /> <i /> <i />
        </span>
      </summary>
      <div className="window-body">{children}</div>
    </details>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <MatrixRain />

      <aside className="command-sidebar" aria-label="Primary">
        <a className="identity" href="#home" aria-label="Go to home">
          <span className="identity-mark">AM</span>
          <span>
            <strong>Akhil Madineni</strong>
            <small>AI / Full-Stack Engineer</small>
          </span>
        </a>

        <nav aria-label="Sections">
          <p className="sidebar-label"><span>nav</span></p>
          <a className="nav-home" href="#home"><b>00</b> Home</a>
          <a className="nav-about" href="#about"><b>01</b> About</a>
          <a className="nav-experience" href="#experience"><b>02</b> Experience</a>
          <a className="nav-stack" href="#stack"><b>03</b> Stack</a>
          <a className="nav-lab" href="#ai-lab"><b>04</b> AI Lab</a>
          <a className="nav-writing" href="#writing"><b>05</b> Writing</a>
          <a className="nav-education" href="#education"><b>06</b> Education</a>
          <a className="nav-contact" href="#contact"><b>07</b> Contact</a>
        </nav>

        <section className="system-panel" aria-label="System status">
          <p className="sidebar-label"><span>system</span></p>
          <dl>
            <div><dt>Status</dt><dd><i className="status-dot" /> Online</dd></div>
            <div><dt>Experience</dt><dd>5+ years</dd></div>
            <div><dt>Coverage</dt><dd>51 OCI regions</dd></div>
            <div><dt>Focus</dt><dd>AI + systems</dd></div>
          </dl>
        </section>

        <section className="motion-panel" aria-label="Display controls">
          <p className="sidebar-label"><span>matrix</span></p>
          <MatrixControls />
        </section>

        <div className="sidebar-actions">
          <a href="/Akhil_Madineni_Resume_AI_Engineering.pdf" download>
            Download resume <span aria-hidden="true">↓</span>
          </a>
          <a href="mailto:akhil19960323@gmail.com">Email</a>
          <a href="tel:+16154825278">Call</a>
        </div>
      </aside>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="prompt">$ whoami</p>
            <h1 id="hero-title" data-text="AKHIL MADINENI">AKHIL<br />MADINENI</h1>
            <p className="hero-line">Full-stack engineer building reliable AI, workflow, and cloud systems.</p>
            <p className="hero-meta">React + Java + Temporal + OCI</p>
            <div className="hero-actions">
              <a className="button primary" href="#experience">View experience <span>→</span></a>
              <a className="button" href="#contact">Get in touch</a>
            </div>
          </div>

          <div className="terminal-card" aria-label="Professional status terminal">
            <div className="terminal-top">
              <span><i /><i /><i /></span>
              <span>akhil@portfolio:~</span>
            </div>
            <div className="terminal-content">
              <p><b>$</b> whoami</p>
              <p className="terminal-output">&gt; akhil_madineni - senior engineer / ai systems builder</p>
              <p><b>$</b> current</p>
              <p className="terminal-output">&gt; senior member of technical staff @ oracle</p>
              <p><b>$</b> impact --latest</p>
              <p className="terminal-output">&gt; 51 OCI regions · days → ~2 hours · zero-downtime ops</p>
              <p className="cursor-line"><b>$</b> <span className="cursor" /></p>
            </div>
          </div>
        </section>

        <div className="content-grid">
          <Window id="about" index="01" title="About">
            <div className="about-grid">
              <p className="lead">
                I build enterprise software where <em>distributed workflows, cloud infrastructure, and AI-assisted engineering</em> meet.
              </p>
              <div>
                <p>
                  My work spans production React and Angular interfaces, Java and Spring services, durable Temporal workflows, and automated OCI infrastructure.
                </p>
                <p>
                  I care about failure-safe execution, observable systems, and turning operational work that once took days into repeatable automation.
                </p>
              </div>
            </div>
            <div className="metrics" aria-label="Career highlights">
              <article><strong>51</strong><span>OCI regions automated</span></article>
              <article><strong>~2h</strong><span>new-region provisioning</span></article>
              <article><strong>50%</strong><span>workflow time reduced</span></article>
              <article><strong>0.975</strong><span>segmentation Dice score</span></article>
            </div>
          </Window>

          <Window id="experience" index="02" title="Experience">
            <div className="timeline">
              {experience.map((job, index) => (
                <article className="timeline-item" key={`${job.company}-${job.period}`}>
                  <div className="timeline-index">0{index + 1}</div>
                  <div className="timeline-copy">
                    <div className="job-heading">
                      <div>
                        <h3>{job.company}</h3>
                        <p>{job.role}</p>
                      </div>
                      <time>{job.period}</time>
                    </div>
                    <p className="job-summary">{job.summary}</p>
                    <ul>
                      {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Window>

          <Window id="stack" index="03" title="Stack">
            <div className="stack-grid">
              {stackGroups.map((group) => (
                <section key={group.label}>
                  <h3>$ {group.label}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          </Window>

          <Window id="ai-lab" index="04" title="AI Lab">
            <div className="project-grid">
              <article>
                <p className="project-code">PROJECT / 01</p>
                <h3>Automated Essay Generation</h3>
                <p>
                  A long-form generation pipeline using Hugging Face Transformers, prompt templates, batching, GPU acceleration, post-processing, and automated submission preparation.
                </p>
                <div className="tag-row"><span>Transformers</span><span>Python</span><span>pandas</span><span>GPU</span></div>
              </article>
              <article>
                <p className="project-code">PROJECT / 02</p>
                <h3>Brain Tumor Segmentation</h3>
                <p>
                  MRI segmentation on BraTS 2019 comparing U-Net and Octave U-Net with preprocessing and hyperparameter tuning, achieving a 0.975 Dice score.
                </p>
                <div className="tag-row"><span>U-Net</span><span>Octave U-Net</span><span>Medical AI</span><span>0.975 Dice</span></div>
              </article>
            </div>
          </Window>

          <Window id="writing" index="05" title="Technical Writing">
            <p className="section-intro">Six practical articles on durable workflows, distributed systems, model routing, and deep learning.</p>
            <ol className="publication-list">
              {publications.map((publication, index) => (
                <li key={publication.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <a href={publication.href} target="_blank" rel="noreferrer">
                    <strong>{publication.title}</strong>
                    <small>{publication.detail}</small>
                  </a>
                  <b aria-hidden="true">↗</b>
                </li>
              ))}
            </ol>
          </Window>

          <Window id="education" index="06" title="Education">
            <div className="education-grid">
              <article>
                <p>2018 - 2020</p>
                <h3>Master&apos;s in Computer Science</h3>
                <span>California State University, Sacramento</span>
              </article>
              <article>
                <p>Completed 2017</p>
                <h3>Bachelor&apos;s in Computer Science</h3>
                <span>GITAM University, Vizag, India</span>
              </article>
            </div>
          </Window>

          <Window id="contact" index="07" title="Contact">
            <div className="contact-grid">
              <div>
                <p className="prompt">$ initiate_conversation</p>
                <h2>Let&apos;s build something dependable.</h2>
                <p>For AI engineering, distributed systems, platform work, or a thoughtful technical conversation.</p>
              </div>
              <dl>
                <div><dt>email</dt><dd><a href="mailto:akhil19960323@gmail.com">akhil19960323@gmail.com</a></dd></div>
                <div><dt>phone</dt><dd><a href="tel:+16154825278">(615) 482-5278</a></dd></div>
                <div><dt>resume</dt><dd><a href="/Akhil_Madineni_Resume_AI_Engineering.pdf" download>download PDF ↓</a></dd></div>
              </dl>
            </div>
          </Window>
        </div>

        <footer>
          <span>© 2026 Akhil Madineni</span>
          <span>build · ai-engineering-portfolio</span>
        </footer>
      </main>

      <div className="build-ticker" aria-hidden="true">
        <div>
          ◆ TEMPORAL WORKFLOWS ◆ 51 OCI REGIONS ◆ ZERO-DOWNTIME OPERATIONS ◆ AI-ASSISTED DELIVERY ◆ REACT + JAVA ◆ DURABLE SYSTEMS ◆ TEMPORAL WORKFLOWS ◆ 51 OCI REGIONS ◆ ZERO-DOWNTIME OPERATIONS ◆ AI-ASSISTED DELIVERY ◆ REACT + JAVA ◆ DURABLE SYSTEMS
        </div>
      </div>
    </div>
  );
}
