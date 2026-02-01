Voici le contenu complet de votre fichier `README.md` structuré de manière professionnelle, en français, prêt pour votre soumission de test technique.

```markdown
# 🛡️ Covalent AI // Suite de Conformité

Une solution full-stack haute performance pour l'analyse réglementaire de textes. Ce projet utilise un backend **Fastify**, un frontend **React** (Vite) avec une interface "Glassmorphism" moderne, et un moteur d'analyse partagé en **TypeScript**.



## 🏗️ Architecture du Projet

Le projet est géré comme un monorepo via **pnpm workspaces** :

```text
.
├── apps/
│   ├── api/             # Serveur Fastify (Port 3001)
│   └── web/             # Interface React + Vite + Tailwind (Port 5173)
├── packages/
│   └── analysis-engine/ # Logique métier partagée et règles de scoring
├── docker-compose.yml   # Infrastructure (MongoDB & Mongo Express)
├── pnpm-workspace.yaml  # Configuration du Monorepo
└── package.json         # Scripts racines pour la gestion du projet

```

---

## ⚙️ Mécanisme de Fonctionnement

1. **Logique Partagée** : Le package `@workspace/analysis-engine` est la source unique de vérité pour les règles de calcul. L'API l'utilise pour le traitement, garantissant une cohérence totale des données.
2. **Couche API** : Fastify reçoit le texte, l'envoie au moteur d'analyse, puis enregistre le résultat dans **MongoDB**.
3. **Frontend** : Une interface moderne construite avec **Tailwind CSS** comprenant :
* **Mises à jour optimistes** : Les nouveaux résultats s'affichent instantanément sans rechargement complet.
* **Défilement indépendant** : La carte d'historique possède son propre scroll avec une option "Lire plus" pour les longs textes.
* **Gestion des erreurs** : Notifications "Toast" robustes en cas d'indisponibilité de l'API.


4. **Conteneurisation** : L'ensemble de la stack est orchestré via Docker pour garantir un environnement de développement identique pour tous.

---

## 🚀 Mise en Route

### 1. Configuration de l'environnement

Le projet nécessite des variables d'environnement pour l'API et le client Web. Vous pouvez les initialiser automatiquement à partir des modèles fournis :

```bash
# À exécuter depuis la racine du projet
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

```

### 2. Installation des dépendances

Assurez-vous d'avoir [pnpm](https://pnpm.io/) installé :

```bash
pnpm install

```

### 3. Lancement de l'infrastructure

Démarrez la base de données et l'interface de gestion :

```bash
docker-compose up -d

```

* **MongoDB** : `localhost:27017`
* **Mongo Express (Interface GUI)** : [http://localhost:8081](https://www.google.com/search?q=http://localhost:8081)

### 4. Lancement de l'application

Démarrez l'API et le Frontend en mode développement :

```bash
pnpm dev

```

* **Frontend (Web)** : [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
* **API** : [http://localhost:3001](https://www.google.com/search?q=http://localhost:3001)

---

## 🧪 Tests

Pour exécuter les tests unitaires du moteur d'analyse :

```bash
pnpm --filter @workspace/analysis-engine test

```

---

## ✅ Liste de vérification pour la soumission

* [ ] Les fichiers `.env` ont été créés.
* [ ] Docker Desktop est lancé et les conteneurs sont actifs.
* [ ] `pnpm install` a été exécuté avec succès.
* [ ] La base de données contient des données après une première analyse.

---

## 🛠️ Stack Technique

* **Frontend** : React 18, Vite, Tailwind CSS, Lucide Icons.
* **Backend** : Fastify, Pilote natif MongoDB, Zod.
* **Logique** : TypeScript, Vitest.
* **DevOps** : Docker, pnpm Workspaces.

```



**Souhaitez-vous que je génère également les fichiers `.env.example` par défaut pour l'API et le Web afin que votre commande `cp` fonctionne immédiatement ?**

```