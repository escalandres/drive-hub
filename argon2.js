const argon2 = require('argon2');

// Ejemplo de función para hashear una contraseña
async function hashPassword(password) {
  try {
    // Genera un hash de la contraseña
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    throw error;
  }
}

// Ejemplo de función para verificar una contraseña
async function verifyPassword(password, hash) {
  try {
    // Verifica si la contraseña coincide con el hash
    const result = await argon2.verify(hash, password);
    return result;
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    throw error;
  }
}

// Ejemplo de uso:
const password = 'contrasena123';
hashPassword(password)
  .then((hash) => {
    console.log('Hash de contraseña:', hash);

    // Simulamos la verificación de contraseña
    const isMatch = verifyPassword('contrasena123', hash);
    console.log('La contraseña coincide:', isMatch);
  })
  .catch((error) => {
    console.error('Error general:', error);
  });
