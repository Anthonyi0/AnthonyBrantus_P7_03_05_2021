// Imports
const jwt = require('jsonwebtoken');
// Exportation de la fonction d'authentification
module.exports = (request, response, next) => {
    // Récupération du token dans les paramètres
    const authHeader = request.headers.authorization;
    // Si l'utilisateur possède une autorisation,
    // on déclare le token et on le vérifie, si il y a une erreur on renvoie un statut 403 sinon on le next
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'DEVELOPMENT_TOKEN_SECRET', (error, user) => {
            if (error) {
                return response.status(403);
            }
            next();
        });
    }
    // Sinon, on renvoie le statut 401 Unauthorized
    else {
        response.status(401).json({error:"accès non authorisé"});
    }
};