/* =========================================================
   HOUSE OF NAILS — CONFIGURATION
   Modifiez UNIQUEMENT ce fichier pour adapter le site :
   coordonnées, horaires, prestations, tarifs, équipe, avis.
   Les valeurs ci-dessous sont des EXEMPLES à remplacer.
   ========================================================= */
window.SALON = {
  nom: "House of Nails",
  slogan: "L'art de la beauté, du bout des ongles",
  adresse: "12 rue de l'Exemple, 75000 Paris",
  telephone: "+33 1 23 45 67 89",
  whatsapp: "33123456789",           // format international sans + ni espaces
  email: "contact@houseofnails.example",
  instagram: "houseofnails",
  mapsQuery: "House of Nails Paris",  // texte recherché dans Google Maps

  // 0 = dimanche … 6 = samedi ; null = fermé
  horaires: {
    1: ["10:00", "19:00"],
    2: ["10:00", "19:00"],
    3: ["10:00", "19:00"],
    4: ["10:00", "20:00"],
    5: ["10:00", "20:00"],
    6: ["09:30", "19:00"],
    0: null
  },

  prestations: [
    { cat: "Mains", nom: "Manucure classique", duree: 30, prix: 25,
      desc: "Limage, soin des cuticules, massage et vernis classique." },
    { cat: "Mains", nom: "Vernis semi-permanent", duree: 45, prix: 35,
      desc: "Tenue 2 à 3 semaines, brillance intense, séchage UV/LED." },
    { cat: "Mains", nom: "Pose gel sur ongles naturels", duree: 60, prix: 45,
      desc: "Renforcement gel pour des ongles solides et naturels." },
    { cat: "Mains", nom: "Extensions gel / capsules", duree: 90, prix: 60,
      desc: "Allongement sur mesure : amande, ballerine, carré, stiletto." },
    { cat: "Mains", nom: "Remplissage gel", duree: 60, prix: 42,
      desc: "Entretien de votre pose, toutes les 3 à 4 semaines." },
    { cat: "Mains", nom: "French manucure", duree: 50, prix: 40,
      desc: "La French intemporelle, classique ou colorée." },
    { cat: "Pieds", nom: "Beauté des pieds", duree: 45, prix: 35,
      desc: "Bain, gommage, soin des cuticules, massage et vernis." },
    { cat: "Pieds", nom: "Pédicure semi-permanent", duree: 60, prix: 45,
      desc: "Soin complet + semi-permanent longue tenue." },
    { cat: "Pieds", nom: "Pédicure spa", duree: 75, prix: 55,
      desc: "Soin complet avec masque, enveloppement et massage prolongé." },
    { cat: "Nail Art", nom: "Nail art simple (par ongle)", duree: 5, prix: 3,
      desc: "Paillettes, ligne, point, effet chrome." },
    { cat: "Nail Art", nom: "Nail art élaboré (par ongle)", duree: 10, prix: 6,
      desc: "Dessin à main levée, strass, effet 3D, baby boomer." },
    { cat: "Extras", nom: "Dépose gel / semi-permanent", duree: 20, prix: 15,
      desc: "Retrait doux sans abîmer l'ongle naturel." },
    { cat: "Extras", nom: "Réparation d'un ongle", duree: 10, prix: 5,
      desc: "Ongle cassé ? On le répare en quelques minutes." }
  ],

  equipe: [
    { nom: "Lina", role: "Fondatrice & prothésiste ongulaire", specialite: "Extensions & baby boomer" },
    { nom: "Mai",  role: "Nail artist", specialite: "Nail art à main levée" },
    { nom: "Sarah", role: "Esthéticienne", specialite: "Beauté des pieds & spa" }
  ],

  avis: [
    { auteur: "Camille D.", note: 5, texte: "Accueil adorable, travail ultra précis. Ma pose a tenu 4 semaines !" },
    { auteur: "Inès B.",    note: 5, texte: "Le meilleur nail art du quartier, je ne vais plus ailleurs." },
    { auteur: "Julie M.",   note: 4, texte: "Salon propre et chaleureux, pédicure spa très relaxante." }
  ],

  faq: [
    { q: "Faut-il prendre rendez-vous ?",
      r: "Nous recommandons de réserver, mais nous acceptons les clientes sans rendez-vous selon les disponibilités." },
    { q: "Combien de temps tient un semi-permanent ?",
      r: "En moyenne 2 à 3 semaines selon la pousse et l'usage de vos mains." },
    { q: "Quelle différence entre gel et semi-permanent ?",
      r: "Le semi-permanent est un vernis fin et souple. Le gel est plus épais et permet de renforcer ou rallonger l'ongle." },
    { q: "Vos outils sont-ils stérilisés ?",
      r: "Oui : instruments métalliques stérilisés, limes à usage unique et surfaces désinfectées entre chaque cliente." },
    { q: "Quels moyens de paiement acceptez-vous ?",
      r: "Carte bancaire, espèces et paiement sans contact. Cartes cadeaux disponibles en salon." }
  ]
};
