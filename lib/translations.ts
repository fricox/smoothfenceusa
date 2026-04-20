export type Lang = "en" | "es";

export type Translation = {
  nav: { home: string; services: string; gallery: string; estimator: string; about: string; hoaPermits: string; financing: string; contact: string; getFreeQuote: string };
  topbar: { hours: string; callUs: string; email: string };
  hero: { tagline: string; heading: string; subheading: string; cta: string; schedule: string; siteVisit24h: string };
  lpTrustStrip: { siteVisit24h: string; licensed: string; financing: string };
  trust: {
    experience: { title: string; desc: string };
    licensed: { title: string; desc: string };
    freeEstimate: { title: string; desc: string };
    premium: { title: string; desc: string };
  };
  whyUs: { label: string; heading: string; sub: string; reasons: { title: string; desc: string }[] };
  serviceArea: { label: string; heading: string; sub: string; ctaQuote: string; ctaMap: string };
  cta: { heading: string; sub: string; btn: string };
  contact: { label: string; heading: string; sub: string; whatNext: string; step1: { title: string; desc: string }; step2: { title: string; desc: string }; step3: { title: string; desc: string }; scheduleLabel: string; scheduleBtn: string; directContact: string; location: string };
  form: { label: string; heading: string; sub: string; fullName: string; phone: string; email: string; preferredDate: string; preferredTime: string; timeOptional: string; address: string; addressPlaceholder: string; fenceType: string; fenceTypePlaceholder: string; linearFeet: string; hoa: string; hoaPlaceholder: string; message: string; disclaimer: string; send: string; sending: string; success: string; success24h: string; hoaOptions: { value: string; label: string }[]; fenceOptions: string[]; required: string };
  footer: { tagline: string; quickLinks: string; hours: string; rights: string };
  services: {
    pageTagline: string; pageHeading: string; pageSub: string;
    sectionHeading: string; sectionSub: string;
    items: { title: string; description: string }[];
    faqLabel: string; faqHeading: string; faqSub: string;
    faqs: { question: string; answer: string }[];
  };
  about: {
    heading: string;
    p1: string; p2: string; p3: string;
    expectHeading: string;
    items: string[];
  };
  hoa: {
    heading: string; intro1: string; intro2: string;
    hoaCard: { heading: string; items: string[] };
    permitCard: { heading: string; items: string[] };
    footer: string;
  };
  estimator: {
    tagline: string; heading: string; sub: string;
    selectMaterial: string; premiumLabel: string;
    height: string; linearFeet: string; gates: string; removal: string;
    estimateReady: string; estimateReadySub: string; estimateMeta: string;
    nextBtn: string; noCommit: string;
    step2Title: string; step2Sub: string; step2Locked: string; editDetails: string;
    nameLabel: string; phoneLabel: string; emailLabel: string; zipLabel: string;
    submitBtn: string; submitting: string; privacy: string;
    confirmTitle: string; confirmSub: string; success24h: string; range: string; rangeNote: string;
    scheduleBtn: string; backHome: string; callNow: string;
    gallery: string;
  };
  financing: {
    calculator: {
      title: string;
      sub: string;
      benefit1: string;
      benefit2: string;
      benefit3: string;
      cta: string;
      disclaimer: string;
    };
  };
};

