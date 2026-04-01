export type Lang = "en" | "es";

export const t = {
  en: {
    // Nav
    nav: {
      home: "Home",
      services: "Services",
      gallery: "Gallery",
      estimator: "Estimator",
      about: "About",
      hoaPermits: "HOA & Permits",
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
      tagline: "Palm Coast & Northeast Florida",
      heading: "Your fence, done right.",
      subheading:
        "Vinyl, aluminum, chain-link, and wood — installed on time, on budget, and built to last Florida's weather.",
      cta: "Get a Free Quote",
      schedule: "📅 Schedule a Visit",
    },
    // Trust badges
    trust: {
      experience: { title: "10+ Years of Experience", desc: "Over a decade installing fences across Palm Coast and Northeast Florida." },
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
      sub: "Based in Palm Coast, Flagler County — we travel throughout Northeast Florida to deliver the same quality fence installation wherever you are.",
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
      heading: "Contact SmoothFenceUSA",
      sub: "Share your site details and we'll coordinate a visit, gather HOA docs, and send a precise project estimate.",
      whatNext: "What happens next?",
      step1: { title: "Quick call:", desc: "We confirm project scope, HOA status, and preferred timelines." },
      step2: { title: "Site visit:", desc: "Our estimator measures linear feet and checks grading, utilities, and property lines." },
      step3: { title: "Proposal:", desc: "You receive a detailed quote with materials, permits, and scheduling info." },
      scheduleLabel: "Prefer to schedule directly?",
      scheduleBtn: "📅 Schedule an Estimate Visit",
      directContact: "Contact us directly",
      location: "Palm Coast & surrounding areas",
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
      success: "Thanks! Your request is in our queue. A SmoothFenceUSA specialist will reach out shortly.",
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
      tagline: "Quality fencing across Palm Coast & Northeast Florida.",
      quickLinks: "Quick links",
      hours: "Mon – Sat, 8:00 AM – 6:00 PM",
      rights: "All rights reserved.",
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
      contact: "Contacto",
      getFreeQuote: "Cotización Gratis",
    },
    topbar: {
      hours: "Lun–Sáb 8:00 AM – 6:00 PM",
      callUs: "Llámanos:",
      email: "Correo:",
    },
    hero: {
      tagline: "Palm Coast y el noreste de Florida",
      heading: "Tu cerca, bien hecha.",
      subheading:
        "Vinilo, aluminio, malla ciclónica y madera — instaladas a tiempo, dentro del presupuesto y construidas para aguantar el clima de Florida.",
      cta: "Cotización Gratis",
      schedule: "📅 Agendar una Visita",
    },
    trust: {
      experience: { title: "Más de 10 Años de Experiencia", desc: "Más de una década instalando cercas en Palm Coast y el noreste de Florida." },
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
      sub: "Con base en Palm Coast, Condado de Flagler — viajamos por todo el noreste de Florida para ofrecer la misma calidad de instalación donde estés.",
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
      heading: "Contacta a SmoothFenceUSA",
      sub: "Comparte los detalles de tu propiedad y coordinaremos una visita, gestionaremos los documentos del HOA y te enviaremos un estimado preciso.",
      whatNext: "¿Qué pasa después?",
      step1: { title: "Llamada rápida:", desc: "Confirmamos el alcance del proyecto, el estado del HOA y los plazos preferidos." },
      step2: { title: "Visita al sitio:", desc: "Nuestro estimador mide los pies lineales y verifica la nivelación, servicios y linderos." },
      step3: { title: "Propuesta:", desc: "Recibes una cotización detallada con materiales, permisos e información de programación." },
      scheduleLabel: "¿Prefieres agendar directamente?",
      scheduleBtn: "📅 Agendar Visita de Estimado",
      directContact: "Contáctanos directamente",
      location: "Palm Coast y áreas cercanas",
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
      success: "¡Gracias! Tu solicitud está en nuestra cola. Un especialista de SmoothFenceUSA te contactará pronto.",
      hoaOptions: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" },
        { value: "not-sure", label: "No estoy seguro" },
      ],
      fenceOptions: ["Vinilo", "Aluminio", "Malla ciclónica", "Madera", "No estoy seguro"],
      required: "*",
    },
    footer: {
      tagline: "Cercas de calidad en Palm Coast y el noreste de Florida.",
      quickLinks: "Enlaces rápidos",
      hours: "Lun – Sáb, 8:00 AM – 6:00 PM",
      rights: "Todos los derechos reservados.",
    },
  },
} as const;
