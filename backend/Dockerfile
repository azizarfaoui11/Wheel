# Utilisation de l'image Node.js 22.14.0
FROM node:22

# Répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "start"]