export const t: Record<Lang, Translation> = {
  en: {
    // Nav
    nav: {
      home: "Home",
      services: "Services",
      gallery: "Gallery",
      estimator: "Estimator",
      about: "About",
      hoaPermits: "HOA & Permits",
      financing: "Financing",
      contact: "Contact",
      getFreeQuote: "Get a Free Quote",
    },
    // Header top bar
    topbar: {
      hours: "Mon–Sat 8:00 AM – 6:00 PM",
      callUs: "Call us anytime:",
      email: "Email:",
    },
    // Hero
    hero: {
      tagline: "Flagler, Volusia, St. Johns & Northeast Florida",
      heading: "Strong fences. Smooth process.",
      subheading:
        "Vinyl, aluminum, chain-link, and wood — installed on time, on budget, and built to last Florida's weather.",
      cta: "Get a Free Quote",
      schedule: "📅 Schedule site visit",
      siteVisit24h: "⚡ Free site visit within 24 hours · No obligation",
    },
    // LP trust strip (compact row above the Estimator on landing pages)
    lpTrustStrip: {
      siteVisit24h: "Site visit within 24h",
      licensed: "Licensed & Insured",
      financing: "Financing from $417/mo",
    },
    // Trust badges
    trust: {
      experience: { title: "10+ Years of Experience", desc: "Over a decade installing fences across Flagler, Volusia, St. Johns and Northeast Florida." },
      licensed: { title: "Licensed & Insured", desc: "Fully licensed in Florida and insured for your complete peace of mind." },
      freeEstimate: { title: "Free Estimates", desc: "We come to your property and give you a detailed, no-obligation quote." },
      premium: { title: "Premium Materials", desc: "We only install materials that hold up to Florida's heat, humidity, and storms." },
    },
    // Why choose us
    whyUs: {
      label: "Why choose us",
      heading: "Not just another fence company",
      sub: "We keep things personal, professional, and honest — so you know exactly who is on your property and how your fence is being built.",
      reasons: [
        {
          title: "You speak directly with the owner",
          desc: "No middlemen. I personally supervise your project and make sure everything is done right from the beginning.",
        },
        {
          title: "Professional installation with no shortcuts",
          desc: "Precise, level, and long-lasting work. I don't subcontract — I handle the installation myself, and that guarantees real quality.",
        },
        {
          title: "Fair pricing with zero hidden fees",
          desc: "You don't pay for big offices or commission chains. You only pay for a well-built fence at the correct price.",
        },
      ],
    },
    // Service Area
    serviceArea: {
      label: "Service Area",
      heading: "We serve Northeast Florida",
      sub: "Based in Palm Coast (Flagler County) — we serve Flagler, Volusia, St. Johns, Duval and Putnam counties to deliver the same quality fence installation wherever you are.",
      ctaQuote: "Get a Free Quote in My Area",
      ctaMap: "View on Map",
    },
    // CTA
    cta: {
      heading: "Ready to build your fence?",
      sub: "Get a free, no-obligation estimate — we'll visit your property, measure everything, and give you a precise quote.",
      btn: "Request a Free Quote",
    },
    // Contact page
    contact: {
      label: "Get your free quote",
      heading: "Contact Smooth Fence USA",
      sub: "Share your site details and we'll coordinate a visit, gather HOA docs, and send a precise project estimate.",
      whatNext: "What happens next?",
      step1: { title: "Quick call:", desc: "We confirm project scope, HOA status, and preferred timelines." },
      step2: { title: "Site visit:", desc: "Our estimator measures linear feet and checks grading, utilities, and property lines." },
      step3: { title: "Proposal:", desc: "You receive a detailed quote with materials, permits, and scheduling info." },
      scheduleLabel: "Prefer to schedule directly?",
      scheduleBtn: "📅 Schedule an Estimate Visit",
      directContact: "Contact us directly",
      location: "Flagler · Volusia · St. Johns · Duval · Putnam counties, FL",
    },
    // Quote form
    form: {
      label: "Tell us about your project",
      heading: "Request your personalized fence quote",
      sub: "The more details you share, the faster we can provide accurate pricing and schedule your installation.",
      fullName: "Full name",
      phone: "Phone",
      email: "Email",
      preferredDate: "Preferred visit date",
      preferredTime: "Preferred time",
      timeOptional: "(optional)",
      address: "Property address",
      addressPlaceholder: "Start typing your address…",
      fenceType: "Fence type",
      fenceTypePlaceholder: "Select an option",
      linearFeet: "Approx. linear feet",
      hoa: "HOA involved?",
      hoaPlaceholder: "Select an option",
      message: "Message / project details",
      disclaimer: "By submitting, you agree to be contacted about your quote request.",
      send: "Send request",
      sending: "Sending…",
      success: "Thanks! Your request is in our queue. A Smooth Fence USA specialist will reach out shortly.",
      success24h: "Thanks! We'll schedule your free site visit within 24 hours. Check your phone/email for confirmation.",
      hoaOptions: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "not-sure", label: "Not sure yet" },
      ],
      fenceOptions: ["Vinyl", "Aluminum", "Chain-link", "Wood", "Not sure yet"],
      required: "*",
    },
    // Footer
    footer: {
      tagline: "Quality fencing across Northeast Florida — Flagler, Volusia, St. Johns & more.",
      quickLinks: "Quick links",
      hours: "Mon – Sat, 8:00 AM – 6:00 PM",
      rights: "All rights reserved.",
    },
    // Services page
    services: {
      pageTagline: "Fence services for Northeast Florida properties",
      pageHeading: "Professional fence services with local expertise",
      pageSub: "From new installations to repairs and HOA approvals, Smooth Fence USA delivers long-lasting fences built for Florida weather, storms, and permitting rules.",
      sectionHeading: "Fence services for Northeast Florida properties",
      sectionSub: "Installations, repairs, and HOA support handled by a crew that knows Florida's climate and permitting rules.",
      items: [
        { title: "Vinyl fence installation", description: "Low-maintenance vinyl fences that stay bright and clean, perfect for privacy and curb appeal in Florida's coastal climate." },
        { title: "Aluminum fence installation", description: "Sleek, durable aluminum fences that won't rust and are ideal for pools, front yards, and HOA communities." },
        { title: "Chain-link fence installation", description: "A cost-effective way to secure your property, pets, or work areas without blocking visibility." },
        { title: "Wood fence installation", description: "Classic wood fences with modern hardware and proper post setting so they don't lean or sag after the first storm." },
        { title: "Fence repair & storm damage", description: "We fix leaning panels, broken posts, and storm-damaged sections so you don't have to replace the whole fence." },
        { title: "HOA & permits assistance", description: "We help you navigate HOA guidelines and local permitting so your fence is approved the first time." },
      ],
      faqLabel: "FAQ",
      faqHeading: "Frequently asked questions",
      faqSub: "Quick answers about our process and services.",
      faqs: [
        { question: "What areas do you serve?", answer: "We serve Flagler, Volusia, St. Johns, Duval, and Putnam counties across Northeast Florida. Contact us to confirm availability in your specific area." },
        { question: "Do you help with HOA approvals and permits?", answer: "Yes, we guide homeowners through HOA requirements and local permitting to avoid delays and rejections." },
        { question: "How long does a typical fence installation take?", answer: "Most residential fence projects take 1–3 days once materials are onsite and approvals are complete." },
        { question: "Can you repair part of my fence instead of replacing it?", answer: "Often yes. We repair damaged panels, leaning posts, and storm damage without replacing the entire fence." },
        { question: "Which fence material works best in Florida's climate?", answer: "Vinyl and aluminum handle moisture, heat, and storms very well. Wood can also perform great with proper installation." },
      ],
    },
    // About page
    about: {
      heading: "About Smooth Fence USA",
      p1: "Smooth Fence USA was created with a simple goal: make fence projects easy for homeowners across Northeast Florida, including Flagler, Volusia, St. Johns, Duval and Putnam counties. We know how stressful it can be to deal with HOAs, permits, and contractors that don't show up on time. Our team focuses on clear communication, clean job sites, and results that look great from the street.",
      p2: "We specialize in vinyl, aluminum, chain-link, and wood fences and understand how Florida's sun, wind, and storms affect each material. That's why we recommend the right posts, hardware, and layouts based on your property — not a one-size-fits-all approach.",
      p3: "When you work with Smooth Fence USA, you get a local crew that respects your time, your yard, and your neighbors. We show up when we say we will, keep you updated during your project, and leave your property as clean as we found it.",
      expectHeading: "What you can expect from us",
      items: ["Clear, written quotes with no hidden fees.", "Help with HOA approvals and required drawings.", "Professional installation crews and clean job sites.", "Recommendations based on your needs, not our convenience."],
    },
    // HOA page
    hoa: {
      heading: "HOA & permits made simple",
      intro1: "Many neighborhoods across Flagler, Volusia, St. Johns and the surrounding Northeast Florida communities are part of an HOA. That means your new fence must follow specific rules for height, style, material, and color. On top of that, some projects require city or county permits.",
      intro2: "Smooth Fence USA helps you understand what's allowed before you sign a contract so you don't waste time or money on plans that won't be approved.",
      hoaCard: { heading: "HOA guidance", items: ["Review of your HOA rules and design guidelines.", "Help choosing fence styles and colors that fit.", "Support with drawings or descriptions for approvals."] },
      permitCard: { heading: "Permits & inspections", items: ["Guidance on what projects require permits.", "Coordination of permit steps when applicable.", "Fence layouts that respect property lines and easements."] },
      footer: "Every neighborhood is different. When you request a quote, let us know if you're part of an HOA and we'll factor that into your plan from day one.",
    },
    // Estimator
    estimator: {
      tagline: "No commitment required",
      heading: "Instant Fence Estimator",
      sub: "Get a real price range in 30 seconds. Then schedule a free on-site visit to confirm everything.",
      selectMaterial: "1. Select Material",
      premiumLabel: "⭐ Premium / Grade A material",
      height: "2. Fence Height",
      linearFeet: "3. Linear Feet",
      gates: "4. Gates",
      removal: "🗑 Old fence removal needed?",
      estimateReady: "Your estimate is ready",
      estimateReadySub: "Complete the next step to reveal your personalized price range.",
      estimateMeta: "Based on",
      nextBtn: "Get My Personalized Estimate →",
      noCommit: "No commitment. Free on-site visit to confirm everything.",
      step2Title: "Almost there!",
      step2Sub: "Enter your details to receive your personalized estimate by email.",
      step2Locked: "Your estimate is ready 🔒",
      editDetails: "← Edit project details",
      nameLabel: "Full Name",
      phoneLabel: "Phone Number",
      emailLabel: "Email Address",
      zipLabel: "Zip Code",
      submitBtn: "✨ Get My Instant Estimate",
      submitting: "Sending your estimate...",
      privacy: "🔒 Your information is 100% protected. No spam, ever.",
      confirmTitle: "Your estimate is on its way!",
      confirmSub: "We sent a detailed breakdown to",
      success24h: "Thanks! We'll schedule your free site visit within 24 hours. Check your phone/email for confirmation.",
      range: "Your estimated range",
      rangeNote: "Final price confirmed after on-site measurement",
      scheduleBtn: "📅 Schedule Your Free Site Visit",
      backHome: "Back to Home",
      callNow: "📞 Call Us Now",
      gallery: "Final Step",
    },
    financing: {
      calculator: {
        title: "Calculate your monthly payment",
        sub: "See what your fence project could cost per month — in under a minute.",
        benefit1: "No impact on your credit score",
        benefit2: "Pre-qualify in 60 seconds",
        benefit3: "Powered by Hearth — trusted by 40,000+ contractors",
        cta: "See my monthly payment →",
        disclaimer: "Opens in a new tab at Hearth.",
      },
    },
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      gallery: "Galería",
      estimator: "Estimador",
      about: "Nosotros",
      hoaPermits: "HOA & Permisos",
      financing: "Financiamiento",
      contact: "Contacto",
      getFreeQuote: "Cotización Gratis",
    },
    topbar: {
      hours: "Lun–Sáb 8:00 AM – 6:00 PM",
      callUs: "Llámanos:",
      email: "Correo:",
    },
    hero: {
      tagline: "Flagler, Volusia, St. Johns y el noreste de Florida",
      heading: "Tu cerca, bien hecha.",
      subheading:
        "Vinilo, aluminio, malla ciclónica y madera — instaladas a tiempo, dentro del presupuesto y construidas para aguantar el clima de Florida.",
      cta: "Cotización Gratis",
      schedule: "📅 Agendar visita",
      siteVisit24h: "⚡ Visita gratis en menos de 24 horas · Sin compromiso",
    },
    lpTrustStrip: {
      siteVisit24h: "Visita en 24h",
      licensed: "Licencia y seguro",
      financing: "Financiamiento desde $417/mes",
    },
    trust: {
      experience: { title: "Más de 10 Años de Experiencia", desc: "Más de una década instalando cercas en Flagler, Volusia, St. Johns y el resto del noreste de Florida." },
      licensed: { title: "Licenciados y Asegurados", desc: "Completamente licenciados en Florida y asegurados para tu total tranquilidad." },
      freeEstimate: { title: "Estimados Gratuitos", desc: "Vamos a tu propiedad y te damos una cotización detallada sin compromiso." },
      premium: { title: "Materiales Premium", desc: "Solo instalamos materiales que soportan el calor, la humedad y las tormentas de Florida." },
    },
    whyUs: {
      label: "¿Por qué elegirnos?",
      heading: "No somos otra empresa de cercas",
      sub: "Trabajamos de forma personal, profesional y honesta — para que sepas exactamente quién está en tu propiedad y cómo se está construyendo tu cerca.",
      reasons: [
        {
          title: "Hablas directamente con el dueño",
          desc: "Sin intermediarios. Yo personalmente superviso tu proyecto y me aseguro de que todo esté bien hecho desde el principio.",
        },
        {
          title: "Instalación profesional sin atajos",
          desc: "Trabajo preciso, nivelado y duradero. No subcontrato — yo mismo hago la instalación, y eso garantiza calidad real.",
        },
        {
          title: "Precios justos sin costos ocultos",
          desc: "No pagas por grandes oficinas ni cadenas de comisiones. Solo pagas por una cerca bien construida al precio correcto.",
        },
      ],
    },
    serviceArea: {
      label: "Área de Servicio",
      heading: "Servimos el noreste de Florida",
      sub: "Con base en Palm Coast (Condado de Flagler) — servimos Flagler, Volusia, St. Johns, Duval y Putnam con la misma calidad de instalación donde estés.",
      ctaQuote: "Cotización Gratis en mi Área",
      ctaMap: "Ver en el Mapa",
    },
    cta: {
      heading: "¿Listo para construir tu cerca?",
      sub: "Obtén un estimado gratuito sin compromiso — visitamos tu propiedad, medimos todo y te enviamos una cotización precisa.",
      btn: "Solicitar Cotización Gratis",
    },
    contact: {
      label: "Obtén tu cotización gratis",
      heading: "Contacta a Smooth Fence USA",
      sub: "Comparte los detalles de tu propiedad y coordinaremos una visita, gestionaremos los documentos del HOA y te enviaremos un estimado preciso.",
      whatNext: "¿Qué pasa después?",
      step1: { title: "Llamada rápida:", desc: "Confirmamos el alcance del proyecto, el estado del HOA y los plazos preferidos." },
      step2: { title: "Visita al sitio:", desc: "Nuestro estimador mide los pies lineales y verifica la nivelación, servicios y linderos." },
      step3: { title: "Propuesta:", desc: "Recibes una cotización detallada con materiales, permisos e información de programación." },
      scheduleLabel: "¿Prefieres agendar directamente?",
      scheduleBtn: "📅 Agendar Visita de Estimado",
      directContact: "Contáctanos directamente",
      location: "Condados de Flagler · Volusia · St. Johns · Duval · Putnam, FL",
    },
    form: {
      label: "Cuéntanos sobre tu proyecto",
      heading: "Solicita tu cotización personalizada",
      sub: "Cuanto más detalles compartas, más rápido podemos darte precios precisos y agendar tu instalación.",
      fullName: "Nombre completo",
      phone: "Teléfono",
      email: "Correo electrónico",
      preferredDate: "Fecha preferida de visita",
      preferredTime: "Hora preferida",
      timeOptional: "(opcional)",
      address: "Dirección de la propiedad",
      addressPlaceholder: "Empieza a escribir tu dirección…",
      fenceType: "Tipo de cerca",
      fenceTypePlaceholder: "Selecciona una opción",
      linearFeet: "Pies lineales aproximados",
      hoa: "¿Hay HOA?",
      hoaPlaceholder: "Selecciona una opción",
      message: "Mensaje / detalles del proyecto",
      disclaimer: "Al enviar, aceptas ser contactado sobre tu solicitud de cotización.",
      send: "Enviar solicitud",
      sending: "Enviando…",
      success: "¡Gracias! Tu solicitud está en nuestra cola. Un especialista de Smooth Fence USA te contactará pronto.",
      success24h: "¡Gracias! Coordinamos tu visita gratuita en las próximas 24 horas. Revisá tu teléfono/email para la confirmación.",
      hoaOptions: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" },
        { value: "not-sure", label: "No estoy seguro" },
      ],
      fenceOptions: ["Vinilo", "Aluminio", "Malla ciclónica", "Madera", "No estoy seguro"],
      required: "*",
    },
    footer: {
      tagline: "Cercas de calidad en el noreste de Florida — Flagler, Volusia, St. Johns y más.",
      quickLinks: "Enlaces rápidos",
      hours: "Lun – Sáb, 8:00 AM – 6:00 PM",
      rights: "Todos los derechos reservados.",
    },
    // Services page
    services: {
      pageTagline: "Servicios de cercas para propiedades del noreste de Florida",
      pageHeading: "Servicios profesionales con experiencia local",
      pageSub: "Desde instalaciones nuevas hasta reparaciones y aprobaciones de HOA, Smooth Fence USA construye cercas duraderas diseñadas para el clima, las tormentas y las reglas de permisos de Florida.",
      sectionHeading: "Servicios de cercas para propiedades del noreste de Florida",
      sectionSub: "Instalaciones, reparaciones y apoyo con HOA por un equipo que conoce el clima y las reglas de permisos de Florida.",
      items: [
        { title: "Instalación de cerca de vinilo", description: "Cercas de vinilo de bajo mantenimiento que permanecen brillantes, perfectas para privacidad y atractivo en el clima costero de Florida." },
        { title: "Instalación de cerca de aluminio", description: "Cercas de aluminio elegantes y duraderas que no se oxidan, ideales para piscinas, patios delanteros y comunidades con HOA." },
        { title: "Instalación de malla ciclónica", description: "Una forma rentable de asegurar tu propiedad, mascotas o áreas de trabajo sin bloquear la visibilidad." },
        { title: "Instalación de cerca de madera", description: "Cercas de madera clásicas con herrajes modernos e instalación correcta de postes para que no se inclinen después de la primera tormenta." },
        { title: "Reparación y daños por tormenta", description: "Reparamos paneles inclinados, postes rotos y secciones dañadas por tormentas sin necesidad de reemplazar toda la cerca." },
        { title: "Asistencia con HOA y permisos", description: "Te ayudamos a navegar los requisitos del HOA y los permisos locales para que tu cerca sea aprobada a la primera." },
      ],
      faqLabel: "Preguntas frecuentes",
      faqHeading: "Preguntas frecuentes",
      faqSub: "Respuestas rápidas sobre nuestro proceso y servicios.",
      faqs: [
        { question: "¿Qué áreas sirven?", answer: "Servimos los condados de Flagler, Volusia, St. Johns, Duval y Putnam en el noreste de Florida. Si estás un poco fuera de la zona, contáctanos y confirmamos disponibilidad." },
        { question: "¿Ayudan con aprobaciones de HOA y permisos?", answer: "Sí, guiamos a los propietarios a través de los requisitos del HOA y los permisos locales para evitar retrasos y rechazos." },
        { question: "¿Cuánto tiempo tarda una instalación típica?", answer: "La mayoría de los proyectos residenciales toman 1–3 días una vez que los materiales están en el sitio y las aprobaciones están completas." },
        { question: "¿Pueden reparar parte de mi cerca en vez de reemplazarla?", answer: "A menudo sí. Reparamos paneles dañados, postes inclinados y daños por tormentas sin reemplazar toda la cerca." },
        { question: "¿Qué material funciona mejor en el clima de Florida?", answer: "El vinilo y el aluminio manejan muy bien la humedad, el calor y las tormentas. La madera también funciona excelente con una instalación correcta." },
      ],
    },
    // About page
    about: {
      heading: "Acerca de Smooth Fence USA",
      p1: "Smooth Fence USA fue creada con un objetivo simple: hacer los proyectos de cercas fáciles para los propietarios en Flagler, Volusia, St. Johns, Duval, Putnam y el resto del noreste de Florida. Sabemos lo estresante que puede ser lidiar con HOAs, permisos y contratistas que no llegan a tiempo. Nuestro equipo se enfoca en comunicación clara, sitios de trabajo limpios y resultados que se ven bien desde la calle.",
      p2: "Nos especializamos en cercas de vinilo, aluminio, malla ciclónica y madera, y entendemos cómo el sol, el viento y las tormentas de Florida afectan cada material. Por eso recomendamos los postes, herrajes y diseños correctos según tu propiedad, no un enfoque único para todos.",
      p3: "Cuando trabajas con Smooth Fence USA, obtienes un equipo local que respeta tu tiempo, tu jardín y tus vecinos. Llegamos cuando decimos que llegaremos, te mantenemos informado durante el proyecto y dejamos tu propiedad tan limpia como la encontramos.",
      expectHeading: "Lo que puedes esperar de nosotros",
      items: ["Cotizaciones claras y escritas sin cargos ocultos.", "Ayuda con aprobaciones de HOA y dibujos requeridos.", "Equipos de instalación profesionales y sitios de trabajo limpios.", "Recomendaciones basadas en tus necesidades, no en nuestra conveniencia."],
    },
    // HOA page
    hoa: {
      heading: "HOA y permisos simplificados",
      intro1: "Muchos vecindarios en Flagler, Volusia, St. Johns y las comunidades cercanas del noreste de Florida son parte de un HOA. Eso significa que tu nueva cerca debe seguir reglas específicas de altura, estilo, material y color. Además, algunos proyectos requieren permisos de la ciudad o el condado.",
      intro2: "Smooth Fence USA te ayuda a entender qué está permitido antes de firmar un contrato para que no pierdas tiempo o dinero en planes que no serán aprobados.",
      hoaCard: { heading: "Orientación sobre HOA", items: ["Revisión de las reglas y directrices de diseño de tu HOA.", "Ayuda para elegir estilos y colores de cerca que se ajusten.", "Apoyo con dibujos o descripciones para las aprobaciones."] },
      permitCard: { heading: "Permisos e inspecciones", items: ["Orientación sobre qué proyectos requieren permisos.", "Coordinación de los pasos del permiso cuando aplique.", "Diseños de cerca que respetan los linderos y servidumbres."] },
      footer: "Cada vecindario es diferente. Al solicitar una cotización, avísanos si eres parte de un HOA y lo incluiremos en tu plan desde el primer día.",
    },
    // Estimator
    estimator: {
      tagline: "Sin compromiso",
      heading: "Estimador Instantáneo de Cercas",
      sub: "Obtén un rango de precio real en 30 segundos. Luego agenda una visita gratuita para confirmar todo.",
      selectMaterial: "1. Selecciona el Material",
      premiumLabel: "⭐ Premium / Material Grado A",
      height: "2. Altura de la Cerca",
      linearFeet: "3. Pies Lineales",
      gates: "4. Puertas",
      removal: "🗑 ¿Necesitas remover la cerca vieja?",
      estimateReady: "Tu estimado está listo",
      estimateReadySub: "Completa el siguiente paso para ver tu rango de precio personalizado.",
      estimateMeta: "Basado en",
      nextBtn: "Ver Mi Estimado Personalizado →",
      noCommit: "Sin compromiso. Visita gratuita para confirmar todo.",
      step2Title: "¡Ya casi!",
      step2Sub: "Ingresa tus datos para recibir tu estimado personalizado por correo.",
      step2Locked: "Tu estimado está listo 🔒",
      editDetails: "← Editar detalles del proyecto",
      nameLabel: "Nombre completo",
      phoneLabel: "Número de teléfono",
      emailLabel: "Correo electrónico",
      zipLabel: "Código postal",
      submitBtn: "✨ Obtener Mi Estimado Instantáneo",
      submitting: "Enviando tu estimado...",
      privacy: "🔒 Tu información está 100% protegida. Sin spam, nunca.",
      confirmTitle: "¡Tu estimado está en camino!",
      confirmSub: "Enviamos un desglose detallado a",
      success24h: "¡Gracias! Coordinamos tu visita gratuita en las próximas 24 horas. Revisá tu teléfono/email para la confirmación.",
      range: "Tu rango estimado",
      rangeNote: "Precio final confirmado después de la medición en sitio",
      scheduleBtn: "📅 Agendar Tu Visita Gratuita",
      backHome: "Volver al Inicio",
      callNow: "📞 Llámanos Ahora",
      gallery: "Paso Final",
    },
    financing: {
      calculator: {
        title: "Calcula tu pago mensual",
        sub: "Vé cuánto podría costarte tu cerca al mes — en menos de un minuto.",
        benefit1: "Sin impacto en tu crédito",
        benefit2: "Pre-calificación en 60 segundos",
        benefit3: "Con tecnología Hearth — usado por 40,000+ contratistas",
        cta: "Ver mi pago mensual →",
        disclaimer: "Se abre en una nueva pestaña en Hearth.",
      },
    },
  },
};
