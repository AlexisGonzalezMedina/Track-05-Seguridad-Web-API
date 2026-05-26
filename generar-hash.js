const bcrypt = require('bcryptjs');

const contrasenaPlana = 'ContraseñaDePrueba25052026';

bcrypt.hash(contrasenaPlana, 10, function(err, hash) {
    if (err) console.error('Error al generar el hash:', err);
    console.log('----------------------------------')
    console.log('Tu contraseña en texto plano:', contrasenaPlana);
    console.log('Tu HASH generado para colocar en auth.ts:\n');
    console.log(hash);
    console.log('--------------------------------------------------');
});