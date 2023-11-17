let config = {
    objets3D : 'objets3D/', // répertoire des fichiers objets 3D (se terminant par un '/')
    // objets3D : 'https://www.invisu.ca/vamo/objets3D/',
    // objets3D : 'http://localhost/vamo/objets3D/',
    // objets3D : 'https://www.dropbox.com/',
    //pointDecalage : 0.02, // décalage du point d'intérêt de la surface (selon la normale)
    //pointTaille : 0.03,   // facteur d'échelle du point d'intérêt
};

import { vamoInit } from './vamo/js/vamo.js';
// import { vamoInit } from 'https://www.invisu.ca/vamo/vamo/js/vamo.js';

function init( paramsFichier )
{
    vamoInit( paramsFichier, config );
}

export { init };
