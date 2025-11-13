# Parks Everywhere

**Parks** est une application web (actuellement au stade de *Proof of Concept*) conçue pour mettre en relation des propriétaires de places de parking inutilisées avec des automobilistes cherchant une solution de stationnement simple et rapide.

[cite_start]Le projet est né d'une expérience personnelle : la difficulté de se garer en centre-ville alors que de nombreux parkings privés restent vacants [cite: 23-24]. [cite_start]Parks vise à optimiser ces espaces en offrant une source de revenu passive aux propriétaires et une solution de stationnement sans stress pour les conducteurs [cite: 38-39].

> **Note sur le statut du projet :**
> Ce dépôt contient un **Proof of Concept (POC)** fonctionnel. L'architecture est en place et les fonctionnalités de gestion "Propriétaire" sont complètes. Le parcours "Client" (réservation, paiement) est défini et prévu pour la V2. [cite_start]L'application n'est pas encore déployée en production [cite: 233-234, 301-303].

## 1. Stack Technique

Ce projet est une Single Page Application (SPA) construite avec une architecture monolithique moderne :

* **Backend :** **Laravel 12** (PHP 8.2)
* **Frontend :** **React 19** (avec **TypeScript**)
* **Pont Backend/Frontend :** **Inertia.js**
* [cite_start]**Base de Données :** **MySQL** (utilisant l'ORM Eloquent) [cite: 121, 122]
* **Styling :** **Tailwind CSS** & **Flowbite-React**
* **Outil de Build :** **Vite.js**
* **Authentification :** **Laravel Breeze** (pour la gestion des utilisateurs)

## 2. Fonctionnalités (État du POC)

Le POC actuel est fonctionnel et se concentre sur les parcours "Visiteur" et "Propriétaire".

### ✅ Fonctionnalités Implémentées

* **Parcours Visiteur (Guest) :**
    * Page d'accueil (`HomeGuest.tsx`).
    * Pages de contenu (À Propos, Louer son parking).
    * Formulaire de contact fonctionnel avec envoi d'email (`Contact.tsx`).
    * Formulaire de recherche de parking par ville (`SearchSection.tsx`).
    * Page de résultats de recherche avec pagination (`ResultSearch.tsx`).

* **Authentification Sécurisée :**
    * Inscription, connexion, déconnexion.
    * Réinitialisation de mot de passe.
    * Vérification d'email.

* **Gestion Propriétaire :**
    * **Dashboard Propriétaire** complet avec statistiques (Revenus, Taux d'occupation, Avis récents).
    * **CRUD complet pour les Parkings** (Créer, Lire, Modifier, Supprimer).
    * Gestion des attributs de parking (dimensions, prix, images, options : borne, box, extérieur).

* **Gestion Client (Base) :**
    * **Dashboard Client** avec affichage des réservations à venir, historique et favoris (la logique backend est prête).

---

### ⏳ Roadmap (Objectifs V2)

La V2 du projet se concentrera sur la finalisation du parcours client, l'optimisation des performances et la mise en conformité.

* **Finalisation du tunnel de réservation client :**
    * Créer la vue React de "Détail du Parking" (accessible depuis les résultats de recherche).
    * Développer le composant de sélection de dates/heures et de confirmation (Cas d'utilisation "Réserver un parking").
    * Implémenter la logique d'autorisation dans les **Policies** (ex: `BookingPolicy`) pour activer la création de réservations.

* **Intégration du Paiement Réel :**
    * Connecter le tunnel de réservation à un prestataire de paiement (ex: Stripe).
    * Utiliser la structure de tables `invoices` et `payments` déjà en place pour tracer les transactions.

* **Pages "Mon Compte" Client :**
    * Créer les vues React pour "Mes Factures" et "Mes Moyens de Paiement" (les contrôleurs `InvoiceController` et `BillingMethodController` sont déjà présents).

* **Système de soumission d'avis :**
    * Ajouter le formulaire permettant au client de "Noter une réservation" (le `ReviewController` est déjà prêt).

* **Optimisation des performances (Cache) :**
    * Mettre en place une stratégie de cache (ex: Redis ou cache applicatif Laravel) pour les requêtes de base de données fréquemment utilisées.
    * Cibler en priorité la recherche publique (`ParkingController@search`) et l'agrégation des statistiques du `DashboardController`.

* **Accessibilité (a11y) :**
    * Auditer et mettre à jour les composants React (formulaires, modales, navigation) pour se conformer aux standards d'accessibilité (WCAG/RGAA).
    * Assurer une navigation complète au clavier et la compatibilité avec les lecteurs d'écran.

* **Déploiement :**
    * [cite_start]Finaliser le code et déployer l'application en production, en suivant la procédure déjà documentée [cite: 248-269].

## 3. Installation Locale (Guide)

1.  **Cloner le dépôt :**
    ```bash
    git clone https://votre-repo/parks.git
    cd parks
    ```

2.  **Installer les dépendances PHP :**
    ```bash
    composer install
    ```

3.  **Installer les dépendances Node.js :**
    ```bash
    npm install
    ```

4.  **Configuration de l'environnement :**
    * Copiez le fichier d'environnement :
        ```bash
        cp .env.example .env
        ```
    * Générez la clé de l'application :
        ```bash
        php artisan key:generate
        ```
    * [cite_start]Configurez vos identifiants de base de données **MySQL** (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) dans le fichier `.env` [cite: 542-546].

5.  **Base de données :**
    * Créez une base de données MySQL pour le projet.
    * Exécutez les migrations et les seeders pour remplir la base de données de test :
        ```bash
        php artisan migrate --seed
        ```
      *(Cela exécute le `DatabaseSeeder` qui peuple toutes les tables)*

6.  **Lancer l'application :**
    * Lancez les serveurs de développement front-end et back-end simultanément avec :
        ```bash
        composer run dev
        ```
      *(Cette commande personnalisée est configurée pour lancer `npm run dev` et `php artisan serve` en parallèle ).*

L'application sera accessible sur l'adresse fournie par `php artisan serve` (généralement `http://127.0.0.1:8000`).
