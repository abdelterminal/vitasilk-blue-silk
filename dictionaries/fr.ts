// French is the source of truth for the dictionary shape — `ar.ts` is typed
// against `Dict`, so the two files stay structurally locked together.
//
// Price-bearing strings are FUNCTIONS taking an already-formatted price. Never
// hardcode a price here: it would silently desync from `lib/config.ts`.
//
// Positioning for this SKU is ARGAN-FIRST. The sibling Coffee Extract page
// leads on Amazon/Brazil sourcing; Blue Silk leads on Moroccan argan, with the
// Brazilian protein as the carrier. That is deliberate — argan is a local
// trust signal for this audience, and it is what separates the two SKUs.

export const fr = {
  announce: "Livraison gratuite partout au Maroc — Paiement à la livraison",
  nav: { brand: "Vitasilk", cta: "Commander" },
  hero: {
    eyebrow: "Vitasilk Professional",
    title1: "Blue",
    title2: "Silk",
    subtitle:
      "L'huile d'argan marocaine et l'aloe vera, portées par la protéine brésilienne. La fibre se referme, les frisottis se calment, la lumière revient — sans formol.",
    cta: (price: string) => `Je commande — ${price}`,
    badge1: "0% Formol",
    badge2: "1 L — Format Salon",
    badge3: "Argan & Aloe Vera",
    scroll: "Découvrir",
  },
  marquee: [
    "Huile d'argan",
    "Aloe vera",
    "Protéine brésilienne",
    "Sans formol",
    "Brillance miroir",
    "Format salon 1 L",
  ],
  problem: {
    title: "Des cheveux secs ne manquent pas d'huile. Ils manquent d'eau et de protéines.",
    subtitle:
      "Le fer, le soleil, la coloration, l'eau calcaire : les écailles se soulèvent, l'hydratation s'échappe, et la fibre devient rêche. On empile les huiles en surface pendant que l'intérieur reste vide.",
    points: [
      "Frisottis qui reviennent dès qu'il y a de l'humidité",
      "Cheveux rêches et secs, difficiles à démêler",
      "Longueurs ternes, sans reflet ni douceur",
      "Pointes fourchues qui cassent au brossage",
    ],
    promiseTitle: "La promesse Blue Silk",
    promise:
      "Hydrater, reconstruire, puis sceller. L'aloe vera fait entrer l'eau, la protéine brésilienne hydrolysée comble les brèches de la fibre, et l'huile d'argan referme l'écaille par-dessus. C'est cet ordre-là qui fait tenir le résultat — pas la quantité d'huile.",
  },
  safety: {
    title: "Sans formol. Sans acide glyoxylique.",
    subtitle:
      "Un soin protéiné professionnel que vous pouvez répéter sereinement, saison après saison.",
    items: [
      {
        title: "Sans formol",
        desc: "Pas de vapeurs irritantes pour les yeux ni pour les voies respiratoires.",
      },
      {
        title: "Sans acide glyoxylique",
        desc: "Aucune des substances mises en cause dans les lissages agressifs.",
      },
      {
        title: "Tous types de cheveux",
        desc: "Colorés, méchés, bouclés ou naturels — la protéine s'adapte à la fibre.",
      },
    ],
  },
  ingredients: {
    eyebrow: "La formule",
    title: "L'argan marocain rencontre la protéine brésilienne",
    subtitle:
      "Six actifs qui travaillent dans l'ordre : d'abord l'eau, ensuite la protéine, l'huile en dernier.",
    items: [
      {
        name: "Huile d'argan",
        desc: "L'or liquide du Souss : elle referme l'écaille et donne à la fibre son fini soyeux.",
      },
      {
        name: "Aloe vera",
        desc: "Elle fait entrer l'hydratation dans la fibre et apaise le cuir chevelu au passage.",
      },
      {
        name: "Protéine brésilienne",
        desc: "Hydrolysée pour pénétrer la fibre et en combler les brèches, au lieu de la couvrir.",
      },
      {
        name: "Kératine",
        desc: "La protéine dont le cheveu est fait : elle lisse et redonne du corps.",
      },
      {
        name: "Panthénol",
        desc: "Pro-vitamine B5 : retient l'hydratation au cœur du cheveu, lavage après lavage.",
      },
      {
        name: "Acides aminés de soie",
        desc: "Ils gainent la fibre et lui donnent ce glissé sous les doigts qui a donné son nom au soin.",
      },
    ],
  },
  benefits: {
    title: "Pourquoi il fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    // order matches ICONS[] in components/Benefits.tsx
    items: [
      {
        title: "Douceur soyeuse, anti-frisottis",
        desc: "La fibre se referme : les frisottis se calment et le brushing tient bien plus longtemps.",
      },
      {
        title: "Brillance miroir",
        desc: "L'argan donne un fini lumineux qui accroche la lumière dès la première application.",
      },
      {
        title: "Hydratation profonde",
        desc: "L'aloe vera hydrate au cœur de la fibre, là où les huiles seules restent en surface.",
      },
      {
        title: "Format Salon 1 L",
        desc: "Le vrai format professionnel : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Argan du Maroc",
    title: "L'or du Souss, la science du Brésil",
    subtitle:
      "L'huile d'argan est notre trésor : les Marocaines l'utilisent depuis des générations pour nourrir leurs cheveux. Vitasilk la marie à la protéine brésilienne, qui lui donne enfin de quoi tenir dans la durée.",
  },
  beforeAfter: {
    title: "Avant / Après",
    subtitle: "Faites glisser pour voir la transformation",
    before: "Avant",
    after: "Après",
  },
  howto: {
    title: "3 gestes, résultat salon",
    steps: [
      {
        title: "Lavez",
        desc: "Lavez avec un shampooing clarifiant, puis essorez sans sécher complètement.",
      },
      {
        title: "Appliquez",
        desc: "Appliquez le Blue Silk mèche par mèche, laissez poser 20 à 40 minutes.",
      },
      {
        title: "Rincez & coiffez",
        desc: "Rincez, séchez, puis passez le fer pour sceller la protéine. Admirez la brillance.",
      },
    ],
  },
  testimonials: {
    title: "Elles l'ont adopté",
    subtitle: "+12 000 clientes satisfaites au Maroc",
    items: [
      {
        name: "Salma — Casablanca",
        text: "J'ai les cheveux bouclés et secs, et le démêlage était une bataille tous les matins. Depuis, le peigne passe tout seul — c'est ça qui a changé mes matins, pas seulement la brillance.",
      },
      {
        name: "Imane — Rabat",
        text: "Ce qui m'a convaincue c'est l'argan. On connaît toutes son effet, mais là il tient vraiment : mes cheveux sont encore doux au troisième lavage.",
      },
      {
        name: "Khadija — Marrakech",
        text: "Je suis coiffeuse et je l'utilise en cabine toute la journée. Aucune vapeur qui pique, et mes clientes remarquent la douceur avant même que je sorte le fer.",
      },
      {
        name: "Sara — Tanger",
        text: "Avec l'humidité de Tanger, mes cheveux gonflaient à peine sortie de chez moi. Depuis le Blue Silk, ils restent lisses toute la journée.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Stock limité — profitez du prix spécial",
    unit: "Blue Silk — Protéine Brésilienne à l'Argan 1 L",
    save: (pct: number) => `Économisez ${pct}%`,
    freeDelivery: "Livraison gratuite",
    cod: "Paiement à la livraison",
    guarantee: "Satisfaite ou remboursée",
    countdown: { title: "L'offre expire dans", h: "Heures", m: "Minutes", s: "Secondes" },
    cta: "Commander maintenant",
  },
  form: {
    title: "Commandez maintenant",
    subtitle:
      "Remplissez le formulaire — nous vous appelons pour confirmer. Paiement à la livraison.",
    name: "Nom complet",
    namePh: "Votre nom et prénom",
    phone: "Téléphone",
    phonePh: "06 XX XX XX XX",
    city: "Ville",
    cityPh: "Votre ville",
    qty: "Quantité",
    total: "Total",
    submit: "Confirmer ma commande",
    sending: "Envoi en cours…",
    successTitle: "Commande reçue !",
    successText:
      "Merci ! Notre équipe vous appellera très vite pour confirmer la livraison.",
    errorTitle: "L'envoi a échoué",
    errorText:
      "Vérifiez votre connexion et réessayez, ou commandez directement sur WhatsApp — votre commande est conservée.",
    retry: "Réessayer",
    whatsapp: "Commander sur WhatsApp",
    errors: {
      name: "Veuillez entrer votre nom",
      phone: "Numéro de téléphone invalide",
      city: "Veuillez entrer votre ville",
    },
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Contient-il du formol ou de l'acide glyoxylique ?",
        a: "Non, ni l'un ni l'autre. Le Blue Silk est un soin protéiné : il reconstruit et discipline la fibre sans ces substances et sans vapeurs irritantes.",
      },
      {
        q: "Est-ce un lissage ou un soin ?",
        a: "C'est un soin protéiné. Il discipline nettement les frisottis et facilite le coiffage, mais son rôle premier est de reconstruire et d'hydrater la fibre — pas de transformer une chevelure bouclée en cheveux raides.",
      },
      {
        q: "Convient-il aux cheveux colorés ?",
        a: "Oui, et c'est même là qu'il est le plus utile : la coloration vide la fibre de ses protéines et soulève l'écaille, exactement ce que cette formule vient recharger et refermer. Elle ne dégrade pas la couleur.",
      },
      {
        q: "À quelle fréquence l'utiliser ?",
        a: "Une application toutes les 4 à 6 semaines suffit. Sur cheveux très secs ou très abîmés, deux applications à quinze jours d'intervalle pour démarrer, puis on espace.",
      },
      {
        q: "Comment se passe la livraison ?",
        a: "Livraison gratuite partout au Maroc en 24 à 48h. Vous payez uniquement à la réception de votre commande.",
      },
    ],
  },
  footer: {
    tagline: "L'argan marocain et la protéine brésilienne, chez vous.",
    rights: "© 2026 Vitasilk Professional. Tous droits réservés.",
  },
  sticky: { cta: "Commander" },
};

export type Dict = typeof fr;
