# House of Nails — site vitrine

Site one-page pour un salon de manucure : prestations & tarifs, galerie, équipe, avis, réservation (WhatsApp / e-mail), horaires avec statut « ouvert / fermé » en direct, FAQ.

HTML/CSS/JS pur, aucune dépendance, aucun build.

## Lancer

Ouvrez `index.html` dans un navigateur, ou :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Personnaliser

Tout le contenu est dans **`config.js`** : nom, adresse, téléphone, WhatsApp, e-mail, Instagram, horaires, prestations (catégorie, durée, prix, description), équipe, avis, FAQ.

> Les coordonnées, tarifs, membres de l'équipe et avis fournis sont des **exemples** : remplacez-les par les vraies informations du salon avant mise en ligne.

## Fichiers

| Fichier      | Rôle                                   |
|--------------|----------------------------------------|
| `index.html` | Structure de la page                   |
| `styles.css` | Design (clair/sombre, responsive)      |
| `script.js`  | Rendu dynamique, créneaux, réservation |
| `config.js`  | Contenu du salon                       |

## Héberger

Fichiers statiques : GitHub Pages, Netlify, Vercel ou n'importe quel hébergeur web.
